const videoModal = {
  id: 'video-modal',
  title: 'Video Modal',
  lastmod: '2026-06-22',
  category: 'media',
  html: `<div class="vdm-page">
  <button type="button" class="vdm-thumb" id="vdmThumb" aria-label="Play video">
    <span class="vdm-thumb-bg">🎬</span>
    <span class="vdm-play">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20"/></svg>
    </span>
    <span class="vdm-thumb-label">
      <strong>Product demo</strong>
      <span>2:14 · Watch how it works</span>
    </span>
  </button>
</div>

<div class="vdm-backdrop" id="vdmBackdrop"></div>
<div class="vdm-modal" id="vdmModal" role="dialog" aria-modal="true" aria-label="Video player">
  <button type="button" class="vdm-close" id="vdmClose" aria-label="Close">✕</button>
  <div class="vdm-frame" id="vdmFrame">
    <!-- The iframe is injected on open and removed on close, so the video stops. -->
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh}

.vdm-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.vdm-thumb{position:relative;width:100%;max-width:440px;aspect-ratio:16/9;border:none;border-radius:16px;overflow:hidden;cursor:pointer;box-shadow:0 18px 44px rgba(15,23,42,.18);padding:0}
.vdm-thumb-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:72px;background:linear-gradient(135deg,#1e293b,#334155)}
.vdm-thumb::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(15,23,42,.7),transparent 55%)}
.vdm-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.95);color:#0f172a;display:flex;align-items:center;justify-content:center;z-index:2;transition:transform .2s,background .2s}
.vdm-play svg{margin-left:3px}
.vdm-thumb:hover .vdm-play{transform:translate(-50%,-50%) scale(1.1);background:#fff}
.vdm-thumb-label{position:absolute;left:16px;bottom:14px;z-index:2;text-align:left;color:#fff}
.vdm-thumb-label strong{display:block;font-size:15px;font-weight:800}
.vdm-thumb-label span{font-size:12px;opacity:.85}

.vdm-backdrop{position:fixed;inset:0;background:rgba(8,11,20,.82);opacity:0;pointer-events:none;transition:opacity .25s;z-index:90}
.vdm-backdrop.show{opacity:1;pointer-events:all}

.vdm-modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-48%) scale(.96);opacity:0;pointer-events:none;
  width:min(860px,94vw);z-index:91;transition:opacity .28s,transform .28s}
.vdm-modal.show{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:all}
.vdm-frame{aspect-ratio:16/9;background:#000;border-radius:14px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.5)}
.vdm-frame iframe,.vdm-frame video{width:100%;height:100%;border:0;display:block;object-fit:contain;background:#000}
.vdm-close{position:absolute;top:-42px;right:0;width:34px;height:34px;border-radius:50%;border:none;background:rgba(255,255,255,.15);color:#fff;cursor:pointer;font-size:15px;transition:background .15s}
.vdm-close:hover{background:rgba(255,255,255,.28)}`,

  js: `// A real, public-domain sample video. To embed a hosted video instead, swap the
// injected markup in open() for an <iframe src="https://www.youtube.com/embed/ID
// ?autoplay=1"> (or a Vimeo embed) — the open/close lifecycle is identical.
var VIDEO_SRC = 'https://mdn.github.io/shared-assets/videos/flower.mp4';

var backdrop = document.getElementById('vdmBackdrop');
var modal = document.getElementById('vdmModal');
var frame = document.getElementById('vdmFrame');

function open() {
  // Inject the player only when opening, so the video isn't loaded until needed.
  // muted lets it autoplay reliably everywhere; users can unmute via the controls.
  frame.innerHTML = '<video src="' + VIDEO_SRC + '" autoplay muted controls playsinline></video>';
  backdrop.classList.add('show');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function close() {
  backdrop.classList.remove('show');
  modal.classList.remove('show');
  document.body.style.overflow = '';
  // Remove the player so the video stops playing (and frees its memory).
  setTimeout(function () { frame.innerHTML = ''; }, 280);
}

document.getElementById('vdmThumb').addEventListener('click', open);
document.getElementById('vdmClose').addEventListener('click', close);
backdrop.addEventListener('click', close);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) close();
});`,

  seo: {
    title: 'Video Modal — Lightbox Video Player HTML CSS JS',
    description: `A click-to-play video modal with a poster thumbnail that opens a 16:9 player, autoplays, and stops on close by removing the player. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Video Modal — Poster Thumbnail to Autoplaying Lightbox Player',
      description: `A video modal turns a poster thumbnail with a play button into a full lightbox player — the pattern used for product demos, hero videos, and tutorials everywhere, because it keeps the page light (no heavy video player until the user wants it) while making "watch the video" one click. This snippet builds it in plain HTML, CSS, and vanilla JavaScript, with the one detail that's easy to get wrong: removing the player on close so the video actually stops.

**Lazy: the player loads only on click**

The thumbnail is a styled button with a poster background, a play badge, and a title overlay — no \`<iframe>\` or \`<video>\` exists until the user clicks. \`open()\` injects the embed iframe at that moment, so the page doesn't pay the cost (network, scripts, memory) of a YouTube or Vimeo player on load — only when someone actually wants to watch. This is the right default: most visitors never play the video, so loading it eagerly wastes bandwidth and slows the page for everyone. The iframe URL includes \`autoplay=1\` so playback starts immediately on open.

**Removing the iframe on close — the critical detail**

The most common video-modal bug is the video continuing to play (audible) after the modal is closed, because hiding the modal doesn't stop the player. The fix is to *remove* the iframe entirely on close, not just hide it — \`close()\` clears \`frame.innerHTML\` (after the fade-out finishes, so it doesn't flash empty). Destroying the iframe stops playback, frees the player's memory, and guarantees no background audio. It also means each open starts the video fresh from the beginning. This injection-on-open, removal-on-close lifecycle is the whole trick to a correct video modal.

**A proper 16:9 lightbox**

The modal centers a 16:9 frame (via \`aspect-ratio\`) on a near-black backdrop, sized to a large but viewport-capped width so it's cinematic on desktop and fits on mobile. The close button sits just above the frame's corner (the YouTube/Vimeo lightbox convention), and the modal animates in with \`opacity\` and \`transform\` only — a slight scale-and-rise — keeping it smooth across every framework export. The darker backdrop (vs a typical modal) suits video, focusing attention on the player.

**Scroll lock and full dismissal**

Opening locks body scroll (\`overflow: hidden\`) so the page behind doesn't scroll while watching, restored on close. The modal closes via the ✕, a backdrop click, or Escape — all through one \`close()\` that handles the animation, scroll restore, and iframe removal together. \`role="dialog"\` with \`aria-modal="true"\` and a labeled close button keep it accessible.

**Works with any video source**

The demo uses a YouTube embed, but the same structure works for Vimeo (swap the embed URL), a self-hosted \`<video>\` tag (inject \`<video src autoplay controls>\` instead of an iframe), or any player — the lazy-inject and remove-on-close pattern applies identically. The \`allow="autoplay; fullscreen"\` and \`allowfullscreen\` attributes ensure autoplay and the fullscreen control work. Swap the \`EMBED\` URL or injection markup for your source and it's ready.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 16:9 video poster with a play button and title renders — no video player loaded yet.` },
      { title: 'Click to play', text: `Click the thumbnail — the player iframe is injected and the video opens in a centered lightbox, autoplaying.` },
      { title: 'Close it', text: `Click ✕, the backdrop, or press Escape — the modal closes and the iframe is removed so the video stops.` },
      { title: 'Confirm it stops', text: `Note there's no lingering audio after close, because the player is destroyed rather than just hidden.` },
      { title: 'Set your video', text: `Replace the EMBED URL with your YouTube/Vimeo embed, or inject a <video> tag for a self-hosted file.` },
      { title: 'Add a real poster', text: `Swap the gradient/emoji poster for your video's thumbnail image on the trigger button.` },
    ] },
    features: [
      { title: 'Lazy player loading', text: `The iframe is injected only when the user clicks play, so the page never loads a heavy player upfront.` },
      { title: 'Removes iframe on close', text: `Closing clears the iframe (not just hides it), so the video actually stops with no lingering audio.` },
      { title: 'Autoplay on open', text: `The embed URL includes autoplay so playback starts immediately, and each open restarts from the beginning.` },
      { title: '16:9 cinematic lightbox', text: `An aspect-ratio frame on a near-black backdrop, viewport-capped for desktop and mobile.` },
      { title: 'Body scroll lock', text: `Opening locks page scroll while watching and restores it on close.` },
      { title: 'Backdrop / close / Escape dismissal', text: `All three paths run one close() that handles animation, scroll restore, and iframe removal together.` },
      { title: 'Any video source', text: `Works with YouTube, Vimeo, or a self-hosted <video> tag — the lazy-inject pattern is identical.` },
      { title: 'Accessible, animation-safe', text: `role="dialog" with aria-modal, a labeled close, and opacity/transform-only transitions.` },
    ],
    useCases: [
      { title: 'Product demo and explainer videos', text: `A "Watch how it works" poster that opens the demo — pair with an [add to calendar button](/ui-snippets/add-to-calendar-button/) for a follow-up webinar.` },
      { title: 'Landing-page hero videos', text: `Keep the page fast with a poster that opens the hero video on demand, near a [spotlight card](/ui-snippets/spotlight-card/) feature grid.` },
      { title: 'Course and tutorial previews', text: `Let learners preview a lesson video in a focused lightbox.` },
      { title: 'Testimonial and case-study videos', text: `Play customer story videos without embedding heavy players in the page.` },
      { title: 'Marketing and campaign pages', text: `Feature a campaign video behind a click so it doesn't slow initial load.` },
      { title: 'Learning lazy-embed patterns', text: `A reference for inject-on-open, remove-on-close video lightboxes — compare with a [video player](/ui-snippets/video-player/) for an inline custom player.` },
    ],
    faqs: [
      { q: 'Why remove the iframe on close instead of hiding the modal?', a: `Hiding a modal (display:none or opacity) doesn't stop an embedded video — YouTube/Vimeo players keep playing, so the user hears audio with no visible video, the most common video-modal bug. Removing the iframe from the DOM destroys the player, which stops playback, frees its memory, and ensures the next open starts fresh. This snippet clears frame.innerHTML on close (after the fade) for exactly this reason.` },
      { q: 'How do I use my own YouTube, Vimeo, or self-hosted video?', a: `For YouTube, set EMBED to https://www.youtube.com/embed/VIDEO_ID?autoplay=1&rel=0; for Vimeo, https://player.vimeo.com/video/VIDEO_ID?autoplay=1. For a self-hosted file, inject a <video src="..." autoplay controls></video> instead of the iframe in open(). The inject-on-open and remove-on-close logic is identical regardless of source.` },
      { q: 'Why load the video lazily instead of embedding it directly?', a: `An embedded YouTube/Vimeo player pulls in significant scripts and network requests on page load, slowing the page for every visitor — most of whom never play the video. Loading the player only when the user clicks play keeps the initial page light and fast, which improves Core Web Vitals and the experience for non-watchers, at the cost of nothing for those who do watch (the click triggers the load).` },
      { q: 'Does autoplay work reliably, and what about sound?', a: `Because the user clicked to open, this is a user-initiated action, so browsers generally allow autoplay with sound — unlike autoplay on page load, which is blocked or muted. Include allow="autoplay" on the iframe. If you ever autoplay without a click, browsers require the video to be muted, so design around that constraint when there's no user gesture.` },
      { q: 'How do I use this video modal in React, Vue, or Angular?', a: `In React, hold an open boolean in useState and conditionally render the iframe ({open && <iframe .../>}) so it mounts on open and unmounts on close — React's unmount removes it and stops the video automatically; in Vue, use v-if on the iframe; in Angular, use *ngIf. This is even cleaner than the vanilla version, since the framework's conditional rendering handles the inject/remove lifecycle for you.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the lifecycle by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why close() waits roughly 280ms before clearing frame.innerHTML rather than clearing it immediately, and how that delay relates to the modal's own CSS transition duration. It's also worth asking about a real gap in the current approach — the video element is injected fresh with muted autoplay every time open() runs, so ask what would need to change to remember the user's volume or playback position across repeated opens within the same session. For extending it, have it add a loading spinner shown while the injected video buffers, support swapping between multiple videos from one modal instance, or add focus-trapping so Tab cycles only within the modal while it's open. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a click-to-play video lightbox modal in plain HTML, CSS, and vanilla JavaScript with no libraries, where the video player element only exists in the DOM while the modal is open.

Requirements:
- A poster/thumbnail trigger button showing a background image or gradient, a centered circular play icon, and a title/subtitle overlay — no video or iframe element anywhere in the initial markup.
- Clicking the trigger must inject a video or iframe element into an empty container at that moment (not before), set it to autoplay, and reveal a backdrop and a centered modal frame with matching CSS transitions (opacity plus a scale/transform) driven by a "show" class toggle.
- The modal frame must maintain a 16:9 aspect ratio, be capped to a reasonable maximum width, and include a close button positioned just outside its top-right corner.
- Closing the modal (via the close button, clicking the backdrop, or pressing Escape) must first remove the "show" class to play the closing transition, and only after that transition's duration has elapsed, actually clear the injected video/iframe element from the DOM — so the player is genuinely destroyed and any playback stops, rather than just being visually hidden.
- Opening the modal must lock the page's body scroll, and closing it must restore the previous scroll behavior.
- The modal container must use role="dialog" and aria-modal="true" with an accessible label, and the close button must have an aria-label.`,
    },
  },
};

export default videoModal;
