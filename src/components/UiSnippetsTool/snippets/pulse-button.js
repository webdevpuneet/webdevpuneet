const pulseButton = {
  id: 'pulse-button',
  title: 'Pulse Button',
  lastmod: '2026-07-18',
  category: 'buttons',
  html: `<div class="pb-stage">
  <button type="button" class="pb-btn" id="pbBtn">
    <span class="pb-ring" aria-hidden="true"></span>
    <span class="pb-ring pb-ring2" aria-hidden="true"></span>
    <span class="pb-label">● Go live</span>
  </button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a14;display:flex;justify-content:center;align-items:center;min-height:100vh}

.pb-stage{padding:50px}
.pb-btn{position:relative;border:none;border-radius:14px;padding:15px 30px;font-family:inherit;font-size:15px;font-weight:800;color:#fff;cursor:pointer;background:linear-gradient(120deg,#e11d48,#f43f5e);box-shadow:0 10px 30px -8px rgba(244,63,94,.6);transition:transform .15s}
.pb-btn:hover{transform:translateY(-2px)}
.pb-btn:active{transform:translateY(0)}
.pb-label{position:relative;z-index:1}

/* Two expanding rings emit from the button on a staggered loop, fading as they
   grow — a sonar pulse that signals "live" or "act now". */
.pb-ring{position:absolute;inset:0;border-radius:inherit;background:#f43f5e;z-index:0;animation:pbPulse 2s ease-out infinite}
.pb-ring2{animation-delay:1s}
@keyframes pbPulse{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.7);opacity:0}}

.pb-btn.stopped .pb-ring{animation-play-state:paused;opacity:0}`,

  js: `var btn = document.getElementById('pbBtn');
var label = btn.querySelector('.pb-label');
var live = true;

// Toggle the live state: clicking stops the pulse and flips the label, like
// starting/stopping a broadcast.
btn.addEventListener('click', function () {
  live = !live;
  btn.classList.toggle('stopped', !live);
  label.textContent = live ? '● Go live' : '■ Stop';
  btn.style.background = live
    ? 'linear-gradient(120deg,#e11d48,#f43f5e)'
    : 'linear-gradient(120deg,#334155,#475569)';
  btn.style.boxShadow = live ? '0 10px 30px -8px rgba(244,63,94,.6)' : 'none';
});

// Pause rings when off-screen to avoid needless compositing.
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    btn.querySelectorAll('.pb-ring').forEach(function (r) {
      r.style.animationPlayState = (e.isIntersecting && live) ? 'running' : 'paused';
    });
  });
}, { threshold: 0 });
io.observe(btn);`,

  seo: {
    title: 'Pulse Button — Free HTML CSS JS Sonar Pulse Snippet',
    description: `A call-to-action button that emits staggered expanding pulse rings to draw the eye, with a live/stop toggle and off-screen pausing. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Pulse Button — Sonar Rings That Draw the Eye to an Action',
      description: `The pulse button is the attention-grabbing call to action that emits expanding rings like sonar — perfect for "Go live," "Record," or any action you want users to notice. This snippet builds it with plain HTML, CSS, and a little vanilla JavaScript for a live/stop toggle and efficient off-screen pausing.

**The expanding pulse rings**

Behind the button label sit two ring elements that share the button shape (\`inset: 0\`, \`border-radius: inherit\`). The \`pbPulse\` keyframe scales each ring from \`1\` to \`1.7\` while fading its opacity from \`.55\` to \`0\`, so it grows outward and dissolves — the sonar ping. Because the rings inherit the button border radius, the pulse takes the button shape rather than a plain circle, which looks more integrated. The rings sit at \`z-index: 0\` behind the label so the text stays crisp on top.

**Staggering for a continuous ripple**

A single ring would pulse, pause, then pulse again with a visible gap. Two rings with the second offset by \`animation-delay: 1s\` (half the 2-second loop) means a new ring is always emerging as the previous one finishes — so the effect is a continuous, overlapping ripple rather than a blinking single pulse. This stagger-by-half-the-duration is the standard trick for seamless looping emitters.

**A meaningful toggle**

The button is not just decorative — clicking it toggles a live state. When live, it shows "● Go live" with a red gradient and pulsing rings; clicking flips it to "■ Stop" with a muted gray gradient, removes the shadow, and pauses the rings via a \`.stopped\` class. This mirrors real broadcast or recording controls, where the pulse communicates an active state and stopping it calms the button. Wire the toggle to your actual start/stop logic and the visual state follows.

**Pausing off-screen**

Continuously scaling, fading rings cost compositing work, so an \`IntersectionObserver\` watches the button and pauses the ring animations whenever the button scrolls out of view (and only resumes them if it is both visible and live). With \`threshold: 0\` it reacts as soon as any part leaves the viewport. This keeps a page with a persistent pulsing CTA from doing animation work nobody can see.

**Why CSS rings over JavaScript**

The pulse is pure CSS keyframes, so it runs on the compositor without any per-frame scripting — the JavaScript only flips classes and styles on discrete events (click, visibility change). That keeps the effect smooth and cheap even if several pulse buttons appear on a page.

**Customizing it**

Change the \`scale\` target and \`opacity\` curve for a larger or subtler pulse, retime the loop and adjust the second ring delay to match, add a third ring for a denser ripple, recolor the rings and gradients, or change the labels and states. Use it for notifications, record buttons, or live indicators. Pair it with a [shiny text](/ui-snippets/shiny-text/) badge or a [border beam](/ui-snippets/border-beam/) card to coordinate attention cues.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A red Go live button emits expanding sonar rings.` },
      { title: 'Watch the ripple', text: `Two staggered rings keep a continuous pulse going.` },
      { title: 'Click the button', text: `It toggles to a muted Stop state and the pulse halts.` },
      { title: 'Click again', text: `It returns to the live, pulsing state.` },
      { title: 'Scroll it away', text: `The rings pause off-screen to save work.` },
      { title: 'Recolor and retime', text: `Adjust the ring scale, colors, and loop.` },
    ] },
    features: [
      { title: 'Shape-matched rings', text: `Pulses inherit the button border radius.` },
      { title: 'Staggered emitters', text: `Two rings offset for a seamless ripple.` },
      { title: 'Scale-and-fade pulse', text: `Rings grow and dissolve outward.` },
      { title: 'Live/stop toggle', text: `Click flips state, label, and colors.` },
      { title: 'Off-screen pause', text: `IntersectionObserver stops unseen pulses.` },
      { title: 'Crisp label', text: `Text sits above the rings via z-index.` },
      { title: 'Pure-CSS animation', text: `JS only handles discrete events.` },
      { title: 'Hover and press', text: `Subtle lift and settle on interaction.` },
    ],
    useCases: [
      { title: 'Live and record buttons', text: `Signal an active broadcast or recording.` },
      { title: 'Primary CTAs', text: `Draw the eye next to a [shiny text](/ui-snippets/shiny-text/) badge.` },
      { title: 'Notification prompts', text: `Pair with a [notification bell](/ui-snippets/notification-bell/).` },
      { title: 'Urgent actions', text: `Highlight a [sticky promo bar](/ui-snippets/sticky-promo-bar/) button.` },
      { title: 'Status indicators', text: `Show a live state on a [status dashboard](/ui-snippets/status-dashboard/).` },
      { title: 'Pulse animation demos', text: `A reference for staggered sonar rings.` },
      { icon: 'CODE', title: 'Related: WhatsApp Floating Button', desc: 'See the [WhatsApp Floating Button](/ui-snippets/whatsapp-floating-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the continuous ripple achieved?', a: `Two ring elements run the same pulse keyframe, but the second has an animation-delay of half the loop duration. That means a new ring is always emerging as the previous one finishes, so instead of one ring pulsing with a visible gap, the rings overlap into a continuous ripple. Staggering by half the duration is the standard trick for seamless emitters.` },
      { q: 'Why do the pulses match the button shape?', a: `The rings use inset: 0 and border-radius: inherit, so they take the button rounded-rectangle shape rather than a plain circle. As the pbPulse keyframe scales and fades them, the pulse grows outward in the button shape, which looks more integrated than a generic circular ping.` },
      { q: 'Does the button do anything besides animate?', a: `Yes. Clicking toggles a live state: live shows a red Go live with pulsing rings, and stopped shows a muted Stop with the rings paused and the shadow removed via a class. It mirrors a broadcast or record control, and you can wire the toggle to your real start/stop logic so the visual state tracks it.` },
      { q: 'Is it efficient on a long page?', a: `Yes. The pulse is pure CSS keyframes running on the compositor, and an IntersectionObserver pauses the ring animations whenever the button is off-screen, resuming only when it is both visible and live. So a persistent pulsing CTA does no animation work while it is scrolled out of view.` },
      { q: 'How do I use this pulse button in React, Vue, or Angular?', a: `Render the button with its ring elements and keep the live state in component state, toggling a class and the label on click. Put the IntersectionObserver in a mount effect with cleanup on unmount. The pulse keyframes are pure CSS. In Tailwind, define the pulse animation in the config and apply it to the ring spans with a delayed variant for the second ring.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to work out the ring timing by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the second ring's animation-delay is set to half the pbPulse loop duration and what would happen visually if that offset were mismatched with the loop length. The same assistant is useful for optimizing it — ask whether the IntersectionObserver threshold of 0 is the right choice if the button sits inside a scrollable panel rather than the main page, or whether toggling animation-play-state is cheaper than adding and removing the ring elements outright. It is just as handy for extending the effect — ask it to add a third staggered ring for a denser ripple, drive the live/stopped state from a real WebSocket connection instead of a click, or expose the ring color and scale target as CSS custom properties so multiple buttons on one page can each pulse a different hue. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "pulse button" call-to-action in plain HTML, CSS, and JavaScript using only CSS keyframe animations and the IntersectionObserver API — no animation libraries.

Requirements:
- A button containing a text label plus two absolutely positioned ring elements behind it (inset: 0, border-radius: inherit so the rings take the button's exact shape, not a plain circle), with the label kept above the rings via z-index.
- A single keyframe animation that scales each ring from 1 to roughly 1.7 while fading its opacity from about 0.55 to 0, running on an infinite 2-second ease-out loop.
- The second ring must reuse the exact same animation but with an animation-delay equal to half the loop duration (1s for a 2s loop), so a new ring is always emerging as the previous one fades out, producing a continuous overlapping ripple instead of a pulse-then-gap pattern.
- Clicking the button must toggle a live/stopped state: swap the label text and icon, switch the button's background gradient to a muted tone, remove its box-shadow, and add a class that pauses both rings via animation-play-state.
- Use an IntersectionObserver watching the button (threshold: 0) to pause the ring animations whenever the button scrolls out of view, and only resume them if the button is both visible and in the live state — so no compositing work happens for a pulse nobody can see.
- Do not implement the pulsing in JavaScript (no per-frame opacity/scale updates) — the ring motion must be pure CSS running on the compositor, with JavaScript limited to toggling classes and inline styles on discrete events.`,
    },
  },
};

export default pulseButton;
