const passwordStrength = {
    id: 'password-strength',
    title: 'Password Strength Meter',
    category: 'forms',
    html: `<div class="demo">
  <h3>Create password</h3>
  <div class="field">
    <div class="input-wrap">
      <input type="password" id="pwd" placeholder="Enter a password…" oninput="check(this.value)" autocomplete="new-password" />
      <button class="eye" onclick="toggleEye(this)" type="button">
        <svg id="eye-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
    </div>
    <div class="bars">
      <div class="bar" id="b1"></div>
      <div class="bar" id="b2"></div>
      <div class="bar" id="b3"></div>
      <div class="bar" id="b4"></div>
    </div>
    <div class="strength-label" id="label">Enter a password</div>
  </div>
  <ul class="rules" id="rules">
    <li id="r-len">At least 8 characters</li>
    <li id="r-upper">Uppercase letter (A–Z)</li>
    <li id="r-num">Number (0–9)</li>
    <li id="r-sym">Special character (!@#$…)</li>
  </ul>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.demo { background: #fff; border-radius: 16px; padding: 28px 24px; width: 320px; box-shadow: 0 4px 20px rgba(0,0,0,0.07); display: flex; flex-direction: column; gap: 16px; }
h3 { font-size: 16px; font-weight: 700; color: #1e293b; }

.field { display: flex; flex-direction: column; gap: 8px; }
.input-wrap { position: relative; }
.input-wrap input { width: 100%; padding: 10px 40px 10px 14px; font-size: 14px; font-family: inherit; border: 1.5px solid #e2e8f0; border-radius: 8px; outline: none; color: #1e293b; transition: border-color 0.15s; }
.input-wrap input:focus { border-color: #6366f1; }
.eye { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #94a3b8; padding: 4px; }

.bars { display: flex; gap: 4px; }
.bar { flex: 1; height: 4px; background: #e2e8f0; border-radius: 4px; transition: background 0.25s; }

.strength-label { font-size: 12px; font-weight: 600; color: #94a3b8; }

.rules { list-style: none; display: flex; flex-direction: column; gap: 5px; }
.rules li { font-size: 12px; color: #94a3b8; display: flex; align-items: center; gap: 6px; transition: color 0.2s; }
.rules li::before { content: '○'; font-size: 10px; }
.rules li.pass { color: #16a34a; }
.rules li.pass::before { content: '●'; color: #16a34a; }`,
    js: `function check(v) {
  const len   = v.length >= 8;
  const upper = /[A-Z]/.test(v);
  const num   = /[0-9]/.test(v);
  const sym   = /[^A-Za-z0-9]/.test(v);
  const score = [len, upper, num, sym].filter(Boolean).length;

  const colors = ['', '#ef4444', '#f59e0b', '#6366f1', '#16a34a'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  for (let i = 1; i <= 4; i++) {
    document.getElementById('b'+i).style.background = i <= score ? colors[score] : '#e2e8f0';
  }
  document.getElementById('label').textContent = v ? labels[score] : 'Enter a password';
  document.getElementById('label').style.color = v ? colors[score] : '#94a3b8';

  [['r-len',len],['r-upper',upper],['r-num',num],['r-sym',sym]].forEach(([id,pass]) => {
    document.getElementById(id).classList.toggle('pass', pass);
  });
}

function toggleEye(btn) {
  const inp = document.getElementById('pwd');
  const isText = inp.type === 'text';
  inp.type = isText ? 'password' : 'text';
  document.getElementById('eye-icon').innerHTML = isText
    ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
    : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
}`,

  seo: {
    title: 'Password Strength Meter — Free HTML CSS JS Snippet',
    description: 'Live password strength meter scoring four regex rules with coloured bars, checklist and show/hide toggle. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Password Strength Meter — Regex Score, Coloured Bars & Rules Checklist',
      description: `A password strength meter gives users real-time feedback as they type a password on a sign-up form or [auth login card](/ui-snippets/auth-login-card/) — showing which rules are met and visually indicating overall strength. Pair it with a [show/hide toggle](/ui-snippets/password-toggle/) and a [password generator](/ui-snippets/password-generator/). It reduces weak password submissions and improves security without blocking the user flow.

**The four-rule scoring**

\`check(v)\` tests four conditions: \`v.length >= 8\`, \`/[A-Z]/.test(v)\` (uppercase), \`/[0-9]/.test(v)\` (digit), \`/[^A-Za-z0-9]/.test(v)\` (symbol). Each boolean is collected into \`[len, upper, num, sym]\` and \`.filter(Boolean).length\` counts the passing rules — giving a score of 0–4.

**The strength bar**

Four coloured bars correspond to the score. \`document.querySelectorAll('.bar')\` fills bars up to the score index with the appropriate colour from the \`colors\` array: empty → red → amber → indigo → green. Bars above the score stay grey.

**The rules checklist**

Four rule rows show a ✓ or ✗ indicator that updates on every keystroke. Setting \`row.classList.toggle('ok', condition)\` applies a green tick CSS state when the condition is true.

**Show/hide password toggle**

The eye button calls \`toggleVis()\` which switches the input \`type\` between \`password\` and \`text\` and updates the icon SVG.

**The four regex rules**

The strength meter evaluates four independent criteria: (1) length >= 8 characters, (2) at least one uppercase letter (/[A-Z]/), (3) at least one digit (/[0-9]/), (4) at least one special character (/[^A-Za-z0-9]/). Each test returns a boolean. The score is simply the count of passing tests: 0 (empty), 1 (weak), 2 (fair), 3 (good), 4 (strong). This evaluation runs on every input event with no debounce — password fields are short enough that real-time feedback is performant.

**Colour and label mapping**

Each score maps to a colour and label: 0→grey/empty, 1→red/Weak, 2→orange/Fair, 3→yellow/Good, 4→green/Strong. The bar uses four segment elements that fill progressively. The label updates simultaneously so users understand the colour meaning at a glance without having to interpret the bar alone.

**Show/hide password toggle**

The eye icon button toggles the input type between "password" and "text". This uses input.type = value directly — the input value is preserved across type changes. The icon switches between an open eye (visible text) and a closed eye (hidden text).

**Customising the strength rules**

Add more regex rules for stricter requirements: no consecutive characters (/(..)/), minimum unique characters, or no dictionary words. Each additional rule increases the maximum score — update the bar segment count and the score-to-label mapping accordingly. For very strict requirements (passphrase style), adjust the minimum length threshold from 8 to 16 and add a 'Very Strong' fifth tier at the maximum score.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type a password', text: 'Type in the password field to see the strength bars fill and the rules checklist update in real time.' },
        { title: 'Click the eye icon', text: 'Click the eye button to toggle between hidden and visible password text.' },
        { title: 'Add or change rules', text: 'In the JS panel, add new regex checks to the conditions and add matching rule rows to the HTML.' },
        { title: 'Change the strength colours', text: 'Update the colors array in the JS panel and matching bar CSS rules.' },
        { title: 'Block form submission on weak passwords', text: 'Read the score variable before form submit: if (score < 3) return prevent the submit.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Four regex checks: length >=8, uppercase, digit, symbol via test()',
      'score = [conditions].filter(Boolean).length — 0 to 4',
      'Four strength bars fill to score index with semantic colours',
      'colors array: empty/red/amber/indigo/green per score level',
      'Rules checklist: classList.toggle("ok", condition) per rule row',
      'Show/hide password toggle switches input type between password and text',
      'Strength label: Weak/Fair/Good/Strong updates with score',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'SAFE',   title: 'Sign-up and account creation forms',  desc: 'Embed the strength meter below the password field on any registration form. Real-time feedback reduces weak password submissions.' },
      { icon: 'FORM',   title: 'Password change and reset flows',     desc: 'Use on the new password field in account settings or password reset pages to guide users toward strong passwords.' },
      { icon: 'LEARN',  title: 'Learn regex pattern testing',        desc: 'The strength check uses /[A-Z]/, /[0-9]/, and /[^A-Za-z0-9]/ regex. Edit the patterns in the JS panel to understand how each test matches different character types.' },
      { icon: 'FLOW',   title: 'Password policy enforcement UI',     desc: 'Show company password policy requirements as the rules checklist. Update the regex conditions to match your policy (e.g. minimum 12 characters, no repeated characters).' },
      { icon: 'APP',    title: 'API key and token generators',       desc: 'Use the strength UI to validate generated API keys or secrets meet complexity requirements before displaying them to the user.' },
      { icon: 'CODE',   title: 'Add to any existing password input', desc: 'Wire check() to any password input\'s oninput event. The bars and checklist update independently of the surrounding form.' },
      { icon: 'CODE', title: 'Related: Variant Swatch Picker', desc: 'See the [Variant Swatch Picker](/ui-snippets/variant-swatch-picker/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the strength score work?', a: 'Four boolean conditions are evaluated: length >= 8, /[A-Z]/.test(v), /[0-9]/.test(v), /[^A-Za-z0-9]/.test(v). All four are put in an array and .filter(Boolean).length counts how many are true — giving 0, 1, 2, 3, or 4.' },
      { q: 'How are the strength bars coloured?', a: 'Four .bar elements are queried. Each bar at index i gets the colour from colors[score] if i < score, or an empty/grey state if i >= score. The colors array provides semantic colours per score level.' },
      { q: 'How do I add more rules?', a: 'Add a new regex condition to the conditions array: e.g. const noSpaces = !/\\s/.test(v). Add it to the array, increment the checklist rows in the HTML, and handle the new bar state. Update the colors array if you want a 5-level scale.' },
      { q: 'How do I prevent form submission on weak passwords?', a: 'Read the score variable in the form\'s onsubmit handler: document.querySelector("form").addEventListener("submit", e => { if (score < 3) { e.preventDefault(); alert("Password too weak"); } });' },
      { q: 'How does show/hide work?', a: 'toggleVis() accesses the password input element and switches input.type between "password" (characters hidden) and "text" (characters visible). The eye icon SVG is also updated to an open or closed eye.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. In React, track the password value in useState. Call the check function in an onChange handler. Store score, rules, and visible as state variables and derive bar colours and rule states from them.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the regex scoring by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the four boolean tests (length, uppercase, digit, symbol regex) collapse into a single 0-4 score via filter(Boolean).length, and how that score drives both the colors array and the bar fill in one pass. The same assistant can help optimize it, for instance checking whether running four regex tests on every single keystroke is worth debouncing for very long passwords, or whether the colors and labels arrays could be unified into one lookup table to remove duplication. It's also useful for extending the effect: ask it to add a fifth "Very Strong" tier for 16+ character passwords, block common/breached passwords with an added check, or wire the score into a form's submit handler so weak passwords are rejected before the request is sent. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a live password strength meter in plain HTML, CSS, and vanilla JavaScript using nothing but regex tests run on every input event — no external scoring library.

Requirements:
- A password input with an eye-icon button beside it that toggles the input's type between password and text and swaps the icon's SVG path between an open eye and a crossed-out eye.
- On every input event, evaluate exactly four independent boolean conditions against the current value: length of at least 8 characters, presence of an uppercase letter, presence of a digit, and presence of a special (non-alphanumeric) character.
- Compute a single numeric score as the count of the four conditions that are true, and use that score (0 through 4) to index into a shared colors array and a shared labels array (Weak/Fair/Good/Strong), so the bar color and the text label are always in sync and derived from the same value.
- Render four separate bar segments and fill them progressively up to the score index with the score's color, leaving the remaining segments in a neutral gray, updating with a CSS transition rather than an instant snap.
- Render a small checklist of the same four rules below the bar, each toggling a "pass" class (with a distinct visual indicator, not just color) the instant its condition becomes true, independent of the bar.
- Keep the whole thing framework-free and callable from a single check(value) function so it can be wired to any existing password input's input/change event with one line.`,
    },
  },
};

export default passwordStrength;
