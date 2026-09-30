const comingSoonHero = {
  id: 'coming-soon-hero',
  title: 'Coming Soon Hero',
  category: 'heroes',
  html: `<section class="hero">
  <div class="glow"></div>

  <div class="badge">🚀 Launching soon</div>
  <h1 class="headline">Something <span class="grad">amazing</span><br>is coming</h1>
  <p class="sub">We are putting the finishing touches on something you will love. Be the first to know when we launch.</p>

  <div class="countdown" id="countdown">
    <div class="cd-block"><span class="cd-n" id="cd-d">00</span><span class="cd-l">Days</span></div>
    <div class="cd-sep">:</div>
    <div class="cd-block"><span class="cd-n" id="cd-h">00</span><span class="cd-l">Hours</span></div>
    <div class="cd-sep">:</div>
    <div class="cd-block"><span class="cd-n" id="cd-m">00</span><span class="cd-l">Minutes</span></div>
    <div class="cd-sep">:</div>
    <div class="cd-block"><span class="cd-n" id="cd-s">00</span><span class="cd-l">Seconds</span></div>
  </div>

  <form class="capture" onsubmit="handleSubmit(event)">
    <input class="email" type="email" placeholder="Enter your email address" required>
    <button type="submit" class="cta-btn">Notify me</button>
  </form>

  <p class="note">No spam, ever. Unsubscribe anytime.</p>

  <div class="social-row">
    <a href="#" class="soc-link">Twitter</a>
    <span class="soc-dot">·</span>
    <a href="#" class="soc-link">LinkedIn</a>
    <span class="soc-dot">·</span>
    <a href="#" class="soc-link">Instagram</a>
  </div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #050a14; min-height: 100vh; overflow: hidden; }

.hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 24px; gap: 24px; position: relative; overflow: hidden; }

.glow { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; animation: pulse-glow 4s ease-in-out infinite; }
@keyframes pulse-glow { 0%,100%{opacity:0.6} 50%{opacity:1} }

.badge { position: relative; font-size: 12px; font-weight: 700; color: #a78bfa; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25); padding: 6px 16px; border-radius: 20px; letter-spacing: 0.3px; }

.headline { position: relative; font-size: clamp(36px,7vw,68px); font-weight: 900; color: #f1f5f9; line-height: 1.1; letter-spacing: -1.5px; max-width: 640px; }
.grad { background: linear-gradient(135deg,#6366f1,#a78bfa,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

.sub { position: relative; font-size: 15px; color: #64748b; max-width: 420px; line-height: 1.75; }

.countdown { position: relative; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center; }
.cd-block { display: flex; flex-direction: column; align-items: center; gap: 4px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px 20px; min-width: 72px; }
.cd-n { font-size: 36px; font-weight: 800; color: #f1f5f9; font-variant-numeric: tabular-nums; line-height: 1; }
.cd-l { font-size: 10px; font-weight: 600; color: #475569; letter-spacing: 1px; text-transform: uppercase; }
.cd-sep { font-size: 32px; font-weight: 300; color: #334155; margin-bottom: 16px; }

.capture { position: relative; display: flex; gap: 8px; width: 100%; max-width: 440px; flex-wrap: wrap; }
.email { flex: 1; min-width: 200px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 16px; font-size: 14px; color: #f1f5f9; outline: none; transition: border-color 0.15s; }
.email:focus { border-color: #6366f1; }
.email::placeholder { color: #475569; }
.cta-btn { background: #6366f1; color: #fff; font-size: 14px; font-weight: 700; padding: 12px 22px; border: none; border-radius: 10px; cursor: pointer; white-space: nowrap; transition: background 0.15s; }
.cta-btn:hover { background: #4f46e5; }
.cta-btn.done { background: #16a34a; cursor: default; }

.note { position: relative; font-size: 12px; color: #334155; }

.social-row { position: relative; display: flex; align-items: center; gap: 8px; }
.soc-link { font-size: 12px; color: #475569; text-decoration: none; transition: color 0.12s; }
.soc-link:hover { color: #94a3b8; }
.soc-dot { color: #334155; font-size: 12px; }`,
  js: `// Set your launch date here
const LAUNCH = new Date('2026-08-01T00:00:00');

function tick() {
  const now = new Date();
  let diff = Math.max(0, LAUNCH - now) / 1000;
  const d = Math.floor(diff / 86400); diff -= d * 86400;
  const h = Math.floor(diff / 3600);  diff -= h * 3600;
  const m = Math.floor(diff / 60);    diff -= m * 60;
  const s = Math.floor(diff);
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cd-d').textContent = pad(d);
  document.getElementById('cd-h').textContent = pad(h);
  document.getElementById('cd-m').textContent = pad(m);
  document.getElementById('cd-s').textContent = pad(s);
}

tick();
setInterval(tick, 1000);

function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.cta-btn');
  btn.textContent = "✓ You're on the list!";
  btn.classList.add('done');
  e.target.querySelector('.email').disabled = true;
}`,
  seo: {
    title: 'Coming Soon Hero — Free HTML CSS JS Countdown Snippet',
    description: 'Launch page with live countdown timer, email capture success state and pulsing glow background. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Coming Soon Hero — Live Countdown Timer, Dark Gradient & Email Capture Form',
      description: `A coming soon page gives your product a professional presence before launch while building an email waitlist of early adopters. This snippet provides a complete coming soon hero: a dark background with animated radial glow, a gradient headline, a live [countdown timer](/ui-snippets/countdown-timer/) (days, hours, minutes, seconds), an email capture form (see also [waitlist signup](/ui-snippets/waitlist-signup/)) with success feedback, a spam disclaimer, and social platform links — all in plain HTML, CSS, and minimal JavaScript.\n\n**The countdown timer**\n\nThe tick() function runs every second via setInterval. It computes the difference between LAUNCH (a configurable Date object) and new Date(), converts milliseconds to days/hours/minutes/seconds using integer division and modulo, and updates four CD-N elements. The pad() helper zero-pads single digits. Setting LAUNCH at the top of the JS is the only configuration needed to deploy the timer for your specific date.\n\n**The animated glow**\n\nA single div with radial-gradient background and absolute positioning creates the central glow effect. A CSS keyframe animation pulses the opacity between 0.6 and 1 on a 4-second loop, giving the impression of a breathing energy source behind the content. The glow uses pointer-events: none so it never intercepts clicks.\n\n**The gradient headline**\n\nThe .grad span uses background: linear-gradient(135deg, indigo, violet, pink) with background-clip: text and -webkit-text-fill-color: transparent. The font uses clamp(36px, 7vw, 68px) for fluid sizing from mobile to wide desktop.\n\n**Countdown block design**\n\nEach time unit (Days, Hours, Minutes, Seconds) has its own card block with a dark glass background (rgba white at 4% opacity), a subtle border, border-radius: 12px, and the large number in tabular-nums font-variant for stable digit width. The colon separators between blocks use a lighter colour and sit slightly lower.\n\n**Email capture with success state**\n\nThe form prevents default submission, changes the button text to "✓ You're on the list!", adds a green .done class, and disables the email input. Wire the form to your mailing list API (Mailchimp, ConvertKit, Resend) inside handleSubmit() before the UI update.\n\n**Customising for your launch**\n\nChange the LAUNCH constant to your real launch date. Update the headline text. Replace the email API endpoint. Add your real social media URLs. Change the gradient colours (#6366f1 → your brand) throughout the CSS. Update the headline .grad gradient to include your primary brand colour as the starting colour stop for fully branded gradient text.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Set your launch date', text: 'In the JS panel, change the LAUNCH constant: const LAUNCH = new Date("YYYY-MM-DDTHH:MM:SS"). The countdown updates automatically. The timer shows zeros once the launch date has passed.' },
      { title: 'Update the headline and subtitle', text: 'Edit the h1 text — change "amazing" to your product adjective and keep it in the .grad span for the gradient effect. Update the .sub paragraph with your specific product promise.' },
      { title: 'Wire the email form to your API', text: 'In handleSubmit(), add a fetch call before the UI update: await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({email}) }). Show the success state on resolve and an error message on reject.' },
      { title: 'Update the social media links', text: 'Replace href="#" on the three .soc-link anchors with your actual Twitter/X, LinkedIn, and Instagram URLs. Change the link labels to match your active platforms.' },
      { title: 'Change the brand colour', text: 'Replace #6366f1 throughout the CSS with your brand hex. Updates the glow, badge, input focus ring, and CTA button. Also update the gradient in .grad to include your brand colour.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useEffect for the setInterval with cleanup, or "Tailwind" for a Tailwind CSS version.' },
    ]},
    features: ['Live countdown: setInterval tick() updates days/hours/minutes/seconds every second','LAUNCH date: single constant at top of JS — change one line to deploy','Animated radial glow: opacity pulse keyframe, pointer-events:none','Gradient headline: background-clip:text on gradient span, clamp() fluid sizing','Countdown cards: glass background rgba(255,255,255,0.04), tabular-nums digits','Email capture: success state changes button text + green class + disables input','Dark background: #050a14 — deep navy for maximum contrast with the glow','Social links: inline text links with hover colour transition'],
    useCases: [
      { icon: 'STAR', title: 'Pre-launch product waitlist and beta signup pages', desc: 'The countdown timer creates urgency and excitement. The email capture builds a waitlist of users who are already interested before the product ships — giving you a day-one audience to email on launch day.' },
      { icon: 'FLOW', title: 'Maintenance and scheduled downtime notice pages', desc: 'Adapt the coming soon page as a scheduled [maintenance notice](/ui-snippets/maintenance-page/). Set LAUNCH to the expected return time. Replace the email capture with a status page link. The countdown gives users a concrete expected resolution time.' },
      { icon: 'DESIGN', title: 'Event and conference countdown landing pages', desc: 'Use for conference registrations, product event announcements, and webinar countdowns. The countdown blocks communicate time remaining to the event date. Replace the email capture with a registration CTA linking to your ticketing page.' },
      { icon: 'APP', title: 'Mobile app store submission countdown', desc: 'While your app awaits App Store or Play Store approval (typically 24–72 hours), show a coming soon page at your marketing URL with the estimated launch countdown. Collect emails for day-one download notifications.' },
      { icon: 'LEARN', title: 'Study countdown timer JavaScript with setInterval', desc: 'The tick() function demonstrates the standard countdown pattern: subtract current time from target time, convert milliseconds to time units with integer division, pad with zeros, and update the DOM. The setInterval with 1000ms is the universal countdown interval.' },
      { icon: 'CODE', title: 'A/B test coming soon page email capture rates', desc: 'Deploy multiple variants of this page with different headlines, CTAs ("Notify me" vs "Join the waitlist" vs "Get early access"), and form positions. Track submission rates. The winner variant informs the full landing page copy at launch.' },
      { icon: 'CODE', title: 'A/B test coming soon page email capture variants', desc: 'Deploy multiple variants with different headlines, CTAs (Notify me vs Join the waitlist vs Get early access), and form positions. Track submission rates per variant. The winner informs the full launch landing page copy and layout.' },
      { icon: 'CODE', title: 'Related: App Hero with Phone Mockup and Store Badges', desc: 'See the [App Hero with Phone Mockup and Store Badges](/ui-snippets/hero-app-store-badges-mockup/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Mega CTA Banner', desc: 'See the [Mega CTA Banner](/ui-snippets/mega-cta-banner/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Rotating Testimonial Spotlight', desc: 'See the [Hero with Rotating Testimonial Spotlight](/ui-snippets/hero-rotating-testimonial-spotlight/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Split Hero with Scroll-Highlighted Feature List', desc: 'See the [Split Hero with Scroll-Highlighted Feature List](/ui-snippets/hero-scrollytelling-split-feature-list/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Company Milestone Timeline Strip', desc: 'See the [Hero with Company Milestone Timeline Strip](/ui-snippets/hero-milestone-timeline-strip/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the countdown timer work and how do I set my launch date?', a: 'At the top of the JS panel, set const LAUNCH = new Date("YYYY-MM-DDTHH:MM:SS"). The tick() function runs every 1000ms via setInterval. It computes LAUNCH - new Date() in milliseconds, converts to total seconds, then uses integer division (Math.floor(diff / 86400) for days, etc.) and modulo to extract each time unit. The pad() function zero-pads each unit to always show two digits. Setting LAUNCH is the only change needed.' },
      { q: 'How do I wire the email form to Mailchimp, ConvertKit, or my own backend?', a: 'In handleSubmit(), before the UI update code, add your API call. For a custom backend: const res = await fetch("/api/waitlist", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({email: e.target.querySelector(".email").value}) }); if (!res.ok) { showError(); return; }. For Mailchimp, use their Embedded Forms or API v3 endpoint. Use a server-side proxy to hide API keys.' },
      { q: 'What happens when the countdown reaches zero?', a: 'Math.max(0, LAUNCH - now) ensures diff never goes negative — all four blocks show 00 when the launch date has passed. To show a "We are live!" state when the timer expires, check if LAUNCH < new Date() inside tick() and update the countdown section innerHTML with a launch announcement instead of continuing to show the timer.' },
      { q: 'How do I use this coming soon page in Next.js?', a: 'Click "JSX" to download a React component. Manage the countdown values in useState({d:"00",h:"00",m:"00",s:"00"}). Run the tick interval in a useEffect: const id = setInterval(tick, 1000); return () => clearInterval(id) — the return cleanup prevents the interval from running after the component unmounts. For email capture, make the form a Client Component ("use client") and use useState for the submitted state.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the countdown math yourself to trust it's correct. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the tick function converts the millisecond difference between LAUNCH and now into whole days, hours, minutes, and seconds using successive division and subtraction, and why Math.max(0, ...) matters once the launch date has passed. The same assistant can help optimize it — for instance asking whether running a full DOM text update on four elements every second is worth debouncing or whether requestAnimationFrame would be smoother than setInterval for the pulsing glow. It's also useful for extending the page: ask it to swap the countdown into a "we're live" banner automatically once LAUNCH passes, wire the email form to a real waitlist API with error handling, or add a progress bar showing percentage of time elapsed since the countdown started. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "coming soon" landing page hero in plain HTML, CSS, and JavaScript with a live countdown timer and an email capture form — no date libraries, no frameworks.

Requirements:
- A single configurable launch date constant (a JavaScript Date) that drives the entire countdown — changing this one value must be the only step needed to redeploy for a new date.
- A function that runs every second via setInterval, computes the difference between the launch date and the current time in milliseconds, converts it to whole days, hours, minutes, and seconds using integer division and remainder at each step (not a date library), zero-pads every unit to two digits, and clamps the difference to never go negative once the launch date has passed.
- Four visually distinct countdown blocks (days, hours, minutes, seconds) using tabular/monospace numeric styling so the digits don't visually jitter in width as they change.
- A background radial-gradient glow element that pulses opacity on a slow easing loop using a CSS keyframe animation, positioned with pointer-events disabled so it never blocks clicks on the content in front of it.
- A gradient-text headline using background-clip: text on a span, with fluid font sizing via clamp() so it scales smoothly between mobile and desktop viewport widths.
- An email capture form that prevents default submission, and on submit disables the input and swaps the button's text and color to a success state, structured so a real fetch POST to a waitlist API could be dropped in before that UI update.`,
    },
  },
};

export default comingSoonHero;
