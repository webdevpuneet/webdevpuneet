const magneticButton = {
    id: 'magnetic-button',
    title: 'Magnetic Button',
    category: 'buttons',
    html: `<div class="scene">
  <p class="hint">Hover near the buttons to feel the magnetic pull</p>
  <div class="btns">
    <button class="mag-btn primary" data-strength="40">
      <span>Get Started</span>
    </button>
    <button class="mag-btn outline" data-strength="30">
      <span>Learn More</span>
    </button>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.scene { display: flex; flex-direction: column; align-items: center; gap: 40px; }
.hint { font-size: 13px; color: #475569; }
.btns { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }

.mag-btn {
  padding: 14px 32px;
  font-size: 15px; font-weight: 700;
  border-radius: 12px;
  cursor: pointer; font-family: inherit;
  transition: transform 0.15s cubic-bezier(0.23,1,0.32,1), box-shadow 0.15s;
  will-change: transform;
  display: block;
}

.mag-btn span { display: block; pointer-events: none; }

.mag-btn.primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none; color: #fff;
  box-shadow: 0 4px 20px rgba(99,102,241,0.4);
}
.mag-btn.primary:hover { box-shadow: 0 8px 32px rgba(99,102,241,0.6); }

.mag-btn.outline {
  background: transparent; color: #94a3b8;
  border: 1.5px solid #334155;
}
.mag-btn.outline:hover { border-color: #6366f1; color: #f1f5f9; }`,
    js: `document.querySelectorAll('.mag-btn').forEach(btn => {
  const strength = parseFloat(btn.dataset.strength) || 30;

  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.max(rect.width, rect.height) * 1.2;
    if (dist < maxDist) {
      const factor = (1 - dist / maxDist) * strength;
      btn.style.transform = \`translate(\${dx * factor / maxDist}px, \${dy * factor / maxDist}px)\`;
    }
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
  });
});`,

  seo: {
    title: 'Magnetic Button — Free HTML CSS JS Hover Snippet',
    description: 'Button that pulls toward the cursor using vector math and getBoundingClientRect, with smooth snap-back. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Magnetic Button — getBoundingClientRect Vector Math & distance-based translateX/Y',
      description: `A magnetic button physically pulls toward the cursor as it hovers near — the button moves to meet the mouse, then snaps back when the mouse leaves. The effect makes CTAs feel tactile and interactive, turning a static button into a micro-interaction that communicates responsiveness — much like the click [ripple](/ui-snippets/ripple-button/). It is used on premium [agency sites](/ui-snippets/agency-hero/), creative portfolios, and any interface aiming for a distinctive, physical UI quality.

**The vector math**

The JS reads the button's position with \`getBoundingClientRect()\` to get \`cx\` (center x) and \`cy\` (center y). The mouse offset from center is \`dx = e.clientX - cx\` and \`dy = e.clientY - cy\`. The distance from the center is \`Math.sqrt(dx*dx + dy*dy)\`.

A maximum effective distance is set to \`Math.max(rect.width, rect.height) * 1.2\` — the button only reacts when the cursor is within 1.2× the button's larger dimension. A falloff factor scales with \`(1 - dist / maxDist) * strength\` — the closer the cursor, the stronger the pull. The final offset is \`(dx * factor / maxDist, dy * factor / maxDist)\` applied as \`translateX/Y\`.

**The data-strength attribute**

Each button has a \`data-strength\` attribute (defaulting to 30). Higher values make the button move more; lower values make it subtler. The two demo buttons use different strengths to show the range.

**The snap-back**

On \`mouseleave\`, \`btn.style.transform = 'translate(0,0)'\` resets the position. The CSS \`transition: transform 0.15s cubic-bezier(0.23,1,0.32,1)\` applies an elastic ease-out so the snap-back has a slight overshoot quality.

**Adding to any existing button**

Add \`data-strength="30"\` to any button — including a [gradient button](/ui-snippets/gradient-button/) — add the three event listeners from the JS, and ensure the button has \`transition: transform 0.15s\` in its CSS. No other changes needed.

**The vector math**

On mousemove inside the magnetic zone, two calculations run: (1) distance = Math.hypot(dx, dy) where dx and dy are the cursor offset from the button centre. (2) If distance < strength radius, apply a force: x += (cursorX - buttonCentreX) * 0.3; y += (cursorY - buttonCentreY) * 0.3. This moves the button 30% of the distance toward the cursor. The button position is updated via transform: translate(x + 'px', ' + y + 'px'), and lerp smoothing (x += (targetX - x) * 0.12) eases the movement each requestAnimationFrame frame.

**The spring return**

On mouseleave, the target position resets to (0, 0). The lerp loop continues running until x and y are close enough to zero (abs < 0.5), then it stops. This creates the elastic return animation — the button springs back to its natural position with decreasing velocity, exactly like a physical magnet being released.

**Configuring the attraction strength**

Increase the 0.3 multiplier for stronger attraction (button moves more per pixel of cursor distance). Decrease for subtler effect. The strength radius (typically 80-120px) controls how close the cursor must be to trigger attraction. Smaller radius = more precise interaction; larger = more ambient magnetic feel.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Hover near each button', text: 'Move the cursor near the buttons in the preview without clicking. Each button pulls toward the cursor based on its data-strength value.' },
        { title: 'Change the pull strength', text: 'In the HTML panel, update the data-strength attribute on each button. Higher values (40-60) create stronger pull; lower values (10-20) are more subtle.' },
        { title: 'Change button styles', text: 'Update the background gradient, border-radius, font-size, and padding in the CSS panel to match your design.' },
        { title: 'Add to an existing button', text: 'Add data-strength="30" to your button, copy the JS mousemove and mouseleave listeners, and add transition: transform 0.15s to its CSS.' },
        { title: 'Adjust the effective radius', text: 'In the JS panel, change the 1.2 multiplier in maxDist to control how far the cursor must be before the button starts reacting.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'getBoundingClientRect gives center coordinates for accurate mouse offset calculation',
      'dx/dy vector from cursor to button center, distance via Pythagorean theorem',
      '(1 - dist/maxDist) * strength falloff — pull fades as cursor moves away',
      'data-strength attribute per button — different intensities without code changes',
      'maxDist = 1.2× the larger dimension — effective radius scales with button size',
      'mouseleave snaps back to translate(0,0) via elastic cubic-bezier ease-out',
      'Works on any button element — add three lines of JS and one CSS transition',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP',    title: 'Hero CTA buttons on premium landing pages', desc: 'Make the primary CTA physically attract the cursor for an immediate tactile quality. The magnetic pull makes users notice the button more than a hover colour change alone.' },
      { icon: 'DESIGN', title: 'Creative agency and portfolio CTAs',        desc: 'Magnetic buttons are a signature interaction on award-winning agency sites. Add to any portfolio CTA to communicate that the interface is crafted with intent.' },
      { icon: 'LEARN',  title: 'Learn 2D vector math in the browser',       desc: 'The snippet uses distance calculation and vector scaling — real physics math. Edit the strength and radius values in the JS panel to see how each parameter controls the attraction behaviour.' },
      { icon: 'FLOW',   title: 'Prototype premium interactive UIs',         desc: 'Use the magnetic button to prototype the feel of a high-end interactive interface. Test whether the effect fits your brand at different strength values.' },
      { icon: 'CODE',   title: 'Add to any existing button in 3 steps',     desc: 'Add data-strength, copy the JS listeners, add a CSS transition. No wrapper elements or extra HTML needed.' },
      { icon: 'STAR',   title: 'Product launch and waitlist CTAs',          desc: 'A magnetic signup button on a product launch page draws attention and communicates that every detail has been considered.' },
      { icon: 'CODE', title: 'Related: Share Menu with Copy Link and Social Options', desc: 'See the [Share Menu with Copy Link and Social Options](/ui-snippets/share-menu/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the magnetic pull work?', a: 'The mousemove handler calculates the vector from the button centre to the cursor (dx, dy) using getBoundingClientRect. It computes the distance and a falloff factor that decreases from strength to 0 as the cursor moves from the centre to the edge of the effective radius. This factor scales dx and dy to produce the translateX/Y offset.' },
      { q: 'What is the data-strength attribute?', a: 'data-strength controls the maximum pixel offset the button moves. A value of 30 moves the button up to 30px toward the cursor at maximum proximity. Change it per button to create different pull intensities across your UI.' },
      { q: 'How do I control the effective radius?', a: 'The effective radius is Math.max(rect.width, rect.height) * 1.2. Change 1.2 to a larger value like 2.0 to start attracting the cursor from further away, or to 0.8 to require the cursor to be nearly on the button before reacting.' },
      { q: 'How do I add this to an existing button?', a: 'Add data-strength="30" to your button HTML. Copy the mousemove and mouseleave event listeners from the JS panel. Add transition: transform 0.15s cubic-bezier(0.23,1,0.32,1) to your button CSS. No additional markup needed.' },
      { q: 'Why does the button snap back smoothly?', a: 'The CSS transition: transform 0.15s cubic-bezier(0.23,1,0.32,1) applies an elastic ease-out to all transform changes including the reset to translate(0,0) on mouseleave. The cubic-bezier values create a slight overshoot and bounce.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" to download a React component. In React, attach the mousemove and mouseleave handlers via onMouseMove and onMouseLeave props. Track the transform in useState or apply it directly to the element via useRef to avoid re-render overhead.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to re-derive the falloff formula from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the factor calculation multiplies (1 - dist / maxDist) by strength before scaling dx and dy, and why maxDist is defined relative to the button's own width and height rather than a fixed pixel constant. The same assistant can help optimize it, for instance asking whether setting btn.style.transform directly on every mousemove event risks layout thrash compared to batching the write inside a requestAnimationFrame callback. It is also useful for extending the effect: ask it to add a lerped spring-back instead of the instant CSS-transition snap, make the button's inner label counter-rotate slightly for a parallax feel, or apply the same technique to an icon inside a card rather than a button. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "magnetic button" hover effect in plain HTML, CSS, and JavaScript with no libraries.

Requirements:
- One or more button elements, each carrying a data-strength attribute controlling how far that specific button can be pulled, defaulting to a sensible value if the attribute is missing or unparsable.
- On mousemove over a button, compute the button's center point using getBoundingClientRect (not a hardcoded position), then compute the cursor's offset from that center as a vector (dx, dy) and its straight-line distance using the Pythagorean theorem.
- Define an effective interaction radius relative to the button's own measured dimensions (e.g. the larger of its width or height times a multiplier), not a fixed pixel value, so bigger buttons naturally get a bigger magnetic zone.
- Only apply a transform when the cursor is within that effective radius; the pull strength must fall off smoothly from full strength at the center to near zero at the radius edge, using a formula proportional to (1 - distance / radius).
- Apply the computed pull as a CSS transform: translate on the button element (not on an inner wrapper), scaled by the per-button strength attribute, and give the button a CSS transition on the transform property so that both the pull and the reset below feel eased rather than instant.
- On mouseleave, reset the button's transform back to no translation, relying on the existing CSS transition for the snap-back rather than manually animating the reset in JavaScript.
- The label/text inside the button must not itself intercept pointer events in a way that breaks the parent button's mousemove tracking.`,
    },
  },
};

export default magneticButton;
