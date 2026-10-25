import { esc, IMG } from './meta.js';
import { tame } from './custom-section.js';

/* Popup & Promo Modal: a dialog that appears on its own, after some time, when the visitor is
   about to leave (exit intent) or after they scroll part of the page. In the middle of the
   screen it dims the page; in a corner or along the bottom or top edge it is a small promo card
   with no overlay that the visitor can keep browsing around and close with ×. It can hold an
   image, an image carousel or a click-to-play video, a heading, text, your own HTML, an email form
   and up to two buttons (CTAs).
   It takes no space in the layout (its section is 0 px tall; the dialog is position:fixed). In
   the editor previews it is shown as a normal card, so its content can be edited by clicking.
   `finalize` (render.js fillHtml) writes the trigger settings onto the root; the `popup`
   behaviour (behaviors.js) opens, closes and runs the carousel; `form` sends the email form. */

const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); };
const POSITIONS = ['center', 'bottom-right', 'bottom-left', 'bottom-center', 'top-right', 'top-left'];
const pick = (v, allowed, d) => (allowed.includes(String(v)) ? String(v) : d);
const num = (v, d, min, max) => { const n = parseFloat(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : d; };

export default {
  id: 'popup-modal',
  name: 'Popup & Promo Modal',
  version: '1.0.0',
  category: 'popup',
  tags: ['popup', 'modal', 'exit-intent', 'promo', 'sidekick', 'newsletter', 'lead-capture', 'carousel', 'overlay', 'light'],
  created: '2026-10-25',
  updated: '2026-10-25',
  seoTitle: 'Popup & Promo Modal — Free Exit-Intent Popup Template',
  seoDescription: 'Free popup template: open it after a delay, on exit intent or on scroll, as a centre modal or corner promo card with email form, video, carousel and CTAs.',
  description: 'A popup or promo modal that opens by itself: in the middle of the screen with a dimmed page, or as a small card in a corner or along the bottom or top edge with no overlay, which the visitor can dismiss with ×. It opens after a delay, when the visitor moves to leave the page (exit intent) or after they scroll part of the way down, and can hold an image, an image carousel or a video, a heading, text, your own HTML, an email form and up to two buttons. It takes no space in your layout.',
  bestFor: ['Newsletter and discount sign-ups', 'Exit-intent offers on shop and landing pages', 'Promo cards for sales, launches, webinars and events'],
  behaviors: ['popup', 'form', 'video'],
  previewMinHeight: 560,
  /* Writes the root's trigger settings (called by fillHtml) */
  finalize: (html, state, { clean = false } = {}) => {
    const f = state.fields || {};
    // Custom HTML goes in as written in exports; the editor previews strip scripts and inline handlers
    const custom = String(f.customHtml || '');
    const attrs = [
      ['data-trigger', pick(f.trigger, ['delay', 'exit', 'scroll'], 'delay')],
      ['data-delay', num(f.delay, 8, 0, 600)],
      ['data-scroll', num(f.scrollPct, 50, 5, 100)],
      ['data-days', num(f.days, 7, 0, 365)],
      ['data-pos', pick(f.position, POSITIONS, 'center')],
      ['data-layout', pick(f.layout, ['left', 'right', 'top', 'bottom'], 'left')],
      ['data-autoplay', num(f.autoplay, 0, 0, 30)],
      ['data-pu-id', hash(`${f.heading || ''}|${f.trigger || ''}`)],
    ].map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
    // Width and height are automatic unless set to Custom (px)
    const dim = (v, min, max) => { const n = parseFloat(v); return Number.isFinite(n) && n > 0 ? Math.min(max, Math.max(min, Math.round(n))) : 0; };
    const vars = [['--pu-w', f.widthMode === 'custom' ? dim(f.width, 280, 1100) : 0], ['--pu-h', f.heightMode === 'custom' ? dim(f.height, 200, 900) : 0]].filter(([, n]) => n).map(([k, n]) => `${k}:${n}px`).join(';');
    const style = vars ? ` style="${vars}"` : '';
    return html
      .replace('<div class="pu" data-pu>', () => `<div class="pu" data-pu${attrs}${style}>`)
      .replace('<div class="pu-html" data-pu-html></div>', () => `<div class="pu-html">${clean ? custom : tame(custom)}</div>`);
  },

  groups: [
    { id: 'when', label: 'When & where it appears' },
    { id: 'layout', label: 'Layout' },
    { id: 'content', label: 'Heading & text' },
    { id: 'image', label: 'Image', toggle: 'showImage' },
    { id: 'carousel', label: 'Image carousel', toggle: 'showCarousel' },
    { id: 'video', label: 'Video', toggle: 'showVideo' },
    { id: 'html', label: 'Custom HTML', toggle: 'showHtml' },
    { id: 'form', label: 'Email form', toggle: 'showForm' },
    { id: 'cta', label: 'Buttons (CTAs)', toggle: 'showCta' },
    { id: 'close', label: 'Closing' },
  ],
  fields: [
    { key: 'trigger', group: 'when', label: 'Show the popup', type: 'choice', options: [['delay', 'After some time'], ['exit', 'When the visitor is about to leave (exit intent)'], ['scroll', 'After scrolling part of the page']], value: 'delay', hint: 'Exit intent watches the mouse leaving the top of the window. Phones have no mouse, so there it shows after 10 seconds or the delay below, whichever is longer.' },
    { key: 'delay', group: 'when', label: 'Delay (seconds)', type: 'text', value: '8', hint: 'Used for “After some time”.' },
    { key: 'scrollPct', group: 'when', label: 'Scroll depth (%)', type: 'text', value: '50', hint: 'Used for “After scrolling”: the share of the page scrolled.' },
    { key: 'days', group: 'when', label: 'Show again after (days)', type: 'text', value: '7', hint: '0 shows it on every visit. Otherwise it stays away for that many days once shown.' },
    { key: 'position', group: 'when', label: 'Position', type: 'choice', options: [['center', 'Centre of the screen, page dimmed'], ['bottom-right', 'Bottom right, no overlay'], ['bottom-left', 'Bottom left, no overlay'], ['bottom-center', 'Bottom centre, no overlay'], ['top-right', 'Top right, no overlay'], ['top-left', 'Top left, no overlay']], value: 'center', hint: 'Only the centre position dims the page. The others are small cards the visitor can keep browsing around, and close with ×.' },

    { key: 'layout', group: 'layout', label: 'Text position, next to the image or video', type: 'choice', options: [['left', 'Text on the right of the image'], ['right', 'Text on the left of the image'], ['top', 'Text below the image (image on top)'], ['bottom', 'Text above the image (image at the bottom)']], value: 'left', hint: 'Right and left need the centre position. Above and below work for the centre popup and for corner cards, which are always one column, as are small screens. Remove the image, carousel and video for a text-only popup, or clear the text for a media-only one.' },

    { key: 'widthMode', group: 'layout', label: 'Width', type: 'choice', options: [['auto', 'Automatic (fits the layout)'], ['custom', 'Custom']], value: 'auto', hint: 'Automatic is about 780 px for two columns, 520 px for one column and 400 px for corner cards.' },
    { key: 'width', group: 'layout', label: 'Custom width (px)', type: 'text', value: '600', hint: 'Used when the width is Custom. Between 280 and 1100. It always fits the screen.' },
    { key: 'heightMode', group: 'layout', label: 'Height', type: 'choice', options: [['auto', 'Automatic (fits the content)'], ['custom', 'Custom']], value: 'auto', hint: 'The image or video fills extra height, and the popup scrolls if the content is taller.' },
    { key: 'height', group: 'layout', label: 'Custom height (px)', type: 'text', value: '520', hint: 'Used when the height is Custom. Between 200 and 900. It never grows beyond the screen.' },

    { key: 'eyebrow', group: 'content', label: 'Label (optional)', type: 'text', value: 'Before you go' },
    { key: 'heading', group: 'content', label: 'Heading', type: 'textarea', value: 'Get *10% off* your first order' },
    { key: 'lead', group: 'content', label: 'Text', type: 'textarea', value: 'Join our newsletter and we will send your code straight away. No spam, and you can unsubscribe at any time.' },

    { key: 'image', group: 'image', label: 'Image', type: 'image', value: IMG('hero-landscape.jpg'), hint: 'About 800×800 px. Shown beside the text on wide screens and above it on small ones. Not used when the carousel is on.', upload: { name: 'popup', maxW: 1000 } },
    { key: 'imageAlt', group: 'image', label: 'Alt text', type: 'text', value: 'A green valley at sunrise' },

    { key: 'autoplay', group: 'carousel', label: 'Change slide every (seconds)', type: 'text', value: '0', hint: '0 keeps it manual (swipe, arrows or dots). It stops while the visitor hovers over it and for people who prefer reduced motion.' },

    { key: 'videoUrl', group: 'video', label: 'Video link', type: 'url', value: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', hint: 'A YouTube or Vimeo link, or a direct .mp4 / .webm file. It loads only when the visitor presses play, and stops when the popup closes. Turn off the image and carousel to show only the video.' },
    { key: 'poster', group: 'video', label: 'Poster image', type: 'image', value: IMG('hero-landscape.jpg'), hint: 'About 800×800 px. Shown until the video starts.', upload: { name: 'poster', maxW: 1000 } },
    { key: 'posterAlt', group: 'video', label: 'Poster alt text', type: 'text', value: 'A green valley at sunrise' },
    { key: 'videoTitle', group: 'video', label: 'Video title', type: 'text', value: 'Watch the one-minute tour' },
    { key: 'playLabel', group: 'video', label: 'Play button label (screen readers)', type: 'text', value: 'Play the video' },

    { key: 'customHtml', group: 'html', label: 'HTML', type: 'textarea', value: '<p><strong>Free shipping</strong> on orders over $50 this week.</p>', hint: 'Any markup: an embed, a countdown, a badge row or a second form. Scripts and onclick-style handlers run in your exported page, not in the editor preview.' },

    { key: 'formAction', group: 'form', label: 'Form URL (action)', type: 'url', value: 'https://webdevpuneet.com/subscribe', hint: 'The form address from Mailchimp, Kit, Formspree or any service that accepts a POST.' },
    { key: 'inputName', group: 'form', label: 'Email field name', type: 'text', value: 'email' },
    { key: 'placeholder', group: 'form', label: 'Placeholder', type: 'text', value: 'you@example.com' },
    { key: 'button', group: 'form', label: 'Button text', type: 'text', value: 'Send my code' },
    { key: 'note', group: 'form', label: 'Note under the form (optional)', type: 'text', value: 'We respect your inbox.' },
    { key: 'success', group: 'form', label: 'Message after sending', type: 'text', value: 'Thanks! Check your inbox for your code.' },
    { key: 'error', group: 'form', label: 'Message if it fails', type: 'text', value: 'Something went wrong. Please try again.' },

    { key: 'cta1Label', group: 'cta', label: 'Main button text', type: 'text', value: 'Shop the sale' },
    { key: 'cta1Url', group: 'cta', label: 'Main button link', type: 'url', value: 'https://webdevpuneet.com/shop' },
    { key: 'cta2Label', group: 'cta', label: 'Second button text (optional)', type: 'text', value: 'See what’s new' },
    { key: 'cta2Url', group: 'cta', label: 'Second button link', type: 'url', value: 'https://webdevpuneet.com/new' },

    { key: 'closeLabel', group: 'close', label: 'Close button label (screen readers)', type: 'text', value: 'Close popup' },
    { key: 'showDismiss', group: 'close', label: 'Show a “no thanks” link', type: 'switch', toggle: 'showDismiss' },
    { key: 'dismissText', group: 'close', label: '“No thanks” text', type: 'text', value: 'No thanks' },
  ],
  lists: [{
    key: 'slides', group: 'carousel', label: 'Slides', itemLabel: 'Slide', titleKey: 'caption', min: 1, max: 8,
    fields: [
      { key: 'img', label: 'Image', type: 'image', value: IMG('hero-landscape.jpg'), hint: 'About 800×800 px.', upload: { name: 'slide', maxW: 1000 } },
      { key: 'imgAlt', label: 'Alt text', type: 'text', value: '' },
      { key: 'caption', label: 'Caption (optional)', type: 'text', value: 'Slide caption' },
      { key: 'url', label: 'Link (optional)', type: 'url', value: '' },
    ],
    value: [
      { img: IMG('hero-landscape.jpg'), imgAlt: 'A green valley at sunrise', caption: 'Summer collection is here', url: '' },
      { img: IMG('hero-dashboard.png'), imgAlt: 'A product dashboard', caption: 'New: the all-in-one dashboard', url: '' },
      { img: IMG('tpl-course.png'), imgAlt: 'A course lesson on screen', caption: 'Free live workshop on Friday', url: '' },
    ],
  }],
  toggles: [
    { key: 'showImage', label: 'Image', value: true },
    { key: 'showCarousel', label: 'Image carousel', value: false },
    { key: 'showVideo', label: 'Video', value: false },
    { key: 'showHtml', label: 'Custom HTML', value: false },
    { key: 'showForm', label: 'Email form', value: true },
    { key: 'showCta', label: 'Buttons', value: false },
    { key: 'showDismiss', label: 'No thanks link', value: true },
  ],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f4f4f8', text: '#0f172a', muted: '#475569', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="pu" data-pu>
  <div class="pu-backdrop" data-pu-close hidden></div>
  <div class="pu-dialog" role="dialog" aria-modal="true" aria-labelledby="pu-heading" tabindex="-1" hidden>
    <button type="button" class="pu-x" data-pu-close data-set="aria-label:closeLabel"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    <div class="pu-media">
      <img class="pu-img" data-show="showImage" data-image="image" alt="" loading="lazy">
      <div class="pu-video vs-box" data-show="showVideo" data-video-box data-set="data-title:videoTitle">
        <img class="vs-poster" data-image="poster" alt="" loading="lazy">
        <a class="vs-play" data-href="videoUrl" data-set="data-video:videoUrl;aria-label:playLabel" target="_blank" rel="noopener"><span class="vs-btn" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg></span></a>
      </div>
      <div class="pu-car" data-show="showCarousel" data-pu-carousel role="region" aria-roledescription="carousel" aria-label="Promotions">
        <ul class="pu-track" data-list="slides">
          <li class="pu-slide">
            <img data-image="img" alt="" loading="lazy">
            <a class="pu-slide-link" data-href="url" data-show-if="url" tabindex="-1" aria-hidden="true"></a>
            <span class="pu-cap" data-edit="caption"></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="pu-body">
      <p class="st-eyebrow" data-edit="eyebrow"></p>
      <h2 class="pu-h" id="pu-heading" data-edit="heading"></h2>
      <p class="pu-lead" data-edit="lead"></p>
      <div class="pu-html-wrap" data-show="showHtml"><div class="pu-html" data-pu-html></div></div>
      <form class="pu-form" data-show="showForm" data-form method="post" data-set="action:formAction">
        <div class="pu-row" data-form-fields>
          <input class="pu-input" type="email" required autocomplete="email" data-set="name:inputName;placeholder:placeholder;aria-label:placeholder">
          <button class="st-btn pu-btn" type="submit"><span data-edit="button"></span></button>
        </div>
        <p class="pu-note" data-form-fields data-edit="note"></p>
        <p class="pu-ok" data-form-success hidden tabindex="-1" role="status" data-edit="success"></p>
        <p class="pu-err" data-form-error hidden role="alert" data-edit="error"></p>
      </form>
      <div class="pu-ctas" data-show="showCta">
        <a class="st-btn pu-cta" data-href="cta1Url"><span data-edit="cta1Label"></span></a>
        <a class="st-btn st-btn--ghost pu-cta" data-show-if="cta2Label" data-href="cta2Url"><span data-edit="cta2Label"></span></a>
      </div>
      <button type="button" class="pu-no" data-show="showDismiss" data-pu-close><span data-edit="dismissText"></span></button>
    </div>
  </div>
</div>`,
  css: `.st-popup-modal{overflow:visible;container-type:normal;height:0;min-height:0;background:transparent}
.st-popup-modal:has(.pu.is-preview){height:auto;padding:clamp(24px,4vw,48px) var(--st-pad);background:color-mix(in srgb,var(--st-text) 8%,var(--st-bg))}
.pu-backdrop{position:fixed;inset:0;z-index:1000;background:rgba(15,23,42,.58);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);opacity:0;transition:opacity .3s ease}
.pu-backdrop[hidden],.pu-dialog[hidden]{display:none}
.pu-dialog{position:fixed;z-index:1001;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);--pu-wd:780px;width:min(var(--pu-w,var(--pu-wd)),calc(100vw - 32px));height:var(--pu-h,auto);max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);overflow:auto;border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-bg);color:var(--st-text);box-shadow:0 40px 90px -20px rgba(15,23,42,.55);font-family:var(--st-font-body);opacity:0;transition:opacity .3s ease,transform .35s cubic-bezier(.2,.8,.2,1)}
.pu[data-pos=center] .pu-dialog{top:50%;left:50%;transform:translate(-50%,-46%) scale(.97)}
.pu:not([data-pos=center]) .pu-dialog{--pu-wd:400px;grid-template-columns:1fr;box-shadow:0 24px 60px -16px rgba(15,23,42,.5),0 0 0 1px color-mix(in srgb,var(--st-text) 8%,transparent)}
.pu:not([data-pos=center]) .pu-backdrop{display:none}
.pu[data-pos^=bottom] .pu-dialog{bottom:20px;transform:translateY(24px)}
.pu[data-pos^=top] .pu-dialog{top:20px;transform:translateY(-24px)}
.pu[data-pos$=right] .pu-dialog{right:20px}
.pu[data-pos$=left] .pu-dialog{left:20px}
.pu[data-pos=bottom-center] .pu-dialog{left:50%;--pu-wd:460px;transform:translate(-50%,24px)}
.pu.is-open .pu-backdrop{opacity:1}
.pu.is-open .pu-dialog{opacity:1}
.pu[data-pos=center].is-open .pu-dialog{transform:translate(-50%,-50%)}
.pu[data-pos=bottom-center].is-open .pu-dialog{transform:translateX(-50%)}
.pu:not([data-pos=center]):not([data-pos=bottom-center]).is-open .pu-dialog{transform:none}
.pu-media{position:relative;min-height:220px;background:var(--st-surface)}
.pu-media:not(:has(.pu-img,.pu-car,.pu-video)){display:none}
.pu-dialog:not(:has(.pu-img,.pu-car,.pu-video)){grid-template-columns:1fr}
.pu-body:not(:has(.st-eyebrow:not(:empty),.pu-h:not(:empty),.pu-lead:not(:empty),.pu-form,.pu-ctas,.pu-html-wrap,.pu-no span:not(:empty))){display:none}
.pu-dialog:not(:has(.st-eyebrow:not(:empty),.pu-h:not(:empty),.pu-lead:not(:empty),.pu-form,.pu-ctas,.pu-html-wrap,.pu-no span:not(:empty))){grid-template-columns:1fr}
.pu-dialog:not(:has(.st-eyebrow:not(:empty),.pu-h:not(:empty),.pu-lead:not(:empty),.pu-form,.pu-ctas,.pu-html-wrap,.pu-no span:not(:empty))) .pu-media{min-height:clamp(240px,40vw,380px)}
.pu[data-pos=center][data-layout=right] .pu-dialog{grid-template-columns:minmax(0,6fr) minmax(0,5fr)}
.pu[data-pos=center][data-layout=right] .pu-media{order:2}
.pu[data-pos=center][data-layout=top] .pu-dialog{grid-template-columns:1fr;--pu-wd:520px}
.pu[data-pos=center][data-layout=top] .pu-media{min-height:0;aspect-ratio:16/9}
.pu[data-pos=center][data-layout=bottom] .pu-dialog{grid-template-columns:1fr;--pu-wd:520px}
.pu[data-pos=center][data-layout=bottom] .pu-media{min-height:0;aspect-ratio:16/9}
.pu[data-layout=bottom] .pu-media{order:2}
.pu:not([data-pos=center]) .pu-media{min-height:150px;aspect-ratio:16/9}
.pu-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.pu-car{position:absolute;inset:0}
.pu-video{position:absolute;inset:0;z-index:1;background:#0b1020;overflow:hidden}
.pu-video .vs-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.pu-video .vs-play{position:absolute;inset:0;display:grid;place-items:center;background:linear-gradient(to top,rgba(8,10,20,.55),rgba(8,10,20,.08) 65%);color:#fff;text-decoration:none}
.pu-video .vs-btn{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;background:var(--st-brand);color:var(--st-btn-text);box-shadow:0 8px 24px rgba(0,0,0,.35);transition:transform .2s ease}
.pu-video .vs-btn svg{margin-left:3px}
.pu-video .vs-play:hover .vs-btn{transform:scale(1.08)}
.pu-video .vs-play:focus-visible{outline:4px solid var(--st-brand);outline-offset:-4px}
.pu-video .vs-embed{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}
.pu-video.is-playing .vs-poster,.pu-video.is-playing .vs-play{display:none}
.pu-html-wrap{width:100%;min-width:0}
.pu-html{min-width:0;color:var(--st-text);font-size:15px;line-height:1.6}
.pu-html iframe,.pu-html img,.pu-html video{max-width:100%}
.pu-track{display:flex;height:100%;margin:0;padding:0;list-style:none;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.pu-track::-webkit-scrollbar{display:none}
.pu-slide{position:relative;flex:0 0 100%;height:100%;scroll-snap-align:center}
.pu-slide img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.pu-slide-link{position:absolute;inset:0}
.pu-cap{position:absolute;left:0;right:0;bottom:0;padding:34px 16px 38px;background:linear-gradient(to top,rgba(8,10,20,.72),transparent);color:#fff;font-weight:700;font-size:15px;line-height:1.3;pointer-events:none}
.pu-cap:empty{display:none}
.pu-nav{position:absolute;top:50%;z-index:2;display:grid;place-items:center;width:34px;height:34px;margin-top:-17px;border:0;border-radius:50%;background:rgba(255,255,255,.9);color:#0f172a;cursor:pointer;box-shadow:0 2px 8px rgba(15,23,42,.3)}
.pu-nav:hover{background:#fff}
.pu-prev{left:10px}
.pu-next{right:10px}
.pu-dots{position:absolute;left:0;right:0;bottom:12px;z-index:2;display:flex;justify-content:center;gap:7px}
.pu-dot{width:9px;height:9px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.55);cursor:pointer;transition:background .2s ease,transform .2s ease}
.pu-dot[aria-current=true]{background:#fff;transform:scale(1.25)}
.pu-car.is-single .pu-nav,.pu-car.is-single .pu-dots{display:none}
.pu-body{display:flex;flex-direction:column;align-items:flex-start;gap:12px;justify-content:safe center;padding:clamp(24px,4vw,40px)}
.pu:not([data-pos=center]) .pu-body{padding:20px 22px 22px;gap:10px}
.pu-h{font-size:clamp(24px,2vw + 14px,34px)}
.pu:not([data-pos=center]) .pu-h{font-size:clamp(20px,1vw + 14px,26px)}
.pu-lead{color:var(--st-muted);font-size:16px}
.pu:not([data-pos=center]) .pu-lead{font-size:14.5px}
.pu-form{width:100%}
.pu-row{display:flex;flex-direction:column;gap:10px}
.pu-input{width:100%;min-height:50px;padding:0 16px;border:1.5px solid color-mix(in srgb,var(--st-text) 18%,transparent);border-radius:calc(var(--st-radius) * .7px);background:var(--st-bg);color:var(--st-text);font:500 16px/1 var(--st-font-body);outline:none}
.pu-input:focus{border-color:var(--st-brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 18%,transparent)}
.pu-btn{width:100%}
.pu-ctas{display:flex;flex-wrap:wrap;gap:10px;width:100%}
.pu-ctas .pu-cta{flex:1 1 auto}
.pu-note{margin-top:8px;font-size:13px;color:var(--st-muted)}
.pu-note:empty,.pu-ok:empty,.pu-err:empty{display:none}
.pu-ok{padding:12px 14px;border-radius:calc(var(--st-radius) * .6px);background:color-mix(in srgb,#16a34a 14%,transparent);color:var(--st-text);font-weight:600}
.pu-err{margin-top:8px;color:#b91c1c;font-size:14px;font-weight:600}
.pu-no{align-self:center;padding:6px 10px;border:0;background:none;color:var(--st-muted);font:600 14px/1 var(--st-font-body);text-decoration:underline;text-underline-offset:3px;cursor:pointer}
.pu-no:hover{color:var(--st-text)}
.pu-no:has(span:empty){display:none}
.pu-x{position:absolute;top:12px;right:12px;z-index:3;display:grid;place-items:center;width:36px;height:36px;border:0;border-radius:50%;background:color-mix(in srgb,var(--st-bg) 88%,transparent);color:var(--st-text);cursor:pointer;box-shadow:0 2px 8px rgba(15,23,42,.18);transition:background .2s ease,transform .2s ease}
.pu-x:hover{background:var(--st-bg);transform:scale(1.06)}
.pu-x:focus-visible,.pu-no:focus-visible,.pu-input:focus-visible,.pu-nav:focus-visible,.pu-dot:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 55%,transparent);outline-offset:2px}
.pu.is-preview .pu-backdrop{display:none}
.pu.is-preview .pu-dialog{position:relative;inset:auto;transform:none;margin:0 auto;opacity:1;max-height:none}
@media (max-width:640px){
.pu[data-pos=center] .pu-dialog,.pu[data-pos=center][data-layout=right] .pu-dialog{grid-template-columns:1fr}
.pu[data-pos=center][data-layout=right] .pu-media{order:0}
.pu-media{min-height:150px;max-height:220px}
.pu:not([data-pos=center]) .pu-dialog{left:12px;right:12px;width:auto}
.pu[data-pos=bottom-center] .pu-dialog,.pu[data-pos=bottom-center].is-open .pu-dialog{left:12px;transform:none}
.pu[data-pos^=bottom] .pu-dialog{bottom:12px}
.pu[data-pos^=top] .pu-dialog{top:12px}
.pu-body{padding:22px}
}
@media print{.pu{display:none}}`,
};
