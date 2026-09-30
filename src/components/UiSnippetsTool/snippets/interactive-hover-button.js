const interactiveHoverButton = {
  id: 'interactive-hover-button',
  title: 'Interactive Hover Button',
  lastmod: '2026-07-18',
  category: 'buttons',
  html: `<div class="ih-stage">
  <button type="button" class="ih-btn">
    <span class="ih-dot" aria-hidden="true"></span>
    <span class="ih-label">Get started</span>
    <span class="ih-slide"><span>Get started</span><span class="ih-arrow">→</span></span>
  </button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a14;display:flex;justify-content:center;align-items:center;min-height:100vh}

.ih-stage{padding:40px}
.ih-btn{position:relative;display:inline-flex;align-items:center;gap:10px;background:#0f0f1d;border:1px solid #2a2a44;border-radius:999px;padding:14px 26px;font-family:inherit;font-size:15px;font-weight:700;color:#fff;cursor:pointer;overflow:hidden;min-width:170px;justify-content:center}

.ih-dot{width:9px;height:9px;border-radius:50%;background:#6366f1;flex-shrink:0;transition:transform .4s cubic-bezier(.4,0,.2,1)}
.ih-label{transition:transform .4s cubic-bezier(.4,0,.2,1),opacity .3s}

/* On hover the dot expands to flood the button while the original label slides
   away and a new label+arrow slides in over the colored fill. */
.ih-btn:hover .ih-dot{transform:scale(40)}
.ih-btn:hover .ih-label{transform:translateX(110%);opacity:0}

.ih-slide{position:absolute;inset:0;display:inline-flex;align-items:center;justify-content:center;gap:8px;color:#fff;transform:translateX(-110%);opacity:0;transition:transform .4s cubic-bezier(.4,0,.2,1),opacity .3s;z-index:1}
.ih-btn:hover .ih-slide{transform:translateX(0);opacity:1}
.ih-arrow{transition:transform .4s}
.ih-btn:hover .ih-arrow{transform:translateX(3px)}`,

  js: `// The effect is pure CSS. This adds an accessible press ripple and a tiny
// click confirmation so the button feels responsive.
var btn = document.querySelector('.ih-btn');
btn.addEventListener('click', function () {
  var slide = btn.querySelector('.ih-slide span:first-child');
  var prev = slide.textContent;
  slide.textContent = 'On it…';
  setTimeout(function () { slide.textContent = prev; }, 1100);
});`,

  seo: {
    title: 'Interactive Hover Button — Free HTML CSS JS Fill Snippet',
    description: `A button whose accent dot expands to flood the fill on hover while the label swaps to a new label and arrow that slide in. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Interactive Hover Button — Dot Expands to Flood the Fill',
      description: `The interactive hover button is the slick call to action where a small accent dot expands on hover to flood the entire button with color, while the resting label slides out and a fresh label with an arrow slides in over the new fill. It is compact and tactile. This snippet builds it with pure CSS, plus a couple of JavaScript lines for a click confirmation.

**The dot that becomes the fill**

At rest, a tiny 9px accent dot sits beside the label. On hover it is scaled up dramatically — \`transform: scale(40)\` — so it grows from a dot into a circle far larger than the button, flooding the background with the accent color. Because the button has \`overflow: hidden\` and a pill radius, you only see the dot fill the rounded shape, not the giant circle beyond it. Scaling a single small element is a cheap, GPU-friendly way to produce a full-button color wipe without animating width or a separate background layer.

**Swapping the label**

Two labels share the button. The resting \`.ih-label\` slides out to the right and fades on hover (\`translateX(110%)\`), while a second \`.ih-slide\` label — containing the text plus an arrow — starts off to the left and slides in to center (\`translateX(0)\`) over the new colored fill. The crossfade-by-sliding makes the button feel like it transforms into its active state rather than just changing color, and the arrow nudges right to reinforce forward intent. Both move on the same \`cubic-bezier\` easing as the dot, so the fill and the label arrive together.

**Why two labels instead of one**

Keeping a separate hover label lets you change the wording or add the arrow on hover, and it sits above the expanding dot via \`z-index\` so it stays crisp white over the accent fill. A single label could not both slide away and reappear styled for the filled state, so the two-label pattern is what enables the polished swap.

**The click confirmation**

The hover effect is entirely CSS; JavaScript only adds feedback on click, briefly swapping the hover label to "On it…" before restoring it — a lightweight stand-in for whatever action the button triggers. Drop your real handler here and keep or remove the confirmation.

**Accessibility note**

The control is a real \`<button>\`, so it is keyboard-focusable and announces correctly. Because the visual change is hover-driven, ensure the resting state already communicates the action (it does — the label is visible at rest), so keyboard and touch users are not relying on the hover swap to understand it.

**Customizing it**

Change the accent color of the dot and fill, adjust the \`scale\` value to match larger buttons (it must be big enough to overflow the widest dimension), retime the slide, change the hover label text, or swap the arrow for an icon. Make it a link by changing the element. Pair it with a [shimmer button](/ui-snippets/shimmer-button/) or a [pulse button](/ui-snippets/pulse-button/) for a coordinated set of CTAs.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A pill button shows a small accent dot and a label.` },
      { title: 'Hover the button', text: `The dot expands to flood the button with color.` },
      { title: 'Watch the label swap', text: `The label slides out and a new label with an arrow slides in.` },
      { title: 'Click it', text: `The label briefly confirms with On it.` },
      { title: 'Resize the button', text: `Increase the dot scale so the fill overflows.` },
      { title: 'Recolor and retext', text: `Change the accent and the hover label.` },
    ] },
    features: [
      { title: 'Dot-to-fill wipe', text: `A scaled dot floods the button color.` },
      { title: 'GPU-friendly scale', text: `One small element grows, clipped by the pill.` },
      { title: 'Sliding label swap', text: `Resting label out, hover label in.` },
      { title: 'Arrow nudge', text: `The icon advances for forward intent.` },
      { title: 'Crisp hover label', text: `Sits above the fill via z-index.` },
      { title: 'Synced easing', text: `Fill and label arrive together.` },
      { title: 'Click confirmation', text: `Brief On it state on press.` },
      { title: 'Real button element', text: `Keyboard-focusable and accessible.` },
    ],
    useCases: [
      { title: 'Primary CTAs', text: `Pair with a [shimmer button](/ui-snippets/shimmer-button/) elsewhere.` },
      { title: 'Hero actions', text: `Place under a [lamp header](/ui-snippets/lamp-header/) title.` },
      { title: 'Pricing buttons', text: `The action on a [pricing card](/ui-snippets/pricing-card/).` },
      { title: 'Signup flows', text: `A tactile alternative to a [loading button](/ui-snippets/loading-button/).` },
      { title: 'Landing CTAs', text: `Coordinate with a [pulse button](/ui-snippets/pulse-button/).` },
      { title: 'Hover button demos', text: `A reference for dot-expand fill effects.` },
      { icon: 'CODE', title: 'Related: Push Notification Subscription Toggle', desc: 'See the [Push Notification Subscription Toggle](/ui-snippets/push-subscription-toggle/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the dot fill the whole button?', a: `On hover the small accent dot is scaled up with transform: scale(40), growing into a circle far larger than the button. Because the button has overflow: hidden and a pill radius, you only see the dot flood the rounded shape. Scaling one small element is a cheap, GPU-friendly way to wipe the button with color without animating width or a separate layer.` },
      { q: 'Why are there two labels?', a: `One label is the resting state and slides out on hover; the second contains the hover text plus an arrow and slides in over the colored fill, sitting above the expanding dot via z-index so it stays crisp. A single label could not both slide away and reappear styled for the filled state, so two labels enable the polished swap.` },
      { q: 'Do I need to change the scale for bigger buttons?', a: `Yes — the dot scale must be large enough that the expanded circle overflows the button widest dimension, or the fill will not reach the corners. For a wider or taller button, increase the scale value (40 here) until the accent floods the entire pill on hover.` },
      { q: 'Is the hover-only change a problem for accessibility?', a: `The control is a real button, so it is keyboard-focusable and announced correctly. The resting state already shows the label, so users who cannot hover still understand the action — the hover swap is an enhancement, not the only way to read the button. Keep your real action on the click handler.` },
      { q: 'How do I use this interactive hover button in React, Vue, or Angular?', a: `The markup and CSS port directly as a Button component with two label spans. Handle click with a framework event that runs your action and optionally toggles the confirmation label. The hover effect needs no JavaScript. In Tailwind, build it with a scaling accent element, overflow-hidden, and group-hover translate utilities on the two labels.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the geometry of the dot-to-fill wipe by staring at the transitions. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely why scale(40) on a 9px dot combined with overflow hidden produces a clean full-button color flood instead of a visible circle edge, or why the resting label and the hover label both need to move on the same cubic-bezier curve to feel synced. The same assistant can help you optimize it, for instance checking whether scaling such a small element really is cheaper for the compositor than animating a background color or a clip-path, especially across many buttons on one page. It is equally useful for extending the pattern, such as making the scale value responsive to the button's own width instead of a fixed number, adding a second accent dot that wipes from the opposite corner, or driving the click confirmation text from a real async action with a loading and success state instead of a fixed timeout. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "interactive hover button" in plain HTML, CSS, and JavaScript using only a CSS transform scale trick for the hover fill — no background-color transition, no clip-path animation, no canvas.

Requirements:
- A pill-shaped button with overflow hidden and a fixed minimum width, containing a small circular accent dot (roughly 9px) positioned beside a resting label.
- On hover, the dot must scale up via transform: scale() to a value large enough that the resulting circle fully covers the button's largest dimension, flooding the button with color while staying clipped to the pill shape by the button's overflow hidden.
- The original resting label must slide out (via translateX) and fade out on hover, while a second, absolutely positioned label (containing new text plus an arrow icon) starts off-screen on the opposite side and slides in to center over the color fill. Both labels and the dot must share the same transition duration and easing curve so they all appear to move together.
- The second label must sit above the scaling dot with a higher z-index so it stays legible over the fill.
- Add a small arrow element inside the incoming label that nudges further in the hover direction on hover, using its own transition.
- Add a minimal JavaScript click handler that temporarily swaps the incoming label's text to a short confirmation message and restores the original text after roughly one second, without affecting the CSS-only hover mechanism.
- Use a real button element (not a div) so it is keyboard-focusable and reads correctly to assistive tech, and make sure the resting (non-hover) label already communicates the button's action on its own.`,
    },
  },
};

export default interactiveHoverButton;
