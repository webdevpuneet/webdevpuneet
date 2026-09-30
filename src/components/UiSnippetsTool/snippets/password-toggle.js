const passwordToggle = {
  id: 'password-toggle',
  title: 'Password Show/Hide Toggle',
  category: 'forms',
  html: `<form class="login">
  <label for="pw">Password</label>
  <div class="pw-field">
    <input id="pw" type="password" value="s3cret-pass" placeholder="Enter password">
    <button type="button" class="toggle" onclick="togglePw(this)" aria-label="Show password" aria-pressed="false">
      <svg class="eye" viewBox="0 0 24 24">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      <svg class="eye-off" viewBox="0 0 24 24">
        <path d="M2 12s3.5-7 10-7a9.7 9.7 0 0 1 5 1.3M22 12s-3.5 7-10 7a9.7 9.7 0 0 1-5-1.3"/>
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>
        <line x1="3" y1="3" x2="21" y2="21"/>
      </svg>
    </button>
  </div>
  <p class="hint">Click the eye to reveal or hide your password.</p>
</form>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #f1f5f9;
  min-height: 100vh;
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 90px;
}

.login { width: 100%; max-width: 320px; }
label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 7px; }

.pw-field { position: relative; }

.pw-field input {
  width: 100%;
  padding: 12px 46px 12px 14px;
  font-size: 15px; font-family: inherit;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  letter-spacing: 0.02em;
}
.pw-field input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

.toggle {
  position: absolute;
  right: 6px; top: 50%; transform: translateY(-50%);
  width: 34px; height: 34px;
  display: grid; place-items: center;
  background: none; border: none; cursor: pointer;
  border-radius: 8px;
  color: #64748b;
  transition: color 0.15s, background 0.15s;
}
.toggle:hover { color: #6366f1; background: #f1f5f9; }
.toggle svg {
  width: 20px; height: 20px;
  fill: none; stroke: currentColor; stroke-width: 2;
  stroke-linecap: round; stroke-linejoin: round;
}

/* Show one icon at a time, driven by aria-pressed */
.toggle .eye-off { display: none; }
.toggle[aria-pressed="true"] .eye { display: none; }
.toggle[aria-pressed="true"] .eye-off { display: block; }

.hint { font-size: 12px; color: #94a3b8; margin-top: 8px; }`,
  js: `function togglePw(btn) {
  const input = btn.closest('.pw-field').querySelector('input');
  const shown = input.type === 'text';
  input.type = shown ? 'password' : 'text';
  btn.setAttribute('aria-pressed', String(!shown));
  btn.setAttribute('aria-label', shown ? 'Show password' : 'Hide password');
  // Keep the caret in the field so typing isn't interrupted
  input.focus();
}

// Prevent the demo form from reloading the page on submit
document.querySelector('.login')?.addEventListener('submit', e => e.preventDefault());`,

  seo: {
    title: 'Password Show/Hide Toggle — CSS/JS Snippet',
    description: 'An accessible password input with a show/hide eye toggle that swaps input type and icons, with proper aria-pressed. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Password Show/Hide Toggle — Eye Icon Reveal with type Swap & ARIA',
      description: `A password show/hide toggle is one of the most-searched form snippets because nearly every [login](/ui-snippets/auth-login-card/), signup (often beside a [password strength meter](/ui-snippets/password-strength/)), and reset-password form needs one — letting users reveal what they typed dramatically reduces password-entry errors and failed logins. This snippet is a complete, accessible implementation: a password field with an **eye icon inside it** that toggles the field between hidden and visible, swaps between an "eye" and "eye-off" icon, and keeps full keyboard and screen-reader support with \`aria-pressed\` and \`aria-label\`.

**How the reveal works: swapping the input type**

The entire reveal is one line of logic: switch the input's \`type\` between \`"password"\` and \`"text"\`. When \`type="password"\`, the browser masks the characters as dots; when \`type="text"\`, it shows them in plain text. The \`togglePw\` function reads the current type, flips it, and the browser instantly re-renders the value masked or unmasked. There is no separate "shadow" field and no manual character masking — you let the native input do the work, which means autofill, password managers, and the value itself all keep working correctly through the toggle.

**Positioning the eye button inside the field**

The eye toggle sits *inside* the input on the right. This is done by wrapping the input and button in a \`position: relative\` container (\`.pw-field\`), giving the input right padding (\`padding-right: 46px\`) so typed text never runs under the icon, and absolutely positioning the button at \`right: 6px; top: 50%; transform: translateY(-50%)\` to center it vertically. The button is a real \`<button type="button">\` — crucially \`type="button"\` so it does not submit the form when clicked, a bug that catches many implementations. It has its own hover state (color + soft background) so it reads as interactive.

**Two icons, one shown at a time**

The button contains two inline SVGs: an open \`.eye\` and a crossed-out \`.eye-off\`. Rather than redraw an icon in JavaScript, the snippet keeps both in the DOM and shows the right one with CSS driven by the button's \`aria-pressed\` state: \`.toggle[aria-pressed="true"] .eye { display: none }\` and \`.toggle[aria-pressed="true"] .eye-off { display: block }\`. So when the password is visible (\`aria-pressed="true"\`), the crossed-out eye shows ("click to hide"); when hidden, the open eye shows ("click to reveal"). Using inline SVG keeps the icons crisp at any size and lets them inherit \`currentColor\` for hover and theming.

**Accessibility done properly**

Password toggles are a frequent accessibility miss, so this snippet wires up the correct semantics. The button is a toggle, so it uses \`aria-pressed\` (\`"false"\` when the password is hidden, \`"true"\` when shown) — screen readers announce it as a toggle button and its state. The \`aria-label\` updates between "Show password" and "Hide password" so the button always describes the action it will perform. The visible label is associated with the input via \`for\`/\`id\`. After toggling, the script calls \`input.focus()\` so the caret stays in the field and the user can keep typing without interruption. Because it is a native button, it is keyboard-focusable and activates on Enter/Space.

**Why reveal-on-demand instead of always-visible**

Showing the password by default is a privacy risk (shoulder surfing), and hiding it always causes typos. The toggle is the right balance: masked by default, revealable on demand. A common UX refinement is to reveal only while the button is held down (\`mousedown\`/\`mouseup\`) rather than as a sticky toggle, which is even more private; the click-toggle in this snippet is the most familiar pattern and the easiest to use on touch devices. Either way, never store or log the plain value when revealing — the input \`type\` change is purely visual.

**The input focus state**

The field has a clear focus treatment — \`border-color: #6366f1\` plus a soft \`box-shadow\` ring — so keyboard users and form-fillers can see which field is active. The right padding reserves space for the icon at every state, so the layout never shifts when the icon swaps. A small hint line under the field explains the control, which is helpful on signup forms.

**Customizing the toggle**

Re-theme by changing the input focus color, the button hover color, and the icon stroke (it uses \`currentColor\`). To move the icon to the left, flip the padding and the button's position. To implement press-and-hold reveal, replace the \`onclick\` with \`onmousedown\`/\`ontouchstart\` to show and \`onmouseup\`/\`onmouseleave\` to hide. To add a caps-lock warning (a common companion feature), listen for \`keyup\` and check \`event.getModifierState('CapsLock')\`. Because the field is a normal input with one tiny handler, it slots into any login, signup, reset, or change-password form.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy the field', text: 'Copy the .pw-field wrapper with its <input type="password"> and the .toggle button containing both eye SVGs.' },
        { title: 'Keep type="button"', text: 'The toggle must be type="button" so clicking it never submits the form. The input keeps right padding so text clears the icon.' },
        { title: 'Wire the handler', text: 'togglePw flips the input type between password and text and updates aria-pressed and aria-label. Keep input.focus() so typing is not interrupted.' },
        { title: 'Re-theme it', text: 'Change the input focus color, the button hover color, and the SVG stroke (currentColor) to match your form.' },
        { title: 'Optional: hold-to-reveal', text: 'Swap the onclick for mousedown/mouseup (and touch events) if you prefer to reveal only while the button is pressed.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Reveals the password by swapping input type between password and text',
      'Eye / eye-off icon swap driven by CSS and aria-pressed (no JS redraw)',
      'Icon sits inside the field via relative wrapper + input right padding',
      'Button is type="button" so it never accidentally submits the form',
      'Accessible: aria-pressed toggle state and an aria-label that updates',
      'Keeps caret focus after toggling so typing is uninterrupted',
      'Inline SVG icons inherit currentColor for easy theming and hover',
      'Clear input focus ring for keyboard and form-fill users',
      'Works with autofill and password managers (native input preserved)',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'FORM',   title: 'Login and signup forms',           desc: 'The standard show/hide control on every password field — fewer typos means fewer failed logins and frustrated users.' },
      { icon: 'APP',    title: 'Password reset & change forms',     desc: 'Let users confirm their new password is correct before submitting, reducing reset loops and support tickets.' },
      { icon: 'ACCESS', title: 'Accessible toggle button',         desc: 'Learn the correct aria-pressed pattern and label updates so the reveal control is announced properly by screen readers.' },
      { icon: 'LEARN',  title: 'Learn the type-swap technique',     desc: 'See how switching input.type between password and text is the simplest, most reliable way to mask and reveal a value.' },
      { icon: 'CODE',   title: 'Reusable password input',          desc: 'Add the icon-in-field pattern to your design system so every password input across the app behaves consistently.' },
      { icon: 'SAFE',   title: 'Privacy-aware reveal',             desc: 'Masked by default, revealable on demand — and easily upgraded to hold-to-reveal for extra shoulder-surfing protection.' },
      { icon: 'CODE', title: 'Related: Variant Swatch Picker', desc: 'See the [Variant Swatch Picker](/ui-snippets/variant-swatch-picker/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do you show and hide a password in HTML?', a: 'Toggle the input\'s type attribute between "password" (masked dots) and "text" (plain text). A small click handler reads the current type, flips it, and the browser instantly re-renders the value. No separate field or manual masking is needed — the native input does the work, preserving autofill and password managers.' },
      { q: 'Why must the toggle be type="button"?', a: 'Inside a <form>, a <button> without a type defaults to type="submit", so clicking the eye would submit the form. Setting type="button" makes it a plain control that only runs the toggle handler.' },
      { q: 'How is the reveal toggle made accessible?', a: 'It uses aria-pressed to expose the on/off state ("true" when the password is visible) so screen readers announce it as a toggle button, and aria-label updates between "Show password" and "Hide password" to describe the next action. The button is a native, keyboard-operable <button>.' },
      { q: 'How do I swap between the eye and eye-off icons?', a: 'Keep both inline SVGs in the button and show one at a time with CSS driven by aria-pressed: .toggle[aria-pressed="true"] .eye { display:none } and .eye-off { display:block }. This avoids redrawing icons in JavaScript and keeps them crisp.' },
      { q: 'Can I reveal the password only while holding the button?', a: 'Yes. Replace the onclick with mousedown/touchstart to set type="text" and mouseup/mouseleave/touchend to set it back to "password". Hold-to-reveal is more private than a sticky toggle since the password is never left visible.' },
      { q: 'Can I use this password toggle in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. In React, hold a "visible" boolean in useState, set the input type from it, and toggle it in onClick while updating aria-pressed and the label — the same structure, declaratively.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the accessibility wiring on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the icon swap is driven by the button's aria-pressed attribute in CSS rather than a JS class toggle, and why the button must be type="button" inside a form. The same assistant can help optimize it, for example checking whether the right-padding reserved for the icon stays correct across different font sizes and locales, or whether focus management after the type swap actually keeps the caret position intact in every browser. It's also useful for extending the effect: ask it to add a caps-lock warning using getModifierState, convert the click toggle into a press-and-hold reveal for shared devices, or add a strength meter alongside it using the same input. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an accessible password show/hide toggle in plain HTML, CSS, and vanilla JavaScript, with no separate mirrored field and no framework.

Requirements:
- A password input wrapped in a position: relative container, with right padding reserved so typed text never runs under an icon button positioned absolutely inside the field.
- The reveal must work by switching the input's type attribute between "password" and "text" — no manual character masking, no duplicate hidden/visible fields, so native browser autofill and password managers keep working.
- The toggle control must be a real button element with type="button" explicitly set, so that clicking it inside a form never triggers a submit.
- Include two inline SVG icons (an open eye and a crossed-out eye-off) both present in the DOM at all times, with only one shown at a time driven purely by CSS rules keyed off the button's aria-pressed attribute value — no JavaScript class toggling for the icon swap.
- On click, flip the input's type, update aria-pressed to reflect whether the password is now visible, update aria-label to describe the next action ("Show password" / "Hide password"), and call focus() on the input afterward so the user's place in the field and their ability to keep typing is preserved.
- Style a clear focus ring on the input and a hover state on the button, and make sure the icons use stroke="currentColor" so they can be recolored purely through CSS.`,
    },
  },
};

export default passwordToggle;
