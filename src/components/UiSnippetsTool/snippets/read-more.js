const readMore = {
  id: 'read-more',
  title: 'Read More Expand',
  category: 'layouts',
  html: `<div class="page">

  <!-- Article excerpt -->
  <div class="card">
    <div class="card-tag">Article</div>
    <h3 class="card-title">The future of declarative UI frameworks</h3>
    <div class="read-more-wrap" id="rm1">
      <div class="rm-content clamped" id="rm1-content">
        <p>Modern frontend development has been transformed by declarative UI frameworks. React, Vue, and Svelte have fundamentally changed how we think about building interfaces — moving from imperative DOM manipulation to describing what the UI should look like given a particular state.</p>
        <p>The next wave of innovation focuses on eliminating the mental overhead of synchronising UI state with application state. Server components, signals, and fine-grained reactivity all tackle this problem from different angles.</p>
        <p>What unites them is a shared goal: making the mapping between data and UI as frictionless as possible. The frameworks of 2030 will likely feel radically different from what we use today, yet the underlying principles — declarative composition, unidirectional data flow — will remain.</p>
      </div>
      <button class="rm-btn" id="rm1-btn" onclick="toggle('rm1')">Read more</button>
    </div>
  </div>

  <!-- Product description -->
  <div class="card">
    <div class="card-tag">Product</div>
    <h3 class="card-title">Professional Mechanical Keyboard</h3>
    <div class="read-more-wrap" id="rm2">
      <div class="rm-content clamped" id="rm2-content">
        <p>Built for professionals who spend long hours at the keyboard. The Cherry MX Brown switches provide tactile feedback without the loud click of blue switches — perfect for open-plan offices or home setups where noise is a concern.</p>
        <p>The aluminium top plate keeps the keyboard rigid under heavy typing loads. PBT double-shot keycaps resist shine after years of use. The programmable RGB lighting per-key gives you full customisation from our companion app.</p>
        <p>Full N-key rollover ensures every keystroke registers, even during intense typing bursts. The detachable USB-C cable means no more bent connectors after years of use.</p>
      </div>
      <button class="rm-btn" id="rm2-btn" onclick="toggle('rm2')">Read more</button>
    </div>
  </div>

</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 24px; }

.page { width: 100%; max-width: 500px; display: flex; flex-direction: column; gap: 16px; }

.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; }
.card-tag { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #6366f1; margin-bottom: 6px; }
.card-title { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }

.read-more-wrap { position: relative; }

/* Clamped state — shows 3 lines with gradient fade */
.rm-content { font-size: 14px; color: #475569; line-height: 1.75; transition: max-height 0.4s ease; overflow: hidden; }
.rm-content.clamped { max-height: 4.5em; /* ~3 lines at 1.5em line-height */ position: relative; }
.rm-content.clamped::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2em; background: linear-gradient(to bottom, transparent, #fff); pointer-events: none; }

.rm-content p { margin-bottom: 10px; }
.rm-content p:last-child { margin-bottom: 0; }

/* Expanded state */
.rm-content.expanded { max-height: 600px; }
.rm-content.expanded::after { display: none; }

/* Button */
.rm-btn { display: inline-flex; align-items: center; gap: 4px; margin-top: 8px; background: transparent; border: none; font-size: 13px; font-weight: 700; color: #6366f1; cursor: pointer; padding: 0; font-family: inherit; transition: color 0.12s; }
.rm-btn:hover { color: #4f46e5; }
.rm-btn::after { content: '↓'; font-size: 12px; transition: transform 0.3s; }
.rm-btn.expanded::after { transform: rotate(180deg); }`,
  js: `function toggle(id) {
  const content = document.getElementById(id + '-content');
  const btn = document.getElementById(id + '-btn');
  const isExpanded = content.classList.toggle('expanded');
  content.classList.toggle('clamped', !isExpanded);
  btn.classList.toggle('expanded', isExpanded);
  btn.textContent = isExpanded ? 'Read less' : 'Read more';
  btn.appendChild(Object.assign(document.createElement('span'), {}));
}`,
  seo: {
    title: 'Read More Expand — Free HTML CSS JS Snippet',
    description: 'Collapsed text with max-height clamp, gradient fade and a smooth read more / read less toggle. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Read More Expand — CSS max-height Clamp, Gradient Fade Overlay & Smooth Expand Transition',
      description: `A read more / read less toggle lets you show a preview of long content with an expand option — keeping cards, product descriptions, and article excerpts compact without truncating text abruptly. This snippet implements the complete pattern: a CSS max-height clamp that shows exactly 3 lines, a gradient fade-out overlay that signals more content below, a smooth expand/collapse transition, and a "Read more / Read less" button with a rotating arrow indicator.\n\n**The max-height clamp approach**\n\nThe content div starts with max-height: 4.5em (approximately 3 lines at 1.5em line-height × 3). CSS overflow: hidden clips any text beyond this height. The CSS transition: max-height 0.4s ease animates the expand. The expanded state sets max-height: 600px — a value safely larger than any realistic content height.\n\n**The gradient fade overlay**\n\nThe .clamped::after pseudo-element applies a linear-gradient from transparent to the card background colour. This creates the impression that the text fades out naturally rather than being cut off sharply. The height is 2em, covering the last line and half of the second-to-last line. pointer-events: none prevents the overlay from intercepting clicks on the text.\n\n**Why max-height, not height: auto**\n\nCSS cannot transition from height: auto to a pixel value or vice versa. max-height solves this: transition from 4.5em (clamped) to 600px (expanded) works smoothly. The trade-off: the transition speed is not constant — it takes the same 0.4s whether the content is 5 lines or 20 lines. For most card descriptions, this is imperceptible.\n\n**The toggle logic**\n\nThe toggle() function calls classList.toggle('expanded') on the content element and reads the returned boolean. This single call both adds/removes the class and tells us the new state. No separate isExpanded variable needed — the DOM class IS the state.\n\n**The rotating arrow indicator**\n\nThe .rm-btn::after pseudo-element shows ↓ via CSS content. The .expanded class applies transform: rotate(180deg), turning it into ↑. The CSS transition: transform 0.3s animates the rotation in sync with the content expanding. No SVG or image needed.

**Accessibility considerations**

The .rm-btn should communicate its purpose to screen readers. Add aria-expanded="false" initially, toggling to "true" on expand. Add aria-controls="rm1-content" pointing to the content element ID. Update in the toggle() function: btn.setAttribute("aria-expanded", isExpanded). The gradient overlay has pointer-events: none so keyboard users can still interact with any links inside the clamped text.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click "Read more" to expand the content', text: 'The card expands with a smooth max-height animation. The gradient fade disappears. The button changes to "Read less" with the arrow flipping to point up. Click again to collapse.' },
      { title: 'Adjust the clamp height', text: 'Change max-height: 4.5em on .rm-content.clamped to control how many lines show. 3em = ~2 lines, 4.5em = ~3 lines, 6em = ~4 lines. Also adjust the ::after gradient height to match the last visible line.' },
      { title: 'Match the gradient to your background', text: 'Update the linear-gradient in .rm-content.clamped::after from #fff to your card background colour. For a dark card, use rgba(0,0,0,0) → your dark bg colour. Without matching, the gradient overlay is visible as a white stripe.' },
      { title: 'Use for any content length', text: 'The snippet works with any amount of text. Short content that fits within the clamp height shows no gradient and the button is still visible — consider hiding the button when content is short: measure scrollHeight vs clientHeight and hide if equal.' },
      { title: 'Hide the button when content fits', text: 'After the component renders, check: if (content.scrollHeight <= content.clientHeight) btn.style.display = "none". This hides the "Read more" button when the content is already fully visible within the clamp height.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component with expanded state in useState, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['CSS max-height: 4.5em clamp — approx 3 lines, smooth transition to 600px','Gradient fade overlay: .clamped::after linear-gradient transparent → bg colour','pointer-events: none on overlay — text below remains selectable and clickable','toggle(): classList.toggle returns new state — single line determines new UI state','Rotating arrow: .rm-btn::after { content: "↓" } rotates 180deg on .expanded','No separate isExpanded variable — DOM class IS the state','Works for any text length — short content shows no gradient','Transition: max-height 0.4s ease + transform 0.3s for arrow rotation'],
    useCases: [
      { icon: 'APP', title: 'Product description expand on e-commerce pages', desc: 'Long product descriptions need a read-more toggle to keep product pages scannable. Show the first 3 lines with a gradient fade. The expand lets users who want details access them without cluttering the default view.' },
      { icon: 'DESIGN', title: 'Blog post excerpts and article cards', desc: '[Article cards](/ui-snippets/article-card/) in listing pages show a 3-line excerpt. The read-more expands the full introductory paragraph inline, giving readers a taste without requiring a page navigation. Pair with a "Read full article" link for the complete post.' },
      { icon: 'FLOW', title: 'User profile bio and review text truncation', desc: 'User bios, customer reviews, and comment threads benefit from read-more truncation when content length varies. Show a consistent preview, hide overflow, and let users expand individual items they find interesting.' },
      { icon: 'CODE', title: 'FAQ answer expansion in documentation', desc: 'FAQ items with long answers can start collapsed with a 2-3 line preview. This is different from the [accordion FAQ](/ui-snippets/accordion-faq/) snippet — the content is clamped rather than hidden entirely, giving more context before expansion.' },
      { icon: 'LEARN', title: 'Study the max-height transition and gradient overlay technique', desc: 'The max-height CSS transition is the standard technique for animating unknown-height content because CSS cannot interpolate from height: auto. The gradient overlay is the standard "more content below" signal that users across all major platforms recognise.' },
      { icon: 'STAR', title: 'Event and conference session description cards', desc: 'Conference and event listing pages show many [event cards](/ui-snippets/event-card/). A 3-line description keeps the grid compact. Expand reveals the full session description, speaker bio, and prerequisites without navigating to a separate detail page.' },
    ],
    faqs: [
      { q: 'Why use max-height instead of height for the transition?', a: 'CSS cannot transition between height: auto and a fixed pixel value because "auto" is not a computed length the browser can interpolate. max-height works because both states are explicit values: 4.5em (clamped) and 600px (expanded). The browser can interpolate between these. The trade-off: the animation takes the same duration (0.4s) whether the content is 4 lines or 40 lines, because the browser interpolates from 0 to 600px regardless of actual content height. For most use cases this is not noticeable.' },
      { q: 'How do I hide the "Read more" button when content does not need truncation?', a: 'After the page renders, check each content element: document.querySelectorAll(".read-more-wrap").forEach(wrap => { const content = wrap.querySelector(".rm-content"); const btn = wrap.querySelector(".rm-btn"); if (content.scrollHeight <= content.clientHeight + 2) { btn.style.display = "none"; content.classList.remove("clamped"); content.style.maxHeight = "none"; } }). The +2 pixel tolerance handles rounding. The content.scrollHeight is the actual content height; clientHeight is the clamped visible height.' },
      { q: 'How do I use this with server-rendered or dynamically loaded content?', a: 'Call a checkClamp() function after content is inserted into the DOM. For server-rendered pages, call it in DOMContentLoaded. For dynamically loaded content (infinite scroll, API-loaded cards), call checkClamp() in the callback after the new HTML is inserted. For React, call it in useEffect when the content prop changes: useEffect(() => checkClamp(contentRef.current), [content]).' },
      { q: 'How do I implement read more in React?', a: 'Click "JSX" to download. Manage expanded with useState(false). Apply className based on state: className={"rm-content " + (expanded ? "expanded" : "clamped")}. The button calls setExpanded(prev => !prev). To hide the button when content is short: use a contentRef with useRef, and a useEffect that checks contentRef.current.scrollHeight <= contentRef.current.clientHeight after mount to set a showButton state.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to puzzle out the max-height trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the component transitions max-height instead of height, and why the collapsed and expanded states use two very different fixed values (4.5em versus 600px) rather than something more precise. The same assistant can help you optimize it — ask how you would detect when content is already shorter than the clamp height (comparing scrollHeight to clientHeight) so the "Read more" button never shows for text that does not need it. It's also useful for extending the component: ask it to make the collapse animation duration scale with content length instead of a fixed 0.4s, add a "Read more" link that deep-links to an anchor in the full article instead of expanding inline, or support nested read-more sections inside a longer expanded block. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "read more / read less" text truncation component in plain HTML, CSS, and JavaScript with no library.

Requirements:
- Clamp the content container to approximately three lines of text using max-height (not height) with overflow hidden, since CSS cannot transition to or from an auto height value.
- Add a gradient fade overlay using a pseudo-element positioned over the bottom of the clamped content, fading from transparent to the container's background color, with pointer-events set to none so it never blocks clicks or text selection on the content beneath it.
- Add a toggle button that switches the content between the clamped state and an expanded state (a much larger fixed max-height value, safely bigger than any realistic content), animated with a CSS transition on max-height.
- Use classList.toggle's own boolean return value as the single source of truth for whether the content is expanded — do not track a separate JavaScript variable that could drift out of sync with the DOM class.
- Add a small arrow indicator on the button that rotates 180 degrees via a CSS transform transition when expanded, synced to the same toggle.
- Implement a check that compares the content element's scrollHeight to its clientHeight after render, and hides the toggle button entirely when the content is already short enough to fit without clamping.`,
    },
  },
};

export default readMore;
