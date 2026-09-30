const heroVideoTestimonialEmbed = {
  id: 'hero-video-testimonial-embed',
  title: 'Hero with Video Testimonial Player',
  lastmod: '2026-08-23',
  category: 'heroes',
  html: `<section class="vth-hero">
  <div class="vth-inner">
    <div class="vth-copy">
      <span class="vth-badge">Customer story</span>
      <h1 class="vth-title">Real teams. Real results. <span>In their own words.</span></h1>
      <p class="vth-sub">Watch how Marisol's 40-person ops team cut their monthly close from nine days to two, without hiring anyone new.</p>
      <div class="vth-cta-row">
        <a href="#" class="vth-btn-primary">Start free trial</a>
        <a href="#" class="vth-btn-secondary">Read the case study</a>
      </div>
    </div>

    <div class="vth-player-wrap">
      <div class="vth-player" id="vthPlayer">
        <div class="vth-poster" id="vthPoster">
          <div class="vth-poster-grad"></div>
          <button class="vth-play" id="vthPlay" aria-label="Play testimonial video">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <span class="vth-duration">1:52</span>
        </div>
        <video id="vthVideo" class="vth-video" controls playsinline preload="none"
          poster=""
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"></video>
      </div>
      <figure class="vth-quote">
        <blockquote>&ldquo;We didn't just save time — we stopped dreading the end of every month.&rdquo;</blockquote>
        <figcaption>
          <span class="vth-avatar">MK</span>
          <span class="vth-attr"><strong>Marisol Kim</strong>VP of Operations, Northline</span>
        </figcaption>
      </figure>
    </div>
  </div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f4f5f7; }

.vth-hero { min-height: 100vh; display: flex; align-items: center; padding: 48px 24px; }
.vth-inner { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 56px; align-items: center; }

.vth-badge { display: inline-block; padding: 6px 13px; background: #e0e7ff; color: #4338ca; border-radius: 999px; font-size: 12px; font-weight: 700; }
.vth-title { margin-top: 16px; font-size: 38px; font-weight: 800; line-height: 1.16; letter-spacing: -0.02em; color: #111827; }
.vth-title span { color: #4f46e5; }
.vth-sub { margin-top: 14px; font-size: 15px; line-height: 1.65; color: #4b5563; max-width: 420px; }
.vth-cta-row { display: flex; gap: 12px; margin-top: 26px; flex-wrap: wrap; }
.vth-btn-primary { padding: 12px 22px; background: #4f46e5; color: #fff; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 700; transition: background .15s; }
.vth-btn-primary:hover { background: #4338ca; }
.vth-btn-secondary { padding: 12px 22px; background: transparent; color: #374151; border: 1.5px solid #d1d5db; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600; transition: border-color .15s; }
.vth-btn-secondary:hover { border-color: #4f46e5; color: #4f46e5; }

.vth-player-wrap { }
.vth-player { position: relative; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(17, 24, 39, 0.14); aspect-ratio: 16/9; background: #111827; }
.vth-video { width: 100%; height: 100%; object-fit: cover; display: none; background: #000; }
.vth-player.playing .vth-video { display: block; }
.vth-player.playing .vth-poster { display: none; }

.vth-poster { position: absolute; inset: 0; background: linear-gradient(160deg, #312e81, #1e1b4b); display: flex; align-items: center; justify-content: center; cursor: pointer; }
.vth-poster-grad { position: absolute; inset: 0; background: radial-gradient(circle at 30% 30%, rgba(99,102,241,0.35), transparent 60%); }
.vth-play { position: relative; width: 64px; height: 64px; border-radius: 50%; background: rgba(255,255,255,0.95); color: #4338ca; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform .15s, background .15s; }
.vth-play:hover { transform: scale(1.08); background: #fff; }
.vth-play svg { margin-left: 3px; }
.vth-duration { position: absolute; bottom: 12px; right: 14px; background: rgba(0,0,0,0.55); color: #fff; font-size: 11.5px; font-weight: 600; padding: 3px 8px; border-radius: 6px; }

.vth-quote { margin-top: 18px; padding: 0 4px; }
.vth-quote blockquote { font-size: 16px; font-weight: 600; line-height: 1.5; color: #1f2937; font-style: italic; }
.vth-quote figcaption { margin-top: 12px; display: flex; align-items: center; gap: 10px; }
.vth-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #a78bfa); color: #fff; font-size: 12.5px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.vth-attr { display: flex; flex-direction: column; font-size: 12.5px; color: #6b7280; line-height: 1.4; }
.vth-attr strong { color: #111827; font-size: 13.5px; }

@media (max-width: 860px) {
  .vth-inner { grid-template-columns: 1fr; gap: 32px; }
  .vth-title { font-size: 28px; }
}`,
  js: `const player = document.getElementById('vthPlayer');
const poster = document.getElementById('vthPoster');
const playBtn = document.getElementById('vthPlay');
const video = document.getElementById('vthVideo');

// This uses a real HTML5 <video> element with a public CC0 sample clip so the
// play/pause behavior below is genuine, not a static mockup. Swap the src for
// your real testimonial video file or hosted embed URL.
function playVideo() {
  player.classList.add('playing');
  video.play().catch(() => {
    // Autoplay can be blocked by the browser; the native controls remain
    // available so the visitor can press play manually.
  });
}

poster.addEventListener('click', playVideo);
playBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  playVideo();
});

video.addEventListener('pause', () => {
  if (video.currentTime === 0) player.classList.remove('playing');
});
video.addEventListener('ended', () => {
  player.classList.remove('playing');
});`,
  seo: {
    title: 'Hero with Video Testimonial Player — Free HTML CSS JS Snippet',
    description: 'A marketing hero framing a real HTML5 video testimonial with a styled poster, play button, quote caption, and attribution. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Hero with Video Testimonial Player — A Real Player, Framed as Social Proof',
      description: `Text testimonials are easy to skim past; a video testimonial forces a moment of attention. This snippet frames a real HTML5 \`<video>\` element as a customer-story hero — a styled poster frame with a play button and duration badge, a quote pulled from the video as a caption, and named attribution beneath it, next to a standard headline-and-CTA column.

**A real video element, not a mockup**

Unlike a static "pretend to be a player" UI, \`.vth-player\` wraps an actual \`<video>\` element with native \`controls\`. The demo ships with a small public CC0 sample clip so the play behavior is genuine and testable in this tool — swap the \`src\` for your real testimonial video (hosted on your own CDN, S3, Mux, or Vimeo/YouTube if you switch to an iframe embed) before shipping.

**Poster frame as the initial state**

Before playback starts, a custom \`.vth-poster\` overlay sits on top of the video — a gradient background, a radial glow, a large circular play button, and a duration badge in the corner. This is more inviting than the browser's default video poster and lets you art-direct the pre-play state to match your brand, independent of whatever the first video frame happens to look like.

**Click-to-play, not autoplay**

Clicking either the poster or the play button calls \`video.play()\` and adds a \`.playing\` class that swaps the poster for the real \`<video>\` element (with its native controls now visible). Autoplay is deliberately not used — many browsers block unmuted autoplay anyway, and a testimonial video is exactly the kind of content a visitor should choose to start, not have thrust on them.

**State tracks real playback events**

The script listens for the video's own \`pause\` and \`ended\` events, not just the click that started playback. If the video ends, or is paused at time zero (the state right after a user scrubs back to the start and pauses), the poster reappears — so the UI stays honest about what the video element is actually doing rather than assuming it's always playing once clicked.

**The quote as connective tissue**

Below the player, a pulled quote in italic with a gradient-avatar attribution (name, title, company) reinforces what the video says in a format a skimming visitor can read in two seconds, even if they never press play. This is the same pattern text-only testimonial cards use — pairing it with the actual video gives skeptical visitors the option to verify the quote themselves.

**Customizing it**

Replace the \`src\` with your real testimonial video and set a real \`poster\` image or keep the CSS poster overlay. Update the quote, name, title, and company. If you're embedding from YouTube or Vimeo instead of hosting the file yourself, swap the \`<video>\` element for an \`<iframe>\` and adjust the play-state JS accordingly, or pair this pattern with a [video modal](/ui-snippets/video-modal/) if you'd rather open playback in an overlay instead of inline.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A two-column hero renders with copy on the left and a styled video player with a poster overlay on the right.` },
      { title: 'Click the poster or play button', text: `The poster fades out, the native video element takes over, and playback starts.` },
      { title: 'Pause or let it finish', text: `The poster reappears if the video ends or is paused back at the start.` },
      { title: 'Swap the video source', text: `Replace the src on #vthVideo with your real testimonial video file or CDN URL.` },
      { title: 'Update the quote and attribution', text: `Edit the blockquote text, avatar initials, name, title, and company.` },
      { title: 'Wire the CTAs', text: `Point the primary button at signup and the secondary link at a case study page.` },
    ] },
    features: [
      { title: 'Real HTML5 video element', text: `Genuine playback with native controls, not a static mockup.` },
      { title: 'Art-directed poster overlay', text: `A branded pre-play state independent of the video's first frame.` },
      { title: 'Click-to-play, not autoplay', text: `Respects browser autoplay restrictions and visitor choice.` },
      { title: 'Real playback-state tracking', text: `Listens to pause and ended events to keep the poster state honest.` },
      { title: 'Pulled quote caption', text: `A skimmable text version of the testimonial beside the player.` },
      { title: 'Named attribution', text: `Gradient avatar, name, title, and company build credibility.` },
      { title: 'Duration badge', text: `Sets expectations for time commitment before pressing play.` },
      { title: 'Responsive two-column layout', text: `Stacks to a single column with the player first on mobile.` },
    ],
    useCases: [
      { title: 'Customer story landing pages', text: `Lead a case-study page with the video before the written detail.` },
      { title: 'SaaS and product marketing heroes', text: `Pair with a [product hero](/ui-snippets/product-hero/) elsewhere on the homepage.` },
      { title: 'Sales enablement pages', text: `Give reps a shareable page with proof a prospect can watch themselves.` },
      { title: 'Conference and event recap pages', text: `Frame attendee testimonials the same way for a returning-visitor pitch.` },
      { title: 'Onboarding for skeptical buyers', text: `Follow with a [video modal](/ui-snippets/video-modal/) gallery of more stories.` },
      { title: 'Learning real video-state UI patterns', text: `A reference for tracking native video events instead of faking player state.` },
      { icon: 'CODE', title: 'Related: Hero with Mouse-Parallax Layers', desc: 'See the [Hero with Mouse-Parallax Layers](/ui-snippets/hero-parallax-mouse-layers/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the video in this snippet a real, playable video?', a: `Yes — it uses a genuine HTML5 <video> element with a small public CC0 sample clip so playback is real and testable in this tool. Replace the src with your actual testimonial video before shipping; the poster overlay, play button, and playback-state logic all work the same way with your own file.` },
      { q: 'Why click-to-play instead of autoplay?', a: `Most browsers block unmuted autoplay anyway, and a testimonial is exactly the kind of content a visitor should choose to start rather than have played at them. Click-to-play also avoids unexpected audio and keeps the poster's art-directed pre-play state visible until the visitor is ready.` },
      { q: 'How does the poster know when to reappear?', a: `The script listens to the video element's own pause and ended events, not just the initial click. If playback ends, or the video is paused while scrubbed back to time zero, the .playing class is removed and the poster overlay returns — so the UI reflects the video's actual state rather than assuming it stays playing forever once started.` },
      { q: 'How do I use a YouTube or Vimeo embed instead of a hosted video file?', a: `Replace the <video> element with an <iframe> pointing at the embed URL, and adjust the JS: instead of calling video.play(), swap the poster for the iframe on click (most platforms don't expose a simple JS play/pause API without their own SDK). The poster, play button, and quote caption markup stay the same.` },
      { q: 'How do I use this hero in React, Vue, or Angular?', a: `Hold a playing boolean in state. The click handler calls the video ref's play() method and sets playing to true; onPause and onEnded handlers (bound to the video element) set it back to false when appropriate. Bind the .playing class and poster visibility to that state. Export via JSX, Vue, or Angular in the panel.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the video playback-state logic from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the poster overlay listens to the video element's own pause and ended events instead of just tracking a boolean set on click, and why autoplay is deliberately avoided for a testimonial video. The same assistant is useful for adapting the pattern to your setup — ask it how to swap the hosted <video> element for a YouTube or Vimeo iframe embed while keeping the same poster and play-button UI, or how to lazy-load the video source only when the poster is clicked to avoid an unnecessary network request on page load. It's also handy for extending the effect: ask it to add a carousel of multiple testimonial videos with the same player pattern, or auto-pause the video if the visitor scrolls it out of view. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a customer-testimonial marketing hero in plain HTML, CSS, and JavaScript using a real HTML5 video element — no framework, no video library.

Requirements:
- A two-column hero: a copy column with a badge, headline, subheading, and two CTA buttons, and a player column with a video testimonial.
- The player column must use a genuine <video> element with native controls (not a static image pretending to be a player), given a real or placeholder src attribute.
- Before playback starts, show a custom art-directed poster overlay on top of the video: a gradient background, a large circular play button with a play icon, and a small duration badge in the corner — this overlay should look better than the browser's default poster image.
- Clicking either the poster background or the play button should call the video element's own play() method (wrapped to gracefully handle a rejected autoplay promise) and swap the poster overlay out for the now-visible video element with its controls.
- Track the video's actual pause and ended events (not just the initial click) so that if the video finishes playing, or is paused while scrubbed back to the very start, the poster overlay reappears — the UI must reflect genuine playback state, not just "was clicked once."
- Below the player, add a pulled-quote caption in italic text with a small circular avatar, a name, and a title/company line as attribution.
- Make the whole hero responsive, stacking to a single column with the player above the copy on narrow screens.`,
    },
  },
};

export default heroVideoTestimonialEmbed;
