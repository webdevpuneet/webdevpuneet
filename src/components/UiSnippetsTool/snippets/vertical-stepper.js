const verticalStepper = {
  id: 'vertical-stepper',
  title: 'Vertical Stepper',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="vst" id="vst">
  <div class="vst-step" data-step="0">
    <div class="vst-rail">
      <div class="vst-dot"><span class="vst-num">1</span><svg class="vst-check" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></div>
      <div class="vst-line"><i></i></div>
    </div>
    <div class="vst-body">
      <button class="vst-title" type="button">Account details<small>Email and password</small></button>
      <div class="vst-panel"><div class="vst-inner">
        <input class="vst-input" type="email" placeholder="you@company.com" aria-label="Email">
        <input class="vst-input" type="password" placeholder="Create a password" aria-label="Password">
        <div class="vst-actions"><button class="vst-next" type="button">Continue</button></div>
      </div></div>
    </div>
  </div>

  <div class="vst-step" data-step="1">
    <div class="vst-rail">
      <div class="vst-dot"><span class="vst-num">2</span><svg class="vst-check" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></div>
      <div class="vst-line"><i></i></div>
    </div>
    <div class="vst-body">
      <button class="vst-title" type="button">Workspace<small>Name your team space</small></button>
      <div class="vst-panel"><div class="vst-inner">
        <input class="vst-input" type="text" placeholder="Workspace name" aria-label="Workspace name">
        <div class="vst-actions">
          <button class="vst-back" type="button">Back</button>
          <button class="vst-next" type="button">Continue</button>
        </div>
      </div></div>
    </div>
  </div>

  <div class="vst-step" data-step="2">
    <div class="vst-rail">
      <div class="vst-dot"><span class="vst-num">3</span><svg class="vst-check" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg></div>
    </div>
    <div class="vst-body">
      <button class="vst-title" type="button">Invite your team<small>Optional — you can skip this</small></button>
      <div class="vst-panel"><div class="vst-inner">
        <input class="vst-input" type="text" placeholder="teammate@company.com" aria-label="Teammate email">
        <div class="vst-actions">
          <button class="vst-back" type="button">Back</button>
          <button class="vst-next" type="button">Finish</button>
        </div>
      </div></div>
    </div>
  </div>

  <div class="vst-done" id="vstDone">
    <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
    All steps completed — you're all set!
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.vst { width: min(420px, 100%); background: #fff; border: 1px solid #e2e8f0; border-radius: 18px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); padding: 22px; }

.vst-step { display: flex; gap: 14px; }

.vst-rail { display: flex; flex-direction: column; align-items: center; }
.vst-dot {
  position: relative; width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: #f1f5f9; border: 2px solid #e2e8f0;
  font-size: 12.5px; font-weight: 800; color: #94a3b8;
  transition: all 0.3s;
}
.vst-check { position: absolute; width: 14px; height: 14px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; opacity: 0; transform: scale(0.4); transition: all 0.3s; }

.vst-line { width: 2px; flex: 1; background: #e2e8f0; margin: 4px 0; border-radius: 2px; position: relative; overflow: hidden; }
.vst-line i { position: absolute; inset: 0; background: #6366f1; transform: scaleY(0); transform-origin: top; transition: transform 0.45s ease; }

.vst-body { flex: 1; padding-bottom: 20px; min-width: 0; }
.vst-step:last-of-type .vst-body { padding-bottom: 0; }

.vst-title {
  display: block; width: 100%; text-align: left; background: none; border: none; cursor: pointer;
  font-family: inherit; font-size: 14px; font-weight: 700; color: #94a3b8; padding: 5px 0; transition: color 0.3s;
}
.vst-title small { display: block; font-size: 12px; font-weight: 500; color: #94a3b8; margin-top: 1px; }

/* Panels collapse via the grid-rows trick so height animates without JS measuring */
.vst-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s ease; }
.vst-inner { overflow: hidden; display: flex; flex-direction: column; gap: 9px; }
.vst-panel .vst-inner > :first-child { margin-top: 10px; }

/* States */
.vst-step.active .vst-dot { background: #6366f1; border-color: #6366f1; color: #fff; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15); }
.vst-step.active .vst-title { color: #0f172a; }
.vst-step.active .vst-panel { grid-template-rows: 1fr; }

.vst-step.done .vst-dot { background: #10b981; border-color: #10b981; }
.vst-step.done .vst-dot .vst-num { opacity: 0; }
.vst-step.done .vst-check { opacity: 1; transform: scale(1); }
.vst-step.done .vst-title { color: #334155; }
.vst-step.done .vst-line i { transform: scaleY(1); }

.vst-input {
  width: 100%; padding: 9px 12px; border: 1px solid #e2e8f0; border-radius: 10px;
  font-family: inherit; font-size: 13px; color: #0f172a; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
}
.vst-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12); }

.vst-actions { display: flex; gap: 8px; margin-top: 3px; }
.vst-next {
  padding: 8px 18px; border: none; border-radius: 9px; background: #6366f1; color: #fff;
  font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer; transition: background 0.2s;
}
.vst-next:hover { background: #4f46e5; }
.vst-back {
  padding: 8px 14px; border: 1px solid #e2e8f0; border-radius: 9px; background: #fff; color: #64748b;
  font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.vst-back:hover { border-color: #cbd5e1; color: #334155; }

.vst-done {
  display: none; align-items: center; gap: 9px; margin-top: 6px;
  padding: 12px 14px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px;
  font-size: 13px; font-weight: 700; color: #047857;
  animation: vstDone 0.4s ease both;
}
.vst-done.show { display: flex; }
.vst-done svg { width: 16px; height: 16px; fill: none; stroke: #10b981; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
@keyframes vstDone { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }`,
  js: `const root = document.getElementById('vst');
const steps = [...root.querySelectorAll('.vst-step')];
const doneBanner = document.getElementById('vstDone');
let current = 0;
let maxReached = 0; // furthest step the user has completed up to

function update() {
  steps.forEach((el, i) => {
    el.classList.toggle('active', i === current);
    el.classList.toggle('done', i < maxReached && i !== current);
  });
  doneBanner.classList.toggle('show', current >= steps.length);
}

root.addEventListener('click', (e) => {
  if (e.target.closest('.vst-next')) {
    maxReached = Math.max(maxReached, current + 1);
    current += 1;
    update();
  } else if (e.target.closest('.vst-back')) {
    current -= 1;
    update();
  } else {
    // Clicking a completed step's title jumps back to edit it
    const title = e.target.closest('.vst-title');
    if (title) {
      const step = Number(title.closest('.vst-step').dataset.step);
      if (step < maxReached) { current = step; update(); }
    }
  }
});

update();`,
  seo: {
    title: 'Vertical Stepper — Free HTML CSS JS Form Snippet',
    description: 'A Material-style vertical stepper with filling connectors, step panels that expand via the 0fr grid trick and jump-back editing. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Vertical Stepper — Material-Style Multi-Step Form with Expanding Panels and Progress Rail',
      description: `The vertical stepper is the onboarding pattern of choice when steps have real content — unlike a horizontal [stepper](/ui-snippets/stepper/), each step's form expands inline beneath its own title, so the user always sees where they are, what is done, and what is next in one column. This component implements the full Material-style pattern in HTML, CSS, and vanilla JavaScript: numbered dots that morph into green checkmarks, connector lines that fill as you advance, smoothly animating collapsible panels, back navigation, jump-back editing of completed steps, and a completion banner.

**Animating height with the 0fr grid trick**

Collapsible content whose height is unknown is the classic CSS problem: \`height: auto\` cannot be transitioned. This stepper uses the modern solution — each panel is a one-cell grid transitioning \`grid-template-rows\` between \`0fr\` and \`1fr\`, with the inner element set to \`overflow: hidden\`. The browser interpolates the fractional row from zero to content height, so panels expand and collapse smoothly with zero JavaScript measurement — no \`scrollHeight\` reads, no hard-coded max-heights that break when content changes. It is the cleanest height animation technique shipping in all modern browsers.

**The rail: dots, checks, and filling connectors**

Each step's left rail holds a 30px dot and a 2px connector line. The dot renders both the step number and a checkmark SVG stacked on top of each other; the \`done\` state fades the number out and scales the check in, while the dot's background transitions from grey to green — one CSS state change, two cross-fading layers. The connector line contains an inner \`<i>\` filled with the accent colour and scaled with \`transform: scaleY(0→1)\` from the top, so completing a step visibly "pours" progress down toward the next one. Scaling a transform instead of animating height keeps the fill on the compositor.

**State: one index, three classes**

The JavaScript tracks two numbers: \`current\` (the open step) and \`maxReached\` (the furthest completed step). \`update()\` derives every visual from them — \`active\` for the open step, \`done\` for completed steps behind the cursor — so the DOM is a pure function of two integers. Continue advances both; Back moves \`current\` down without losing \`maxReached\`, which is what enables jump-back editing: clicking the title of any previously completed step re-opens it, and because \`maxReached\` is preserved, its checkmark returns the moment you navigate away again.

**Event delegation for all controls**

A single click listener on the root handles Continue, Back, and title clicks via \`closest()\` checks, rather than binding listeners per button. This keeps the wiring at three branches regardless of step count — add a fourth step to the markup and no JavaScript changes are needed beyond it simply working.

**Completion state**

When \`current\` walks past the last step, every step shows as done and a green completion banner fades in with a small rise animation. In a real signup flow this is where you would submit the accumulated form data — the demo keeps inputs uncontrolled so you can read them all at the end with a \`FormData\` pass or per-input queries.

**Customisation**

Add steps by copying a \`.vst-step\` block (the last step omits the connector line); the delegation and state logic adapt automatically. Add per-step validation by gating the Continue branch — check the step's inputs and refuse to advance with an error style, similar to the [inline validation form](/ui-snippets/inline-validation-form/). Swap the indigo accent and green done-colour tokens to match your brand.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A three-step vertical stepper renders — Account details is open with its form expanded, steps 2 and 3 sit collapsed and grey below.` },
      { title: 'Click Continue', text: `The current panel collapses, the dot turns green and cross-fades its number into a checkmark, the connector line fills downward, and the next step expands.` },
      { title: 'Go back', text: `Back re-opens the previous step without losing progress — its checkmark returns as soon as you move forward again.` },
      { title: 'Jump-edit a done step', text: `Click the title of any completed step to re-open it directly; maxReached remembers how far you had gotten.` },
      { title: 'Finish the flow', text: `Continue past step 3 — every dot shows a check and the green "All steps completed" banner animates in.` },
      { title: 'Extend and validate', text: `Copy a .vst-step block to add steps; gate the Continue handler with input checks to add per-step validation.` },
    ]},
    features: [
      { title: '0fr grid height animation', text: `Panels transition grid-template-rows: 0fr → 1fr, animating unknown content height with no JS measurement or max-height hacks.` },
      { title: 'Number-to-check dot morph', text: `Each dot cross-fades its number out and scales a checkmark in as the background sweeps grey → green.` },
      { title: 'Filling connector rail', text: `Connector lines fill top-down with a scaleY transform, pouring progress toward the next step on the compositor.` },
      { title: 'Two-integer state model', text: `current and maxReached drive every class via one update() — the DOM is a pure function of the state.` },
      { title: 'Jump-back editing', text: `Completed step titles are clickable to re-open, with progress preserved when you return.` },
      { title: 'Single delegated listener', text: `Continue, Back, and title clicks route through one root listener via closest() — step count never changes the JS.` },
      { title: 'Completion banner', text: `Walking past the last step reveals an animated success banner, the natural submit point for collected data.` },
      { title: 'Focus-styled inputs', text: `Inputs carry accessible labels and an accent focus ring consistent across the flow.` },
    ],
    useCases: [
      { title: 'SaaS onboarding flows', text: `Account → workspace → invite is the canonical signup; pair with an [onboarding checklist widget](/ui-snippets/onboarding-checklist-widget/) after setup.` },
      { title: 'Checkout pipelines', text: `Address, shipping, and payment as vertical steps — compare the [multi-step checkout](/ui-snippets/multi-step-checkout/) variant.` },
      { title: 'KYC and application forms', text: `Long regulated forms broken into digestible, resumable sections with visible progress.` },
      { title: 'Setup wizards', text: `Product configuration where earlier answers stay reviewable via jump-back editing — see also the [progress wizard](/ui-snippets/progress-wizard/).` },
      { title: 'Course and tutorial flows', text: `Lesson sequences where completed steps collapse but remain revisitable.` },
      { title: 'Learning the grid trick', text: `A working reference for the 0fr/1fr height animation, state-derived classes, and event delegation.` },
    ],
    faqs: [
      { q: 'How does the panel animate height without JavaScript measuring it?', a: `Each panel is display: grid with grid-template-rows: 0fr, transitioning to 1fr when the step is active. Fractional rows are interpolable, so the browser animates the row from zero to the content's natural height itself. The inner wrapper needs overflow: hidden so content clips during the transition. This replaces the old max-height hack, which needed a magic number and animated at the wrong speed when content was shorter than it.` },
      { q: 'Why track both current and maxReached?', a: `current alone cannot distinguish "behind me because I completed it" from "behind me because I pressed Back". maxReached records the furthest completion, so update() can mark steps done when they are below maxReached but not currently open. That is what lets Back and jump-to-title re-open a step for editing while its completed status (checkmark, filled connector) is restored the moment you move on.` },
      { q: 'How do I add validation so Continue is blocked on empty fields?', a: `In the Continue branch, query the active step's inputs and check them before advancing: const bad = steps[current].querySelector('.vst-input:invalid, .vst-input[required][value=""]'). Use the Constraint Validation API — mark inputs required, call input.reportValidity(), and only increment current when every field passes. Add an error class that turns the border red for inline feedback.` },
      { q: 'How do I add or remove steps?', a: `Copy a .vst-step block, update its number, data-step, and content, and place it in order — omit the .vst-line on whichever step is last. The script derives steps from a querySelectorAll and the delegated listener handles any count, so no JavaScript edits are needed. The completion banner triggers when current reaches steps.length, which recalculates automatically.` },
      { q: 'How do I use this vertical stepper in React, Vue, or Angular?', a: `Hold current and maxReached in state and render steps from a config array, deriving active/done classes per index — update() disappears into the template. Handlers become setState calls on button clicks. Keep field values in controlled state per step so you can validate before advancing and submit everything at the end. The 0fr grid transition, dot morph, and connector fill are pure CSS and port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the grid trick by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why animating grid-template-rows between 0fr and 1fr solves the "unknown content height" problem that a plain height transition cannot, and why the inner wrapper still needs overflow hidden even though the outer grid row is already collapsing. It's worth asking about the two-integer state model too — have it explain precisely why current alone can't distinguish "behind me because I finished it" from "behind me because I pressed Back," and what would break if maxReached were removed. For extending it, have it add per-step validation that blocks Continue until required inputs are filled, a progress percentage readout derived from current and steps.length, or a way to persist answers across a page reload. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a Material-style vertical multi-step form (stepper) in plain HTML, CSS, and vanilla JavaScript with no libraries, using the CSS grid-template-rows trick to animate panel height without any JavaScript measurement.

Requirements:
- Several sequential steps, each with a numbered dot, a connector line to the next step, a clickable title, and a collapsible panel containing that step's form fields.
- Each step's collapsible panel must be implemented as a single-cell CSS grid whose grid-template-rows transitions between 0fr (collapsed) and 1fr (expanded), with its inner content wrapper set to overflow hidden — do not use height, max-height, or any JavaScript scrollHeight measurement to animate the expand/collapse.
- Track exactly two numeric state values in JavaScript: the currently open step index, and the furthest step index the user has ever reached. Every visual state (which step is active, which are marked done) must be derived purely from comparing indices against these two numbers, not from separate flags stored per step.
- Each step's dot must visually morph between showing its number and showing a checkmark: cross-fade the number out and scale a checkmark icon in when the step becomes done, with the dot's background color transitioning at the same time.
- The connector line between two dots must fill downward with a scaleY transform (from 0 to 1, anchored at the top) when the upper step becomes done, rather than animating height or width.
- Clicking a "Continue" button must advance the current step and update the furthest-reached value; clicking "Back" must move the current step backward without ever reducing the furthest-reached value.
- Clicking the title of any step that is at or before the furthest-reached value must jump directly back to that step for editing, and its done state must be restored automatically once the user moves forward again.
- Handle all Continue/Back/title clicks through a single delegated click listener on the stepper's root container rather than binding a separate listener to every button.
- When the user continues past the final step, show a distinct completion banner and mark every step as done.`,
    },
  },
};

export default verticalStepper;
