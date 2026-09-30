const downloadButton = {
  id: 'download-button',
  title: 'Download Button',
  lastmod: '2026-06-17',
  category: 'buttons',
  html: `<div class="dl-stage">
  <button class="dl-btn" id="dlBtn" onclick="startDownload()">
    <span class="dl-state dl-idle">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
      Download
    </span>
    <span class="dl-state dl-loading">
      <svg class="dl-ring" viewBox="0 0 24 24" width="20" height="20">
        <circle class="dl-track" cx="12" cy="12" r="9"/>
        <circle class="dl-prog" id="dlProg" cx="12" cy="12" r="9"/>
      </svg>
      <span id="dlPct">0%</span>
    </span>
    <span class="dl-state dl-done">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      Saved
    </span>
  </button>
  <p class="dl-hint">Click to download · progress ring fills, then confirms</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px}
.dl-stage{text-align:center}

.dl-btn{position:relative;min-width:180px;height:52px;border:none;border-radius:14px;background:#6366f1;color:#fff;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer;overflow:hidden;transition:background .3s}
.dl-btn:hover{background:#4f46e5}
.dl-btn:active{transform:scale(.98)}
.dl-btn.loading{background:#4338ca;cursor:default}
.dl-btn.done{background:#10b981;cursor:default}

.dl-state{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:8px;opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s}
.dl-btn .dl-idle{opacity:1;transform:translateY(0)}
.dl-btn.loading .dl-idle{opacity:0;transform:translateY(-8px)}
.dl-btn.loading .dl-loading{opacity:1;transform:translateY(0)}
.dl-btn.done .dl-idle{opacity:0}
.dl-btn.done .dl-done{opacity:1;transform:translateY(0)}

.dl-ring{transform:rotate(-90deg)}
.dl-track{fill:none;stroke:rgba(255,255,255,.25);stroke-width:2.5}
.dl-prog{fill:none;stroke:#fff;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:56.5;stroke-dashoffset:56.5}
.dl-pct,#dlPct{font-variant-numeric:tabular-nums;font-size:14px;font-weight:700;min-width:34px;text-align:left}

.dl-hint{font-size:12px;color:#64748b}`,

  js: `var C = 2 * Math.PI * 9;
var btn = document.getElementById('dlBtn');
var prog = document.getElementById('dlProg');
var pct = document.getElementById('dlPct');
var raf = null;

function setProgress(p) {
  prog.style.strokeDashoffset = (C * (1 - p)).toFixed(2);
  pct.textContent = Math.round(p * 100) + '%';
}

function startDownload() {
  if (btn.classList.contains('loading') || btn.classList.contains('done')) return;
  btn.classList.add('loading');
  setProgress(0);
  var start = performance.now();
  var DURATION = 2200;

  function frame(now) {
    var p = Math.min(1, (now - start) / DURATION);
    // ease-out so it slows near the end like a real transfer
    setProgress(1 - Math.pow(1 - p, 2));
    if (p < 1) raf = requestAnimationFrame(frame);
    else finish();
  }
  raf = requestAnimationFrame(frame);
}

function finish() {
  btn.classList.remove('loading');
  btn.classList.add('done');
  setTimeout(function () {
    btn.classList.remove('done');
    setProgress(0);
  }, 1900);
}`,

  seo: {
    title: 'Download Button — Progress Ring HTML CSS JS Snippet',
    description: `Download button morphing through idle → progress-ring → success, with a JS-driven SVG ring, eased percentage & auto-reset. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Download Button — Idle → Progress Ring → Success State Machine`,
      description: `A download (or upload, or save) button that just sits there during a transfer feels broken. The polished version turns the click into a visible journey: the label gives way to a filling progress ring with a live percentage, and on completion it confirms with a checkmark. This snippet implements that micro-interaction in plain HTML, CSS, and vanilla JavaScript: a three-state button driven by a JavaScript-animated SVG ring, an eased percentage, and an automatic reset.

**Three states, cross-faded in place**

The button holds three layers — idle (icon + "Download"), loading (ring + percentage), and done (check + "Saved") — stacked absolutely and toggled by classes on the button. Switching states cross-fades the layers with opacity and a small vertical slide; the button keeps a fixed size, so there is no width-morph jank and the animation is purely opacity/transform, which exports cleanly to utility frameworks. The button background also shifts colour per state (indigo → deep indigo → green) to reinforce the change.

**JS-driven SVG progress ring**

The ring is two SVG circles: a faint track and a progress stroke. The progress is drawn with the stroke-dash technique — \`stroke-dasharray\` set to the circumference (\`2πr\`) and \`stroke-dashoffset\` reduced toward zero to "draw" the arc. Rather than a CSS transition (which utility frameworks do not reliably apply to \`stroke-dashoffset\`), the offset is updated every frame in a \`requestAnimationFrame\` loop, so the fill is smooth and fully under your control. The SVG is rotated \`-90deg\` so the ring starts filling from the top, the conventional direction.

**Eased, realistic progress**

A linear fill looks robotic. The loop applies an ease-out curve (\`1 - (1 - p)²\`) so the ring races ahead early and slows near the end — closer to how a real transfer behaves. The percentage text updates in lockstep with the ring from the same \`p\` value, so the number and the arc never disagree.

**Re-entrancy guard and auto-reset**

\`startDownload\` ignores clicks while the button is already loading or done, so spamming it cannot stack animations or restart mid-fill. On completion, \`finish\` switches to the success state and, after a short pause, resets the ring and returns to idle so the button is ready for another download.

The 2.2-second timer stands in for a real transfer — replace it by driving \`setProgress\` from a \`fetch\` with a \`ReadableStream\` reader or an \`XMLHttpRequest\` \`progress\` event. Pair this with a [loading button](/ui-snippets/loading-button/) for generic async actions, an [upload progress](/ui-snippets/upload-progress/) component, or an [add to cart button](/ui-snippets/add-to-cart-button/) micro-interaction.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A purple "Download" button with a download icon appears on a dark background.` },
      { title: 'Click it', text: `The label cross-fades to a progress ring that fills from the top while a percentage counts up beside it.` },
      { title: 'Watch the easing', text: `The ring races ahead early and eases as it nears 100%, mimicking a real transfer rather than a linear bar.` },
      { title: 'See the success state', text: `At 100% the button turns green and shows a checkmark with "Saved".` },
      { title: 'It auto-resets', text: `After about two seconds it fades back to the idle "Download" state, ready to run again.` },
      { title: 'Wire a real transfer', text: `Replace the timer by calling \`setProgress\` from a fetch stream or XHR \`progress\` event with the real loaded/total ratio.` },
    ] },
    features: [
      { title: 'Three-state cross-fade', text: `Idle, loading, and done layers stack and toggle by class, cross-fading with opacity/transform at a fixed button size — no width-morph jank.` },
      { title: 'JS-driven progress ring', text: `\`stroke-dashoffset\` is updated every \`requestAnimationFrame\` rather than via CSS transition, so the fill is smooth and export-safe.` },
      { title: 'Stroke-dash arc', text: `The ring uses \`stroke-dasharray\` = circumference and a shrinking offset to draw the arc — the standard SVG progress technique.` },
      { title: 'Top-start fill', text: `The SVG is rotated \`-90deg\` so progress begins at 12 o'clock, the conventional direction users expect.` },
      { title: 'Eased progress curve', text: `An ease-out (\`1 - (1 - p)²\`) makes the ring slow near the end, feeling like a real transfer instead of a robotic linear fill.` },
      { title: 'Synced percentage', text: `The number and the arc are derived from the same \`p\`, so they can never drift out of agreement.` },
      { title: 'Re-entrancy guard', text: `\`startDownload\` ignores clicks while loading or done, so rapid clicks cannot stack or restart the animation.` },
      { title: 'Auto-reset', text: `\`finish\` shows success, then resets the ring and returns to idle after a pause, re-arming the button.` },
    ],
    useCases: [
      { title: 'File and report downloads', text: `Show real progress while generating or fetching a file. Pair with an [upload progress](/ui-snippets/upload-progress/) component for the reverse flow.` },
      { title: 'Export actions', text: `"Export CSV/PDF" buttons where generation takes a moment — the ring reassures users it is working.` },
      { title: 'Save and sync buttons', text: `Save settings or sync data with visible progress; a richer alternative to a plain [loading button](/ui-snippets/loading-button/).` },
      { title: 'Install / update actions', text: `App or plugin install buttons that show download progress then a success check.` },
      { title: 'Media and asset fetching', text: `Downloading large images, videos, or design assets where a determinate ring beats an indeterminate spinner.` },
      { title: 'Checkout and purchase confirms', text: `Processing states for orders; combine with an [add to cart button](/ui-snippets/add-to-cart-button/) for the full purchase flow.` },
      { icon: 'CODE', title: 'Related: Fullscreen API Toggle Button', desc: 'See the [Fullscreen API Toggle Button](/ui-snippets/fullscreen-toggle-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I drive the ring from a real download?', a: `Use \`fetch\` and read the response body as a stream: get \`Content-Length\` for the total, then read chunks from \`response.body.getReader()\`, accumulating bytes and calling \`setProgress(received / total)\` as they arrive. Or with \`XMLHttpRequest\`, listen to the \`progress\` event and call \`setProgress(e.loaded / e.total)\`. Call \`finish()\` when the stream completes.` },
      { q: 'Why animate stroke-dashoffset in JS instead of CSS?', a: `For a real transfer you set the exact progress value as data arrives, which is inherently JS-driven. Even for the simulated version, utility frameworks (Tailwind) do not include \`stroke-dashoffset\` in their \`transition\` utility, so a CSS-transition approach would snap in the React + Tailwind export. Updating the offset each \`requestAnimationFrame\` is smooth and works identically everywhere.` },
      { q: 'How do I handle download errors?', a: `Add an \`error\` state class with a red background and an alert icon. In your fetch/XHR error or non-OK-status handler, cancel the animation frame, switch the button to the error state with a "Retry" affordance, and clear the loading class. Keep the re-entrancy guard so a failed attempt can be retried cleanly once reset.` },
      { q: 'How do I compute the dash values for a different ring size?', a: `The dash length is the circle's circumference, \`2 × π × r\`. Set both \`stroke-dasharray\` and the initial \`stroke-dashoffset\` to that value, then reduce the offset toward 0 as progress goes 0 → 1. If you change the circle's \`r\`, recompute \`C\` in the JS (the snippet derives it from \`r = 9\`) and update the CSS \`stroke-dasharray\` to match.` },
      { q: 'How do I use this download button in React, Vue, or Angular?', a: `In React, hold a status ('idle' | 'loading' | 'done') and \`progress\` in \`useState\`, render the ring offset from \`progress\`, and drive it from your fetch/XHR handler (cancel any rAF in a cleanup). In Vue, use \`ref\`s and \`:style\` for the offset. In Angular, track status/progress on the component and bind \`[style.strokeDashoffset]\`. The stroke-dash math and state CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the state machine yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setProgress() applies the ease-out curve 1 minus (1 minus p) squared to the stroke-dashoffset instead of a linear fill, and why the ring's progress is driven every frame from JavaScript rather than a plain CSS transition on stroke-dashoffset. The same assistant can help optimize it, for example checking whether the requestAnimationFrame loop should be cancelled if the button is removed from the DOM mid-download to avoid a leaked animation frame. It's also useful for extending the button: ask it to wire setProgress to a real fetch response stream's reader, add an error state with a retry affordance, or support a cancel button that aborts the in-flight transfer and resets the ring. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a download button with a three-state progress indicator in plain HTML, CSS, and JavaScript using an SVG ring — no animation library.

Requirements:
- A single fixed-size button containing three absolutely-positioned, stacked content layers: an idle layer (icon plus label), a loading layer (an SVG progress ring plus a live percentage number), and a done layer (checkmark plus success label), switching visibility by toggling CSS classes on the button rather than changing the button's size.
- Cross-fade between the three layers using only opacity and a small transform translate, with a fixed-height button so nothing reflows when state changes.
- The SVG ring must consist of a static track circle and a separate progress circle, both using stroke-dasharray set to the circle's circumference (2 times PI times the radius) computed in JavaScript from the radius, with the whole SVG rotated -90 degrees so the fill visibly starts from the top.
- Drive the progress circle's stroke-dashoffset from a requestAnimationFrame loop (not a CSS transition) so that every frame recomputes an eased value using an ease-out curve like 1 minus (1 minus progress) squared, making the fill move quickly at first and slow down near completion, and update the percentage text from that exact same eased value so the number and the ring can never show conflicting progress.
- Guard the trigger function so clicking the button while it is already in the loading or done state does nothing, preventing overlapping or restarted animations.
- On reaching 100 percent, switch to the done state showing a checkmark and success label, then after a short delay automatically reset the ring's offset and switch back to the idle state so the button is ready to be clicked again.`,
    },
  },
};

export default downloadButton;
