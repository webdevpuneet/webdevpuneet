import { IMG } from './meta.js';

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const isoDuration = d => {
  const m = String(d || '').trim().match(/^(?:(\d+):)?(\d{1,2}):(\d{2})$/);
  if (!m) return '';
  const [, h, mi, se] = m;
  return `PT${h ? `${+h}H` : ''}${+mi}M${+se}S`;
};
const embedUrl = u => {
  let m;
  if ((m = String(u).match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/))) return `https://www.youtube.com/embed/${m[1]}`;
  if ((m = String(u).match(/vimeo\.com\/(?:video\/)?(\d+)/))) return `https://player.vimeo.com/video/${m[1]}`;
  return '';
};

export default {
  id: 'video-section',
  name: 'Video Section with Poster',
  version: '1.0.0',
  category: 'gallery',
  tags: ['video', 'youtube', 'vimeo', 'player', 'demo', 'poster', 'media', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Video Section Template — Free YouTube & Vimeo Embed HTML',
  seoDescription: 'Free video section: a poster with a play button that loads YouTube, Vimeo or MP4 only when clicked, plus key points and VideoObject data. Export the code.',
  description: 'A video section that stays fast and private: a heading, a 16:9 poster image with a large play button and optional duration, and a row of key points underneath. Nothing from YouTube or Vimeo loads until the visitor presses play; then the player replaces the poster in place. MP4 and WebM files play in the browser’s own player.',
  bestFor: ['Product demos and explainer videos', 'Course, podcast and webinar trailers', 'Agency reels and customer story videos'],
  behaviors: ['video'],
  schema: state => {
    const f = state.fields || {};
    const url = String(f.videoUrl || '').trim();
    const name = plain(f.videoTitle) || plain(f.heading);
    if (!/^https?:/.test(url) || !name) return null;
    const embed = embedUrl(url);
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name,
      description: plain(f.lead) || name,
      ...(/^https?:/.test(String(f.poster || '')) && { thumbnailUrl: f.poster }),
      ...(/^\d{4}-\d{2}-\d{2}/.test(String(f.uploadDate || '')) && { uploadDate: f.uploadDate }),
      ...(isoDuration(f.duration) && { duration: isoDuration(f.duration) }),
      ...(embed ? { embedUrl: embed } : { contentUrl: url }),
    };
  },

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeader' },
    { id: 'video', label: 'Video' },
    { id: 'points', label: 'Key points', toggle: 'showPoints' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'See it in action' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Watch how it *works in two minutes*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'A quick tour of the dashboard, the editor and how a finished page goes live.' },
    { key: 'videoUrl', group: 'video', label: 'Video link', type: 'url', value: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', hint: 'A YouTube or Vimeo link, or a direct .mp4 / .webm file. It loads only when the visitor presses play.' },
    { key: 'poster', group: 'video', label: 'Poster image', type: 'image', value: IMG('hero-landscape.jpg'), hint: 'About 1280×720 px (16:9). Shown until the video starts.', upload: { name: 'poster', maxW: 1600 } },
    { key: 'posterAlt', group: 'video', label: 'Poster alt text', type: 'text', value: 'A green valley at sunrise' },
    { key: 'videoTitle', group: 'video', label: 'Video title', type: 'text', value: 'Product tour: from first draft to published page', hint: 'Used for the player’s accessible name and for search engines.' },
    { key: 'playLabel', group: 'video', label: 'Play button label', type: 'text', value: 'Play the video' },
    { key: 'duration', group: 'video', label: 'Length (optional)', type: 'text', value: '2:14', hint: 'For example 2:14. Also written into the video structured data.' },
    { key: 'uploadDate', group: 'video', label: 'Date published (optional)', type: 'text', value: '2026-10-01', hint: 'YYYY-MM-DD. Google asks for it before showing video results.' },
  ],
  lists: [{
    key: 'points', group: 'points', label: 'Key points', itemLabel: 'Point', titleKey: 'title', min: 1, max: 4,
    fields: [
      { key: 'title', label: 'Title', type: 'text', value: 'Key point' },
      { key: 'text', label: 'Text', type: 'textarea', value: 'A short line that says why it matters.' },
    ],
    value: [
      { title: 'Start in minutes', text: 'Pick a template, change the words and the page is ready to share.' },
      { title: 'Your brand everywhere', text: 'Set colours and fonts once and every section follows.' },
      { title: 'Publish anywhere', text: 'Export clean HTML and put it on any host you like.' },
    ],
  }],
  toggles: [
    { key: 'showHeader', label: 'Heading', value: true },
    { key: 'showPoints', label: 'Key points', value: true },
  ],
  theme: { brand: '#e11d48', brandText: '#ffffff', bg: '#ffffff', surface: '#f8fafc', text: '#0f172a', muted: '#64748b', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeader">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="vs-box" data-anim="media" data-video-box data-set="data-title:videoTitle">
    <img class="vs-poster" data-image="poster" alt="" width="1280" height="720" loading="lazy">
    <a class="vs-play" data-href="videoUrl" data-set="data-video:videoUrl;aria-label:playLabel" target="_blank" rel="noopener">
      <span class="vs-btn" aria-hidden="true"><svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg></span>
      <span class="vs-meta"><span class="vs-label" data-edit="playLabel"></span><span class="vs-dur" data-show-if="duration" data-edit="duration"></span></span>
    </a>
  </div>
  <ul class="vs-points" data-show="showPoints" data-list="points">
    <li class="vs-point" data-anim="item">
      <h3 class="vs-point-title" data-edit="title"></h3>
      <p class="vs-point-text" data-edit="text"></p>
    </li>
  </ul>
</div>`,
  css: `.st-video-section{padding:clamp(56px,7cqi,104px) 0}
.vs-box{position:relative;overflow:hidden;aspect-ratio:16/9;border-radius:calc(var(--st-radius) * 1.3px);background:#0b1020;box-shadow:0 40px 80px -40px color-mix(in srgb,var(--st-text) 55%,transparent)}
.vs-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.vs-box:hover .vs-poster{transform:scale(1.03)}
.vs-play{position:absolute;inset:0;display:flex;align-items:flex-end;gap:16px;padding:clamp(16px,3cqi,32px);color:#fff;text-decoration:none;background:linear-gradient(to top,rgba(8,10,20,.65),rgba(8,10,20,.05) 55%);cursor:pointer}
.vs-btn{position:absolute;left:50%;top:50%;display:grid;place-items:center;width:clamp(64px,9cqi,92px);height:clamp(64px,9cqi,92px);margin:calc(clamp(64px,9cqi,92px) / -2) 0 0 calc(clamp(64px,9cqi,92px) / -2);border-radius:50%;background:var(--st-brand);color:var(--st-btn-text);box-shadow:0 0 0 0 color-mix(in srgb,var(--st-brand) 55%,transparent);transition:transform .25s ease}
.vs-btn svg{margin-left:4px}
.vs-play:hover .vs-btn{transform:scale(1.08)}
.vs-play:focus-visible{outline:4px solid var(--st-brand);outline-offset:-4px}
.vs-meta{display:flex;align-items:center;gap:10px;font-weight:700;font-size:15px}
.vs-dur{padding:3px 9px;border-radius:999px;background:rgba(255,255,255,.2);font-size:13px;font-variant-numeric:tabular-nums}
.vs-dur:empty{display:none}
.vs-embed{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}
.vs-box.is-playing .vs-poster,.vs-box.is-playing .vs-play{display:none}
.vs-points{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:clamp(20px,2.6cqi,36px);margin-top:clamp(28px,3.4cqi,48px)}
.vs-point{padding-top:18px;border-top:2px solid color-mix(in srgb,var(--st-brand) 70%,transparent)}
.vs-point-title{margin-bottom:6px;font-size:18px;line-height:1.3;letter-spacing:-.01em}
.vs-point-text{color:var(--st-muted);font-size:15.5px}
@media (prefers-reduced-motion:no-preference){.vs-btn{animation:vs-pulse 2.6s ease-out infinite}}
@keyframes vs-pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--st-brand) 55%,transparent)}70%,100%{box-shadow:0 0 0 22px transparent}}
@container st (max-width:560px){.vs-meta{font-size:13.5px}}`,
};
