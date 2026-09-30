const videoTestimonialCard = {
  id: 'video-testimonial-card',
  title: 'Video Testimonial Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="vtc-card" id="vtcCard">
  <button class="vtc-poster" id="vtcPoster" type="button" aria-label="Play testimonial video">
    <span class="vtc-thumb" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)"></span>
    <span class="vtc-shade"></span>
    <span class="vtc-play"><svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4"/></svg></span>
    <span class="vtc-duration">1:24</span>
    <span class="vtc-quote">&ldquo;It paid for itself in the first week.&rdquo;</span>
  </button>

  <div class="vtc-player" id="vtcPlayer" hidden>
    <div class="vtc-fakevideo" id="vtcFake">
      <span class="vtc-pulse"></span>
      <span class="vtc-now">Now playing…</span>
    </div>
    <button class="vtc-close" id="vtcClose" type="button" aria-label="Close video">
      <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>

  <div class="vtc-meta">
    <span class="vtc-avatar">RL</span>
    <div class="vtc-author">
      <span class="vtc-name">Rosa Lambert</span>
      <span class="vtc-role">Operations Lead, Brightwave</span>
    </div>
    <div class="vtc-stars" aria-label="5 out of 5 stars">★★★★★</div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px; }

.vtc-card { width: 100%; max-width: 360px; background: #fff; border: 1px solid #e8edf3; border-radius: 18px; overflow: hidden; box-shadow: 0 16px 44px rgba(15, 23, 42, 0.1); }

.vtc-poster, .vtc-player { position: relative; display: block; width: 100%; aspect-ratio: 16 / 10; border: none; padding: 0; cursor: pointer; overflow: hidden; }
.vtc-thumb { position: absolute; inset: 0; transition: transform 0.4s ease; }
.vtc-poster:hover .vtc-thumb { transform: scale(1.05); }
.vtc-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05) 55%); }

.vtc-play {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 58px; height: 58px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.3);
  transition: transform 0.18s, background 0.18s;
}
.vtc-play svg { width: 24px; height: 24px; fill: #6366f1; margin-left: 3px; }
.vtc-poster:hover .vtc-play { transform: translate(-50%, -50%) scale(1.08); }

.vtc-play::before {
  content: ''; position: absolute; inset: -8px; border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  animation: vtcRing 2.4s ease-out infinite;
}
@keyframes vtcRing { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }

.vtc-duration { position: absolute; bottom: 12px; right: 12px; padding: 3px 8px; background: rgba(0,0,0,0.6); color: #fff; font-size: 11.5px; font-weight: 700; border-radius: 6px; }
.vtc-quote { position: absolute; left: 16px; bottom: 12px; right: 60px; color: #fff; font-size: 15px; font-weight: 700; line-height: 1.3; text-align: left; text-shadow: 0 1px 8px rgba(0,0,0,0.4); }

.vtc-fakevideo { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: #0b1020; color: #e2e8f0; }
.vtc-pulse { width: 46px; height: 46px; border-radius: 50%; background: #6366f1; animation: vtcBeat 1.1s ease-in-out infinite; }
@keyframes vtcBeat { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.8); opacity: 0.6; } }
.vtc-now { font-size: 13px; font-weight: 600; letter-spacing: 0.02em; }
.vtc-close { position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.14); border: none; border-radius: 50%; cursor: pointer; }
.vtc-close svg { width: 16px; height: 16px; fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; }
.vtc-close:hover { background: rgba(255,255,255,0.26); }

.vtc-meta { display: flex; align-items: center; gap: 11px; padding: 15px 18px; }
.vtc-avatar { width: 38px; height: 38px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0ea5e9, #22d3ee); color: #fff; font-size: 13px; font-weight: 700; border-radius: 50%; }
.vtc-author { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.vtc-name { font-size: 14px; font-weight: 700; color: #0f172a; }
.vtc-role { font-size: 12px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.vtc-stars { color: #f59e0b; font-size: 13px; flex-shrink: 0; }`,
  js: `const poster = document.getElementById('vtcPoster');
const player = document.getElementById('vtcPlayer');
const closeBtn = document.getElementById('vtcClose');

function openPlayer() {
  poster.hidden = true;
  player.hidden = false;
  closeBtn.focus();
  // In production, inject the real <iframe>/<video> here so it only loads on demand.
}

function closePlayer() {
  player.hidden = true;
  poster.hidden = false;
  poster.focus();
  // Removing the player node here would also stop playback and free the video.
}

poster.addEventListener('click', openPlayer);
closeBtn.addEventListener('click', closePlayer);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !player.hidden) closePlayer();
});`,
  seo: {
    title: 'Video Testimonial Card — Free HTML CSS JS Snippet',
    description: 'A testimonial card with a video poster, pulsing play button, quote overlay and lazy load-on-play swap with Escape-to-close. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Video Testimonial Card — Poster, Lazy Load-on-Play and Quote Overlay',
      description: `Video testimonials convert better than text — seeing a real customer say it is more persuasive than reading it — but embedding a video player on a marketing page is heavy: the player iframe loads hundreds of kilobytes whether or not anyone presses play. This component gives you the best of both: a lightweight poster card with a thumbnail, a pulsing play button, a duration badge, and a pull-quote overlay, that only swaps in the actual player when the visitor clicks play. It is built in HTML, CSS, and vanilla JavaScript, and the load-on-demand pattern is the key performance idea.

**The poster, not the player, loads first**

By default the card shows only a poster: a gradient (or image) thumbnail, a dark gradient shade for text legibility, a circular play button, a "1:24" duration badge, and the customer's strongest quote overlaid at the bottom. None of this loads any video. The real player markup lives in a sibling element that starts with the \`hidden\` attribute, so it contributes nothing until needed. Clicking the poster reveals the player and hides the poster; in production this is exactly where you would inject the real \`<iframe>\` or \`<video>\` so the heavy resource only downloads on demand — turning a multi-hundred-KB embed into a near-zero-cost card for the majority of visitors who never press play.

**The pulsing play button**

The play button is a white circle with an indigo triangle, centred over the poster. A \`::before\` pseudo-element draws an expanding ring around it with the \`vtcRing\` keyframe — scaling from 1 to 1.5 while fading out, on a 2.4-second loop — the gentle "tap me" pulse you see on video cards across the web. On hover the whole button scales up slightly and the thumbnail behind it zooms with a \`transform: scale(1.05)\`, giving the card a tactile, alive feel without any JavaScript.

**Quote overlay and legibility**

The customer quote sits over the bottom-left of the poster in bold white with a \`text-shadow\`, and a \`linear-gradient\` shade darkens the lower portion of the thumbnail so the text stays readable over any image. This means the card communicates the testimonial's punchline even before anyone plays the video — a visitor who only skims still gets the message. The duration badge in the opposite corner sets expectations about the time commitment.

**Load-on-play and stop-on-close**

Clicking play calls \`openPlayer()\`, which hides the poster, shows the player, and moves focus to the close button. Closing (via the X or the Escape key) calls \`closePlayer()\`, which hides the player, restores the poster, and returns focus to it. The comments mark the two production hooks: inject the real video element in \`openPlayer\` so it loads only when requested, and remove it in \`closePlayer\` — removing the node is the simplest reliable way to stop playback and free the resource, because a paused-but-present YouTube/Vimeo iframe can keep buffering and tracking. Escape-to-close and focus management make the player usable by keyboard.

**The author meta row**

Below the media, a meta row shows a gradient initials avatar, the customer's name and role (the role truncates with ellipsis so the row never wraps), and a five-star rating. This grounds the testimonial with a credible, attributable source — the same trust signals a written testimonial card uses, paired here with the higher-impact video.

**Customisation**

Replace the gradient \`.vtc-thumb\` with a real poster image, set the quote, duration, avatar, name, role, and star count, and in \`openPlayer()\` inject your provider's embed (a YouTube/Vimeo \`<iframe>\` with \`autoplay=1\`, or a self-hosted \`<video autoplay>\`). Swap the \`#6366f1\` accent for your brand. The card is fully responsive with a \`16/10\` aspect-ratio media area that scales to its container.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A testimonial card renders with a video poster, a pulsing play button, a duration badge, an overlaid quote, and an author row.` },
      { title: 'Hover the poster', text: `The thumbnail zooms slightly and the play button scales up; an expanding ring pulses around the button continuously.` },
      { title: 'Click play', text: `The poster is replaced by the player area (where the real video would load on demand) and focus moves to the close button.` },
      { title: 'Close the player', text: `Click the X or press Escape; the poster returns and focus moves back to it.` },
      { title: 'Add your real video', text: `In openPlayer(), inject your YouTube/Vimeo <iframe> or <video> so it loads only on play; remove it in closePlayer() to stop playback.` },
      { title: 'Set the content', text: `Replace the poster image, quote, duration, avatar, name, role, stars, and accent colour with your testimonial.` },
    ]},
    features: [
      { title: 'Load-on-play performance', text: `The card shows only a poster; the heavy video player loads on demand, so visitors who never press play download nothing.` },
      { title: 'Pulsing play button', text: `A CSS ::before ring expands and fades on a loop for an inviting "tap to play" cue with no JavaScript.` },
      { title: 'Quote overlay', text: `The customer's key line sits over the poster with a gradient shade for legibility, so the message lands even without playing.` },
      { title: 'Hover zoom', text: `The thumbnail scales and the play button grows on hover for a tactile, alive card.` },
      { title: 'Stop-on-close', text: `Closing removes the player so playback stops and the resource is freed — no background buffering or tracking.` },
      { title: 'Keyboard and focus', text: `Escape closes the player, and focus moves to the close button on open and back to the poster on close.` },
      { title: 'Author trust row', text: `A gradient avatar, name, truncating role, and star rating attribute the testimonial to a real person.` },
      { title: 'Responsive media', text: `A 16/10 aspect-ratio media area scales cleanly to any card width.` },
    ],
    useCases: [
      { title: 'Landing-page social proof', text: `Lead with a customer's video over text testimonials for higher conversion — pair with a [testimonial carousel](/ui-snippets/testimonial-carousel/) of written quotes below.` },
      { title: 'Case-study and customer-story pages', text: `Embed a short customer clip with their key result as the overlay quote; complement with a [pull quote](/ui-snippets/pull-quote/) in the body.` },
      { title: 'Course and creator landing pages', text: `Show a student success story without slowing the page, since the player only loads on play.` },
      { title: 'Product and SaaS marketing', text: `Feature a customer explaining the value, grounded by their role and company; pair with a [testimonial card](/ui-snippets/testimonial-card/) wall for written quotes.` },
      { title: 'Webinar and event recaps', text: `Use the poster-and-play pattern for highlight clips with a duration badge setting expectations.` },
      { title: 'Learning lazy-embed patterns', text: `A reference for load-on-demand video, the pulsing play affordance, and accessible open/close with focus management.` },
    ],
    faqs: [
      { q: 'How do I embed a real YouTube or Vimeo video?', a: `In openPlayer(), set the player's innerHTML to an iframe with autoplay, e.g. player.innerHTML = '<iframe src="https://www.youtube.com/embed/ID?autoplay=1" allow="autoplay" ...></iframe>' plus your close button. Building the iframe only on click is the whole point — it keeps the page light. In closePlayer(), clear that innerHTML (or remove the iframe) so the video stops and frees bandwidth.` },
      { q: 'Why remove the player on close instead of just pausing it?', a: `A YouTube or Vimeo iframe that is merely hidden or paused can keep buffering, playing audio, or sending tracking pixels in the background. The most reliable cross-provider way to truly stop it is to remove the iframe from the DOM. That is why closePlayer() restores the poster and you clear the player markup there — it guarantees playback ends and the resource is released.` },
      { q: 'How do I use a real poster image instead of a gradient?', a: `Replace the .vtc-thumb gradient background with background-image: url('poster.jpg') and background-size: cover, or use an <img> with object-fit: cover inside the poster button. Keep the .vtc-shade gradient overlay so the quote text stays readable over a busy image. Use your video's own thumbnail for the most relevant poster.` },
      { q: 'Is the card accessible to keyboard and screen-reader users?', a: `The poster is a real <button> with an aria-label, so it is focusable and announced as "Play testimonial video." On open, focus moves to the close button; on close (via the X or Escape), focus returns to the poster. The star rating has an aria-label describing the score. When you inject a real player, ensure the iframe has a descriptive title attribute for screen readers.` },
      { q: 'How do I use this card in React, Vue, or Angular?', a: `Hold a playing boolean in state; render the poster when false and the player (with the real embed) when true. The play button sets playing true, the close button and an Escape key handler set it false. Manage focus with refs in an effect that runs when playing changes. Conditionally rendering the player means the embed mounts on play and unmounts on close automatically — the framework gives you the load-on-play and stop-on-close behaviour for free.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the show/hide logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why openPlayer() moves focus to the close button and closePlayer() moves it back to the poster, and why that focus-shuttling matters for someone navigating with a keyboard rather than a mouse. It's also worth asking about the pulsing ring animation — have it explain how the ::before pseudo-element's expanding-and-fading keyframe differs mechanically from just scaling the play button itself, and why layering a separate ring avoids distorting the icon inside it. For extending it, have it wire openPlayer to actually inject a real YouTube or self-hosted video element (rather than the placeholder "Now playing" state) with autoplay, add a way to swap between several testimonials without leaving the card, or add a subtle progress ring around the play button that fills as a testimonial has been watched by other visitors. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a video testimonial card in plain HTML, CSS, and vanilla JavaScript with no libraries, where the actual video player is never present in the DOM until the visitor explicitly presses play.

Requirements:
- A poster button showing a thumbnail background, a darkening gradient overlay for text legibility, a centered circular play icon, a duration badge in one corner, and a bold pull-quote from the testimonial overlaid across the bottom.
- The play icon must have a continuously looping expanding ring animation drawn from a separate pseudo-element (not the icon itself scaling), using a keyframe that grows a bordered circle outward while fading its opacity to zero, repeating indefinitely.
- On hover over the poster, the thumbnail must zoom in slightly via a transform scale, and the play button must grow slightly larger, both through CSS transitions with no JavaScript.
- A separate player container, hidden by default, that becomes visible only after the poster is clicked; the poster itself must be hidden at that same moment (not simply covered up).
- Clicking play must move keyboard focus into the now-visible player area (specifically onto its close control), and closing the player (via its close button or the Escape key) must hide the player, re-show the poster, and return keyboard focus to the poster button.
- Below the video area, a persistent author row showing a gradient initials avatar, the customer's name, their role/company (truncated with an ellipsis if too long to fit on one line), and a star rating.
- Structure the open/close functions so that in a real implementation, the actual video embed would be injected into the player container only when it becomes visible, and removed from the DOM again when it's closed, so playback genuinely stops rather than merely being hidden.`,
    },
  },
};

export default videoTestimonialCard;
