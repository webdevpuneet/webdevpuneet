const fs = require('fs');
const p = 'c:/Projects/tools/src/components/UiSnippetsTool/snippets/';

// Each entry: [id, addition_text]
// Addition will be appended to existing about description
const additions = [

['confetti-button', `

**The physics simulation**

Each confetti particle is created at the click position with random polar coordinates: vx = speed * Math.cos(angle), vy = speed * Math.sin(angle). A gravity constant (gy = 0.15) adds to vy every frame, causing particles to arc downward naturally. Each particle has an alpha value that decrements each frame until it reaches 0, at which point the particle is removed from the array. The result is 80 particles that burst outward, arc downward with gravity, and fade as they travel.

**CSS custom properties for trajectories**

Each particle div has CSS custom properties (--tx, --ty, --r) set as inline styles at creation time. A CSS @keyframes animation uses these properties for the movement: transform: translate(var(--tx), var(--ty)) rotate(var(--r)). This delegates the heavy per-frame position calculation to CSS instead of JavaScript DOM manipulation, keeping the main thread free during the animation burst.

**Preventing multiple bursts**

A simple isAnimating boolean prevents overlapping burst cycles. When the button is clicked and isAnimating is true, the click handler returns immediately. The flag resets after all particles have faded — typically 1.2–1.5 seconds after the burst.`],

['password-strength', `

**The four regex rules**

The strength meter evaluates four independent criteria: (1) length >= 8 characters, (2) at least one uppercase letter (/[A-Z]/), (3) at least one digit (/[0-9]/), (4) at least one special character (/[^A-Za-z0-9]/). Each test returns a boolean. The score is simply the count of passing tests: 0 (empty), 1 (weak), 2 (fair), 3 (good), 4 (strong). This evaluation runs on every input event with no debounce — password fields are short enough that real-time feedback is performant.

**Colour and label mapping**

Each score maps to a colour and label: 0→grey/empty, 1→red/Weak, 2→orange/Fair, 3→yellow/Good, 4→green/Strong. The bar uses four segment elements that fill progressively. The label updates simultaneously so users understand the colour meaning at a glance without having to interpret the bar alone.

**Show/hide password toggle**

The eye icon button toggles the input type between "password" and "text". This uses input.type = value directly — the input value is preserved across type changes. The icon switches between an open eye (visible text) and a closed eye (hidden text).`],

['product-card', `

**The colour swatch selector**

Each swatch button has a data-colour attribute. When clicked, updateSwatch(btn) reads btn.dataset.colour and applies it as the product image background colour: productImg.style.background = colour. The active swatch gets .active class which adds a ring indicator. This pattern demonstrates how to build a colour selector that updates visual state without navigating to a new page — the same interaction used on Apple, Nike, and most e-commerce product pages.

**The wishlist toggle**

The heart button toggles .liked class. In the liked state, the heart SVG switches from outline (fill="none") to filled (fill="currentColor"). The button colour changes from grey to red. This is the standard heart/save pattern. In a real product, the toggle triggers a PATCH request to your API to add or remove the product from the user's saved items.

**Add to cart feedback state**

Clicking "Add to Cart" shows a brief "Added!" text and green background for 1.5 seconds, then resets. This immediate visual confirmation is important for cart interactions — without it, users often click multiple times believing the first click failed.`],

['text-scramble', `

**The decode algorithm**

The scramble effect works by iterating the target text character by character. For each character position, the function either: (a) reveals the final character if the position index is below the current reveal threshold, or (b) shows a random character from a 90-character pool (uppercase, lowercase, digits, symbols). A requestAnimationFrame loop increments the reveal threshold by a fraction each frame. The result is characters "decoding" from random noise into the final text from left to right.

**The character pool**

The 90-character scramble pool includes uppercase A-Z, lowercase a-z, digits 0-9, and special characters. Using a large, varied pool makes the scramble feel genuinely random and cryptographic. A smaller pool (just digits, or just uppercase) creates a more specific aesthetic — use numbers-only for a hacker terminal effect, use uppercase for a classified document decode feel.

**Triggering and cycling**

The snippet cycles through multiple words — "DESIGN", "BUILD", "SHIP", "REPEAT" — scrambling between each transition. Each word scrambles in over ~800ms. A setTimeout between words pauses at the final state before beginning the next scramble.`],

['chat-ui', `

**The message append pattern**

sendMessage() creates a new .message div with class "outgoing" and the message text, then appends it to .messages. A short setTimeout creates the simulated incoming reply. Each message has a .time span showing the current time formatted as HH:MM. The container uses overflow-y: auto and a JavaScript call to scrollTop = scrollHeight after each append to auto-scroll to the most recent message.

**Message bubbles with CSS**

Outgoing messages float right using margin-left: auto. Incoming messages have no margin override so they sit at the left. Both use border-radius with an asymmetric corner: outgoing messages have border-bottom-right-radius: 4px (the "tail" corner), incoming have border-bottom-left-radius: 4px. This is the standard chat bubble tail pattern.

**The typing indicator**

Before the simulated reply arrives, three animated dots appear (.typing-indicator) using the same bounce animation as the Dots Loader snippet in this library. The indicator is removed when the reply message is appended.

**Customising for real use**

Wire sendMessage() to a WebSocket or API endpoint. Render incoming messages from the server's message event. For a real chat UI, each message needs a sender ID, timestamp, and message ID for proper rendering and ordering.`],

['star-rating', `

**Hover preview with CSS sibling selectors**

The star rating uses the CSS general sibling combinator (~) in reverse order trick. The input elements are hidden radio buttons ordered 5 to 1. When a star is hovered, CSS .star:hover ~ .star selects all subsequent siblings and removes their colour, while the hovered star and all stars before it get the accent colour. This creates the hover preview effect without any JavaScript — just CSS sibling relationships.

**Click-to-set with radio inputs**

Each star is a label associated with a hidden radio input. Clicking a label checks its radio input. The :checked pseudo-class then applies the filled colour to that star and all preceding stars via the same sibling combinator logic. The rating is accessible via standard form input — a form POST includes the rating value automatically.

**The half-star pattern**

For half-star ratings (3.5, 4.5), use two overlapping label elements per star: one for the left half and one for the right. Each half has its own radio input value (3.0, 3.5, 4.0, 4.5, etc.). The clip-path: inset(0 50% 0 0) clips each half-star to its respective side.`],

['pricing-toggle', `

**The two-array price swap**

Two JavaScript arrays hold prices for each plan: const monthly = [0, 12, 39] and const annual = [0, 10, 31]. When the toggle fires, it reads the current isAnnual boolean and selects the correct array. It then iterates each .amount span and updates textContent with the corresponding price. The transition: color 0.2s on .amount creates a brief colour fade as the number changes, drawing the eye to the update.

**The CSS knob animation**

The toggle knob uses transform: translateX(20px) in the checked state versus translateX(0) in the unchecked state. The CSS transition: transform 0.2s eases the slide. No JavaScript position calculation — the toggle is pure CSS with JavaScript only for the price swap and label active-state class toggling.

**The "Save 20%" badge**

The annual label contains a badge chip that is always visible, even before the toggle is switched. This is a deliberate conversion pattern — showing the savings before the user interacts means they see the benefit immediately. The badge uses a green tinted background to communicate positive value.

**Connecting to Stripe**

Store two Stripe price IDs per plan: one for monthly and one for annual billing. On CTA click, read the isAnnual state and pass the matching priceId to stripe.redirectToCheckout(). The toggle state determines which billing cycle the user enters at checkout.`],

['accordion-faq', `

**The max-height animation technique**

CSS cannot animate from height: auto to height: 0 directly. The accordion uses max-height instead: the closed state has max-height: 0; overflow: hidden. The open state applies max-height: 500px (larger than any possible content). CSS transition: max-height 0.3s ease animates between these values. The transition feels natural even though max-height: 500px is much larger than the actual content height — the ease-out timing makes it decelerate near the end, which coincidentally matches when the content is near its natural height.

**Chevron rotation**

The chevron uses transform: rotate(180deg) when .open is applied to the parent item. CSS transition: transform 0.25s eases the rotation. This provides visual feedback that the item is a toggle without requiring a separate open/close icon pair.

**Single-open accordion behaviour**

The toggle() function closes all items before opening the clicked one: document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open')). This ensures only one answer is visible at a time — the accordion pattern. Remove this close-all block to allow multiple items open simultaneously if your FAQ content benefits from side-by-side comparison.`],

['image-comparison', `

**The clip-path reveal technique**

The "after" image sits directly on top of the "before" image using position: absolute; inset: 0. clip-path: inset(0 X% 0 0) clips the right portion of the after image — X% is the drag position as a percentage of the container width. When X is 50%, the left half shows "after" and the right half shows "before". When X is 0%, the full before image is visible; at 100%, the full after image is visible. Both images have the same dimensions, so the clip reveals exactly the correct portion.

**Mouse and touch drag handling**

The drag handle tracks three events: mousedown (start drag), mousemove (update position), mouseup (stop drag). Touch events use touchstart, touchmove, touchend. The position is computed as (e.clientX - rect.left) / rect.width * 100, clamped between 2 and 98 to prevent the images from fully disappearing. During drag, iframes have pointer-events: none applied to prevent them from intercepting mouse events.

**Customising with real images**

Replace the gradient placeholder divs with real img elements or background-image CSS. Ensure both images have the same dimensions for the comparison to work correctly. Add an alt attribute to each image for accessibility.`],

['scroll-snap-gallery', `

**How CSS scroll snap works**

The gallery container has scroll-snap-type: x mandatory on the x-axis. Each card has scroll-snap-align: start. When the user scrolls and releases, the browser automatically snaps the scroll position to the nearest card's start edge. mandatory means the snap always happens — optional allows free scrolling between snaps. The scroll uses overflow-x: auto and a hidden scrollbar via ::-webkit-scrollbar { display: none }.

**The dot indicator sync**

A scroll event listener reads scrollLeft / scrollWidth * numCards to compute the approximate active index. It then updates the dot indicators — the active dot gets the filled style. requestAnimationFrame is used to throttle the update to one per paint. For more accurate snap detection, use IntersectionObserver on each card with a 0.5 threshold.

**Keyboard navigation**

The left/right arrow buttons call scrollBy with the card width and smooth behaviour: container.scrollBy({ left: cardWidth, behavior: 'smooth' }). Prev/next buttons disable at the boundaries when scroll position is at 0 or maximum. Keyboard arrow keys can also be wired to the same scrollBy calls for accessibility.`],

['multi-step-form', `

**Step state management**

The stepper has three states per step: pending (grey circle with number), active (accent ring with pulsing outer glow), and done (filled circle with checkmark). These are managed by index comparison: steps before currentStep are done, currentStep is active, steps after are pending. Each step dot uses CSS conditional classes rather than inline styles — this keeps the visual logic in CSS where it belongs.

**Validation before advance**

goNext() checks required fields in the current step before advancing: const required = currentPanel.querySelectorAll('[required]'); const valid = [...required].every(f => f.value.trim()). If any required field is empty, the step does not advance and the empty fields get a red border via .invalid class. This prevents users from reaching the final step with incomplete data.

**Progress line fill**

The connecting line between step dots fills progressively: width: (currentStep / totalSteps) * 100 + '%'. The line uses a gradient from accent to accent — a visual indicator of overall progress separate from the individual step dots.

**Data collection across steps**

Each input retains its value as steps change because the panels are shown/hidden via display toggle, not created/destroyed. Collect all form values at the final step using new FormData(formElement) or querySelectorAll('[name]') to gather all named inputs regardless of which panel they are in.`],

['spotlight', `

**The radial gradient mask**

The spotlight uses background: radial-gradient(circle 180px at X Y, transparent 0%, rgba(0,0,0,0.85) 100%) on an overlay div. The circle centre (X Y) updates to the mouse position on each mousemove event. The transparent centre creates the "lit" area, and the dark edges create the "dark room" effect. The gradient size (180px) is the spotlight radius — increase for a wider spotlight, decrease for a focused beam.

**Mouse coordinate conversion**

The overlay covers the full container using position: absolute; inset: 0. Mouse coordinates from mousemove are relative to the viewport (e.clientX, e.clientY). These must be converted to coordinates relative to the overlay: const rect = overlay.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top. These are then formatted as CSS background-position values.

**The reveal-on-hover pattern**

The overlay has opacity: 0 by default, fading in on mouseenter to opacity: 1. This means content appears normal until the user's cursor enters the spotlight zone, creating a discovery interaction — users naturally explore by moving their cursor.

**Combining with other effects**

Pair this snippet with the Aurora Background or Floating Particles animations for a layered effect. The spotlight sits on top (higher z-index) and reveals the animated background beneath through its transparent centre.`],

['animated-tabs', `

**The offsetLeft/offsetWidth technique**

The pill indicator reads the active tab button's actual pixel position using offsetLeft and offsetWidth — values that the browser computes after layout. Setting pill.style.left = btn.offsetLeft + 'px' and pill.style.width = btn.offsetWidth + 'px' positions and sizes the pill to exactly match the active tab. CSS transition: left 0.2s, width 0.2s animates between positions. This approach handles any tab label length, any font size, and any number of tabs automatically — no hardcoded positions needed.

**Panel switching**

Each tab button has a data-panel attribute matching a panel ID. Clicking a tab: (1) removes .active from all tab buttons, (2) adds .active to the clicked button, (3) hides all panels, (4) shows the matching panel. The panel switch is instant (no animation) while the pill indicator slides smoothly — this matches the expected tab behaviour where content switches immediately but the indicator communicates which tab was clicked.

**Accessible implementation**

Add role="tablist" to the tab container, role="tab" to each button, and role="tabpanel" to each panel. Add aria-selected="true/false" to tab buttons and aria-hidden="true/false" to panels. Add aria-controls on each tab pointing to its panel ID, and aria-labelledby on each panel pointing to its tab ID.`],

['typewriter', `

**The character-by-character typing loop**

type() appends one character per call using setInterval at a speed of typically 80-100ms per character. It reads from the current word in the words array at the current charIndex position. When charIndex equals the word length, the typing phase ends and a pause begins before erasing starts. erase() decrements charIndex, removing the last character each interval at a faster speed (40-50ms). When charIndex reaches 0, the word index advances and the next word begins typing.

**The blinking cursor**

A ::after pseudo-element on .typewriter-text with content: '|' or a separate .cursor element blinks via a CSS keyframe: @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }. The cursor animates continuously but should be paused during typing: animation-play-state: paused on the .typing class. This matches how real terminal cursors behave — blinking when waiting, solid when typing.

**Infinite loop and word cycling**

The words array loops: when the last word finishes typing and erasing, the word index resets to 0. The loop repeats indefinitely. To pause at specific words, add a custom pauseTime property per word and use setTimeout instead of the interval for that word's display duration.`],

['file-dropzone', `

**The dragover/drop event pair**

Without e.preventDefault() in the dragover handler, the browser's default action (opening the file) fires and no drop event is triggered. Always call e.preventDefault() in dragover to signal to the browser that this element accepts drops. The drop handler also calls e.preventDefault() to prevent the browser from navigating to the dropped file. e.dataTransfer.files provides the FileList of dropped files.

**The visual drag-over state**

The .drag-over class adds a coloured border and light background to communicate to the user that the zone is ready to accept the dropped file. This class is added in ondragover and removed in ondragleave. Adding a CSS transition: border-color 0.15s, background 0.15s to the dropzone makes the state change feel responsive.

**File size and type validation**

After receiving files (from drop or input change), validate before processing: const MAX_SIZE = 25 * 1024 * 1024; const ALLOWED = ['png','jpg','pdf','zip']; const valid = file.size <= MAX_SIZE && ALLOWED.includes(ext(file.name)). Show an error state for invalid files: an error badge with the reason ("File too large" or "Invalid type") instead of a progress bar. This prevents users from uploading incompatible files before the upload starts.`],

['kanban-board', `

**The HTML5 drag-and-drop API**

Each card has draggable="true". Three events on the card: dragstart stores the card reference in a draggedCard variable. dragend removes visual drag state. Three events on each column: dragover calls e.preventDefault() — without this, the drop event never fires. dragenter adds a visual highlight to the target column. drop appends draggedCard to the column's card list and calls updateCounts().

**The setTimeout(0) ghost image fix**

When draggable="true" is set and mousedown fires, the browser immediately creates a drag ghost image from the element's current appearance. If .dragging (which typically dims the card) is applied inside dragstart directly, the ghost image captures the dimmed state. Adding .dragging inside a setTimeout(() => card.classList.add('dragging'), 0) delays the visual change to after the ghost image is captured, keeping the ghost looking normal while the original appears dimmed.

**Live column card counts**

updateCounts() iterates each column and counts its .card children: column.querySelectorAll('.card').length. It updates the count badge in the column header. This fires after every drop, keeping counts accurate even with multiple rapid moves.`],

['vertical-timeline', `

**The ::before gradient line**

The timeline container has ::before { content: ''; position: absolute; left: 20px; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--accent), transparent); }. The gradient line fades from the accent colour at the top to transparent at the bottom, creating a natural end without a hard cut. Each timeline item is position: relative with left padding that offsets content from the line.

**Node states**

Each timeline node has one of three states: done (filled circle with checkmark — uses SVG or a Unicode ✓), active (accent ring with a CSS pulse animation), or pending (grey empty circle). The active node uses @keyframes pulse with box-shadow: 0 0 0 6px rgba(accent, 0.2) that scales in and out, creating a live "current position" indicator.

**Connecting line fill animation**

The fill line behind the main gradient line uses a height that increases as more steps complete. height: (completedSteps / totalSteps) * 100 + '%'. Animating this height via CSS transition: height 0.6s ease makes the line visually fill as the user progresses through the timeline.`],

['notification-bell', `

**The badge counter**

The unread badge uses position: absolute; top: -4px; right: -4px to sit above the bell icon. It shows a count number and uses min-width: 16px so it looks correct for single and double digit counts. When count exceeds 9, display "9+" instead of the full number. The badge disappears (display: none) when count reaches 0.

**The dropdown open/close**

Clicking the bell toggles .open on the dropdown panel, which uses scale(0.95) + opacity: 0 in the closed state and scale(1) + opacity: 1 in the open state. This CSS transition matches the popover pattern. The dropdown is positioned using position: absolute; right: 0; top: calc(100% + 8px). Click-outside detection uses document.addEventListener('click', e => { if (!e.target.closest('.bell-wrap')) close(); }).

**Mark as read interaction**

Each notification item has a "Mark read" button. Clicking it removes the .unread class from the notification and decrements the badge count. The mark-all-read button iterates all .unread items and marks them simultaneously. Both patterns update the badge count immediately — optimistic UI that syncs to the backend separately.`],

['3d-card-tilt', `

**The perspective transform calculation**

On mousemove inside the card, the handler computes the cursor position relative to the card centre: const centerX = rect.left + rect.width/2; const centerY = rect.top + rect.height/2; const rotX = -(e.clientY - centerY) / (rect.height/2) * 10; const rotY = (e.clientX - centerX) / (rect.width/2) * 10. The division by half the card dimension normalises to a -1 to +1 range; multiplying by 10 gives a maximum 10-degree rotation. Negative rotX is needed because moving the cursor up should tilt the top of the card toward the viewer.

**The glow highlight**

A radial gradient overlay follows the cursor inside the card: background: radial-gradient(circle at X Y, rgba(255,255,255,0.15), transparent 70%). The X and Y values are the cursor position as a percentage of the card dimensions: ((e.clientX - rect.left) / rect.width * 100) + '% ' + ((e.clientY - rect.top) / rect.height * 100) + '%'. This creates a specular highlight that appears to move with the cursor, reinforcing the 3D illusion.

**Reset on mouse leave**

On mouseleave, rotX and rotY are reset to 0 with transition: transform 0.5s ease — a slower ease-out that lets the card settle back to flat gently, like a physical object returning to rest.`],

['reveal-on-scroll', `

**IntersectionObserver with threshold**

The observer watches each .reveal element with threshold: 0.1 — the callback fires when 10% of the element is visible. Inside the callback, entry.isIntersecting determines if the element entered (add .visible) or left (optionally remove it for re-trigger). obs.disconnect() after the first trigger is intentional for most use cases — animations that re-play every scroll are typically more annoying than engaging.

**The CSS animation on .visible**

The .reveal class sets opacity: 0 and transform: translateY(30px) as the initial hidden state. The .visible class sets opacity: 1 and transform: translateY(0). CSS transition: opacity 0.6s ease, transform 0.6s ease handles the animation. The transition only fires when .visible is added — if .visible is set in HTML for above-the-fold content, no animation plays (the element starts visible).

**Staggered children with animation-delay**

For list items that should reveal one by one, add animation-delay: calc(var(--i) * 0.1s) where --i is a CSS custom property set as inline style on each child: style="--i:3". This creates a cascading reveal effect without JavaScript for each individual child.`],

['magnetic-button', `

**The vector math**

On mousemove inside the magnetic zone, two calculations run: (1) distance = Math.hypot(dx, dy) where dx and dy are the cursor offset from the button centre. (2) If distance < strength radius, apply a force: x += (cursorX - buttonCentreX) * 0.3; y += (cursorY - buttonCentreY) * 0.3. This moves the button 30% of the distance toward the cursor. The button position is updated via transform: translate(x + 'px', ' + y + 'px'), and lerp smoothing (x += (targetX - x) * 0.12) eases the movement each requestAnimationFrame frame.

**The spring return**

On mouseleave, the target position resets to (0, 0). The lerp loop continues running until x and y are close enough to zero (abs < 0.5), then it stops. This creates the elastic return animation — the button springs back to its natural position with decreasing velocity, exactly like a physical magnet being released.

**Configuring the attraction strength**

Increase the 0.3 multiplier for stronger attraction (button moves more per pixel of cursor distance). Decrease for subtler effect. The strength radius (typically 80-120px) controls how close the cursor must be to trigger attraction. Smaller radius = more precise interaction; larger = more ambient magnetic feel.`],

['aurora-bg', `

**The mix-blend-mode: screen effect**

Each aurora orb uses mix-blend-mode: screen. Screen blending adds pixel colour values together — where two orbs overlap, their colours combine additively, creating brighter, more saturated intersection zones. This is why overlapping a purple orb and a pink orb creates a bright white-pink centre. Without mix-blend-mode, the orbs would simply overlap with the top layer obscuring the bottom one.

**The drift animation**

Each orb uses a @keyframes drift animation that moves via translate(x,y) and scale(). Three orbs have different animation-duration values (14s, 18s, 22s) and animation-delay values (-6s, -12s). Because they move at different rates and phases, they never synchronise — the pattern is always unique and organic-looking. Using translate (not left/top) keeps the animation on the GPU compositor.

**Colour temperature variation**

The three default colours (indigo, pink, cyan) were chosen to represent warm, cool, and neutral tones that blend well in screen mode. For a warmer aurora, shift toward amber and red. For a cooler aurora, shift toward blue and teal. Avoid very dark or very light colours — screen blending works best with mid-range saturated hues.`],

['dark-mode-toggle', `

**The :root CSS variable swap**

When the toggle switches to dark mode, a .dark class is added to the body or :root element. CSS rules under .dark override the default CSS variable values: .dark { --bg: #0f172a; --text: #f1f5f9; --surface: #1e293b; }. All components that use these variables automatically update — no component-specific dark mode logic needed. This is why CSS custom properties are the recommended approach for theming.

**localStorage persistence**

The toggle reads the user's preference from localStorage on page load: const saved = localStorage.getItem('color-scheme'). On toggle, it writes the new value. To prevent a flash of wrong theme on load, add an inline script in the document <head> (before any CSS) that reads localStorage and adds the .dark class immediately: <script>if(localStorage.getItem('color-scheme')==='dark')document.documentElement.classList.add('dark')</script>.

**The CSS knob animation**

The toggle knob uses position: absolute and transition: left 0.2s. In light mode, left: 3px places it on the left; in dark mode, left: calc(100% - 23px) places it on the right. The toggle background transitions from grey to indigo simultaneously. Both transitions have the same 0.2s duration so they move in sync.`],

['testimonial-card', `

**The blockquote and cite pattern**

The testimonial uses semantic HTML5 elements: <blockquote> for the quote text and <cite> inside <figure> or <footer> for the attribution. Search engines and screen readers understand this markup — Google's rich result documentation recognises blockquote and cite for testimonial content. The quote marks are added via CSS ::before on blockquote using content: '"' rather than HTML entity characters.

**The star rating display**

The five stars use the ★ Unicode character in a .stars span with letter-spacing and amber colour. CSS ensures all five stars are always shown but at different opacities: filled stars at full opacity, empty stars at 20% opacity. Compute filled vs empty from a rating value: for (let i=0; i<5; i++) stars += (i < rating ? '★' : '☆').

**The avatar and author row**

The author section uses display: flex; align-items: center; gap: 12px. The avatar is a 44px circle with the person's initials or a real photo. The name and title sit in a flex column at font-size: 14px and 12px respectively. This compact layout fits neatly inside a card footer without taking space away from the quote.`],

['badge-chips', `

**The ::before dot indicator**

Status badges use a ::before pseudo-element with content: '' and border-radius: 50% for a small coloured dot before the text label. The dot inherits its colour from the badge's text colour using background: currentColor — change the text colour and the dot updates automatically. The dot has margin-right: 5px and is vertically centred using position: relative; top: -0.5px.

**Removable filter chips**

The filter chip pattern uses a .chip container with the label text and a × remove button inside. The remove button has font-size: 14px and a hover background that turns slightly red, giving a clear remove affordance without a destructive-looking icon. Clicking × calls chip.remove() and optionally fires a custom event: chip.dispatchEvent(new CustomEvent('chip-remove', { detail: chip.dataset.value, bubbles: true })).

**Animated chip entry**

New chips can animate in via @keyframes: opacity 0 → 1 and scale(0.8) → 1 over 0.15s. Apply the keyframe to .chip. When chips are removed, animate out similarly by adding .removing class, then removing the DOM element on animationend. This makes the chip row feel dynamic and responsive to additions and deletions.`],

['gradient-text', `

**The background-clip: text technique**

background-clip: text clips the element's background to the text shape, making the background visible only through the text characters. Setting -webkit-text-fill-color: transparent (and color: transparent for non-WebKit browsers) makes the text fill itself invisible so the background shows through. The standard background-clip: text is also required alongside the prefixed version. Both properties must be present — either alone produces no effect.

**The animated shimmer**

The gradient has background-size: 300% which makes the gradient three times the element width. A @keyframes animation shifts background-position from 0% to 200%. Because the gradient is three times wide, shifting by 200% sweeps the full gradient across the text while keeping the gradient colours continuous at both ends — no visible jump or restart.

**Text selection**

When text with background-clip: text is selected, the selection highlight may not be visible on some browsers because the text fill is transparent. Add ::selection { background: rgba(99,102,241,0.3); -webkit-text-fill-color: initial; } to restore visible selection highlighting.`],

['music-player', `

**The vinyl spin animation**

The vinyl record uses animation: spin 3s linear infinite with animation-play-state: paused initially. On play, animation-play-state changes to running; on pause, back to paused. This approach correctly resumes from the current rotation angle rather than jumping back to 0° — which would happen if the animation were added and removed from the classList. The vinyl inner detail (the label and ring) uses a second element that counter-rotates at a slower rate for visual depth.

**The progress bar interaction**

The progress bar background is a range input with -webkit-appearance: none for cross-browser custom styling. Its value tracks the current time percentage. Clicking the bar sets currentTime = (e.offsetX / bar.offsetWidth) * duration. A setInterval updates the bar value every 250ms while the track plays.

**Track switching**

An array holds the track objects (title, artist, duration). The previous/next buttons decrement/increment the track index with wrapping. switchTrack() updates the title, artist, duration display, resets the progress bar to 0, and either plays immediately or stays paused depending on the current playback state.`],

['count-up', `

**The easing function**

The count-up uses a quartic ease-out: at time t (0 to 1), progress = 1 - Math.pow(1 - t, 4). This function starts very fast (close to linear near t=0) and decelerates sharply near t=1. The dramatic deceleration makes the number feel like it's "settling" on its final value, creating a satisfying landing effect. Linear interpolation (just t) creates a mechanical feel; ease-out feels earned.

**The M/K auto-formatter**

Numbers over 999,999 display as "X.XM"; numbers over 999 display as "XK". The formatter runs on each animation frame: function fmt(n) { return n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n >= 1e3 ? Math.round(n/1e3)+'K' : Math.round(n)+''; }. This ensures the displayed number never looks awkward at large values like "1,200,000" — it shows "1.2M" instead.

**IntersectionObserver for scroll trigger**

The count-up animation fires when the element scrolls into view using IntersectionObserver with threshold: 0.5. The observer disconnects after the first trigger to prevent re-animation on scroll back. This is a key UX decision — once a metric has counted up, it should stay at its target value to communicate stability.`],

['otp-input', `

**Auto-advance focus**

On each input event, if the current input has a value (exactly one digit), focus() moves to the next input: inputs[i+1].focus(). This creates the auto-advance experience users expect from OTP fields. The input uses maxlength="1" to limit entry to one character. On input, the current value is sanitised to only digits: input.value = input.value.replace(/\D/g, '').slice(-1) — the slice(-1) keeps only the last entered character in case the browser's input event fires with multiple characters.

**Paste handling**

A paste event listener on the first input (or any input) reads e.clipboardData.getData('text') and distributes the pasted characters across all inputs: pastedText.split('').forEach((char, i) => { if (inputs[i]) inputs[i].value = char; }). Focus moves to the last filled input or the first empty one after paste. This is the critical OTP UX feature — paste an SMS code and the entire field fills instantly.

**Backspace navigation**

A keydown listener on each input checks for Backspace. If the current input is already empty and Backspace is pressed, focus moves to the previous input: inputs[i-1].focus(). This allows the user to correct a mistake without clicking the previous box.`],

['bento-grid', `

**The grid-column: span pattern**

Bento grid items use grid-column: span 2 to occupy two columns of width while using the standard row height. Some items use grid-row: span 2 for double-height cells. The container uses display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px. The browser automatically positions items in the available cells following the normal document flow, wrapping to new rows as needed. No manual row/column placement is required — the span values create the varied layout automatically.

**Responsive adaptation**

On narrow screens, reduce the grid columns: @media (max-width: 768px) { .bento { grid-template-columns: repeat(2, 1fr); } }. Items with span 2 that were wide on desktop now span both narrow columns, becoming full-width. For mobile, single column with no spans works best. Each breakpoint may need custom span overrides for specific items.

**The hover accent border**

Each bento card uses border: 1px solid transparent initially. On :hover, border-color transitions to the accent colour. Combined with border-radius and the card background, this creates a lit border effect that highlights the card being hovered without moving it. Add box-shadow: 0 8px 32px rgba(accent, 0.1) on hover for additional lift.`],

['command-palette', `

**Keyboard shortcut capture**

The Cmd+K / Ctrl+K listener checks: if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openPalette(); }. e.preventDefault() stops the browser's default Cmd+K action (some browsers map this to a bookmark or search action). The listener is attached to document once on component mount and remains active globally while the page is open.

**The fuzzy search algorithm**

The search filters commands by checking if the query string is a substring of the command name or description: cmd.name.toLowerCase().includes(q) || cmd.desc.toLowerCase().includes(q). For a true fuzzy match (allowing out-of-order character matching), replace includes with a character-order test: const chars = [...q]; let idx = 0; return name.split('').some(c => c === chars[idx] && ++idx) && idx === chars.length. This matches "cmpl" to "command palette".

**Arrow key navigation**

The keydown handler tracks selectedIndex state. ArrowDown increments it (wrapping at the list end); ArrowUp decrements (wrapping to the end). The selected command gets a highlighted background. Enter triggers the selected command's action and closes the palette. The selectedIndex is reset to 0 on each new search query.`],

['modal', `

**The three close mechanisms**

Production modals need three independent close paths: (1) An explicit × close button in the modal header — covers users who do not know keyboard shortcuts. (2) Click-outside detection on the backdrop — the most natural close gesture on desktop. (3) ESC keydown on document — the universal keyboard escape for any overlay. Implementing all three reduces friction and matches expected behaviour across user profiles. Removing any one of them frustrates a segment of users.

**The backdrop blur**

backdrop-filter: blur(8px) on the overlay creates the frosted glass effect behind the modal. This requires the overlay to have a partially transparent background (rgba) — a fully opaque overlay has no content behind it to blur. The blur property is GPU-composited and does not trigger layout recalculation.

**The entry animation**

The modal dialog uses transform: scale(0.95) + opacity: 0 as the initial state, transitioning to scale(1) + opacity: 1 on open. This scale-up-from-slightly-small animation is the standard modal entry across macOS apps, iOS, and most web design systems. It communicates "appearing" more naturally than a slide-in from an edge.`],

['neon-glow', `

**The layered box-shadow technique**

Neon glow is not a single box-shadow — it is three or four layers at increasing blur radii. Example for cyan: box-shadow: 0 0 4px #0ef, 0 0 12px #0ef, 0 0 28px #0ef, 0 0 56px rgba(0,238,255,0.4). The innermost shadow (4px) creates the bright core. Progressively larger radii create the mid-glow and outer ambient spread. Each layer uses the same hue but the outermost uses rgba with reduced opacity for a natural fade. The same layered technique applies to text-shadow for neon text effects.

**Combining box-shadow and text-shadow**

For fully neon-glowing buttons, apply layered box-shadow on the button element and layered text-shadow on the button's text content. text-shadow: 0 0 4px #0ef, 0 0 8px #0ef creates a glowing text inside the glowing button, adding depth.

**Performance**

Multiple box-shadow layers are rendered by the GPU on the compositor and do not trigger layout recalculation. However, very large blur radii (>60px) on many elements can cause paint performance issues on mobile. Test with Chrome DevTools Paint Flashing to verify.`],

['social-buttons', `

**Brand colour sourcing**

Each social platform publishes official brand colours in their media guidelines. Google: #4285F4 (blue), GitHub: #24292e (dark), X: #000000, LinkedIn: #0077B5. These colours are used on the button hover and focus states. The resting state uses a neutral grey or white to avoid visual clutter when multiple social buttons appear together.

**The OR divider**

The OR divider between social buttons and the email/password form uses ::before and ::after pseudo-elements on the label to create horizontal lines: .or-label { display: flex; align-items: center; gap: 12px; } .or-label::before, .or-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }. This pattern avoids extra HTML divider elements.

**Icon-only vs icon+label variants**

For compact layouts (mobile app sign-up screens with limited vertical space), use icon-only buttons: 40×40px squares with just the platform icon, arranged in a horizontal row. For web sign-up forms with more space, use icon+label buttons for clarity — "Continue with Google" is more explicit than a G icon alone. This snippet provides the icon+label pattern; adapt to icon-only by removing the text and adjusting dimensions.`],

['gradient-border-card', `

**The ::before animated border technique**

The gradient border uses a ::before pseudo-element with position: absolute; inset: -2px (extending 2px beyond the card edges). The ::before background is the gradient. The card itself has a solid background colour that covers the ::before everywhere except the 2px border area. This is more flexible than CSS border-image — it supports border-radius, hover effects, and animations.

**The conic-gradient animation**

The border uses background: conic-gradient(from 0deg, #6366f1, #ec4899, #0ea5e9, #6366f1). A @keyframes rotates the gradient: @keyframes borderSpin { to { background: conic-gradient(from 360deg, ...) } } — or more efficiently, use a CSS variable for the angle: @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; } and animate that. The @property approach creates a smooth rotation; the keyframe approach creates a sudden swap.

**The inset value and card gap**

The inset: -2px extends the ::before by 2px on all sides. This 2px is the visible border thickness. Use a larger inset (e.g., -3px) for a thicker border. The card's background must match the page background to create the "border" illusion. For dark backgrounds, set the card background to the dark colour rather than transparent.`],

['marquee', `

**The duplicate content loop trick**

The marquee contains the content twice: <div class="track"><span>items...</span><span>items...</span></div>. The CSS animation translates the track from 0 to -50% of its width. Since 50% equals exactly one copy of the content, when the animation resets from -50% to 0, the two copies line up perfectly — creating a seamless infinite loop with no visible jump. The key requirement: both copies must be identical.

**The CSS mask-image edge fade**

To fade the marquee content at both edges (the "infinite scroll" look), apply mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent) to the marquee container. This makes the content fade in from the left edge and fade out to the right edge. The mask uses percentage values so it adapts to any container width.

**Pause on hover**

Add animation-play-state: paused to .track on .marquee:hover to pause the scroll when the user hovers. This is important for marquees containing interactive content (links, buttons) — it prevents items from moving away before the user can click them.`],

['stats-card', `

**The IntersectionObserver single-fire pattern**

The stats card uses IntersectionObserver with threshold: 0.5. When 50% of the card enters the viewport, the count-up animation fires. Inside the callback, obs.disconnect() immediately unregisters the observer — the animation plays exactly once per page load, never re-triggering when the user scrolls back. This is the correct pattern for "animate once on enter" — not "animate every time on enter/exit".

**The activity heatmap grid**

The contribution heatmap generates a grid of day cells using JavaScript: for (let week = 0; week < 52; week++) { for (let day = 0; day < 7; day++) { ... } }. Each cell gets a colour intensity class based on its activity value (0–4). The CSS uses different background opacity levels per intensity class. The grid uses display: grid; grid-template-columns: repeat(52, auto); gap: 2px — 52 columns for 52 weeks.

**SVG progress rings**

The stats card uses multiple SVG rings at different sizes. Each ring has its own CIRCUMFERENCE (2πr) and target dashoffset. The rings animate simultaneously when the card enters the viewport — all starting from their empty state (dashoffset = CIRCUMFERENCE) and transitioning to their target value over 1s.`],

['range-slider', `

**The accent-color property**

Modern browsers support accent-color: #6366f1 on range inputs to colour the track fill and thumb with one CSS property. For browsers that do not support accent-color, the snippet falls back to the WebKit/Mozilla thumb pseudo-elements. The CSS layering handles both: accent-color provides the easy modern path; the pseudo-element overrides provide consistent cross-browser appearance.

**The live value display**

On every input event, the current value updates a span: output.textContent = input.value. For range inputs with min, max, and step attributes, input.value always returns a string matching the nearest step. Parse to a number for calculations: const val = parseFloat(input.value). The display can format the value differently from the raw number — show percentages, currency, or units.

**Dual-handle range sliders**

For a price range or time window selector with two handles, use two overlapping range inputs with z-index management. The lower-value input sits on top; the upper-value input has a higher z-index. JavaScript enforces constraints: lower thumb cannot exceed upper thumb value, and vice versa. Update a CSS gradient between the two thumb positions to fill only the selected range.`],

['split-hero', `

**The 1fr 1fr grid**

The split-hero uses display: grid; grid-template-columns: 1fr 1fr — two equal columns. On mobile, this collapses to grid-template-columns: 1fr with the right panel moving below the left content. The 1fr unit distributes available space equally after gaps and padding. For an asymmetric split (e.g., 55/45), use grid-template-columns: 55fr 45fr.

**The terminal code panel**

The right panel uses a dark background (matching a code editor theme) with monospace font and syntax-coloured spans. Keywords use CSS classes: .kw (blue), .str (green), .cm (grey for comments), .fn (yellow). No syntax highlighting library — just CSS classes and static markup. The terminal window chrome uses three coloured dots (red, yellow, green) as a familiar code editor indicator.

**Responsive code panel handling**

On mobile (under 768px), the code panel either: (a) hides completely — code is decorative and not worth the space on small screens, (b) shows a simplified version with fewer lines, or (c) remains but scrolls horizontally. Option (a) is the cleanest approach for hero sections where the focus should be the headline and CTA.`],

['css-tooltip', `

**The content: attr() trick**

CSS tooltips use content: attr(data-tip) on the ::after pseudo-element. This reads the data-tip attribute value directly from HTML and injects it as the tooltip text without any JavaScript. Adding a tooltip requires only: (1) data-tip="Your tooltip text" on the element, (2) the tooltip CSS class applied. No event listeners, no DOM manipulation.

**Four directions with transforms**

Each direction variant positions the tooltip differently: top uses bottom: 100%; left: 50%; transform: translateX(-50%). Bottom uses top: 100%. Left uses right: 100%; top: 50%; transform: translateY(-50%). Right uses left: 100%. The arrow (::before) is an 8×8px rotated square matching the tooltip background. The translateX/Y centering ensures the tooltip is centred on the element regardless of text length.

**Accessibility limitations**

CSS-only tooltips are not accessible — they only show on hover, making them invisible to keyboard users and touch device users. For accessible tooltips, use role="tooltip" and aria-describedby on the trigger element pointing to the tooltip's ID. Show the tooltip on both :hover and :focus-visible. For touch support, add a click-to-show mechanism.`],

['3d-flip-card', `

**The preserve-3d and backface-visibility pair**

Two CSS properties make the 3D flip work: transform-style: preserve-3d on the container tells the browser to render children in 3D space. backface-visibility: hidden on each face hides that face when it is rotated more than 90° away from the viewer. Without preserve-3d, the faces collapse to 2D. Without backface-visibility: hidden, both faces are visible simultaneously (front shows through back).

**The rotation setup**

The .card-inner rotates on hover: transform: rotateY(180deg). The front face starts at rotateY(0deg) — no transform needed. The back face starts at rotateY(180deg) (already flipped). When .card-inner rotates 180°, front goes to 180° (hidden by backface-visibility) and back goes to 360° = 0° (now facing the viewer). The perspective on the outer container (1000px) controls the 3D depth.

**Click vs hover trigger**

The snippet uses CSS :hover by default. For a click-triggered flip (card that stays flipped after click), add JavaScript: card.addEventListener('click', () => card.classList.toggle('flipped')) and use the .flipped class with rotateY(180deg) in CSS instead of :hover.`],

['toast-notification', `

**Dynamic element creation**

Each toast is created via document.createElement rather than cloning a hidden template. This approach allows unlimited simultaneous toasts without ID conflicts. The toast receives its type class (success, error, info), message text, and is appended to the .toasts container. A setTimeout then triggers the exit animation and removes the element.

**The animationend cleanup pattern**

After the hide animation plays, the toast must be removed from the DOM — otherwise invisible elements accumulate and intercept pointer events. The pattern: toast.classList.add('hiding'); toast.addEventListener('animationend', () => toast.remove(), { once: true }). The once: true option auto-removes the event listener after it fires once, preventing memory leaks from lingering listeners on removed elements.

**Toast stacking with flex**

The .toasts container uses display: flex; flex-direction: column; gap: 8px at the bottom-right of the viewport. New toasts append to the bottom of the column. For a "newest on top" stack, use flex-direction: column-reverse or prepend instead of append. The gap provides visual separation between simultaneous toasts.`],

['toggle-switch', `

**The hidden checkbox pattern**

The toggle uses a visually hidden input[type="checkbox"] associated with a label via for/id. Clicking the label clicks the checkbox. The :checked pseudo-class applies the "on" visual state via the sibling combinator: input:checked + .slider. This pattern makes the toggle keyboard-accessible by default (Tab to focus, Space to toggle) and semantically correct (the checkbox value is included in form submissions).

**The CSS slider and knob**

The .slider is a 44×24px rounded rectangle with a coloured background (grey for off, accent for on). The .knob is an 18×18px white circle with a box-shadow. In the off state, left: 3px positions it left. In the :checked + .slider .knob state, left: 23px (44 - 18 - 3) positions it right. CSS transition: left 0.15s, background 0.15s animates both simultaneously.

**Labelling the state**

For clarity, add visible text labels: "Off / On" or "Disabled / Enabled" alongside the toggle. Use aria-label="Enable notifications" on the checkbox for screen readers that only announce the toggle state. Do not rely on colour alone to communicate the on/off state — the knob position must also differ.`],

['scroll-progress', `

**The scrollTop / scrollHeight formula**

The scroll progress is computed as: const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100. window.scrollY is the number of pixels scrolled from the top. scrollHeight - innerHeight is the maximum scrollable distance — the total page height minus the viewport height. This gives a 0–100% value that fills the bar from empty to full as the user scrolls from top to bottom.

**Fixed positioning**

The progress bar uses position: fixed; top: 0; left: 0; right: 0; height: 4px; z-index: 9999. Fixed positioning keeps the bar at the viewport top regardless of scroll position. A high z-index ensures it sits above the page navigation. The bar uses no border-radius at the right end (border-radius: 0 2px 2px 0) so it appears to extend from the left edge of the screen.

**The gradient fill**

The fill element uses background: linear-gradient(90deg, var(--accent), var(--accent-secondary)) for a two-tone gradient that sweeps from left to right as the user reads. The gradient adds visual interest compared to a flat colour while communicating direction (left = start, right = progress toward completion).`],

['search-box', `

**The :focus-within ring**

The search container (not the input) has the focus ring: .search-box:focus-within { box-shadow: 0 0 0 3px rgba(accent, 0.2); border-color: accent; }. :focus-within applies when any descendant has focus. This means the border and ring apply to the container when the input inside is focused — creating a larger, more visually prominent focus indicator than the default browser outline on the input alone.

**The live filter pattern**

The search input's oninput handler calls filterItems(e.target.value). filterItems iterates all .item elements and toggles .hidden based on whether the item's text content includes the query string (case-insensitive). The filter runs on every keystroke without debounce for lists under 500 items. For larger lists, add a 150ms debounce: clearTimeout(timer); timer = setTimeout(() => filterItems(q), 150).

**The clear button**

The × clear button appears when the input has content and disappears when it is empty. Clicking it clears the input, triggers a filterItems('') to show all items, and returns focus to the input. Implement the visibility toggle with a CSS class: .search-box.has-value .clear-btn { display: flex; } and add/remove .has-value on every input event based on input.value.length.`],

['dropdown-menu', `

**The scale + opacity animation**

The dropdown starts at transform: scale(0.97); opacity: 0; pointer-events: none. Adding .open switches to scale(1); opacity: 1; pointer-events: all with CSS transition. The scale(0.97) start point creates a subtle zoom-in that makes the dropdown feel like it "pops" from the trigger. The 0.97 value is small enough to be subtle but enough to create the appearance of depth — the dropdown is slightly smaller than its final size when it first appears.

**The transform-origin**

transform-origin: top right (for a right-aligned dropdown) or top left (for left-aligned) ensures the scale animation originates from the corner closest to the trigger button. Without a correct transform-origin, the dropdown scales from its centre, which looks disconnected from the trigger.

**Click-outside detection**

e.target.closest('.dropdown') returns the nearest .dropdown ancestor of the clicked element. If null, the click was outside all dropdowns and the close() function fires. This single document click listener handles all dropdowns on the page without per-dropdown listeners. Add document.addEventListener inside the open() function and remove inside close() to avoid accumulating listeners.`],

['ripple-button', `

**The getBoundingClientRect offset calculation**

The ripple origin must be the exact click position relative to the button, not the viewport. rect = button.getBoundingClientRect() gives the button's position in the viewport. Subtracting rect.left and rect.top from e.clientX and e.clientY gives coordinates relative to the button's top-left corner. The ripple element is positioned at this point minus half its width and height — centering the ripple on the click position.

**The scale keyframe**

The ripple starts at scale(0) and expands to scale(4) (four times the ripple element size). The ripple element is typically 50×50px — at scale(4) it covers 200×200px. For large buttons, increase the scale factor so the ripple covers the full button width. opacity fades from 0.4 to 0 simultaneously, creating the fade-out as the ripple expands.

**Cleanup after animation**

The animationend event on the ripple span removes it from the DOM: span.addEventListener('animationend', span.remove). Without this, every click adds a permanent invisible span to the button's DOM. Using { once: true } on the event listener ensures the callback fires exactly once and removes itself, preventing any potential memory leak from the callback reference.`],

];

let fixed = 0;
additions.forEach(([id, addition]) => {
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
  const ok = wc >= 350 ? 'PASS' : 'NEED_MORE';
  console.log(ok + ' ' + id + ': ' + wc + 'w');
  fixed++;
});
console.log('\nFixed: ' + fixed);
