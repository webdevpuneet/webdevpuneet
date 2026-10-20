export default {
  id: 'coming-soon',
  name: 'Coming Soon Teaser',
  version: '1.0.0',
  category: 'announcements',
  tags: ['coming-soon', 'teaser', 'launch', 'pre-launch', 'mystery', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Coming Soon Post Template — Free Launch Teaser for Instagram',
  seoDescription: 'Free "coming soon" teaser post template: outlined headline, a hint of what is launching, the launch date and a notify-me line. Edit it online and export PNG.',
  description: 'A pre-launch teaser with a huge outlined "Coming soon", a short hint of what is launching, a blurred mystery image you can swap for your own, the launch date in a pill and a "turn on notifications" call to action.',
  bestFor: ['Product and collection launch teasers', 'New store, menu or app announcements', 'Pre-launch waitlist campaigns'],
  fonts: { heading: 'space', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#09090b' },
    { key: 'text', label: 'Text', value: '#fafafa' },
    { key: 'accent', label: 'Accent', value: '#a3e635' },
  ],
  fields: [
    { key: 'eyebrow', label: 'Small label', type: 'text', value: 'Something new is coming' },
    { key: 'headline', label: 'Headline', type: 'text', value: 'Coming soon' },
    { key: 'teaser', label: 'Teaser', type: 'textarea', value: 'Faster. Lighter. *Built for you.* The wait is almost over.' },
    { key: 'photo', label: 'Mystery image (shown blurred)', type: 'image' },
    { key: 'date', label: 'Launch date', type: 'text', value: '11 · 12 · 2026' },
    { key: 'cta', label: 'Call to action', type: 'text', value: '🔔 Turn on post notifications' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="cs">
  <div class="cs-photo" data-image="photo" aria-hidden="true"></div>
  <div class="cs-shade" aria-hidden="true"></div>
  <span class="cs-eyebrow" data-edit="eyebrow"></span>
  <h2 class="cs-headline" data-edit="headline"></h2>
  <div class="cs-body" data-fit-box><p class="cs-teaser" data-edit="teaser" data-fit></p></div>
  <div class="cs-foot">
    <span class="cs-date" data-edit="date"></span>
    <span class="cs-cta" data-edit="cta"></span>
  </div>
  <span class="cs-handle" data-edit="handle"></span>
</div>`,
  css: `.cs{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*3.6);padding:var(--pt) var(--pad) var(--pb);background:var(--bg);text-align:center}
.cs-photo{position:absolute;inset:calc(var(--u)*-8);filter:blur(calc(var(--u)*3)) saturate(1.2);opacity:.55;transform:scale(1.05)}
.cs-photo:not(.has-img){background-image:radial-gradient(circle at 30% 30%,color-mix(in srgb,var(--accent) 55%,transparent),transparent 40%),radial-gradient(circle at 75% 70%,color-mix(in srgb,var(--accent) 35%,#7c3aed),transparent 45%)!important;opacity:.45}
.cs-shade{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,transparent 20%,var(--bg) 85%)}
.cs-eyebrow{position:relative;font-size:calc(var(--u)*3.2);font-weight:700;text-transform:uppercase;letter-spacing:.24em;color:var(--accent)}
.cs-headline{position:relative;margin-top:auto;font-family:var(--font-heading);font-size:calc(var(--u)*17);line-height:.92;font-weight:700;text-transform:uppercase;letter-spacing:-.02em;color:transparent;-webkit-text-stroke:calc(var(--u)*.45) var(--text)}
.cs-body{position:relative;display:flex;align-items:center;justify-content:center;max-height:28%}
.cs-teaser{font-family:var(--font-heading);font-size:calc(var(--u)*5.6);line-height:1.2;font-weight:700;max-width:86%}
.cs-foot{position:relative;margin-top:auto;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*2.4)}
.cs-date{padding:calc(var(--u)*1.6) calc(var(--u)*5);border-radius:99px;background:var(--accent);color:var(--bg);font-family:var(--font-heading);font-size:calc(var(--u)*4.8);font-weight:700;letter-spacing:.06em}
.cs-cta{font-size:calc(var(--u)*3.4);font-weight:600;opacity:.85}
.cs-handle{position:relative;font-size:calc(var(--u)*3);font-weight:700;opacity:.7}
.is-landscape .cs-headline{font-size:calc(var(--u)*15)}
.is-landscape .cs{gap:calc(var(--u)*2.6)}`,
};
