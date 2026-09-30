const maintenancePage = {
  id: 'maintenance-page',
  title: 'Maintenance Page',
  category: 'layouts',
  html: `<div class="page">
  <div class="bg-grid"></div>
  <div class="content">
    <div class="logo"><div class="logo-icon">⚙️</div></div>
    <div class="status-pill">
      <span class="pulse-dot"></span>
      <span>Scheduled Maintenance</span>
    </div>
    <h1 class="heading">We'll be right back.</h1>
    <p class="sub">We're upgrading our systems to serve you better. This typically takes under 30 minutes.</p>
    <div class="countdown" id="countdown">
      <div class="unit"><span class="num" id="ch">00</span><span class="lbl">Hours</span></div>
      <span class="sep">:</span>
      <div class="unit"><span class="num" id="cm">00</span><span class="lbl">Minutes</span></div>
      <span class="sep">:</span>
      <div class="unit"><span class="num" id="cs">00</span><span class="lbl">Seconds</span></div>
    </div>
    <div class="notify">
      <input class="email-inp" id="notifyEmail" type="email" placeholder="Enter your email" autocomplete="email">
      <button class="notify-btn" onclick="notifyMe()">Notify me</button>
    </div>
    <p class="notify-sub" id="notifyMsg"></p>
    <div class="socials">
      <a class="social-link" href="#">Twitter</a>
      <a class="social-link" href="#">Status Page</a>
      <a class="social-link" href="#">Support</a>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #030712; min-height: 100vh; }
.page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; position: relative; overflow: hidden; }
.bg-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px); background-size: 40px 40px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%); }
.content { position: relative; text-align: center; max-width: 560px; width: 100%; }
.logo { display: flex; justify-content: center; margin-bottom: 24px; }
.logo-icon { width: 64px; height: 64px; background: linear-gradient(135deg,#4f46e5,#7c3aed); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 8px 32px rgba(99,102,241,0.35); animation: spin 4s linear infinite; }
@keyframes spin { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
.status-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3); border-radius: 20px; padding: 6px 16px; font-size: 13px; font-weight: 700; color: #a5b4fc; margin-bottom: 20px; }
.pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #f59e0b; animation: pulse 1.5s ease infinite; }
@keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
.heading { font-size: 44px; font-weight: 900; color: #f1f5f9; line-height: 1.15; margin-bottom: 16px; letter-spacing: -1px; }
.sub { font-size: 16px; color: #64748b; line-height: 1.6; max-width: 440px; margin: 0 auto 32px; }
.countdown { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 32px; }
.unit { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.num { font-size: 52px; font-weight: 900; color: #f1f5f9; font-variant-numeric: tabular-nums; font-family: ui-monospace, monospace; line-height: 1; }
.lbl { font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 1px; }
.sep { font-size: 44px; font-weight: 900; color: #334155; line-height: 1.1; margin-bottom: 16px; }
.notify { display: flex; gap: 8px; max-width: 380px; margin: 0 auto 10px; }
.email-inp { flex: 1; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px 16px; font-size: 14px; color: #f1f5f9; outline: none; font-family: inherit; transition: border-color 0.15s; }
.email-inp::placeholder { color: #475569; }
.email-inp:focus { border-color: rgba(99,102,241,0.6); }
.notify-btn { background: #6366f1; border: none; color: #fff; font-size: 14px; font-weight: 800; padding: 12px 22px; border-radius: 12px; cursor: pointer; transition: background 0.15s; white-space: nowrap; font-family: inherit; }
.notify-btn:hover { background: #4f46e5; }
.notify-sub { font-size: 13px; color: #22c55e; font-weight: 600; min-height: 20px; margin-bottom: 28px; }
.socials { display: flex; justify-content: center; gap: 20px; }
.social-link { font-size: 13px; font-weight: 700; color: #475569; text-decoration: none; transition: color 0.15s; }
.social-link:hover { color: #94a3b8; }`,
  js: `var target = new Date(Date.now() + 28 * 60 * 1000);

function pad(n) { return String(n).padStart(2,'0'); }

function tick() {
  var diff = Math.max(0, target - Date.now());
  var h = Math.floor(diff / 3600000);
  var m = Math.floor((diff % 3600000) / 60000);
  var s = Math.floor((diff % 60000) / 1000);
  document.getElementById('ch').textContent = pad(h);
  document.getElementById('cm').textContent = pad(m);
  document.getElementById('cs').textContent = pad(s);
  if (diff > 0) setTimeout(tick, 1000);
  else {
    document.getElementById('countdown').style.opacity = '0.4';
  }
}

function notifyMe() {
  var email = document.getElementById('notifyEmail').value.trim();
  var msg = document.getElementById('notifyMsg');
  if (!email || !/^[^@]+@[^@]+\\.[^@]+$/.test(email)) {
    msg.style.color = '#ef4444';
    msg.textContent = 'Please enter a valid email address.';
    return;
  }
  msg.style.color = '#22c55e';
  msg.textContent = "✓ Got it! We'll notify you when we're back.";
  document.getElementById('notifyEmail').disabled = true;
  document.querySelector('.notify-btn').disabled = true;
}

tick();`,
  seo: {
    title: 'Maintenance Page with Countdown — HTML CSS JS Snippet',
    description: 'Branded maintenance/under-construction page with countdown timer, status badge, email notify form, and animated gear logo. Exports to React, Vue & Angular.',
    about: {
      title: 'Maintenance Page — Countdown Timer, Status Pill, Email Notify & Grid Background',
      description: `A maintenance page (also called a "down for maintenance" or "we'll be right back" page) is a standard need for any production web application. Showing a polished, branded holding page instead of a server error keeps users informed and reduces support ticket volume during planned outages. This snippet provides a complete maintenance page with a dark-themed design, a subtle grid background, an animated status pill, a [countdown timer](/ui-snippets/countdown-timer/), an email notification sign-up, and social/status links — for a pre-launch variant, see the [coming soon hero](/ui-snippets/coming-soon-hero/).\n\n**The countdown timer**\n\nThe timer targets a configurable end time (set 28 minutes from load in the snippet). tick() runs every second, computing the remaining hours, minutes, and seconds by dividing the millisecond diff and taking modulo values. It pads each unit to two digits with padStart(2, '0') for a consistent display width. The timer stops when the diff reaches zero and fades the countdown to indicate the expected window has passed. In production, the target time would come from a server-rendered config variable so the countdown reflects the actual maintenance window.\n\n**The status pill and pulse dot**\n\nThe amber pulse dot uses a CSS keyframe animation cycling between opacity and scale — a lightweight way to convey "in progress" status. The pill's border and background both use rgba values of the brand colour so it reads against any dark background without hardcoding neutrals.\n\n**The grid background**\n\nThe page background uses two overlapping CSS linear-gradient "lines" at 40px spacing to create a dot-grid pattern, masked with a radial gradient so it fades to black at the edges. This technique creates a sophisticated tech aesthetic with no images or SVG. The mask-image radial gradient is the key detail — without it the grid would be uniform and flat.\n\n**Email notification capture**\n\nThe notify form validates the email client-side and shows a confirmation message on submission. In production this would POST to an endpoint that stores the email and sends a "we're back" email when the maintenance window ends. The form is disabled after submission to prevent duplicate entries.\n\n**The rocking gear animation**\n\nThe logo icon uses a CSS keyframe that rotates between −6° and +6°, creating a mechanical rocking motion that reinforces the maintenance concept without requiring an external animation library or lottie file. The animation is subtle enough not to be distracting during what is a tense moment for the user.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Set the maintenance end time', text: 'Change the target variable from Date.now() + 28 * 60 * 1000 to a specific end time (e.g. new Date("2026-06-16T14:00:00Z")) to reflect your actual maintenance window.' },
      { title: 'Update the heading and message', text: 'Change the heading and sub-text to match your brand voice and include any relevant details (what system is being updated, why).' },
      { title: 'Replace the logo', text: 'Swap the ⚙️ emoji with your logo SVG or an <img> tag. The logo container already handles sizing and shadow.' },
      { title: 'Wire the email form', text: 'In notifyMe(), POST the validated email to your API endpoint. Store it and send a notification email when the maintenance concludes.' },
      { title: 'Update the social links', text: 'Replace the Twitter, Status Page, and Support hrefs with your actual links. The status page link is particularly important during outages.' },
      { title: 'Export for your framework', text: 'Click "React" for a component with the countdown in useEffect and useRef. Click "Vue" for a Vue 3 SFC with onMounted and onUnmounted interval cleanup.' },
    ]},
    features: ['Live countdown timer targeting a configurable end time', 'Pulsing amber dot in a status pill communicating active maintenance', 'Rocking gear logo animation reinforcing the maintenance context', 'Subtle dot-grid background using CSS linear-gradient with radial mask', 'Email notification form with validation and disabled-after-submit state', 'Social/status page link row for self-service updates', 'Countdown fades when the expected window has elapsed', 'Full-screen dark layout suitable as a direct HTTP 503 response page'],
    useCases: [
      { icon: 'APP', title: 'Planned maintenance and deployment windows', desc: 'Serve the maintenance page via your load balancer or CDN during planned database migrations, major releases, or infrastructure upgrades. A countdown timer and a "notify me" capture turn a frustrating downtime into a managed experience that keeps users informed and gives your team a clean window to work.' },
      { icon: 'FLOW', title: 'Database migration or schema change window', desc: 'When running a zero-downtime migration is not possible (large schema changes, data backfills), take the app offline with this page. Set the countdown to the migration\'s estimated completion, link to your [status page](/ui-snippets/uptime-status-page/) for real-time updates, and capture emails to notify users when the migration completes.' },
      { icon: 'DESIGN', title: 'Product launch "coming soon" variant', desc: 'Repurpose the page as a pre-launch holding page: change the heading to "Launching Soon", swap "Scheduled Maintenance" for "Coming Soon", and use the email form to build a waitlist. The countdown becomes the launch timer, and the grid background gives the page a tech startup aesthetic.' },
      { icon: 'CODE', title: 'Integrate with your status page and incident system', desc: 'Read the maintenance end time from your incident management API (PagerDuty, Statuspage.io) and inject it into the page at serve time. Update the countdown target server-side so users always see an accurate remaining estimate even if they refresh the page.' },
      { icon: 'LEARN', title: 'Study the CSS grid-line and mask technique', desc: 'The background grid is a notable pure-CSS technique: two perpendicular linear-gradient "lines" at the same spacing create a grid pattern, and a radial mask-image fades it to transparent at the edges. This technique transfers to hero sections, card backgrounds, and code editor UIs anywhere a tech-flavoured grid is needed.' },
      { icon: 'CHART', title: '503 error page in your web server or CDN config', desc: 'Configure your web server (nginx, Caddy) or CDN (Cloudflare Pages, AWS CloudFront) to serve the maintenance page as a custom 503 response. This ensures the page appears even when your application server is completely unreachable, rather than the browser\'s generic error screen.' },
      { icon: 'CODE', title: 'Related: Hero with Animated Scroll Cue', desc: 'See the [Hero with Animated Scroll Cue](/ui-snippets/hero-scroll-cue-arrow/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I set a specific end time rather than a duration from load?', a: 'Replace var target = new Date(Date.now() + 28 * 60 * 1000) with var target = new Date("2026-06-16T15:00:00Z"), using your actual maintenance window end time in ISO 8601 UTC format. All visitors then see the same remaining time regardless of when they load the page, which is the correct behaviour for a shared maintenance window. If your maintenance window is server-configured, inject the end time as a JavaScript variable from your server-side template.' },
      { q: 'What happens when the countdown reaches zero?', a: 'When diff reaches zero, tick() stops calling itself and fades the countdown numbers to 0.4 opacity to signal that the expected window has elapsed. In production you should also add a page-reload after a short delay (e.g., setTimeout(() => location.reload(), 15000)) so users whose page was open during maintenance automatically return to the live site once it comes back up.' },
      { q: 'How do I serve this page as a real 503 response?', a: 'In nginx, add error_page 503 /maintenance.html; and return 503; in a location block. In Caddy, use the respond directive with a 503 status and the page HTML as the body, or rewrite to a static HTML file. With Cloudflare, use a Worker that returns the maintenance page with a 503 status when a kill-switch KV key is set. The page should itself be a static file with no backend dependencies so it serves even when your application is completely down.' },
      { q: 'How do I build this in React?', a: 'In a useEffect, set up a setInterval(tick, 1000) that computes remaining time from a target Date and updates a timeLeft state object { h, m, s }. Clear the interval in the useEffect cleanup. The notify form keeps email and submitted in useState; on submit, validate and call your API. Because maintenance pages should work without JavaScript in some configurations, consider a server-rendered version (Next.js getServerSideProps returning the target time as a prop) so the countdown is pre-rendered on the correct value. For the Tailwind version, click "Tailwind" to get the same markup with utility classes instead of a scoped stylesheet.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to guess why the countdown uses setTimeout instead of setInterval. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why tick() re-schedules itself with setTimeout(tick, 1000) rather than using a single setInterval, and how that choice affects drift if the browser tab is backgrounded for a while. The same assistant can help optimize it, for instance asking whether the target end time should be read from a server-injected value instead of Date.now() plus a fixed offset, since every visitor currently gets their own independent 28-minute window rather than a shared one. It is also useful for extending the page: ask it to auto-reload the page once the countdown reaches zero so returning users land back on the live site automatically, wire the notify form to a real email-capture endpoint, or add a live status feed pulling from an incident-management API. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "maintenance page" in plain HTML, CSS, and JavaScript with no libraries, intended to be servable as a static 503 response with no backend dependency.

Requirements:
- A full-screen dark page with a status pill containing a continuously pulsing dot (a CSS keyframe animating opacity and scale) and the text "Scheduled Maintenance", plus a heading and supporting copy.
- A live countdown made of three two-digit segments (hours, minutes, seconds) counting down toward a fixed target Date computed once at load, updating once per second by having the tick function re-schedule itself rather than relying on a repeating interval, so it is trivial to stop cleanly.
- Each countdown segment must be zero-padded to two digits regardless of its numeric value, and the whole countdown group must visually fade (reduced opacity) once the countdown reaches zero, rather than disappearing or showing negative numbers.
- An email input and "Notify me" button where clicking validates the email with a basic regex, shows a red inline error message for an invalid or empty address without submitting anything, and on a valid address shows a green confirmation message and disables both the input and the button so the same address cannot be submitted twice.
- A decorative background built from two overlapping CSS linear-gradient lines forming a grid pattern, masked with a radial gradient so the grid fades out toward the page edges instead of tiling uniformly to the viewport border.
- A small logo/icon element that continuously rocks back and forth a few degrees using a CSS keyframe, distinct from the pulsing status dot's animation.`,
    },
  },
};
export default maintenancePage;
