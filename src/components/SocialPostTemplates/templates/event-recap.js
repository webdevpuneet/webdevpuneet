export default {
  id: 'event-recap',
  name: 'Event Recap',
  version: '1.0.0',
  category: 'events',
  tags: ['event-recap', 'thank-you', 'conference', 'meetup', 'photos', 'stats', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Event Recap Post Template — Free "That\'s a Wrap" Social Post',
  seoDescription: 'Free event recap post template: a "That\'s a wrap" headline, three event photos, three highlight stats and a thank-you line. For conferences and meetups.',
  description: 'A post-event recap: a "That\'s a wrap" label and the event name, a collage of three photos, three highlight numbers (attendees, talks, cities or anything else), a thank-you line to speakers and attendees and your handle.',
  bestFor: ['Conference and meetup recaps', 'Workshop and webinar thank-you posts', 'Launch party and community event highlights'],
  fonts: { heading: 'space', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0c0a1d' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Accent', value: '#fb7185' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', value: 'That’s a wrap!' },
    { key: 'title', label: 'Event name', type: 'textarea', value: 'DevSummit *2026*' },
    { key: 'photo1', label: 'Photo 1 (large)', type: 'image' },
    { key: 'photo2', label: 'Photo 2', type: 'image' },
    { key: 'photo3', label: 'Photo 3', type: 'image' },
    { key: 'stat1', label: 'Stat 1 number', type: 'text', value: '1,200' },
    { key: 'stat1Label', label: 'Stat 1 label', type: 'text', value: 'attendees' },
    { key: 'stat2', label: 'Stat 2 number', type: 'text', value: '36' },
    { key: 'stat2Label', label: 'Stat 2 label', type: 'text', value: 'talks' },
    { key: 'stat3', label: 'Stat 3 number', type: 'text', value: '2' },
    { key: 'stat3Label', label: 'Stat 3 label', type: 'text', value: 'unforgettable days' },
    { key: 'thanks', label: 'Thank-you line', type: 'textarea', value: 'Thank you to every speaker, sponsor and attendee. See you next year!' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="er">
  <div class="er-head">
    <span class="er-label" data-edit="label"></span>
    <h2 class="er-title" data-edit="title"></h2>
  </div>
  <div class="er-grid">
    <div class="er-p1" data-image="photo1"></div>
    <div class="er-p2" data-image="photo2"></div>
    <div class="er-p3" data-image="photo3"></div>
  </div>
  <div class="er-stats">
    <div><b data-edit="stat1"></b><span data-edit="stat1Label"></span></div>
    <div><b data-edit="stat2"></b><span data-edit="stat2Label"></span></div>
    <div><b data-edit="stat3"></b><span data-edit="stat3Label"></span></div>
  </div>
  <div class="er-foot"><p class="er-thanks" data-edit="thanks"></p><span class="er-handle" data-edit="handle"></span></div>
</div>`,
  css: `.er{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3.6);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 100% 0%,color-mix(in srgb,var(--accent) 28%,transparent),transparent 45%),var(--bg)}
.er-head{display:flex;flex-direction:column;gap:calc(var(--u)*1)}
.er-label{font-size:calc(var(--u)*3.4);font-weight:800;text-transform:uppercase;letter-spacing:.2em;color:var(--accent)}
.er-title{font-family:var(--font-heading);font-size:calc(var(--u)*10);line-height:.98;font-weight:700;letter-spacing:-.03em}
.er-grid{flex:1;display:grid;grid-template-columns:1.6fr 1fr;grid-template-rows:1fr 1fr;gap:calc(var(--u)*2);min-height:0}
.er-grid>div{border-radius:calc(var(--u)*3)}
.er-p1{grid-row:1/3}
.er-grid>div:not(.has-img){background-image:linear-gradient(135deg,color-mix(in srgb,var(--accent) 70%,#312e81),color-mix(in srgb,var(--accent) 25%,#1e1b4b))!important}
.er-p2:not(.has-img){opacity:.75}.er-p3:not(.has-img){opacity:.55}
.er-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*2)}
.er-stats div{display:flex;flex-direction:column;gap:calc(var(--u)*.4);padding:calc(var(--u)*2.4) calc(var(--u)*2.8);border-radius:calc(var(--u)*2.4);background:color-mix(in srgb,var(--text) 7%,transparent)}
.er-stats b{font-family:var(--font-heading);font-size:calc(var(--u)*6.4);line-height:1;color:var(--accent)}
.er-stats span{font-size:calc(var(--u)*2.7);opacity:.75}
.er-foot{display:flex;justify-content:space-between;align-items:flex-end;gap:calc(var(--u)*4)}
.er-thanks{font-size:calc(var(--u)*3.2);line-height:1.35;opacity:.85;max-width:72%}
.er-handle{flex:none;font-size:calc(var(--u)*3.2);font-weight:800;color:var(--accent)}
.is-landscape .er{display:grid;grid-template-columns:1fr 1.25fr;grid-template-rows:auto 1fr auto;column-gap:calc(var(--u)*5)}
.is-landscape .er-head{grid-column:1}
.is-landscape .er-stats{grid-column:1;grid-row:2;align-self:center;grid-template-columns:1fr}
.is-landscape .er-grid{grid-column:2;grid-row:1/4}
.is-landscape .er-foot{grid-column:1;grid-row:3;flex-direction:column;align-items:flex-start;gap:calc(var(--u)*1.6)}
.is-landscape .er-thanks{max-width:none}`,
};
