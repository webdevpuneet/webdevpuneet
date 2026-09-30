const scrollChatStory = {
  id: 'scroll-chat-story',
  title: 'Scroll Chat Story',
  lastmod: '2026-07-18',
  category: 'scroll',
  html: `<section class="scs-intro"><p>Scroll ↓</p></section>
<div class="scs-thread">
  <div class="scs-day">Tuesday, 9:14 AM</div>
  <div class="scs-msg scs-them"><div class="scs-bubble">Hey — did the deploy go out last night? 😬</div></div>
  <div class="scs-msg scs-me"><div class="scs-bubble">It did. Zero downtime, zero rollbacks.</div></div>
  <div class="scs-msg scs-them"><div class="scs-bubble">Wait, seriously? The migration too??</div></div>
  <div class="scs-msg scs-me"><div class="scs-bubble">Migration, cache warm-up, the works. The new pipeline handled all of it.</div></div>
  <div class="scs-msg scs-them"><div class="scs-bubble">We used to lose a whole weekend to this…</div></div>
  <div class="scs-msg scs-me"><div class="scs-bubble">Yep. Now it's a checkbox. ✅</div></div>
  <div class="scs-msg scs-them"><div class="scs-bubble">Okay, I'm sold. Sending the team your setup guide 🚀</div></div>
</div>
<section class="scs-outro"><p>A product pitch, told as a conversation.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.scs-intro,.scs-outro{min-height:60vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.scs-thread{max-width:480px;margin:0 auto;padding:20px 20px 40px;display:flex;flex-direction:column;gap:18px}
.scs-day{text-align:center;font-size:12px;letter-spacing:.08em;color:#6b7188;margin-bottom:4px}
.scs-msg{display:flex;min-height:70px}
.scs-me{justify-content:flex-end}
.scs-bubble{position:relative;max-width:78%;padding:13px 17px;border-radius:20px;font-size:15px;line-height:1.5;opacity:0;transform:translateY(18px) scale(.86);transition:opacity .45s,transform .45s cubic-bezier(.34,1.56,.64,1)}
.scs-them .scs-bubble{background:#1c2138;border-bottom-left-radius:6px;transform-origin:bottom left}
.scs-me .scs-bubble{background:linear-gradient(135deg,#6366f1,#4f46e5);border-bottom-right-radius:6px;transform-origin:bottom right}
.scs-msg.is-shown .scs-bubble{opacity:1;transform:translateY(0) scale(1)}
/* typing dots shown inside the bubble before its text "arrives" */
.scs-bubble::before{content:'';position:absolute;inset:0;border-radius:inherit;background:inherit;z-index:1;transition:opacity .3s .35s}
.scs-bubble::after{content:'• • •';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;letter-spacing:2px;color:rgba(255,255,255,.7);z-index:2;animation:scs-pulse 1s infinite;transition:opacity .3s .35s}
.scs-msg.is-shown .scs-bubble::before,.scs-msg.is-shown .scs-bubble::after{opacity:0;pointer-events:none}
@keyframes scs-pulse{50%{opacity:.35}}`,

  js: `// Each message pops in when it enters the lower part of the viewport.
// Once shown it stays shown — a conversation doesn't "unhappen"
// while you re-read it, so we unobserve after reveal.
var messages = document.querySelectorAll('.scs-msg');

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-shown');
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -22% 0px', threshold: 0.4 });

messages.forEach(function (msg) { observer.observe(msg); });`,

  seo: {
    title: 'Scroll Chat Story — Free HTML CSS JS Snippet',
    description: `Chat bubbles that pop in as you scroll a conversation — typing dots resolve into messages via IntersectionObserver and CSS springs. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Chat Story — A Conversation That Unfolds as You Scroll',
      description: `The scroll chat story tells a narrative — a testimonial, a support win, a product pitch — as a messaging thread whose bubbles arrive one at a time as you scroll. Each bubble first appears as typing dots, then resolves into its message with a springy pop, exactly like watching a live conversation. It's one of the most persuasive scroll patterns because readers process dialogue almost involuntarily. This snippet builds it with vanilla HTML, CSS, and an IntersectionObserver — no libraries.

**Bubbles reveal in a reading band, not at the viewport edge**

The observer uses \`rootMargin: '0px 0px -22% 0px'\` with \`threshold: 0.4\`, so a bubble fires when 40% of it is visible above the bottom 22% of the screen — comfortably inside the reading zone. Trigger-at-edge implementations reveal messages the reader can't see yet; pulling the trigger line up means each bubble pops exactly where eyes are focused.

**One-shot reveals: conversations don't unhappen**

After a message shows, \`observer.unobserve()\` releases it. Scrolling back up leaves the thread intact — re-reading a conversation where bubbles vanish and re-pop would break the "this already happened" fiction. This is a deliberate contrast with scrubbed effects: chat is narrative state, not scroll state, so the reveal is a ratchet rather than a scrub.

**Typing dots via stacked pseudo-elements**

Each bubble carries its own typing indicator with zero extra markup: \`::before\` clones the bubble's background as a cover layer, and \`::after\` renders pulsing dots on top. The message text underneath is present the whole time (real layout, real height — so nothing shifts when it "arrives"). When \`is-shown\` lands, both pseudo-elements fade out on a 0.35s delay — the bubble pops in *as dots*, and a beat later the dots dissolve into the message. Two transitions, one class.

**The pop is a CSS spring from the bubble's tail**

Bubbles animate from \`translateY(18px) scale(.86)\` with \`cubic-bezier(.34,1.56,.64,1)\` — an overshooting curve that reads as a message "landing." \`transform-origin\` is set to each bubble's tail corner (bottom-left for them, bottom-right for me), so the pop grows from where a chat app anchors its bubbles, matching iMessage/WhatsApp physics.

**Sides are semantic classes**

\`.scs-them\` and \`.scs-me\` handle alignment, color, tail radius, and origin — the message flow stays a flat list, so writing a new story is editing text, not layout. A \`min-height\` on each row prevents late-loading rows from collapsing the scroll distance the reveals depend on.

**Why IntersectionObserver over scroll math**

Seven bubbles at document-flow positions are exactly what IO was built for: the browser fires callbacks only at crossings, there's zero per-frame JS, and the pattern scales to a 50-message story without any performance thought.

**Row min-height keeps the scroll distance the reveals need**

Each \`.scs-msg\` has \`min-height: 70px\` even though its content is a single short bubble. Without a reserved minimum, short messages would occupy very little vertical space, compressing the scroll distance between reveals until several bubbles' trigger points landed inside the same viewport at once — breaking the one-at-a-time pacing the observer relies on. The fixed minimum guarantees each message gets enough scroll runway to read as its own beat in the conversation.

**Customizing it**

Write your own thread (alternate the two classes), add timestamps or avatars per row, or slow the dots-to-text delay for longer "typing." Related: the full [chat UI](/ui-snippets/chat-ui/) component, the [typing indicator](/ui-snippets/typing-indicator/) on its own, [reveal on scroll](/ui-snippets/reveal-on-scroll/) for generic entrances, and a [scroll pin story](/ui-snippets/scroll-pin-story/) for pinned narratives.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The thread renders with all bubbles hidden.` },
      { title: 'Scroll into the thread', text: `Each bubble pops in as typing dots.` },
      { title: 'Watch the resolve', text: `Dots dissolve into the message a beat later.` },
      { title: 'Scroll back up', text: `The conversation stays — reveals are one-shot.` },
      { title: 'Rewrite the story', text: `Alternate scs-them and scs-me rows with your copy.` },
      { title: 'Tune the reveal band', text: `Adjust rootMargin to move the trigger line.` },
    ] },
    features: [
      { title: 'Reading-band triggers', text: `Bubbles fire inside the reader's focus zone.` },
      { title: 'Ratchet reveals', text: `unobserve keeps the story from unhappening.` },
      { title: 'Zero-markup dots', text: `Pseudo-elements stage the typing state.` },
      { title: 'Layout-stable resolve', text: `Text height exists before it appears.` },
      { title: 'Tail-anchored spring', text: `Pops grow from each bubble's corner.` },
      { title: 'Semantic sides', text: `Two classes control alignment and color.` },
      { title: 'No per-frame JS', text: `IntersectionObserver only fires at crossings.` },
      { title: 'Library-free', text: `Plain HTML, CSS, and one observer.` },
    ],
    useCases: [
      { title: 'Testimonial stories', text: `Real customer exchanges convert; follow with a [testimonial card](/ui-snippets/testimonial-card/) wall.` },
      { title: 'Product pitches', text: `Dramatize the before/after in dialogue, then show it with [scroll before after](/ui-snippets/scroll-before-after/).` },
      { title: 'Support showcases', text: `Replay a great support thread; link the real [chat UI](/ui-snippets/chat-ui/).` },
      { title: 'Onboarding narratives', text: `Explain a flow as a conversation before [sticky scroll features](/ui-snippets/scroll-sticky-features/) details it.` },
      { title: 'Interactive fiction', text: `Chat-format stories, chaptered with a [scroll pin story](/ui-snippets/scroll-pin-story/).` },
      { title: 'Event recaps', text: `Tell the launch-day thread; drop in a [confetti celebration card](/ui-snippets/confetti-celebration-card/) at the win.` },
      { icon: 'CODE', title: 'Related: Scroll Chapter Sidebar Story', desc: 'See the [Scroll Chapter Sidebar Story](/ui-snippets/scroll-chapter-sidebar-story/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the bubbles know when to appear?', a: `An IntersectionObserver watches each message with rootMargin: '0px 0px -22% 0px' and threshold: 0.4 — a bubble fires when 40% of it is visible above the bottom 22% of the viewport, comfortably inside the reading zone. The callback adds is-shown and CSS does all animation; JavaScript never runs per scroll frame.` },
      { q: 'Why don’t messages disappear when I scroll back up?', a: `After revealing, the observer unobserves each message, making reveals a one-way ratchet. That's intentional: a conversation is narrative state, not scroll state — bubbles vanishing while re-reading would break the fiction that the exchange already happened. For scrub-style behavior, skip the unobserve and toggle the class on both transitions.` },
      { q: 'How does the typing-dots-to-text transition work without extra markup?', a: `Each bubble's ::before clones its background as a cover layer and ::after renders pulsing dots above it, while the real text sits underneath at full layout height. When is-shown lands, the bubble springs in and both pseudo-elements fade on a 0.35s delay — dots first, then message, with zero layout shift because the text's space always existed.` },
      { q: 'What makes the pop feel like a chat app?', a: `Two details: an overshooting cubic-bezier(.34,1.56,.64,1) spring from translateY(18px) scale(.86), and transform-origin set to each bubble's tail corner — bottom-left for received, bottom-right for sent — so growth radiates from where messaging apps anchor their bubbles. Straight fades or center-origin scales immediately read as generic.` },
      { q: 'Why does each message row have a minimum height?', a: `Without min-height: 70px, short single-line bubbles would occupy very little vertical space, compressing the scroll distance between messages until several trigger points sat inside the same viewport simultaneously. That breaks the one-at-a-time pacing the observer depends on. The reserved minimum guarantees every message gets enough scroll runway to read as its own distinct beat.` },
      { q: 'How do I build this chat story in React, Vue, or Angular?', a: `Render messages from an array of { side, text } objects and register one IntersectionObserver in a mount effect — useEffect, onMounted, or ngAfterViewInit — observing refs collected from the list, disconnecting it in the cleanup. Keep is-shown as a class toggle (or per-item boolean set once) so reveals stay one-shot. Bubble styling maps cleanly to Tailwind, with the pseudo-element dots kept in a small CSS layer.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the timing choices on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the rootMargin is set to a negative bottom value paired with a 0.4 threshold, and why the typing dots are staged with layered pseudo-elements and a 0.35s transition delay instead of a separate DOM node. The same assistant can help optimize it — asking whether observer.unobserve after each reveal is actually necessary for performance versus just leaving the observer running, or how the approach would need to change for a fifty-message thread instead of seven. It's also great for extending the effect: ask it to add per-bubble timestamps, an avatar that scrolls in sync with the active speaker, or a variable typing delay based on message length so longer replies pause longer before resolving. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll chat story" effect in plain HTML, CSS, and JavaScript using only the IntersectionObserver API — no scroll-position math, no animation libraries.

Requirements:
- A vertical thread of message rows, each containing a bubble, alternating between a "them" side (left-aligned, tail on the bottom-left) and a "me" side (right-aligned, tail on the bottom-right), with each row given a reserved minimum height so short one-line bubbles don't compress the scroll distance between messages.
- Every bubble must render its real message text in the DOM from the start (so its final height is already reserved and nothing shifts later), but visually start at zero opacity and a slightly translated, slightly scaled-down transform.
- Build a typing indicator using only CSS pseudo-elements on the bubble — a ::before that covers the bubble with its own background color, and a ::after that renders pulsing "..." dots on top — with no extra markup per message, and no JavaScript-driven dot animation.
- Create a single IntersectionObserver with a rootMargin that pulls the trigger line up into the lower-middle reading area of the viewport (not the raw viewport edge) and a threshold around 0.4, so each bubble fires while it's genuinely readable, not merely peeking into view.
- When a message intersects, add a class that (a) springs the bubble in via a CSS transition using an overshooting cubic-bezier curve anchored at the bubble's own tail corner via transform-origin, and (b) fades out the typing-dots pseudo-elements on a short delay so the dots visibly resolve into the real text a beat after the bubble pops in.
- After a message has been revealed once, call unobserve on it so scrolling back up never re-hides or re-shows it — the conversation must read as something that already happened, not a scrubbable animation.`,
    },
  },
};

export default scrollChatStory;
