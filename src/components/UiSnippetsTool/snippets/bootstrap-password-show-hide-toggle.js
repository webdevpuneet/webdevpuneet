const bootstrapPasswordShowHideToggle = {
  id: 'bootstrap-password-show-hide-toggle',
  title: 'Bootstrap Password Show/Hide Toggle',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="bspt-card card shadow-sm">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-3">Create a password</h5>

      <label class="form-label small">Password</label>
      <div class="input-group mb-1">
        <input type="password" class="form-control bspt-input" id="bsptPass" placeholder="Enter password">
        <button class="btn btn-outline-secondary bspt-toggle" type="button" data-target="bsptPass">
          <span class="bspt-icon">&#128065;</span>
        </button>
      </div>
      <p class="small text-danger mb-3 d-none" id="bsptCapsPass">Caps Lock is on</p>

      <label class="form-label small">Confirm password</label>
      <div class="input-group mb-1">
        <input type="password" class="form-control bspt-input" id="bsptConfirm" placeholder="Re-enter password">
        <button class="btn btn-outline-secondary bspt-toggle" type="button" data-target="bsptConfirm">
          <span class="bspt-icon">&#128065;</span>
        </button>
      </div>
      <p class="small text-danger mb-0 d-none" id="bsptCapsConfirm">Caps Lock is on</p>
    </div>
  </div>
</div>`,
  css: `.bspt-card { width: 400px; border-radius: 14px; }
.bspt-icon { display: inline-block; filter: grayscale(1); opacity: 0.65; }
.bspt-toggle.bspt-visible .bspt-icon { filter: none; opacity: 1; }`,
  js: `const toggleButtons = Array.from(document.querySelectorAll('.bspt-toggle'));

toggleButtons.forEach(btn => {
  const input = document.getElementById(btn.dataset.target);
  const icon = btn.querySelector('.bspt-icon');

  btn.addEventListener('click', () => {
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    btn.classList.toggle('bspt-visible', !showing);
    // A slashed-eye vs. open-eye glyph swap communicates state without
    // relying on an external icon font just for two icons.
    icon.innerHTML = showing ? '&#128065;' : '&#128584;';
    btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
  });
});

function wireCapsWarning(inputId, warningId) {
  const input = document.getElementById(inputId);
  const warning = document.getElementById(warningId);

  function checkCaps(e) {
    const isCapsOn = typeof e.getModifierState === 'function' && e.getModifierState('CapsLock');
    warning.classList.toggle('d-none', !isCapsOn);
  }

  input.addEventListener('keydown', checkCaps);
  input.addEventListener('keyup', checkCaps);
  input.addEventListener('blur', () => warning.classList.add('d-none'));
}

wireCapsWarning('bsptPass', 'bsptCapsPass');
wireCapsWarning('bsptConfirm', 'bsptCapsConfirm');`,

  seo: {
    title: 'Bootstrap Password Show/Hide Toggle — Free JS Snippet',
    description: 'An input-group eye-icon toggle on two independent password fields, plus a Caps Lock warning via getModifierState. Copy-paste or export to React & Vue.',
    about: {
      title: 'Bootstrap Password Show/Hide Toggle — HTML, CSS & JavaScript',
      description: `Every password field on this snippet is a real Bootstrap \`input-group\` pairing a \`form-control\` with a \`btn btn-outline-secondary\` button rather than an icon absolutely positioned on top of the input — using Bootstrap's own input-group composition means the toggle button gets correct border-radius joining and focus-ring behavior for free instead of needing custom positioning CSS. Both the password and confirm-password fields are wired independently: \`toggleButtons\` collects every \`.bspt-toggle\` button on the page, and each one reads which input it controls from its own \`data-target\` attribute rather than assuming a fixed DOM relationship, so clicking the password field's eye icon can never accidentally affect the confirm field or vice versa.\n\nClicking a toggle flips the paired input's \`type\` attribute between \`password\` and \`text\` — the actual mechanism that reveals or masks the characters — and swaps the icon's \`innerHTML\` between an open eye (\`&#128065;\`) and a slashed eye (\`&#128584;\`) Unicode glyph, avoiding any dependency on an external icon font just to show two icons. A \`bspt-visible\` class toggled alongside the type change also removes a CSS \`grayscale\` filter from the icon, giving a subtle visual confirmation of which state is active even before reading the glyph itself, and the button's \`aria-label\` is updated between "Show password" and "Hide password" so the control's purpose stays announced correctly to assistive technology as its state changes.\n\nThe Caps Lock warning is built on \`KeyboardEvent.getModifierState('CapsLock')\`, which is the only reliable way to detect Caps Lock state from script — there is no other DOM API that exposes it directly. \`wireCapsWarning(inputId, warningId)\` is called once per field so each password input gets its own independent warning message rather than sharing one global indicator, and the check runs on both \`keydown\` and \`keyup\` because a key that toggles Caps Lock itself only updates \`getModifierState\`'s return value at one of those two event stages depending on the browser and platform — listening to both keeps the warning accurate everywhere. The warning also clears itself on \`blur\`, which is the non-obvious edge case worth calling out: without clearing it, tabbing away from a field with Caps Lock on would leave a misleading warning visibly attached to a field the user is no longer typing into.\n\nBecause \`checkCaps\` is defined once inside \`wireCapsWarning\` and closes over that call's own \`input\` and \`warning\` elements, the password field's Caps Lock message and the confirm field's Caps Lock message never share any mutable state — each call to \`wireCapsWarning\` produces a fully separate pair of listeners, so typing with Caps Lock on in one field can never accidentally trigger or clear the warning belonging to the other.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Two password fields are shown, both masked, each with an eye-icon button in a Bootstrap input-group.' },
        { title: 'Type into the first field', text: 'Characters appear as dots, and the eye icon next to it is grayed out.' },
        { title: 'Click that field\'s eye icon', text: 'The typed password becomes visible as plain text, the icon switches to a slashed eye, and it loses its grayscale.' },
        { title: 'Click the confirm field\'s eye icon separately', text: 'Only the confirm field toggles visibility; the password field\'s state is unaffected, proving the two toggles are independent.' },
        { title: 'Turn on Caps Lock and type in either field', text: 'A red "Caps Lock is on" message appears beneath that specific field only.' },
        { title: 'Click away from the field', text: 'The Caps Lock warning disappears, even if Caps Lock is still physically on.' },
      ],
    },
    features: [
      'Real Bootstrap input-group pairing each password field with its own toggle button',
      'Two independently wired toggles, addressed via data-target rather than DOM position',
      'Input type flips between password and text as the actual visibility mechanism',
      'Open-eye and slashed-eye Unicode glyphs swap with no external icon font dependency',
      'Grayscale CSS filter gives a subtle secondary visual cue of toggle state',
      'aria-label updates between Show password and Hide password for assistive technology',
      'Caps Lock detection via the real KeyboardEvent.getModifierState API, checked on keydown and keyup',
      'Per-field Caps Lock warning clears automatically on blur to avoid a stale, misleading message',
    ],
    useCases: [
      { icon: 'FORM', title: 'Sign-up and account creation forms', desc: 'The exact scenario demoed here — a password and confirm-password pair, each independently toggleable.' },
      { icon: 'FORM', title: 'Login forms', desc: 'Reuse a single toggle instance on a login form\'s one password field, alongside a [Two-Factor Verification Code Form](/ui-snippets/bootstrap-2fa-verification-form/) for a full auth flow.' },
      { icon: 'ACCESS', title: 'Accessible authentication UI', desc: 'The aria-label updates and Caps Lock warning both reduce common password-entry errors for keyboard and screen-reader users alike.' },
      { icon: 'LEARN', title: 'Learning getModifierState and input-group composition', desc: 'A concrete reference for a keyboard API that has no other DOM equivalent, similar in spirit to the paste-handling techniques in [Two-Factor Verification Code Form](/ui-snippets/bootstrap-2fa-verification-form/).' },
      { icon: 'APP', title: 'Settings pages with a change-password form', desc: 'Pair with [Vertical Tabs Settings](/ui-snippets/bootstrap-vertical-tabs-settings/) for a security settings tab containing this exact field pattern.' },
    ],
    faqs: [
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track each field\'s visibility as its own boolean in useState (React), a ref (Vue), or a component property (Angular), bind the input\'s type attribute to that boolean instead of mutating input.type directly via querySelector, and call getModifierState from the same keydown/keyup event handlers passed to the framework\'s event bindings — the Caps Lock logic itself needs no changes since it reads from the native KeyboardEvent object either way.' },
      { q: 'Is getModifierState the only way to detect Caps Lock?', a: 'Yes — there is no dedicated caps-lock DOM property or media query; KeyboardEvent.getModifierState(\'CapsLock\') on a keydown or keyup event is the standard, widely supported mechanism, which is why this snippet checks it on both event types rather than assuming one is always sufficient.' },
      { q: 'Why does each toggle button use a data-target attribute instead of a fixed selector?', a: 'Reading the target input\'s id from data-target lets the exact same click handler logic serve any number of independent password fields on the page without hardcoding element ids, which is what allows the password and confirm fields to toggle completely independently of each other.' },
      { q: 'Why clear the Caps Lock warning on blur?', a: 'Caps Lock state itself does not change just because focus moves elsewhere, but a warning left showing under a field the user is no longer typing into becomes misleading — clearing it on blur keeps the message scoped to the field currently being typed in.' },
      { q: 'Does this work with Tailwind instead of Bootstrap?', a: 'Yes — replace the input-group and form-control classes with a Tailwind flex container and border/rounded utilities on the input and button; the type-toggling, icon-swapping, and getModifierState logic operate on the input and button elements directly and are unaffected by which CSS framework styles them.' },
      { q: 'Can I add a password strength meter alongside this?', a: 'Yes — add an input event listener on the password field that scores the current value and updates a separate progress bar or text indicator; it can coexist with the visibility toggle and Caps Lock warning without any conflicts since all three listen to different events on the same input.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to add a password-match check that shows a live "Passwords match" or "Passwords don't match" message as the confirm field is typed into, or to add a strength meter that scores the password on length and character variety.`,
      prompt: `Build a Bootstrap 5.3 password show/hide toggle using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- Two independent Bootstrap input-group password fields (password and confirm password), each paired with its own eye-icon toggle button.
- Clicking a toggle button flips its own input's type attribute between password and text, and swaps the button's icon between an open-eye and slashed-eye glyph, without affecting the other password field.
- Update the toggle button's aria-label between "Show password" and "Hide password" as its state changes.
- Add a Caps Lock warning message beneath each password field independently, shown while typing if Caps Lock is on, detected via the KeyboardEvent.getModifierState('CapsLock') API checked on both keydown and keyup.
- The Caps Lock warning must clear itself when the field loses focus, rather than staying visible after the user has moved on.`,
    },
  },
};

export default bootstrapPasswordShowHideToggle;
