export default {
  id: 'webinar-event',
  name: 'Webinar Event',
  version: '1.0.0',
  category: 'events',
  tags: ['webinar', 'event', 'speaker', 'date', 'gradient'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Webinar Post Template — Free Event Promo for LinkedIn & IG',
  seoDescription: 'Free webinar and event post template with a date block, talk title, speaker photo, time with time zone and a register button. Download every size or copy HTML.',
  description: 'A blue event card with a calendar-style date block, the talk title, a speaker photo and name, the time with time zone, and a register button.',
  bestFor: ['Webinars and live workshops', 'Meetups and conference talks', 'Twitter/X Spaces and livestreams'],
  fonts: { heading: 'montserrat', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#0c4a6e' },
    { key: 'bg2', label: 'Gradient end', value: '#0369a1' },
    { key: 'text', label: 'Text', value: '#f0f9ff' },
    { key: 'accent', label: 'Accent', value: '#38bdf8' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'Free live webinar' },
    { key: 'month', label: 'Month', type: 'text', value: 'NOV' },
    { key: 'day', label: 'Day', type: 'text', value: '12' },
    { key: 'title', label: 'Title', type: 'textarea', value: 'Designing APIs *developers love*' },
    { key: 'time', label: 'Time', type: 'text', value: 'Thursday · 1 PM ET / 10 AM PT' },
    { key: 'speaker', label: 'Speaker', type: 'text', value: 'Maya Chen' },
    { key: 'role', label: 'Speaker role', type: 'text', value: 'Staff Engineer, Acme' },
    { key: 'photo', label: 'Speaker photo', type: 'image' },
    { key: 'cta', label: 'Button', type: 'text', value: 'Register free →' },
  ],
  html: `<div class="w">
  <div class="w-top"><div class="w-date"><span data-edit="month"></span><b data-edit="day"></b></div><span class="w-kicker" data-edit="kicker"></span></div>
  <div class="w-body" data-fit-box><h2 class="w-title" data-edit="title" data-fit></h2><span class="w-time" data-edit="time"></span></div>
  <div class="w-foot">
    <div class="w-photo" data-image="photo"></div>
    <div class="w-who"><span class="w-name" data-edit="speaker"></span><span class="w-role" data-edit="role"></span></div>
    <span class="w-cta" data-edit="cta"></span>
  </div>
</div>`,
  css: `.w{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:linear-gradient(150deg,var(--bg),var(--bg2))}
.w-top{display:flex;align-items:center;gap:calc(var(--u)*4)}
.w-date{display:flex;flex-direction:column;align-items:center;justify-content:center;width:calc(var(--u)*17);height:calc(var(--u)*17);border-radius:calc(var(--u)*3);background:var(--text);color:var(--bg);flex:none}
.w-date span{font-size:calc(var(--u)*3.4);font-weight:800;letter-spacing:.14em;color:var(--accent)}
.w-date b{font-family:var(--font-heading);font-size:calc(var(--u)*8);line-height:1;font-weight:800}
.w-kicker{font-size:calc(var(--u)*3.4);font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--accent)}
.w-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*3)}
.w-title{font-family:var(--font-heading);font-size:calc(var(--u)*9);line-height:1.06;font-weight:800;letter-spacing:-.02em}
.w-time{font-size:calc(var(--u)*3.6);font-weight:600;opacity:.88}
.w-foot{display:flex;align-items:center;gap:calc(var(--u)*3)}
.w-photo{width:calc(var(--u)*12);height:calc(var(--u)*12);border-radius:50%;flex:none;border:calc(var(--u)*.5) solid var(--accent)}
.w-who{display:flex;flex-direction:column;gap:calc(var(--u)*.4);min-width:0}
.w-name{font-weight:700;font-size:calc(var(--u)*3.6)}
.w-role{font-size:calc(var(--u)*2.8);opacity:.75}
.w-cta{margin-left:auto;font-size:calc(var(--u)*3.2);font-weight:800;color:var(--bg);background:var(--accent);padding:calc(var(--u)*2.2) calc(var(--u)*3.6);border-radius:calc(var(--u)*1.6);white-space:nowrap}`,
};
