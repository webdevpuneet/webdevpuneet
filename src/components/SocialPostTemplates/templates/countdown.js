export default {
  id: 'countdown',
  name: 'Countdown',
  version: '1.0.0',
  category: 'events',
  tags: ['countdown', 'urgency', 'event', 'number', 'dark'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Countdown Post Template — Free "Days Left" Social Post',
  seoDescription: 'Free countdown social post template with a giant number, "days left" label, event or offer name and deadline. Edit it online, download PNG or copy the HTML.',
  description: 'An urgency post with a giant countdown number in a glowing ring, a "days left" label, the event or offer name and the deadline.',
  bestFor: ['Launch and event countdowns', 'Sale ending reminders', 'Registration deadlines'],
  fonts: { heading: 'space', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#1e1b4b' },
    { key: 'text', label: 'Text', value: '#ffffff' },
    { key: 'accent', label: 'Accent', value: '#f43f5e' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'Only' },
    { key: 'number', label: 'Number', type: 'text', value: '3' },
    { key: 'unit', label: 'Unit', type: 'text', value: 'days left' },
    { key: 'title', label: 'Event or offer', type: 'textarea', value: 'Early-bird tickets for *DevSummit 2026*' },
    { key: 'deadline', label: 'Deadline', type: 'text', value: 'Ends Friday, 11:59 PM ET' },
  ],
  html: `<div class="cd">
  <span class="cd-kicker" data-edit="kicker"></span>
  <div class="cd-ring"><span class="cd-num" data-edit="number"></span></div>
  <span class="cd-unit" data-edit="unit"></span>
  <div class="cd-body" data-fit-box><h2 class="cd-title" data-edit="title" data-fit></h2></div>
  <span class="cd-deadline" data-edit="deadline"></span>
</div>`,
  css: `.cd{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*2.4);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 50% 38%,color-mix(in srgb,var(--accent) 30%,transparent),transparent 55%),var(--bg);text-align:center}
.cd-kicker{font-size:calc(var(--u)*3.6);font-weight:700;text-transform:uppercase;letter-spacing:.2em;opacity:.8}
.cd-ring{flex:none;width:calc(var(--u)*44);height:calc(var(--u)*44);border-radius:50%;display:flex;align-items:center;justify-content:center;border:calc(var(--u)*1.6) solid var(--accent);box-shadow:0 0 calc(var(--u)*10) color-mix(in srgb,var(--accent) 60%,transparent),inset 0 0 calc(var(--u)*6) color-mix(in srgb,var(--accent) 35%,transparent)}
.cd-num{font-family:var(--font-heading);font-size:calc(var(--u)*28);font-weight:700;line-height:1}
.cd-unit{font-family:var(--font-heading);font-size:calc(var(--u)*7);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--accent)}
.cd-body{flex:1;display:flex;align-items:center;justify-content:center;width:100%}
.cd-title{font-family:var(--font-heading);font-size:calc(var(--u)*6.4);line-height:1.15;font-weight:700;max-width:90%}
.cd-deadline{font-size:calc(var(--u)*3.2);font-weight:600;opacity:.8}
.is-landscape .cd-ring{width:calc(var(--u)*36);height:calc(var(--u)*36)}
.is-landscape .cd-num{font-size:calc(var(--u)*22)}`,
};
