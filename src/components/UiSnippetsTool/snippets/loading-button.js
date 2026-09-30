const loadingButton = {
    id: 'loading-button',
    title: 'Loading Button',
    category: 'buttons',
    html: `<div class="demo">
  <button class="btn" id="btn" onclick="triggerLoad()">
    <span class="spinner"></span>
    <span class="label">Save changes</span>
  </button>
  <p class="hint">Click to see the loading state</p>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.demo { display: flex; flex-direction: column; align-items: center; gap: 14px; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  background: #6366f1;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
  font-family: inherit;
  min-width: 150px;
  justify-content: center;
}
.btn:hover { background: #4f46e5; }
.btn.loading { opacity: 0.8; cursor: not-allowed; }
.btn.done { background: #16a34a; }

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
  display: none;
  flex-shrink: 0;
}
.loading .spinner { display: block; }

@keyframes spin { to { transform: rotate(360deg); } }

.hint { font-size: 12px; color: #94a3b8; }`,
    js: `function triggerLoad() {
  const btn = document.getElementById('btn');
  const label = btn.querySelector('.label');
  if (btn.classList.contains('loading') || btn.classList.contains('done')) return;
  btn.classList.add('loading');
  label.textContent = 'Saving…';
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.classList.add('done');
    label.textContent = '✓ Saved!';
    setTimeout(() => {
      btn.classList.remove('done');
      label.textContent = 'Save changes';
    }, 2000);
  }, 1800);
}`,

  seo: {
    title: 'Loading Button — Free HTML CSS JS Spinner Button Snippet',
    description: 'Three-state loading button: idle, CSS spinner, success tick — with double-click prevention. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'Loading Button — CSS Spinner, Three-State Machine & Layout Stability',
      description: `A loading button gives users immediate visual feedback that their action was received and is being processed. Without it, users click buttons multiple times assuming nothing happened — causing duplicate API calls, double submissions on a [contact form](/ui-snippets/contact-form/), and double payments. This is one of the most impactful micro-interactions in web development: a single CSS animation and 15 lines of JavaScript that prevent real production bugs.

This snippet gives you a complete loading button in **plain HTML, CSS, and vanilla JavaScript**. Click it in the preview to see the full cycle: idle state → spinner + "Saving…" → green success + "✓ Saved!" → reset to idle.

**How the CSS spinner works**

The spinner element is a 14×14px div with \`border: 2px solid rgba(255,255,255,0.4)\` — a faded white border on all four sides. \`border-top-color: #fff\` overrides the top border to full opacity. A \`@keyframes spin\` animation rotates the element 360 degrees at \`0.65s linear infinite\`. The three faded sides form the trailing arc and the full-opacity top border is the leading head. This technique requires no SVG, no icon library, and no images — just a div and a keyframe, the same approach as the standalone [loading dots](/ui-snippets/dots-loader/).

By default \`.spinner { display: none }\`. The selector \`.loading .spinner { display: block }\` activates it only when the parent button has the \`.loading\` class.

**The three-state machine**

The button cycles through three states managed by class names:

**Idle** (default): no extra class, normal background, label reads "Save changes", spinner hidden, cursor pointer.

**Loading** (\`.loading\`): spinner visible, label changes to "Saving…", \`opacity: 0.8\`, \`cursor: not-allowed\`. The function adds this class immediately on click so feedback is instant.

**Done** (\`.done\`): spinner hidden, background changes to green (\`#16a34a\`), label changes to "✓ Saved!". Applied after a 1.8-second timeout simulating an API response. For a more celebratory confirmation, trigger a [confetti button](/ui-snippets/confetti-button/) instead.

After 2 seconds on the Done state the button resets to Idle. Both \`.loading\` and \`.done\` guard against re-triggering — the function returns early if either is present.

**Why min-width prevents layout shift**

The button has \`min-width: 150px\`. Without it, the button width would change as the label switches between "Save changes" (12 chars), "Saving…" (7 chars), and "✓ Saved!" (8 chars), causing the surrounding layout to shift on every state change. The \`min-width\` locks the button to its widest natural size and \`justify-content: center\` keeps the content centred within it.

**Connecting to a real API call**

Replace the \`setTimeout\` in \`triggerLoad()\` with your actual \`fetch()\` call. Move the success code block into \`.then()\` and add a \`.catch()\` handler with an error state. For async/await, wrap the fetch in a try/catch and place the success/error logic in the respective branches.

**Adding a fourth error state**

Add \`.btn.error { background: #dc2626; }\` to the CSS. In the catch block, add \`btn.classList.add('error')\` and set the label to "Error — try again". Reset to idle after 3 seconds with \`setTimeout\`.

**Saving your customised version**

After editing, click **"Save as"** in the editor header, type a name, and press Enter. Saves to IndexedDB and appears in the **Saved** tab.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click the button in the preview',
          text: 'Click "Save changes" to see the full idle → spinner + Saving → green Saved! → reset cycle play out in real time.',
        },
        {
          title: 'Change the labels',
          text: 'In the JS panel, find "Save changes", "Saving…", and "✓ Saved!" and replace with your own action-specific labels.',
        },
        {
          title: 'Adjust the timing',
          text: 'Change 1800 (loading duration in ms) and 2000 (success display duration) to match your expected API response time.',
        },
        {
          title: 'Connect to a real API call',
          text: 'Replace the setTimeout in triggerLoad() with your fetch() call. Move the success block into .then() and add .catch() with an error state.',
        },
        {
          title: 'Customise the colours',
          text: 'Update the button background (#6366f1), hover colour (#4f46e5), and success colour (#16a34a) in the CSS panel to match your brand.',
        },
        {
          title: 'Export in your format',
          text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.',
        },
      ],
    },
    features: [
      'CSS border-top-color spinner — no SVG, no icon library, just a div and a keyframe',
      'display: none / display: block spinner toggle via .loading parent class selector',
      'Three-state machine: idle, loading (.loading), success (.done)',
      'Double-click prevention — early return if .loading or .done is already present',
      'min-width: 150px prevents layout shift as labels change between states',
      'cursor: not-allowed and opacity: 0.8 during loading state',
      'justify-content: center keeps label and spinner centred at all sizes',
      'Configurable loading duration (1800ms) and success display duration (2000ms)',
      '15 lines of vanilla JavaScript — replaceable with fetch() in one step',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Form submission and settings save',
        desc: 'Show users their form is processing with a spinner, then confirm success. Prevents impatient double-submissions that cause duplicate database records.',
      },
      {
        icon: 'FLOW',
        title: 'Payment and checkout buttons',
        desc: 'The most critical use case. Blocking re-clicks during payment processing prevents duplicate charges. The loading state makes waiting tolerable.',
      },
      {
        icon: 'APP',
        title: 'API action buttons',
        desc: 'Follow, like, add to cart, subscribe — any button that triggers a network request benefits from a loading state and confirmation feedback.',
      },
      {
        icon: 'DOC',
        title: 'File upload triggers',
        desc: 'Buttons that start file uploads where progress feedback prevents users from assuming the action failed and clicking again.',
      },
      {
        icon: 'LEARN',
        title: 'Learn CSS-only spinner technique',
        desc: 'Edit the border values and animation speed in the CSS panel to understand how a single rotating div with one full-opacity border creates the spinner arc.',
      },
      {
        icon: 'CODE',
        title: 'Migrate to a React async button',
        desc: 'Use the JSX export and replace the class-based state machine with useState. Set loading true on click, await the fetch, then set success or error state.',
      },
      { icon: 'CODE', title: 'Related: Segmented Toggle', desc: 'See the [Segmented Toggle](/ui-snippets/segmented-toggle/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does the CSS-only spinner work?',
        a: 'The spinner div has border: 2px solid rgba(255,255,255,0.4) on all four sides — a faded ring. border-top-color: #fff overrides the top to full opacity. A @keyframes animation rotates the element 360 degrees. The three faded sides form the trailing arc and the bright top side is the spinning head. No SVG, no image — just a div and a keyframe.',
      },
      {
        q: 'How do I connect this to a real API call?',
        a: 'In triggerLoad(), replace the outer setTimeout with your fetch() call. Move btn.classList.remove("loading"); btn.classList.add("done") into the .then() handler. Add a .catch() block that removes .loading, sets a .error class, and updates the label to an error message.',
      },
      {
        q: 'How do I add an error state?',
        a: 'Add .btn.error { background: #dc2626; } to the CSS. In the .catch() block, add btn.classList.add("error") and set label.textContent to "Error — try again". Use setTimeout to remove .error and reset the label after 3 seconds so the user can retry.',
      },
      {
        q: 'How does the double-click prevention work?',
        a: 'The function starts with: if (btn.classList.contains("loading") || btn.classList.contains("done")) return; This exits immediately if the button is already loading or showing success, blocking all subsequent clicks until the cycle completes and the classes are removed.',
      },
      {
        q: 'Why does the button need min-width?',
        a: 'The label changes between "Save changes", "Saving…", and "✓ Saved!" — three strings of different lengths. Without min-width: 150px, the button width would change with each label, shifting surrounding layout elements. The fixed minimum width locks the button to its widest natural size.',
      },
      {
        q: 'Can I use this for multiple buttons on the same page?',
        a: 'Yes. The current implementation uses document.getElementById("btn") which targets a specific element. To reuse across multiple buttons, refactor triggerLoad() to accept the button element as a parameter, or use event delegation with this inside an onclick handler.',
      },
      {
        q: 'Can I use this loading button in React?',
        a: 'Yes. Click "JSX" to download a React component. Replace the class-based state machine with useState — const [state, setState] = useState("idle"). Set state to "loading" on click, await your fetch call, then setState to "success" or "error". Use the state value to control the className, label text, and spinner visibility.',
      },
    ],
    aiPrompt: {
      paragraph: `You do not need to stare at the border properties to see how the spinner works. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setting border-top-color separately from the base border on the same element is enough to produce a spinning arc illusion, and why the early-return guard checking for the loading and done classes is what prevents duplicate submissions on rapid clicks. The same assistant can help optimize it, for instance asking whether the fixed 1800ms and 2000ms setTimeout durations should instead be driven by the real fetch promise resolving, so the button never shows a false success before the server actually responds. It is also useful for extending the button: ask it to add a fourth error state with a distinct color and retry affordance, generalize triggerLoad() to accept any button element instead of one hardcoded id, or wire it to an AbortController so a slow request can be cancelled mid-spin. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "loading button" state machine in plain HTML, CSS, and JavaScript with no libraries.

Requirements:
- A single button element containing a spinner element and a text label span, where the spinner is a div with a solid low-opacity border on all sides and a full-opacity border-top-color, animated with a CSS keyframe that rotates it 360 degrees linearly and continuously — no SVG, no icon font.
- The spinner must be hidden by default (display: none) and shown only when the button carries a specific loading CSS class, via a descendant selector, not an inline style toggle.
- The button must cycle through exactly three states driven by class names: an idle state with the default label and no spinner, a loading state that shows the spinner, changes the label text, sets cursor: not-allowed, and dims the button slightly, and a done state that hides the spinner, changes the background to a distinct success color, and shows a checkmark-style success label.
- Clicking the button while it is already in the loading or done state must do nothing (an early return), so rapid repeat clicks cannot re-trigger the cycle or fire duplicate submissions.
- The button must have a fixed minimum width sized to fit its widest possible label across all three states, with its content horizontally centered, so switching labels never shifts the surrounding page layout.
- Structure the state-transition logic (the loading-to-done timeout) so it is a drop-in replacement point: swapping the setTimeout for a real fetch call's .then()/.catch() should require touching only that one block, not the class-toggling or label logic elsewhere.`,
    },
  },
};

export default loadingButton;
