const dotsLoader = {
  id: 'dots-loader',
  title: 'Dots Loader',
  category: 'loaders',
  html: `<div class="page">

  <div class="section">
    <h3 class="label">Bounce</h3>
    <div class="loader bounce">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>

  <div class="section">
    <h3 class="label">Pulse</h3>
    <div class="loader pulse">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>

  <div class="section">
    <h3 class="label">Wave</h3>
    <div class="loader wave">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>

  <div class="section">
    <h3 class="label">Elastic Spinner</h3>
    <div class="spinner">
      <div class="ring"></div>
    </div>
  </div>

  <div class="section">
    <h3 class="label">Button loading state</h3>
    <button class="btn-loading" onclick="triggerLoad(this)">
      <span class="btn-text">Save changes</span>
      <span class="btn-dots" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
    </button>
  </div>

</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 24px; }

.page { display: flex; flex-direction: column; gap: 40px; align-items: center; width: 100%; }

.section { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.label { font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #94a3b8; }

/* ── Bounce loader ── */
.loader { display: flex; align-items: center; gap: 8px; }
.bounce .dot { width: 12px; height: 12px; border-radius: 50%; background: #6366f1; animation: bounce 1.2s ease-in-out infinite; }
.bounce .dot:nth-child(1) { animation-delay: 0s; }
.bounce .dot:nth-child(2) { animation-delay: 0.2s; }
.bounce .dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%,100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-14px); opacity: 1; } }

/* ── Pulse loader ── */
.pulse .dot { width: 10px; height: 10px; border-radius: 50%; background: #6366f1; animation: pulse-dot 1.4s ease-in-out infinite; }
.pulse .dot:nth-child(1) { animation-delay: 0s; }
.pulse .dot:nth-child(2) { animation-delay: 0.2s; }
.pulse .dot:nth-child(3) { animation-delay: 0.4s; }
.pulse .dot:nth-child(4) { animation-delay: 0.6s; }
@keyframes pulse-dot { 0%,100% { transform: scale(0.6); opacity: 0.3; } 50% { transform: scale(1.2); opacity: 1; } }

/* ── Wave loader ── */
.wave .dot { width: 8px; height: 32px; border-radius: 4px; background: #6366f1; animation: wave 1.2s ease-in-out infinite; }
.wave .dot:nth-child(1) { animation-delay: 0s; }
.wave .dot:nth-child(2) { animation-delay: 0.1s; }
.wave .dot:nth-child(3) { animation-delay: 0.2s; }
.wave .dot:nth-child(4) { animation-delay: 0.3s; }
.wave .dot:nth-child(5) { animation-delay: 0.4s; }
@keyframes wave { 0%,100% { transform: scaleY(0.3); opacity: 0.4; } 50% { transform: scaleY(1); opacity: 1; } }

/* ── Elastic spinner ── */
.spinner { width: 40px; height: 40px; }
.ring { width: 100%; height: 100%; border-radius: 50%; border: 3px solid #e2e8f0; border-top-color: #6366f1; animation: spin 0.8s cubic-bezier(0.6,0,0.4,1) infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Button loading state ── */
.btn-loading { display: inline-flex; align-items: center; gap: 8px; background: #6366f1; color: #fff; font-size: 14px; font-weight: 600; padding: 11px 22px; border: none; border-radius: 10px; cursor: pointer; transition: background 0.15s; min-width: 160px; justify-content: center; }
.btn-loading:hover { background: #4f46e5; }
.btn-dots { display: none; align-items: center; gap: 4px; }
.btn-dots span { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.8); animation: pulse-dot 1.2s ease-in-out infinite; }
.btn-dots span:nth-child(2) { animation-delay: 0.15s; }
.btn-dots span:nth-child(3) { animation-delay: 0.30s; }
.btn-loading.loading .btn-text { display: none; }
.btn-loading.loading .btn-dots { display: flex; }
.btn-loading.loading { background: #4f46e5; cursor: not-allowed; }`,
  js: `function triggerLoad(btn) {
  if (btn.classList.contains('loading')) return;
  btn.classList.add('loading');
  // Simulate async operation — replace with your real fetch/submit
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.querySelector('.btn-text').textContent = '✓ Saved!';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.querySelector('.btn-text').textContent = 'Save changes';
      btn.style.background = '';
    }, 2000);
  }, 2400);
}`,
  seo: {
    title: 'Dots Loader — Free HTML CSS Loading Snippet',
    description: 'Bounce, pulse, wave and elastic loading dots plus a button loading state — all pure CSS animations. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Dots Loader — Bounce, Pulse, Wave, Spinner & Button Loading State — Pure CSS Animations',
      description: `Loading dots are the most versatile and universally recognised loading indicator pattern. Unlike a [progress bar](/ui-snippets/progress-bar/) (which implies a known completion time) or a [skeleton loader](/ui-snippets/skeleton-loader/) (which implies imminent content), loading dots communicate "something is happening" in a neutral, open-ended way. This snippet provides four distinct dot animation variants plus a button loading state — all animating with pure CSS keyframes and no JavaScript for the animations themselves.\n\n**Bounce** uses translateY(-14px) at the 50% keyframe to lift each dot upward. Staggered animation-delay (0s, 0.2s, 0.4s) on the three dots creates the wave-bounce sequencing. Opacity fades from 0.4 to 1 in sync with the translation, giving the dots a depth illusion as if they are closer when raised.\n\n**Pulse** scales each dot from scale(0.6) to scale(1.2) with four dots at 0.2s staggered delays. The scale oscillation plus opacity creates a breathing, organic feel. This variant works well for "thinking" or processing states where there is no known end time.\n\n**Wave** uses bar-shaped dots (8×32px, border-radius: 4px) and scaleY animation — each bar shrinks to 30% height and grows back to full height in sequence, mimicking an audio waveform or equaliser. The five bars with 0.1s staggered delays create a smooth rolling wave.\n\n**Elastic Spinner** uses border-top-color: #6366f1 on a full-circle border to create the classic arc spinner. The cubic-bezier(0.6, 0, 0.4, 1) timing function accelerates and decelerates the rotation to give an elastic, bouncy feel — much more polished than linear spin.\n\n**Button Loading State** is the most practically useful variant. Clicking the button adds .loading which hides the text span and shows three inline pulse dots. After an async operation completes (replace the setTimeout with your real fetch call), the .loading class is removed and a success state is shown. The button becomes cursor: not-allowed during loading to prevent double-submission.\n\nAll animation variants use transform (translateY, scale, scaleY, rotate) and opacity — properties that run on the GPU compositor and never trigger layout recalculation, keeping all five animations at 60fps even on low-end devices.\n\n**Choosing the right variant**\n\nBounce works best for full-page loading overlays and large loading states where the vertical movement reads clearly. Pulse is the standard for "thinking" or processing states — three pulse dots are universally recognised as "in progress". Wave is distinctive for audio-adjacent contexts (music players, voice recorders, chat transcription). The elastic spinner is the most compact and works well in button loading states, small inline indicators, and form field validation spinners.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Pick your variant', text: 'Click the "Save changes" button to see the button loading state. All four animation variants (bounce, pulse, wave, spinner) run automatically on page load.' },
      { title: 'Copy just the variant you need', text: 'Copy only the HTML, CSS, and JS for the specific variant you need. Each is self-contained — bounce needs only .bounce .dot CSS rules, pulse needs only .pulse .dot, and so on.' },
      { title: 'Wire the button loading state to your form', text: 'In JS, replace the setTimeout inside triggerLoad() with your real fetch or form submission. Call btn.classList.remove("loading") inside .then() or .finally() so the button always re-enables even on error.' },
      { title: 'Change the loader colour', text: 'Replace #6366f1 in the CSS with your brand accent colour. This updates all four variants simultaneously. For the button dots, they use rgba(255,255,255,0.8) — white on the coloured button background.' },
      { title: 'Change the dot size and gap', text: 'Update the width and height on .dot for each variant. Change gap on .loader to control spacing between dots. For the wave variant, adjust the height on .wave .dot (default 32px) to control bar height.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component where the button loading state uses useState, or "Tailwind" for a Tailwind CSS version.' },
    ]},
    features: ['Bounce: translateY(-14px) + opacity with 0.2s staggered animation-delay','Pulse: scale(0.6→1.2) + opacity on 4 dots with staggered delay','Wave: scaleY(0.3→1) on 5 bar-shaped dots — equaliser/waveform effect','Spinner: border-top-color arc + cubic-bezier(0.6,0,0.4,1) elastic timing','Button loading: .loading hides text, shows inline dots, disables re-click','Button success: removes .loading, shows ✓ Saved!, green background for 2s','All animations: transform + opacity only — GPU compositor, no layout triggers','Zero JavaScript for the four display variants — pure CSS keyframes'],
    useCases: [
      { icon: 'APP', title: 'Form submission and async operation feedback', desc: 'The button loading state prevents double-submission and communicates that the form is being processed. Wire to fetch() or axios — add .loading on click, remove in .then()/.finally(). The cursor: not-allowed prevents impatient re-clicks.' },
      { icon: 'FLOW', title: 'Chat typing indicators and real-time presence', desc: 'The pulse dots (3-dot variant) is the universal "someone is typing" indicator in chat UIs. Position it absolutely in the chat thread below the last message when the other user is composing a reply.' },
      { icon: 'DESIGN', title: 'Full-page loading overlays for route transitions', desc: 'Place any variant inside a fixed overlay (position:fixed, inset:0, background:rgba(255,255,255,0.9)) for a full-page loading overlay. Show on route change start, remove on completion. The bounce and spinner variants work best at large sizes for overlay contexts.' },
      { icon: 'CODE', title: 'Inline content-loading placeholders', desc: 'Use the pulse dots inline inside a card or widget while its data loads. Replace the dots with the actual content once the fetch resolves — same container, same position. Simpler than a full skeleton loader for single-value displays.' },
      { icon: 'LEARN', title: 'Study CSS keyframe animation staggering technique', desc: 'The staggered animation-delay pattern — giving nth-child elements increasing delay values — is the core technique behind most multi-element CSS animations. This snippet shows three variants of the same pattern: translateY stagger, scale stagger, and scaleY stagger.' },
      { icon: 'STAR', title: 'Music players and audio equaliser visualisations', desc: 'The wave variant bars mimic an audio equaliser — for a real signal-driven version, see the [audio waveform visualizer](/ui-snippets/audio-waveform-visualizer/). Change the background to your audio player accent colour, remove the label, and position it in the "now playing" indicator area. Add animation-play-state: paused when audio is paused to freeze the bars.' },
      { icon: 'CODE', title: 'Related: SVG Logo Draw-In Loader', desc: 'See the [SVG Logo Draw-In Loader](/ui-snippets/loader-brand-logo-draw/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Streaming Text Skeleton Reveal', desc: 'See the [Streaming Text Skeleton Reveal](/ui-snippets/streaming-text-skeleton-reveal/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use transform/opacity for animations instead of changing width or height?', a: 'CSS properties that trigger layout recalculation (width, height, top, left, margin, padding) cause the browser to recalculate the positions of all affected elements on every animation frame — expensive on any device. Properties handled by the GPU compositor (transform: translateY, scale, rotate and opacity) bypass layout and paint entirely. The GPU moves pixels directly. This is why these dot animations run at 60fps even on mobile — they never touch the main thread.' },
      { q: 'How do I prevent the button from being clicked twice while loading?', a: 'The .loading class sets cursor: not-allowed and the triggerLoad() function returns early if the button already has the .loading class (if (btn.classList.contains("loading")) return). For a more robust solution, also set btn.disabled = true on click and btn.disabled = false in your .finally() handler — the disabled attribute prevents click events at the browser level, not just visually.' },
      { q: 'How do I use the button loading state in React?', a: 'Click "JSX" to download. In React: const [loading, setLoading] = useState(false). On click: setLoading(true); try { await yourApiCall(); setSuccess(true); } finally { setLoading(false); }. Conditionally render the text or dots: {loading ? <Dots /> : "Save changes"}. Add disabled={loading} to the button element. Use useRef if you need to reset button text after success.' },
      { q: 'How do I make the wave loader animate only when visible in the viewport?', a: 'Use IntersectionObserver: const obs = new IntersectionObserver(([entry]) => { entry.target.style.animationPlayState = entry.isIntersecting ? "running" : "paused"; }); obs.observe(document.querySelector(".wave")). This pauses the animation when the element is scrolled out of view, saving GPU resources on long pages with multiple loaders.' },
    ],
    aiPrompt: {
      paragraph: `Rather than reasoning through four keyframe sets on your own, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the bounce, pulse, and wave animations stagger with animation-delay on nth-child selectors instead of JavaScript timers, and why every variant only animates transform and opacity rather than width, height, or top/left. The same assistant can help optimize it, for instance checking whether the button loading state's two nested setTimeout calls in triggerLoad() could drift out of sync with a real fetch promise chain. It's also useful for extending the pattern: ask it to add a fifth loader variant with a different stagger shape, wire the button's loading state to an actual async function with proper error handling, or pause an off-screen loader's animation with IntersectionObserver to save GPU cycles. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a set of loading indicators in plain HTML and CSS using only keyframe animations, plus one interactive button loading state in vanilla JavaScript — no animation library.

Requirements:
- A bounce loader: three dot elements that each translateY upward and back with synchronized opacity change, where each dot's animation-delay is staggered (e.g. 0s, 0.2s, 0.4s) purely via nth-child CSS selectors so no JavaScript drives the timing.
- A pulse loader: four dots that scale up and down between two scale factors with staggered delays, using the same nth-child stagger technique.
- A wave loader: five bar-shaped elements (tall and narrow, not circular) that animate scaleY between a shrunken and full height with tighter staggered delays, so they read as a rolling audio-equalizer wave.
- An elastic spinner: a single circular element with a transparent track color and one differently-colored border side, rotating continuously with a cubic-bezier easing curve rather than linear, so the spin has a bouncy, elastic feel.
- Every one of the above four variants must animate only the transform and opacity CSS properties, never width, height, margin, or position offsets, so they run on the GPU compositor without triggering layout.
- A button with a loading state: clicking it swaps its visible label for an inline three-dot pulse animation and disables re-clicks while "loading" (simulated with a timeout, structured so it is obvious where a real fetch or form submission promise would plug in), then on completion shows a temporary success label and color before reverting to its original idle label and color.`,
    },
  },
};

export default dotsLoader;
