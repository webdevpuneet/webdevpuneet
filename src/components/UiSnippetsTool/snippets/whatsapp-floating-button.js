const whatsappFloatingButton = {
  id: 'whatsapp-floating-button',
  title: 'WhatsApp Floating Button',
  category: 'buttons',
  html: `<div class="page-demo">
  <h1>Contact page</h1>
  <p>A floating WhatsApp button stays fixed in the corner of the viewport, with a pulsing ring, an unread badge and a greeting bubble that shows whether your team is online.</p>
  <div class="wa-controls">
    <button type="button" id="ctlOnline">Online</button>
    <button type="button" id="ctlSide">Right</button>
    <button type="button" id="ctlReplay">Replay greeting</button>
  </div>
</div>

<div class="wa-widget" id="waWidget" data-position="right">
  <div class="wa-bubble" id="waBubble" role="dialog" aria-label="Chat with us on WhatsApp" hidden>
    <button class="wa-close" id="waClose" type="button" aria-label="Dismiss chat prompt">&times;</button>
    <div class="wa-head">
      <span class="wa-avatar" aria-hidden="true">S</span>
      <div class="wa-who">
        <strong>Support team</strong>
        <span class="wa-status"><i class="wa-dot" id="waDot"></i><span id="waStatus">Online now</span></span>
      </div>
    </div>
    <p class="wa-msg" id="waMsg">Hi 👋 Have a question? Chat with us on WhatsApp.</p>
  </div>

  <a class="whatsapp-fab" id="waFab" href="https://wa.me/15551234567?text=Hi!%20I%20have%20a%20question" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
    <span class="pulse-ring"></span>
    <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff" aria-hidden="true">
      <path d="M16.004 3C9.373 3 4 8.373 4 15.004c0 2.65.86 5.1 2.32 7.09L4.5 28.5l6.58-1.79a11.9 11.9 0 0 0 4.92 1.07h.005c6.63 0 12.004-5.373 12.004-12.004S22.634 3 16.004 3zm0 21.8h-.004a9.78 9.78 0 0 1-4.98-1.36l-.357-.212-3.68 1 .984-3.586-.233-.368a9.77 9.77 0 0 1-1.5-5.27c0-5.4 4.396-9.8 9.8-9.8 2.617 0 5.077 1.02 6.93 2.87a9.73 9.73 0 0 1 2.868 6.93c0 5.4-4.397 9.796-9.828 9.796zm5.36-7.34c-.293-.147-1.735-.856-2.004-.953-.27-.098-.466-.147-.663.147-.196.293-.76.953-.932 1.15-.172.196-.343.22-.636.073-.293-.147-1.238-.456-2.358-1.454-.872-.777-1.46-1.737-1.632-2.03-.172-.293-.018-.452.13-.598.133-.132.293-.343.44-.514.146-.172.195-.294.293-.49.098-.196.049-.368-.024-.514-.073-.147-.663-1.6-.91-2.19-.24-.575-.482-.497-.663-.507l-.564-.01c-.196 0-.514.073-.783.368-.27.294-1.03 1.007-1.03 2.456 0 1.45 1.055 2.85 1.202 3.046.147.196 2.076 3.17 5.03 4.443.703.303 1.25.484 1.678.62.705.224 1.347.192 1.855.117.566-.084 1.735-.71 1.98-1.395.245-.686.245-1.273.172-1.395-.073-.123-.27-.196-.563-.343z"/>
    </svg>
    <span class="wa-badge" id="waBadge" aria-hidden="true">1</span>
  </a>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; min-height: 100vh; }

.page-demo { padding: 60px 24px; max-width: 460px; margin: 0 auto; text-align: center; }
.page-demo h1 { font-size: 22px; color: #1e293b; margin: 0 0 10px; }
.page-demo p { font-size: 14px; color: #64748b; line-height: 1.6; }

/* Demo-only controls: delete these (and their JS) in a real page */
.wa-controls { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 22px; }
.wa-controls button { padding: 7px 14px; font: 600 12px system-ui, sans-serif; color: #475569; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; }
.wa-controls button:hover { border-color: #94a3b8; }

/* Widget wrapper is the fixed element; safe-area keeps it clear of the iOS home bar */
.wa-widget {
  position: fixed;
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  right: 24px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
}
.wa-widget[data-position="left"] { right: auto; left: 24px; align-items: flex-start; }

.whatsapp-fab {
  position: relative;
  z-index: 1; /* own stacking context, so the pulse ring can sit behind the button */
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #25d366;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.whatsapp-fab:hover { transform: scale(1.08); box-shadow: 0 10px 28px rgba(37, 211, 102, 0.5); }
.whatsapp-fab:focus-visible { outline: 3px solid #128c7e; outline-offset: 3px; }

/* The pulse ring is a second circle behind the button: it scales up and fades
   out on a loop without ever resizing the button itself. */
.pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #25d366;
  z-index: -1;
  animation: pulse 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.9); opacity: 0; }
}
.wa-widget.is-offline .pulse-ring { animation: none; opacity: 0; }

/* Unread badge */
.wa-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  font: 700 11px/20px system-ui, sans-serif;
  text-align: center;
  box-shadow: 0 0 0 2px #fff;
}
.wa-badge[hidden] { display: none; }

/* Greeting bubble */
.wa-bubble {
  position: relative;
  width: 260px;
  padding: 14px 16px 16px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.18);
  animation: bubbleIn 0.25s ease both;
}
.wa-bubble[hidden] { display: none; }
.wa-bubble::after { /* tail pointing at the button */
  content: '';
  position: absolute;
  bottom: -6px;
  right: 22px;
  width: 14px;
  height: 14px;
  background: #fff;
  transform: rotate(45deg);
}
.wa-widget[data-position="left"] .wa-bubble::after { right: auto; left: 22px; }
@keyframes bubbleIn { from { opacity: 0; transform: translateY(8px) scale(0.97); } to { opacity: 1; transform: none; } }

.wa-close { position: absolute; top: 6px; right: 8px; width: 24px; height: 24px; border: 0; background: none; color: #94a3b8; font-size: 20px; line-height: 1; cursor: pointer; border-radius: 6px; }
.wa-close:hover { color: #475569; background: #f1f5f9; }

.wa-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.wa-avatar { width: 34px; height: 34px; border-radius: 50%; background: #128c7e; color: #fff; display: grid; place-items: center; font: 700 14px system-ui, sans-serif; }
.wa-who { display: flex; flex-direction: column; gap: 2px; font-size: 13px; color: #1e293b; }
.wa-status { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; color: #64748b; }
.wa-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; }
.wa-widget.is-offline .wa-dot { background: #94a3b8; }
.wa-msg { margin: 0; padding: 9px 12px; background: #f0fdf4; border-radius: 4px 12px 12px 12px; font-size: 13px; line-height: 1.5; color: #334155; }

@media (prefers-reduced-motion: reduce) {
  .pulse-ring, .wa-bubble { animation: none; }
}`,
  js: `// 1. Config: everything you would edit on a real site
var CONFIG = {
  phone: '15551234567',              // international format, digits only (no + or leading zeros)
  message: 'Hi! I have a question about {page}',
  showAfterMs: 2500,                 // delay before the greeting bubble opens
  hours: { timeZone: 'Europe/London', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], from: 9, to: 18 },
  storageKey: 'wa-fab-dismissed'
};

var widget = document.getElementById('waWidget');
var fab = document.getElementById('waFab');
var bubble = document.getElementById('waBubble');
var badge = document.getElementById('waBadge');
var override = null; // demo only: true / false forces online / offline

// 2. Are we inside business hours? Evaluated in YOUR timezone, not the visitor's
function isOnline() {
  if (override !== null) return override;
  var parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CONFIG.hours.timeZone, weekday: 'short', hour: 'numeric', hourCycle: 'h23'
  }).formatToParts(new Date());
  var day = parts.filter(function (p) { return p.type === 'weekday'; })[0].value;
  var hour = Number(parts.filter(function (p) { return p.type === 'hour'; })[0].value);
  return CONFIG.hours.days.indexOf(day) !== -1 && hour >= CONFIG.hours.from && hour < CONFIG.hours.to;
}

// 3. Build the wa.me link, with the current page name in the message
function buildLink(online) {
  var text = CONFIG.message.replace('{page}', document.title || 'this page');
  if (!online) text += ' (sent outside business hours)';
  return 'https://wa.me/' + CONFIG.phone + '?text=' + encodeURIComponent(text);
}

function render() {
  var online = isOnline();
  widget.classList.toggle('is-offline', !online);
  document.getElementById('waStatus').textContent = online ? 'Online now' : 'Offline \\u00b7 we reply next business day';
  document.getElementById('waMsg').textContent = online
    ? 'Hi \\ud83d\\udc4b Have a question? Chat with us on WhatsApp.'
    : "We're away right now. Leave a message and we'll get back to you.";
  if (!online) badge.hidden = true;
  fab.href = buildLink(online);
}

// 4. Greeting bubble: opens after a delay, remembers a dismissal for the session
function wasDismissed() {
  try { return sessionStorage.getItem(CONFIG.storageKey) === '1'; } catch (e) { return false; }
}
function openBubble() { bubble.hidden = false; badge.hidden = true; }
function closeBubble() {
  bubble.hidden = true;
  try { sessionStorage.setItem(CONFIG.storageKey, '1'); } catch (e) {}
}

document.getElementById('waClose').addEventListener('click', closeBubble);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !bubble.hidden) closeBubble(); });

// 5. Analytics hook (GTM dataLayer here; swap for your own tracker)
fab.addEventListener('click', function () {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'whatsapp_fab_click', online: isOnline() });
  badge.hidden = true;
});

render();
setTimeout(function () { if (!wasDismissed()) openBubble(); }, CONFIG.showAfterMs);

// Demo-only controls
document.getElementById('ctlOnline').addEventListener('click', function (e) {
  override = !isOnline();
  e.target.textContent = override ? 'Online' : 'Offline';
  badge.hidden = !override || !bubble.hidden;
  render();
});
document.getElementById('ctlSide').addEventListener('click', function (e) {
  var left = widget.dataset.position !== 'left';
  widget.dataset.position = left ? 'left' : 'right';
  e.target.textContent = left ? 'Left' : 'Right';
});
document.getElementById('ctlReplay').addEventListener('click', function () {
  openBubble();
});`,

  seo: {
    title: 'WhatsApp Floating Button — Free HTML CSS JS Contact Widget Snippet',
    description: 'A floating WhatsApp contact button with a wa.me deep link, pulsing ring, unread badge and a greeting bubble that shows online or offline status from your business hours.',
    about: {
      title: 'WhatsApp Floating Button — Contact Widget With Greeting Bubble and Business Hours',
      description: `A floating WhatsApp button is one of the simplest, highest-impact additions to a small-business or support-facing website: a single fixed circular button that opens a pre-filled WhatsApp chat, no phone app plugin or chat SDK required. This version goes further than a bare icon: it adds an unread badge, a dismissible greeting bubble, and an online or offline status driven by your business hours.

**How the WhatsApp link works**

The button is a plain \`<a>\` tag pointing at a \`wa.me\` link: \`https://wa.me/15551234567?text=...\`. \`wa.me\` is WhatsApp's own official link format and needs no API key or app integration. The number after \`wa.me/\` is the full international phone number with no \`+\`, spaces, or leading zeros. The \`?text=\` parameter pre-fills the message box; the script builds it with \`encodeURIComponent\`, so spaces and special characters are always encoded correctly, and it swaps \`{page}\` for the current page title so your team knows which page the visitor was on.

**Business hours and online status**

\`isOnline()\` reads the current weekday and hour in a fixed time zone (\`CONFIG.hours.timeZone\`) using \`Intl.DateTimeFormat\`, so "9 to 6, Monday to Friday" means *your* team's hours, not the visitor's clock. When it's outside those hours, the status dot turns grey, the pulse ring stops, the unread badge hides, and the bubble asks visitors to leave a message. The pre-filled text also gets "(sent outside business hours)" appended, so whoever picks it up knows why the reply took a while.

**The greeting bubble**

After \`showAfterMs\` the bubble opens above the button with an avatar, the status line and a short message. The close button and the Escape key both dismiss it, and the dismissal is remembered in \`sessionStorage\` so it doesn't nag on every page of the same visit (wrapped in try/catch, so a blocked storage never breaks the widget).

**How the pulsing ring works**

Behind the button sits a second circle, \`.pulse-ring\`, sized identically via \`inset: 0\` with \`z-index: -1\`. The button has its own stacking context, so the ring always renders behind the solid button. A \`@keyframes pulse\` animation scales it from 1 to 1.9 while fading from 0.6 to 0, so only the ring visibly pings outward and the button never changes size.

**Left or right, and phone-friendly**

The fixed wrapper carries \`data-position="right|left"\`, and the bubble tail flips with it. \`bottom\` includes \`env(safe-area-inset-bottom)\` so the button never sits under the iPhone home indicator.

**Respecting reduced motion**

A \`prefers-reduced-motion: reduce\` query disables the pulse and the bubble animation for users who are sensitive to motion at the OS level. The widget stays fully functional.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "WhatsApp Floating Button" in the sidebar Library tab. The preview shows the pulsing green button with an unread badge, then the greeting bubble opens after a couple of seconds.' },
        { title: 'Set your phone number', text: 'In the JS panel, change CONFIG.phone to your business number in international format: digits only, no + or leading zeros.' },
        { title: 'Customize the message', text: 'Edit CONFIG.message. Use {page} to insert the current page title. The script URL-encodes the text for you.' },
        { title: 'Set your business hours', text: 'Edit CONFIG.hours (time zone, days and from/to hours). Outside those hours the widget shows as offline.' },
        { title: 'Try the demo controls', text: 'Use the Online/Offline, Left/Right and Replay greeting buttons to preview each state, then delete those buttons and the "Demo-only controls" code at the bottom of the JS.' },
        { title: 'Adjust position and animation', text: 'Switch data-position between right and left, change bottom/right offsets in .wa-widget, or tune the pulse keyframes\' scale and opacity.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Uses WhatsApp\'s official wa.me deep link format: no API key or SDK integration required',
      'Pre-filled message is built with encodeURIComponent and can include the current page title',
      'Business-hours check in a fixed time zone drives an online or offline state',
      'Greeting bubble with avatar and status dot, dismissible by button or Escape key, remembered per session',
      'Unread badge that clears once the bubble opens or the button is clicked',
      'Pulse ring is a separate element, so the button itself never resizes; it stops when offline',
      'Left or right placement via one data-position attribute',
      'Safe-area inset keeps the button clear of the iPhone home indicator',
      'prefers-reduced-motion disables the pulse and bubble animations',
      'Analytics hook pushes a whatsapp_fab_click event to dataLayer',
      'Real anchor with aria-label, focus-visible outline and rel="noopener noreferrer"',
      'No framework, no chat widget library, no build step',
    ],
    useCases: [
      { icon: 'CHAT', title: 'Small business and support contact', desc: 'Give website visitors a one-tap way to start a WhatsApp conversation with your business, without needing a full chat widget SDK.' },
      { icon: 'FLOW', title: 'Set expectations with business hours', desc: 'Show visitors honestly when your team is away, and tag out-of-hours messages so your team can prioritise replies.' },
      { icon: 'CODE', title: 'Pre-fill context per page', desc: 'Use the {page} placeholder, or build the text from a product name, so every conversation starts with the context your team needs.' },
      { icon: 'LEARN', title: 'Learn CSS-only pulse/ping animations', desc: 'Study how a second absolutely-positioned element with its own keyframe animation creates a radiating ring independent of the parent button\'s size.' },
      { icon: 'DESIGN', title: 'Match your brand\'s floating action style', desc: 'Adjust the button color, size, bubble and pulse ring to match other floating elements already on your site.' },
      { icon: 'ACCESS', title: 'Respect motion sensitivity preferences', desc: 'The prefers-reduced-motion query here is a good reference pattern for any other decorative CSS animation on your site.' },
    ],
    faqs: [
      { q: 'Do I need a WhatsApp Business API account for this to work?', a: 'No. This uses wa.me, WhatsApp\'s free official click-to-chat link format that works with any regular or Business WhatsApp account. No API key, approval process, or paid integration is required.' },
      { q: 'How do I format the phone number correctly?', a: 'Use the full number in international format with the country code, but with no plus sign, spaces, dashes, or leading zeros. For example 15551234567 for a US number starting with +1.' },
      { q: 'How do I pre-fill a custom message?', a: 'Edit CONFIG.message in the JavaScript. The script URL-encodes it with encodeURIComponent and appends it as ?text= on the wa.me link, so spaces and special characters are handled for you. Use {page} to insert the current page title.' },
      { q: 'How does the online/offline status work?', a: 'isOnline() checks the current weekday and hour in the time zone set in CONFIG.hours using Intl.DateTimeFormat, then compares them with your days and from/to hours. It uses your team\'s time zone, not the visitor\'s clock. Outside those hours the dot turns grey, the pulse stops and the bubble asks for a message.' },
      { q: 'Does it really know if someone on my team is available?', a: 'No. It only reflects the schedule you configure; WhatsApp does not expose agent presence to a website. Treat it as a hint about expected response time rather than live availability.' },
      { q: 'Does this button work on both desktop and mobile?', a: 'Yes, with no special detection code. On mobile it opens the native WhatsApp app if installed; on desktop it opens WhatsApp Web in a new tab, or the desktop app if the OS handles wa.me links.' },
      { q: 'How do I stop the greeting bubble from reappearing?', a: 'Dismissing it stores a flag in sessionStorage, so it stays closed for the rest of the visit. Switch to localStorage in wasDismissed() and closeBubble() to remember the choice across visits, or set showAfterMs very high or remove the setTimeout line to never auto-open it.' },
      { q: 'Is this accessible to keyboard and screen reader users?', a: 'Yes. The button is a real <a> element with a descriptive aria-label, reachable via Tab, with a visible focus-visible outline. The bubble is a labelled dialog, can be closed with its button or the Escape key, and decorative icons are hidden from assistive technology.' },
      { q: 'Can I show the button only after scrolling?', a: 'Yes. Add a scroll listener that toggles a hidden class on .wa-widget based on window.scrollY, the same pattern used by a back-to-top button.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML, CSS and JS to an AI coding assistant like Claude and ask it to adapt the CONFIG block to your business: your number, your time zone and opening hours, and a message that mentions the page or product. It's also a good prompt for extending the widget, for example opening hours per weekday, a second department number, remembering dismissal in localStorage, showing the button only after the visitor scrolls, or turning it into a React or Vue component. Ask it to double check the wa.me URL-encoding for any special characters in your message.`,
      prompt: `Build a floating WhatsApp contact widget in plain HTML, CSS and JavaScript, with no chat library or SDK.

Requirements:
- A circular green button fixed to a bottom corner (data-position="right|left") as a real anchor tag pointing at a wa.me link, with an inline SVG WhatsApp logo, an aria-label, a focus-visible outline and rel="noopener noreferrer". Include env(safe-area-inset-bottom) in its bottom offset.
- A CONFIG object with phone (international digits only), message (supports a {page} placeholder), showAfterMs, business hours (timeZone, days, from, to) and a storageKey. Build the href with encodeURIComponent.
- isOnline() uses Intl.DateTimeFormat with the configured time zone to decide whether the team is in business hours. Offline state: grey status dot, no pulse, no unread badge, a "leave a message" greeting, and "(sent outside business hours)" appended to the pre-filled text.
- A pulsing ring: a second absolutely positioned circle behind the button (the button creates its own stacking context) that scales up and fades out on an infinite keyframe loop without resizing the button.
- A red unread badge on the button, and a greeting bubble above it with an avatar, name, status line and message. The bubble opens after showAfterMs, closes with its close button or the Escape key, and remembers dismissal in sessionStorage inside try/catch.
- A click handler that pushes a whatsapp_fab_click event to window.dataLayer.
- Wrap the pulse and bubble animations in a prefers-reduced-motion media query.
- Add small demo-only controls (online/offline, left/right, replay greeting) clearly marked for deletion.`,
    },
  },
};

export default whatsappFloatingButton;
