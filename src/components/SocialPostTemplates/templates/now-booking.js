/* The calendar is built from three text fields (see calendar.js): the calendar title gives the real month layout,
   "Open days" glow, "Days off" fade, every other day is booked and gets stamped with a cross in the video.
   render.js rebuilds the grid ([data-cal]) whenever those fields change; DAYS is the default for the static source view. */
import { calendarGrid } from './calendar.js';

const DEFAULTS = { month: 'December 2026', open: '8, 17, 22', off: 'Sat, Sun' };
const DAYS = calendarGrid(DEFAULTS).html;

export default {
  id: 'now-booking',
  name: 'Now Booking',
  version: '1.0.0',
  category: 'announcements',
  tags: ['now booking', 'availability', 'spots left', 'calendar', 'appointments', 'freelancer', 'salon', 'coach', 'light'],
  created: '2026-11-19',
  updated: '2026-11-19',
  seoTitle: 'Now Booking Post Template — Calendar With Spots Left',
  seoDescription: 'Free now booking post template for freelancers, salons and coaches: a month calendar with booked days crossed out, open slots circled and a spots-left badge.',
  description: 'An availability post for anyone who takes bookings: a serif headline, a month calendar where booked days are stamped with a cross and the few open days glow, a "spots left" badge, three services and a clear "how to book" line, in calm sage and terracotta.',
  bestFor: ['Freelancers opening next month’s calendar', 'Salons, studios, photographers and tutors with limited slots', 'Coaches and consultants filling the last spots'],
  fonts: { heading: 'playfair', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Background', value: '#e7ede3' },
    { key: 'text', label: 'Text', value: '#1e3a2f' },
    { key: 'accent', label: 'Open days', value: '#d4683f' },
    { key: 'pop', label: 'Card', value: '#fffdf8' },
  ],
  fields: [
    { key: 'kicker', label: 'Label', type: 'text', value: 'Now booking' },
    { key: 'title', label: 'Headline', type: 'textarea', value: '*December* is open for bookings' },
    { key: 'month', label: 'Calendar month', type: 'text', value: DEFAULTS.month, hint: 'Month and year, e.g. “January 2027”. The grid follows the real calendar.' },
    { key: 'open', label: 'Open days', type: 'text', value: DEFAULTS.open, hint: 'Dates that are still free, e.g. “8, 17, 22” or “8-10”. Every other working day shows as booked.' },
    { key: 'off', label: 'Days off', type: 'text', value: DEFAULTS.off, hint: 'Weekdays and/or dates you don’t work, e.g. “Sat, Sun” or “Sun, 24, 25”. Leave empty to work every day.' },
    { key: 'spots', label: 'Spots badge', type: 'text', value: 'Only {spots} spots left', hint: '{spots} counts your open days automatically.' },
    { key: 's1', label: 'Service 1', type: 'text', value: 'Brand photo sessions' },
    { key: 's2', label: 'Service 2', type: 'text', value: 'Website builds' },
    { key: 's3', label: 'Service 3 (optional)', type: 'text', value: '1:1 strategy calls' },
    { key: 'cta', label: 'How to book', type: 'text', value: 'DM “BOOK” or tap the link in bio' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourstudio' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="nb">
  <div class="nb-leaf" aria-hidden="true" data-anim="sway"></div>
  <div class="nb-text">
    <div class="nb-top">
      <span class="nb-kicker"><i aria-hidden="true" data-anim="pulse"></i><span data-edit="kicker"></span></span>
      <span class="spt-brand nb-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="nb-handle" data-edit="handle"></span></span>
    </div>
    <div class="nb-title-box" data-fit-box><h2 class="nb-title" data-edit="title" data-fit></h2></div>
    <div class="nb-services"><span data-edit="s1"></span><span data-edit="s2"></span><span data-edit="s3"></span></div>
  </div>
  <div class="nb-cal" data-anim="settle">
    <div class="nb-cal-head">
      <span class="nb-month" data-edit="month"></span>
      <span class="nb-spots-wrap" data-anim="pulse"><span class="nb-spots" data-edit="spots"></span></span>
    </div>
    <div class="nb-week" aria-hidden="true"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
    <div class="nb-grid" aria-hidden="true" data-cal="month" data-cal-open="open" data-cal-off="off">${DAYS}</div>
  </div>
  <div class="nb-foot"><span class="nb-cta"><span data-edit="cta"></span><i class="nb-arrow" aria-hidden="true" data-anim="nudge-x">→</i></span></div>
</div>`,
  css: `.nb{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*3.2);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 100% 100%,color-mix(in srgb,var(--accent) 16%,transparent),transparent 45%),var(--bg);color:var(--text);overflow:hidden}
.nb-leaf{position:absolute;right:calc(var(--u)*-6);top:calc(var(--u)*-4);width:calc(var(--u)*30);height:calc(var(--u)*30);border-radius:0 100% 0 100%;background:color-mix(in srgb,var(--text) 10%,transparent);transform-origin:100% 0}
.nb-text{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;gap:calc(var(--u)*2.4)}
.nb-top{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*3)}
.nb-kicker{display:inline-flex;align-items:center;gap:calc(var(--u)*1.6);padding:calc(var(--u)*1.3) calc(var(--u)*3);border-radius:99px;background:var(--text);color:var(--bg);font-size:calc(var(--u)*3);font-weight:800;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}
.nb-kicker i{flex:none;width:calc(var(--u)*1.8);height:calc(var(--u)*1.8);border-radius:50%;background:#7ee0a1;box-shadow:0 0 0 calc(var(--u)*.5) rgba(126,224,161,.3)}
.nb-brand{flex:none}
.spt .nb-handle{white-space:nowrap;overflow-wrap:normal;font-size:calc(var(--u)*3.1);font-weight:800}
.nb-title-box{flex:1;min-height:0;display:flex;flex-direction:column}
.nb-title{font-family:var(--font-heading);font-size:calc(var(--u)*9);line-height:1.3;font-weight:700;letter-spacing:-.01em;margin-block:auto}
.nb-title .hl{font-style:italic}
.nb-services{display:flex;flex-wrap:wrap;gap:calc(var(--u)*1.4)}
.nb-services span{padding:calc(var(--u)*1.1) calc(var(--u)*2.4);border-radius:99px;border:calc(var(--u)*.3) solid color-mix(in srgb,var(--text) 28%,transparent);font-size:calc(var(--u)*2.9);font-weight:700}
.nb-cal{position:relative;flex:none;display:flex;flex-direction:column;gap:calc(var(--u)*1.3);padding:calc(var(--u)*3);border-radius:calc(var(--u)*3.6);background:var(--pop);box-shadow:0 calc(var(--u)*1.6) calc(var(--u)*5) rgba(30,58,47,.16)}
.nb-cal-head{display:flex;align-items:center;justify-content:space-between;gap:calc(var(--u)*2)}
.nb-month{font-family:var(--font-heading);font-size:calc(var(--u)*4.6);font-weight:700}
.nb-spots{display:inline-block;padding:calc(var(--u)*1) calc(var(--u)*2.4);border-radius:99px;background:var(--accent);color:#fff;font-size:calc(var(--u)*2.8);font-weight:800;white-space:nowrap}
.nb-week,.nb-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:calc(var(--u)*1)}
.nb-week span{text-align:center;font-size:calc(var(--u)*2.3);font-weight:800;letter-spacing:.08em;opacity:.5}
.nb-d{position:relative;display:grid;place-items:center;height:calc(var(--u)*6.2);border-radius:calc(var(--u)*1.8);font-size:calc(var(--u)*3.1);font-weight:700;font-variant-numeric:tabular-nums}
.nb-off{opacity:.32}
.nb-blank{visibility:hidden}
.nb-grid[data-rows="6"] .nb-d{height:calc(var(--u)*5.2)}
.is-square .nb-grid[data-rows="6"] .nb-d{height:calc(var(--u)*4.3)}
.is-landscape .nb-grid[data-rows="6"] .nb-d{height:calc(var(--u)*6.4)}
.is-story .nb-grid[data-rows="6"] .nb-d{height:calc(var(--u)*4.8)}
.nb-full{color:color-mix(in srgb,var(--text) 45%,transparent);background:color-mix(in srgb,var(--text) 6%,transparent)}
.nb-full i{position:absolute;inset:18%}
.nb-full i::before,.nb-full i::after{content:'';position:absolute;left:50%;top:-6%;width:calc(var(--u)*.7);height:112%;margin-left:calc(var(--u)*-.35);border-radius:99px;background:color-mix(in srgb,var(--text) 70%,transparent);rotate:45deg}
.nb-full i::after{rotate:-45deg}
.nb-open b{display:grid;place-items:center;width:100%;height:100%;border-radius:calc(var(--u)*1.8);background:var(--accent);color:#fff;font-weight:800;box-shadow:0 0 0 calc(var(--u)*.6) color-mix(in srgb,var(--accent) 30%,transparent),0 calc(var(--u)*1) calc(var(--u)*2.4) color-mix(in srgb,var(--accent) 45%,transparent)}
.nb-foot{position:relative;display:flex}
.nb-cta{display:inline-flex;align-items:center;gap:calc(var(--u)*2);padding:calc(var(--u)*2.2) calc(var(--u)*4);border-radius:99px;background:var(--text);color:var(--bg);font-size:calc(var(--u)*3.3);font-weight:800}
.nb-arrow{font-style:normal;color:var(--accent)}
.is-square .nb,.is-landscape .nb{display:grid;grid-template-columns:1fr auto;grid-template-rows:1fr auto;column-gap:calc(var(--u)*5);row-gap:calc(var(--u)*3)}
.is-square .nb-text,.is-landscape .nb-text{grid-column:1;grid-row:1}
.is-square .nb-cal,.is-landscape .nb-cal{grid-column:2;grid-row:1/3;align-self:center}
.is-square .nb-foot,.is-landscape .nb-foot{grid-column:1;grid-row:2}
.is-square .nb-title{font-size:calc(var(--u)*7.4)}
.is-square .nb-cal{width:calc(var(--u)*42);padding:calc(var(--u)*2.4)}
.is-square .nb-top{flex-wrap:wrap;justify-content:flex-start;gap:calc(var(--u)*1.6)}
.is-square .nb-d{height:calc(var(--u)*5);font-size:calc(var(--u)*2.4);border-radius:calc(var(--u)*1.2)}
.is-square .nb-open b{border-radius:calc(var(--u)*1.2)}
.is-square .nb-month{font-size:calc(var(--u)*3.6)}
.is-square .nb-cal-head{flex-direction:column;align-items:flex-start;gap:calc(var(--u)*1.2)}
.is-square .nb-week,.is-square .nb-grid{gap:calc(var(--u)*.7)}
.is-square .nb-cta{font-size:calc(var(--u)*2.9);padding:calc(var(--u)*1.8) calc(var(--u)*3.2)}
.is-landscape .nb-cal{width:calc(var(--u)*72)}
.is-landscape .nb-d{height:calc(var(--u)*7.6)}
.is-landscape .nb-title{font-size:calc(var(--u)*9)}
.is-linkedin .nb-cal{width:calc(var(--u)*76);padding:calc(var(--u)*2.6)}
.is-linkedin .nb-d{height:calc(var(--u)*6.6)}
.is-linkedin .nb-title{font-size:calc(var(--u)*8)}
.is-linkedin .nb-week{display:none}
.is-story .nb-d{height:calc(var(--u)*5.6)}
.is-story .nb{gap:calc(var(--u)*2.4)}
.is-story .nb-title{font-size:calc(var(--u)*8.6)}`,
};
