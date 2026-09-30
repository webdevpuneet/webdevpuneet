const glowInput = {
  id: 'glow-input',
  title: 'Glow Input',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="gi-stage">
  <form class="gi-form" id="giForm">
    <label class="gi-field" data-glow>
      <span class="gi-icon">✉</span>
      <input type="email" class="gi-input" placeholder="Email address" required>
    </label>
    <label class="gi-field" data-glow>
      <span class="gi-icon">🔒</span>
      <input type="password" class="gi-input" placeholder="Password" required>
    </label>
    <button type="submit" class="gi-btn" data-glow>Sign in</button>
  </form>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#08080f;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.gi-form{width:100%;max-width:320px;display:flex;flex-direction:column;gap:14px}

/* Each field is a relatively-positioned shell that reveals a radial glow
   tracking the cursor via two CSS custom properties --x and --y. */
.gi-field,.gi-btn{position:relative;border-radius:13px;border:1px solid #24243a;background:#101019;overflow:hidden}
.gi-field::before,.gi-btn::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:radial-gradient(180px circle at var(--x,-100px) var(--y,-100px),#6366f1,transparent 40%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .25s}
.gi-field:hover::before,.gi-btn:hover::before,.gi-field:focus-within::before{opacity:1}

.gi-field{display:flex;align-items:center;gap:10px;padding:0 14px}
.gi-icon{font-size:15px;opacity:.7;flex-shrink:0}
.gi-input{flex:1;background:none;border:none;outline:none;color:#fff;font-family:inherit;font-size:14.5px;padding:14px 0}
.gi-input::placeholder{color:#6b6b85}

.gi-btn{padding:14px;color:#fff;font-family:inherit;font-size:14.5px;font-weight:700;cursor:pointer;background:linear-gradient(#1a1a2e,#101019)}
.gi-btn:hover{color:#c7d2fe}`,

  js: `// One shared pointermove updates the --x/--y of whichever glowing element the
// cursor is over, so the border light follows the mouse precisely.
var glows = document.querySelectorAll('[data-glow]');
glows.forEach(function (el) {
  el.addEventListener('pointermove', function (e) {
    var r = el.getBoundingClientRect();
    el.style.setProperty('--x', (e.clientX - r.left) + 'px');
    el.style.setProperty('--y', (e.clientY - r.top) + 'px');
  });
});

var form = document.getElementById('giForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var btn = form.querySelector('.gi-btn');
  btn.textContent = 'Signing in…';
  setTimeout(function () { btn.textContent = 'Welcome ✓'; }, 900);
});`,

  seo: {
    title: 'Glow Input — Free HTML CSS JS Spotlight Border Snippet',
    description: `Form inputs and a button with a radial border glow that tracks the cursor, lit via CSS custom properties and a mask trick. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Glow Input — Cursor-Tracking Radial Border Glow on Fields',
      description: `The glow input is the polished form treatment where each field's border lights up with a soft radial glow that follows your cursor as it moves across the control — the spotlight-border effect popularized by developer-tool sign-in screens. This snippet implements it for inputs and a button using plain HTML, CSS, and a tiny vanilla JavaScript handler, with the glow drawn purely as a border via a mask trick.

**Tracking the cursor with custom properties**

The position of the glow is stored in two CSS custom properties, \`--x\` and \`--y\`, on each field. A single shared \`pointermove\` handler reads the cursor's position relative to the hovered element with \`getBoundingClientRect\` and writes those pixel values into the variables. CSS does the rest — the glow's radial gradient is centered at \`var(--x) var(--y)\`, so updating the variables moves the light. Passing the position through CSS variables instead of restyling the gradient in JS keeps the handler trivially cheap.

**Glow on the border only, via mask-composite**

The clever part is confining the glow to the 1px border rather than filling the whole field. Each control's \`::before\` is inset to cover the element, painted with the radial gradient, and given \`padding: 1px\`. Two masks are then composited with \`mask-composite: exclude\` (and the \`-webkit-mask-composite: xor\` equivalent): one mask covers the content box, the other the full box, and excluding one from the other leaves only the 1px padding ring visible. The result is a gradient that shows only as a glowing border outline — the standard CSS technique for gradient borders without an extra wrapper element.

**Reveal on hover and focus**

The glow's \`::before\` sits at \`opacity: 0\` and transitions to \`1\` on \`:hover\`, on \`:focus-within\` for the fields, and on \`:hover\` for the button. So the border lights up when you point at or tab into a field and fades out when you leave — giving keyboard users the same clear focus affordance as mouse users, which matters because the glow doubles as the focus indicator here.

**Clean, borderless inputs**

The actual \`<input>\` elements are transparent with no border or outline of their own; the visual frame comes entirely from the field shell and its glow. An icon sits inline before each input, and the placeholder uses a muted color. This keeps the markup simple — a \`<label>\` wrapping an icon and an input — while the glow lives on the label shell so the whole field reacts as one.

**The submit flow**

The button shares the exact same glow treatment via the \`data-glow\` attribute, so the spotlight follows the cursor across it too. On submit, JavaScript prevents navigation and swaps the button label to a "Signing in…" then "Welcome ✓" state — a minimal stand-in for a real auth call you'd drop a \`fetch\` into.

**Customizing it**

Change the gradient color to your accent, widen the \`180px circle\` radius for a larger pool of light, increase the \`padding\` for a thicker glowing border, or adjust the reveal transition. Add the \`data-glow\` attribute to any element to give it the same effect — it's fully generic. Pair it with a [glassmorphism login](/ui-snippets/glassmorphism-login/) panel or an [animated gradient CTA](/ui-snippets/animated-gradient-cta/) for a cohesive sign-in screen.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A sign-in form renders with dark, borderless fields.` },
      { title: 'Move over a field', text: `A soft radial glow lights its border and follows the cursor.` },
      { title: 'Tab into a field', text: `The glow appears on focus too, acting as the focus ring.` },
      { title: 'Hover the button', text: `The same spotlight border tracks across the submit button.` },
      { title: 'Submit the form', text: `The button shows Signing in, then a Welcome confirmation.` },
      { title: 'Reuse the effect', text: `Add data-glow to any element to light its border.` },
    ] },
    features: [
      { title: 'Cursor-tracking glow', text: `--x/--y variables move the radial light.` },
      { title: 'Border-only via mask', text: `mask-composite confines the glow to 1px.` },
      { title: 'Hover and focus reveal', text: `Glow doubles as the focus indicator.` },
      { title: 'Cheap shared handler', text: `One pointermove writes CSS variables.` },
      { title: 'Borderless inputs', text: `The frame comes entirely from the glow shell.` },
      { title: 'Inline field icons', text: `Icon plus input inside one label shell.` },
      { title: 'Generic data-glow', text: `Apply the effect to any element.` },
      { title: 'Submit state', text: `Button swaps to a loading then success label.` },
    ],
    useCases: [
      { title: 'Sign-in screens', text: `Pair with a [glassmorphism login](/ui-snippets/glassmorphism-login/) panel.` },
      { title: 'Waitlist forms', text: `Light up fields in an [animated gradient CTA](/ui-snippets/animated-gradient-cta/).` },
      { title: 'Search bars', text: `Apply the glow to a [search box](/ui-snippets/search-box/).` },
      { title: 'Settings panels', text: `Highlight inputs in a [settings panel](/ui-snippets/settings-panel/).` },
      { title: 'Contact forms', text: `Upgrade a plain [contact form](/ui-snippets/contact-form/).` },
      { title: 'Gradient border demos', text: `A reference for the mask-composite border trick.` },
      { icon: 'CODE', title: 'Related: Price Range Slider', desc: 'See the [Price Range Slider](/ui-snippets/price-range-slider/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the glow follow the cursor?', a: `Each field stores the pointer position in two CSS custom properties, --x and --y. A shared pointermove handler reads the cursor's position relative to the element with getBoundingClientRect and writes those pixel values into the variables. The glow's radial gradient is centered at var(--x) var(--y), so CSS moves the light automatically — the JS only updates two numbers.` },
      { q: 'How is the glow kept to just the border?', a: `Each control's ::before is painted with the radial gradient and given padding: 1px, then masked with mask-composite: exclude (xor on WebKit): one mask covers the content box, another the full box, and excluding one from the other leaves only the 1px padding ring visible. That confines the gradient to a border outline without any extra wrapper element.` },
      { q: 'Does it work for keyboard users?', a: `Yes. The glow's reveal is tied to :focus-within on the fields as well as :hover, so tabbing into a field lights its border. The native input outline is removed, so the glow intentionally serves as the focus indicator, giving keyboard users the same clear affordance as mouse users.` },
      { q: 'Can I add the effect to other elements?', a: `Yes — it's generic. Any element with the data-glow attribute gets the pointermove listener, and any element carrying the ::before glow CSS will show the border light. The demo uses it on both the input shells and the submit button, but you can apply it to cards, search bars, or buttons the same way.` },
      { q: 'How do I use this glow input in React, Vue, or Angular?', a: `Render the fields and attach a pointermove handler that sets the --x and --y inline style values via a ref, or use event delegation on the form. Keep the mask-composite CSS as-is. Handle submit with a framework event that calls your auth API and toggles the button label. In Tailwind, express the gradient and masks with arbitrary values and drive the variables through an inline style.` },
    ],
    aiPrompt: {
      paragraph: `Rather than puzzling out the mask math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain step by step how the double mask combined with mask-composite: exclude (and its -webkit-mask-composite: xor equivalent) leaves only the 1px padding ring of the gradient visible instead of filling the whole field, and why storing the cursor position in the --x and --y custom properties keeps the pointermove handler so cheap. It's also worth asking it to optimize the interaction, for instance whether attaching one listener per data-glow element scales fine for a form with many fields or should be delegated to a single parent listener. For extending it, ask it to add a colored glow per field type, make the radius react to scroll speed, or wire the fake submit delay to a real fetch call with error states. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a set of form inputs and a submit button with a cursor-tracking radial glow confined to their borders, in plain HTML, CSS, and JavaScript, using CSS custom properties and a mask-composite trick — no canvas, no libraries.

Requirements:
- Any element that should glow gets a data-glow attribute and a single shared pointermove listener (attached per matching element) that reads the cursor's position relative to that element via getBoundingClientRect and writes the result in pixels into two CSS custom properties on that element, for example --x and --y.
- Each glowing element's ::before pseudo-element must be absolutely positioned to cover the element, painted with a radial-gradient centered at var(--x) var(--y) (falling back to an off-screen default when the properties are unset), and given a small padding value (around 1px).
- That ::before must use two composited masks, one covering only the content box and one covering the full border box, combined with mask-composite: exclude and the -webkit-mask-composite: xor fallback, so that only the thin padding ring shows the gradient — the glow must render strictly as a border outline, never filling the element's interior.
- The glow layer must be invisible at rest (opacity 0) and fade in on both :hover and, for form fields, :focus-within, so keyboard-only users tabbing through the form get the same border light as mouse users and it effectively serves as the focus indicator.
- Inputs themselves must have no visible border or outline of their own — the frame comes entirely from the glow shell wrapping each input.
- On form submit, prevent the default navigation and change the submit button's label through at least two states (a brief "in progress" label, then a success label) using a timeout in place of a real request.`,
    },
  },
};

export default glowInput;
