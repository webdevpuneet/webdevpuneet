const videoBgHero = {
  id: 'video-bg-hero',
  title: 'Video Background Hero',
  category: 'heroes',
  html: `<section class="hero">
  <!-- CSS animated "video-like" background -->
  <div class="bg-anim">
    <div class="blob b1"></div>
    <div class="blob b2"></div>
    <div class="blob b3"></div>
    <div class="scanline"></div>
  </div>
  <div class="overlay"></div>

  <div class="content">
    <div class="eyebrow">
      <span class="dot-pulse"></span>
      Live · World Tour 2026
    </div>

    <h1 class="headline">Experience the<br><span class="italic">moment</span></h1>

    <p class="sub">Front-row seats available for London, New York, and Tokyo. Limited availability — book before they're gone.</p>

    <div class="cta-row">
      <a href="#" class="btn-play" id="play-btn" onclick="toggleVideo(event)">
        <svg class="play-icon" id="play-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Watch trailer
      </a>
      <a href="#" class="btn-tickets">Book tickets →</a>
    </div>
  </div>

  <!-- Video modal -->
  <div class="video-modal" id="video-modal" onclick="closeModal(event)">
    <div class="modal-inner">
      <button class="modal-close" onclick="closeModal()">×</button>
      <div class="video-placeholder">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <p>Video player would render here.<br>Replace with a real &lt;video&gt; tag or iframe.</p>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="scroll-ind">
    <div class="scroll-mouse"><div class="scroll-wheel"></div></div>
    <span>Scroll</span>
  </div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; margin: 0; overflow: hidden; }

.hero { position: relative; height: 100vh; display: flex; align-items: center; overflow: hidden; background: #030712; }

/* Animated background */
.bg-anim { position: absolute; inset: 0; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(100px); animation: drift 20s ease-in-out infinite; }
.b1 { width: 70vw; height: 70vw; background: radial-gradient(circle, rgba(124,58,237,0.6), transparent 70%); top:-20%; left:-20%; animation-duration: 20s; }
.b2 { width: 60vw; height: 60vw; background: radial-gradient(circle, rgba(219,39,119,0.4), transparent 70%); bottom:-20%; right:-10%; animation-duration: 25s; animation-delay:-8s; animation-direction:reverse; }
.b3 { width: 40vw; height: 40vw; background: radial-gradient(circle, rgba(37,99,235,0.4), transparent 70%); top:40%; left:50%; animation-duration: 18s; animation-delay:-4s; }
@keyframes drift { 0%,100%{transform:translate(0,0)} 33%{transform:translate(40px,-60px)} 66%{transform:translate(-50px,40px)} }

.scanline { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px); pointer-events: none; }

.overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%); }

/* Content */
.content { position: relative; z-index: 1; max-width: 600px; padding: 0 60px; display: flex; flex-direction: column; gap: 24px; }
@media (max-width:600px) { .content { padding: 0 24px; } }

.eyebrow { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.7); }
.dot-pulse { width: 8px; height: 8px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.3); animation: pulse 2s ease infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }

.headline { font-size: clamp(44px,8vw,96px); font-weight: 900; color: #fff; line-height: 1.05; letter-spacing: -2px; }
.italic { font-style: italic; font-weight: 300; color: rgba(255,255,255,0.7); }

.sub { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.75; max-width: 380px; }

.cta-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.btn-play { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 15px; font-weight: 600; padding: 12px 22px; border-radius: 50px; text-decoration: none; transition: all 0.2s; }
.btn-play:hover { background: rgba(255,255,255,0.25); }
.play-icon { flex-shrink: 0; }
.btn-tickets { color: rgba(255,255,255,0.7); font-size: 15px; font-weight: 600; text-decoration: none; transition: color 0.15s; }
.btn-tickets:hover { color: #fff; }

/* Video modal */
.video-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 100; opacity: 0; pointer-events: none; transition: opacity 0.25s; }
.video-modal.open { opacity: 1; pointer-events: all; }
.modal-inner { position: relative; width: min(760px,90vw); aspect-ratio: 16/9; background: #111; border-radius: 14px; overflow: hidden; }
.modal-close { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.1); border: none; color: #fff; font-size: 20px; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; z-index: 1; transition: background 0.15s; }
.modal-close:hover { background: rgba(255,255,255,0.2); }
.video-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: rgba(255,255,255,0.4); font-size: 13px; text-align: center; line-height: 1.6; }

/* Scroll indicator */
.scroll-ind { position: absolute; bottom: 32px; left: 60px; display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 1; }
.scroll-mouse { width: 20px; height: 32px; border: 1.5px solid rgba(255,255,255,0.3); border-radius: 10px; display: flex; justify-content: center; padding-top: 5px; }
.scroll-wheel { width: 3px; height: 7px; background: rgba(255,255,255,0.5); border-radius: 2px; animation: scroll-anim 2s ease-in-out infinite; }
@keyframes scroll-anim { 0%{transform:translateY(0);opacity:0.5} 50%{transform:translateY(6px);opacity:1} 100%{transform:translateY(0);opacity:0.5} }
.scroll-ind span { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.3); }`,
  js: `function toggleVideo(e) {
  e.preventDefault();
  document.getElementById('video-modal').classList.add('open');
  document.addEventListener('keydown', onKey);
}

function closeModal(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('video-modal').classList.remove('open');
  document.removeEventListener('keydown', onKey);
}

function onKey(e) { if (e.key === 'Escape') closeModal(); }`,
  seo: {
    title: 'Video Background Hero — Free HTML CSS JS Snippet',
    description: 'Hero with animated blob background, scanline texture and a play button opening a fullscreen modal. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Video Background Hero — CSS Blob Animation, Play Button & Fullscreen Video Modal',
      description: `A video background hero creates an immersive, cinematic above-the-fold experience — widely used for event landing pages, entertainment products, film and music websites, and premium brand campaigns. This snippet provides a complete video background hero without requiring an actual video file: three animated CSS radial-gradient blobs simulate the colour and movement of a video background, a scanline texture adds grain, a left-fade overlay makes text legible, and a pill-shaped play button opens a fullscreen [video modal](/ui-snippets/video-modal/) — all in plain HTML, CSS, and vanilla JavaScript.\n\n**The CSS blob animation as a video substitute**\n\nThree absolutely positioned divs with radial-gradient backgrounds and filter: blur(100px) create large, soft colour blobs. A CSS @keyframes drift animation moves each blob via translate(x,y) on different durations (18–25s) and delays (-4s, -8s). Because they move at different speeds and in different directions, the blobs never synchronise — creating the organic, shifting colour movement associated with video backgrounds. The key advantage over a real video: zero file size, no loading delay, no browser autoplay restrictions.\n\n**The scanline texture**\n\nA repeating-linear-gradient creates horizontal lines at 4px intervals: transparent 3px, then a 1px semi-transparent black stripe. At 3% opacity, this adds grain and depth without being visually distracting — the same technique used on premium dark UIs.\n\n**The left-fade overlay**\n\nA linear-gradient overlay fades from rgba(0,0,0,0.7) on the left (where the text sits) to transparent on the right. This makes text legible against any background colour without darkening the right side of the hero where visual interest should remain.\n\n**The video modal**\n\nClicking the play button adds .open to the fullscreen modal overlay. The modal uses backdrop-filter: blur(12px) on a near-black background. The inner container uses aspect-ratio: 16/9 for a consistent video frame. In production, replace the .video-placeholder div with a real video element or YouTube/Vimeo iframe. Click-outside (e.target === e.currentTarget on the overlay) and ESC key close the modal — the same dismiss pattern as the base [modal](/ui-snippets/modal/) snippet.\n\n**The live event eyebrow**\n\nA pulsing red dot + "Live · World Tour 2026" label communicates urgency and recency. The dot uses box-shadow for the glow ring and an opacity keyframe for the pulse animation.\n\n**Accessibility and performance**\n\nFor users who prefer reduced motion, add @media (prefers-reduced-motion: reduce) { .blob { animation: none; } .dot-pulse { animation: none; } } to freeze the blob drift and live badge pulse. The blob animations use CSS transform which runs on the GPU compositor — safe for 60fps even on mobile. Test with Chrome DevTools Performance to verify no layout recalculation is triggered.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click "Watch trailer" to open the video modal', text: 'The play button opens a fullscreen modal with backdrop blur. Click the × button, press ESC, or click the dark backdrop to close. The modal has a 16:9 aspect ratio for video content.' },
      { title: 'Add a real video inside the modal', text: 'Replace the .video-placeholder div with a video element: <video src="trailer.mp4" controls autoplay style="width:100%;height:100%;object-fit:cover"></video>. Or use a YouTube iframe: <iframe src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" frameborder="0" allow="autoplay" style="width:100%;height:100%;"></iframe>' },
      { title: 'Update the eyebrow, headline, and CTAs', text: 'Edit the .eyebrow span text for your event or product. Change the two-line h1 headline and the .italic word. Update the .sub paragraph. Wire .btn-tickets href to your booking or product page.' },
      { title: 'Change the blob colours', text: 'In the CSS, update the rgba() colours in .b1, .b2, and .b3 background gradients. Use three complementary colours from your brand palette. Higher opacity values (0.6–0.8) create more vivid blobs; lower (0.2–0.3) create subtler ambience.' },
      { title: 'Use a real video as the background', text: 'For a real video background: add <video autoplay muted loop playsinline> inside .bg-anim. Set position:absolute; inset:0; object-fit:cover; width:100%; height:100%. Keep the .overlay and .scanline on top for text legibility and grain texture.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useState for the modal open state, or "Tailwind" for a Tailwind CSS version.' },
    ]},
    features: ['3 animated CSS blob backgrounds: radial-gradient + blur(100px) + drift keyframe','Staggered blob animation: different durations (18-25s) and delays (-4s,-8s) for organic movement','Scanline texture: repeating-linear-gradient 4px pattern at 3% opacity','Left-fade overlay: linear-gradient rgba(0,0,0,0.7)→transparent for text legibility','Pulsing live badge: red dot with box-shadow glow ring + opacity keyframe','Pill play button: backdrop-filter:blur(10px) glass pill with play SVG icon','Fullscreen modal: backdrop-filter:blur(12px), aspect-ratio:16/9, ESC+click-outside close','Scroll indicator: mouse icon with animated wheel dot'],
    useCases: [
      { icon: 'STAR', title: 'Concert, event, and entertainment product landing pages', desc: 'The video background hero is the standard aesthetic for event landing pages, album launches, film promotion sites, and entertainment brands. The animated blob background provides cinematic ambience without a real video file during development.' },
      { icon: 'DESIGN', title: 'Premium brand, fashion, and luxury product campaigns', desc: 'Dark video backgrounds with minimal overlay text communicate brand premium quality. The left-fade overlay technique keeps the right side of the frame visually unobstructed — important for product imagery or lifestyle photography in the background.' },
      { icon: 'APP', title: 'SaaS product demo and feature announcement pages', desc: 'Use the play button to open a product demo video modal. The "Watch trailer" pill-shaped glass button is the standard CTA for demo video landing pages. The animated blob background serves as a placeholder before the video is produced.' },
      { icon: 'FLOW', title: 'Charity, cause, and campaign landing pages', desc: 'Use a real cause-related background video (muted, autoplay, looped footage) with the left-fade overlay for headline legibility. The pulsing live badge adapts to "Campaign live until Nov 30" or "Fundraising open". Wire the tickets button to a donation page.' },
      { icon: 'LEARN', title: 'Learn CSS blob animation and glass morphism techniques', desc: 'The blob animation demonstrates how three differently-timed drift keyframes create organic colour movement without JavaScript. The pill glass button demonstrates backdrop-filter: blur on a button element. Both techniques apply to any dark-themed UI.' },
      { icon: 'CODE', title: 'Replace with a real video element for production deployment', desc: 'The CSS blob background is a zero-file-size placeholder. For an inline player instead of a background, see the [video player](/ui-snippets/video-player/) snippet. For production: add <video autoplay muted loop playsinline src="bg.mp4"> inside .bg-anim. Set position:absolute; inset:0; width:100%; height:100%; object-fit:cover on the video. Remove the blob divs. The overlay, scanline, and modal code remain unchanged.' },
      { icon: 'CODE', title: 'Related: Hero with Terminal Boot Sequence', desc: 'See the [Hero with Terminal Boot Sequence](/ui-snippets/hero-typewriter-terminal-boot/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I use a real background video instead of the CSS blob animation?', a: 'Inside .bg-anim, replace the three .blob divs with a video element: <video autoplay muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" src="your-video.mp4"></video>. The muted and autoplay attributes together allow autoplay in all browsers — autoplay without muted is blocked by all major browsers. The loop attribute loops infinitely. Keep .scanline and .overlay as-is for texture and text legibility. Remove .blob CSS classes.' },
      { q: 'How do I embed a YouTube video in the modal instead of a local video file?', a: 'Replace the .video-placeholder div with an iframe: <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;inset:0;"></iframe>. The autoplay=1 parameter starts the video when the modal opens. Add ?enablejsapi=1 if you want to control the player via the YouTube IFrame API. To stop the video when the modal closes, call the iframe\'s contentWindow.postMessage to pause: iframe.contentWindow.postMessage("stopVideo","*").' },
      { q: 'How do I add a preload or loading state while the background video loads?', a: 'Add a poster attribute to the video element: poster="thumbnail.jpg". The poster image shows while the video loads — it should be a single frame from the video. For a loading spinner, add a .loading-overlay div over the video and listen for the video canplaythrough event: video.addEventListener("canplaythrough", () => loadingOverlay.style.display = "none"). The CSS blob background in this snippet never needs a loading state since it is pure CSS.' },
      { q: 'How do I use this video hero in a Next.js or React project?', a: 'Click "JSX" to download. Manage modal open state with useState(false). Toggle with setModalOpen(true) on play button click. Close with setModalOpen(false) in the close handler. For the ESC key, use a useEffect: useEffect(() => { if (!modalOpen) return; const handler = e => { if (e.key === "Escape") setModalOpen(false); }; document.addEventListener("keydown", handler); return () => document.removeEventListener("keydown", handler); }, [modalOpen]). The CSS blob animation is pure CSS — no JavaScript needed for it.' },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the animation timing by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the three blobs use different animation-duration and animation-delay values (and one reversed animation-direction), and why that specific combination is what keeps them from ever visually synchronizing into a repeating, obviously-looped pattern. It's also worth an accessibility question — ask what prefers-reduced-motion media query changes should be added so the drifting blobs and pulsing live dot freeze for users who've requested less motion. For extending it, have it swap the CSS blobs for a real muted looping background video while keeping the overlay and scanline layers unchanged, add a second CTA that deep-links into a specific chapter of the trailer, or make the scroll indicator disappear once the user actually scrolls. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a cinematic video-background-style hero section in plain HTML, CSS, and vanilla JavaScript, using pure CSS animated shapes as a zero-file-size substitute for an actual background video.

Requirements:
- A full-viewport-height hero with three large, blurred, radial-gradient "blob" divs absolutely positioned and layered behind the content, each using a different size, position, gradient color, and CSS keyframe animation duration/delay so their drifting movement never falls into a visibly synchronized loop; at least one blob must animate in the reverse direction from the others.
- A subtle scanline texture layer using a repeating-linear-gradient at a low opacity laid over the blobs, purely decorative and non-interactive (must not block clicks).
- A horizontal fade overlay (dark on one side fading to transparent) so headline text remains legible regardless of what's animating behind it.
- Foreground content consisting of a small pulsing "live" indicator dot next to an eyebrow label, a large multi-line headline, a supporting paragraph, and two calls to action: a pill-shaped "glass" button (semi-transparent background plus backdrop-filter blur) that opens a video modal, and a plain text link.
- A fullscreen modal, hidden by default, that fades and scales in when opened: a centered 16:9 frame with a close button, dismissible by clicking its button, clicking the dark backdrop outside the frame, or pressing Escape.
- A scroll-hint indicator near the bottom of the hero (an animated mouse-wheel icon plus a "Scroll" label) that continuously animates to invite the visitor to scroll further.`,
    },
  },
};

export default videoBgHero;
