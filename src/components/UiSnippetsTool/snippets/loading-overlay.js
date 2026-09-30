const loadingOverlay = {
  id: 'loading-overlay',
  title: 'Loading Overlay',
  category: 'loaders',
  html: `<div class="page">
  <div class="content-card">
    <h2>Dashboard Overview</h2>
    <p>This card represents your page content.</p>
    <div class="mini-grid">
      <div class="stat-block"><div class="stat-n">$48,295</div><div class="stat-l">Revenue</div></div>
      <div class="stat-block"><div class="stat-n">1,284</div><div class="stat-l">Users</div></div>
      <div class="stat-block"><div class="stat-n">94.2%</div><div class="stat-l">Uptime</div></div>
    </div>
  </div>

  <div class="trigger-row">
    <button class="trigger-btn" onclick="showOverlay('spinner')">Spinner overlay</button>
    <button class="trigger-btn" onclick="showOverlay('dots')">Dots overlay</button>
    <button class="trigger-btn" onclick="showOverlay('progress')">Progress overlay</button>
    <button class="trigger-btn outline" onclick="hideOverlay()">Hide</button>
  </div>

  <!-- Overlay -->
  <div class="overlay" id="overlay">
    <div class="overlay-box" id="overlay-box">
      <!-- Spinner -->
      <div class="loader-wrap" id="l-spinner">
        <div class="spinner"></div>
        <div class="overlay-msg">Loading data…</div>
      </div>
      <!-- Dots -->
      <div class="loader-wrap hidden" id="l-dots">
        <div class="dots"><span></span><span></span><span></span></div>
        <div class="overlay-msg">Processing…</div>
      </div>
      <!-- Progress -->
      <div class="loader-wrap hidden" id="l-progress">
        <div class="overlay-msg">Uploading files…</div>
        <div class="prog-track"><div class="prog-fill" id="prog-fill"></div></div>
        <div class="prog-pct" id="prog-pct">0%</div>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.page { width: 100%; max-width: 500px; position: relative; display: flex; flex-direction: column; gap: 16px; }

.content-card { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; }
.content-card h2 { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
.content-card p  { font-size: 13px; color: #64748b; margin-bottom: 20px; }
.mini-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
.stat-block { text-align: center; }
.stat-n { font-size: 18px; font-weight: 800; color: #0f172a; }
.stat-l { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }

.trigger-row { display: flex; gap: 8px; flex-wrap: wrap; }
.trigger-btn { background: #6366f1; color: #fff; border: none; border-radius: 9px; padding: 9px 16px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.12s; }
.trigger-btn:hover { background: #4f46e5; }
.trigger-btn.outline { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
.trigger-btn.outline:hover { border-color: #6366f1; color: #6366f1; }

/* Overlay */
.overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.85); backdrop-filter: blur(6px); border-radius: 16px; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.25s; z-index: 10; }
.overlay.visible { opacity: 1; pointer-events: all; }

.overlay-box { display: flex; flex-direction: column; align-items: center; gap: 14px; }

.loader-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.loader-wrap.hidden { display: none; }

.overlay-msg { font-size: 14px; font-weight: 600; color: #475569; }

/* Spinner */
.spinner { width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: #6366f1; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Dots */
.dots { display: flex; gap: 7px; }
.dots span { width: 10px; height: 10px; border-radius: 50%; background: #6366f1; animation: bounce 1.2s ease-in-out infinite; }
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%,100%{transform:translateY(0);opacity:0.4} 50%{transform:translateY(-10px);opacity:1} }

/* Progress */
.prog-track { width: 220px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
.prog-fill  { height: 100%; background: linear-gradient(90deg,#6366f1,#10b981); border-radius: 3px; width: 0%; transition: width 0.3s ease; }
.prog-pct   { font-size: 12px; font-weight: 700; color: #6366f1; }`,
  js: `let progInterval = null;

function showOverlay(type) {
  clearInterval(progInterval);
  ['l-spinner','l-dots','l-progress'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById('l-' + type).classList.remove('hidden');
  document.getElementById('overlay').classList.add('visible');

  if (type === 'progress') {
    let pct = 0;
    document.getElementById('prog-fill').style.width = '0%';
    document.getElementById('prog-pct').textContent = '0%';
    progInterval = setInterval(() => {
      pct += Math.random() * 8 + 2;
      if (pct >= 100) { pct = 100; clearInterval(progInterval); setTimeout(hideOverlay, 600); }
      document.getElementById('prog-fill').style.width = pct.toFixed(0) + '%';
      document.getElementById('prog-pct').textContent = pct.toFixed(0) + '%';
    }, 300);
  } else {
    setTimeout(hideOverlay, 3000);
  }
}

function hideOverlay() {
  clearInterval(progInterval);
  document.getElementById('overlay').classList.remove('visible');
}`,
  seo: {
    title: 'Loading Overlay — Free HTML CSS JS Snippet',
    description: 'Section loading overlays in three variants — spinner, dots and progress bar — with backdrop blur. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Loading Overlay — Spinner, Dots & Progress Bar Variants with Blur Backdrop and Opacity Fade',
      description: `A loading overlay blocks a section or full page during an asynchronous operation — API call, file upload, data processing — to prevent user interaction with partially loaded content and communicate that something is happening. This snippet provides three overlay variants: a classic CSS spinner, bouncing dots, and a simulated progress bar — all with a frosted glass backdrop-filter blur and opacity fade transition.\n\n**The overlay backdrop**\n\nThe overlay uses position: absolute; inset: 0 to cover the parent container entirely. background: rgba(255,255,255,0.85) provides a semi-transparent white tint. backdrop-filter: blur(6px) blurs the content behind the overlay — the frosted glass effect. In the closed state, opacity: 0 and pointer-events: none make the overlay invisible and non-interactive. Adding .visible switches to opacity: 1 and pointer-events: all. The CSS transition: opacity 0.25s fades smoothly.\n\n**Spinner variant**\n\nThe spinner uses border-top-color: #6366f1 on an otherwise light grey bordered circle, rotated continuously via a CSS keyframe animation. The cubic-bezier timing is linear for a consistent revolution speed.\n\n**Dots variant**\n\nThree bouncing [dots](/ui-snippets/dots-loader/) use translateY(-10px) at the 50% keyframe with staggered animation-delay (0s, 0.2s, 0.4s). Opacity fades from 0.4 to 1 in sync.\n\n**Progress bar variant**\n\nA simulated setInterval advances the [progress bar](/ui-snippets/progress-bar/) by a random amount (2–10%) every 300ms. When it reaches 100%, the interval clears and hideOverlay() fires after a 600ms delay. In production, replace the simulation with a real upload progress event: xhr.upload.onprogress = e => { const pct = e.loaded/e.total*100; updateProgress(pct); }.\n\n**Positioning: absolute vs fixed**\n\nThe overlay uses position: absolute to cover only the parent .page container. For a full-page overlay, change to position: fixed; inset: 0; z-index: 9999 and attach it to the document body instead of a container div. The blur and opacity behaviour is identical — only the covered area changes.\n\n**Performance note**\n\nbackdrop-filter: blur() is GPU-composited but can be expensive on older mobile devices. If performance is a concern, replace backdrop-filter with background: rgba(255,255,255,0.94) without blur. Test with Chrome DevTools Performance to confirm the overlay renders without triggering main-thread layout recalculation. All three loader animations (spinner rotation, dots bounce, progress bar fill) use transform and width — both GPU-safe properties that avoid layout recalculation on each animation frame. For mobile-first projects, always prefer transform-based animations over properties that trigger layout or paint — this principle applies equally to the overlay's loader variants and any other CSS animation throughout the codebase.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click any trigger button to see the overlay variant', text: 'Spinner overlay shows for 3 seconds then auto-hides. Dots overlay shows for 3 seconds then auto-hides. Progress overlay simulates a file upload, advancing the bar and auto-closing at 100%.' },
      { title: 'Wrap your content in a position:relative container', text: 'The overlay covers the nearest position:relative ancestor. Ensure your .page or section container has position: relative set. The overlay uses position: absolute; inset: 0 to fill it exactly.' },
      { title: 'Wire to a real API call or upload event', text: 'Show on fetch start: showOverlay("spinner"). Hide on .then() or .finally(): hideOverlay(). For uploads: show progress variant, then wire xhr.upload.onprogress to updateProgress(pct). Hide on upload complete.' },
      { title: 'Convert to a full-page overlay', text: 'Change position: absolute to position: fixed on .overlay. Remove border-radius: 16px. The overlay now covers the entire viewport instead of just the parent container.' },
      { title: 'Change the overlay opacity and blur', text: 'Update rgba(255,255,255,0.85) to control the backdrop tint opacity. Increase or decrease blur(6px) on backdrop-filter. For dark-themed pages, use rgba(0,0,0,0.6) for a dark overlay with white spinner.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component with visible/type state managed by useState, or "Tailwind" for a Tailwind CSS version.' },
    ]},
    features: ['Overlay: position:absolute inset:0, opacity fade, pointer-events:none toggle','backdrop-filter:blur(6px) — frosted glass effect over the covered content','Spinner variant: border-top-color accent, linear rotation keyframe','Dots variant: 3 bouncing dots with staggered translateY animation','Progress variant: random-increment simulation, auto-close at 100%','Three variants share one overlay container — hidden via .hidden class','hideOverlay() shared function clears intervals and removes .visible class','For full-page overlay: change position:absolute to position:fixed'],
    useCases: [
      { icon: 'APP', title: 'API call and data fetch loading states', desc: 'Show the spinner overlay when initiating a fetch call and hide it in .finally() — this covers the content area regardless of whether the request succeeds or fails, preventing partial state display.' },
      { icon: 'FLOW', title: 'File upload and form submission feedback', desc: 'Show the progress bar variant during file uploads, or the dedicated [upload progress](/ui-snippets/upload-progress/) card for per-file detail. Wire xhr.upload.onprogress to the progress fill width. The visual bar gives users confidence the upload is proceeding and shows completion percentage without requiring them to leave the page.' },
      { icon: 'DESIGN', title: 'Dashboard and widget loading states', desc: 'Overlay individual dashboard cards while their data loads. Use the spinner variant for short waits (under 2 seconds) and the dots variant for unknown-duration processing. Each widget has its own overlay, so sections load independently as their APIs respond.' },
      { icon: 'CODE', title: 'Route transitions in single-page applications', desc: 'For SPA route changes, show a full-page overlay (position:fixed) while new page data loads. The blur and fade create a premium transition feel. Remove the overlay when the new page content is ready to render.' },
      { icon: 'LEARN', title: 'Study backdrop-filter blur and opacity toggle patterns', desc: 'The overlay demonstrates how backdrop-filter: blur() creates the frosted glass effect over real content. The opacity + pointer-events toggle pattern is reusable for any show/hide transition — the pattern prevents invisible elements from blocking clicks.' },
      { icon: 'STAR', title: 'Image and media processing feedback screens', desc: 'Show the progress bar variant while processing images (resize, convert, compress) or media files (transcode, merge, compress). Update progress from your processing API\'s progress webhook or polling endpoint.' },
      { icon: 'CODE', title: 'Related: Diagonal Shimmer Skeleton', desc: 'See the [Diagonal Shimmer Skeleton](/ui-snippets/loader-shimmer-diagonal-sweep/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I wire the progress bar to a real file upload?', a: 'Replace the setInterval simulation with an XMLHttpRequest upload progress listener: const xhr = new XMLHttpRequest(); xhr.upload.onprogress = e => { if (e.lengthComputable) { const pct = Math.round(e.loaded/e.total*100); document.getElementById("prog-fill").style.width = pct + "%"; document.getElementById("prog-pct").textContent = pct + "%"; if (pct >= 100) setTimeout(hideOverlay, 600); } }; xhr.open("POST", "/upload"); xhr.send(formData). Show the progress overlay before calling xhr.send().' },
      { q: 'How do I make this a full-page overlay covering the entire screen?', a: 'Move the .overlay div to be a direct child of body (not inside the .page container). Change position: absolute to position: fixed in the CSS and remove border-radius: 16px. Now the overlay covers the full viewport. Set z-index: 9999 to ensure it appears above all page content. The opacity fade and blur work identically — only the covered area changes.' },
      { q: 'How do I use a dark overlay for dark-themed pages?', a: 'Change background: rgba(255,255,255,0.85) to background: rgba(0,0,0,0.6) on .overlay. Change .overlay-msg color to #f1f5f9. Change .spinner border colour to rgba(255,255,255,0.15) and border-top-color to #fff. The dots and progress bar can remain the same since they use the accent colour which reads on dark.' },
      { q: 'How do I use loading overlays in React?', a: 'Manage loading state with useState: const [loading, setLoading] = useState({ visible: false, type: "spinner" }). Render the overlay: {loading.visible && <div className="overlay visible">...</div>}. On API call: setLoading({visible:true, type:"spinner"}) before fetch, setLoading({visible:false, type:"spinner"}) in finally(). Pass the loading type to conditionally render the correct variant inside the overlay box.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to trace the class toggling across three loader variants by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how showOverlay(type) hides the other two .loader-wrap variants before revealing the requested one, and why clearInterval(progInterval) is called both at the start of showOverlay and inside hideOverlay. The same assistant can help optimize it, for instance asking whether backdrop-filter: blur is worth swapping for a plain semi-transparent background on lower-end mobile devices, given how expensive that filter can be to composite. It is also useful for extending the overlay: ask it to wire the progress variant to a real XMLHttpRequest upload.onprogress event instead of the random-increment simulation, add a fourth "error" loader variant with a retry button, or convert the overlay from position: absolute to position: fixed for a full-page version. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "loading overlay" component in plain HTML, CSS, and JavaScript with no libraries, supporting three interchangeable loader variants inside one overlay container.

Requirements:
- An overlay element positioned absolutely to cover its nearest positioned ancestor (inset: 0), with a semi-transparent white background and a backdrop-filter: blur applied for a frosted-glass look, hidden by default via opacity: 0 and pointer-events: none, and revealed via a single class toggle that animates opacity to 1 and re-enables pointer-events with a CSS transition.
- Three loader variants living inside the same overlay box, each in its own wrapper element toggled with a hidden class: a rotating CSS-only spinner (border-top-color trick, no SVG), a row of three bouncing dots with staggered animation-delay values, and a progress bar with a percentage label.
- A single JS function that accepts which variant to show, first hides all three variants, then reveals only the requested one and makes the overlay visible — so only one loader is ever shown at a time regardless of call order.
- For the progress variant specifically: a setInterval must advance a percentage by a random increment every 300ms, update both the bar's width and a text percentage label each tick, and when the percentage reaches or exceeds 100, clear the interval, clamp it to exactly 100, and auto-hide the overlay after a short delay.
- A shared hide function must clear any running progress interval and remove the overlay's visible class, and it must be safe to call even if no interval is currently running.
- Document, in a code comment or structure, how to convert the overlay from covering a single container (position: absolute) to covering the full viewport (position: fixed) by changing only the position property and z-index, without altering the loader variants or JS logic.`,
    },
  },
};

export default loadingOverlay;
