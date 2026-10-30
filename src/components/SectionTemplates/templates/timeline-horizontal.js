import { esc } from './meta.js';

/* Horizontal Timeline: events laid out left to right along one continuous line. Each event has a round marker
   (a number or an icon) on the line, with its date, title and text above or below it. When the events do not fit,
   the row scrolls and snaps to events. In the default pinned mode (GSAP ScrollTrigger, 768px and up) the section pins to
   the screen and scrolling the page slides the events along to the right, with the progress line growing and each event
   activating as it is reached. Otherwise (phones, reduced motion, no GSAP, or "Free" mode) the row scrolls by swipe,
   drag or the arrow buttons. Clicking a marker makes it the active event.
   `finalize` (render.js fillHtml) writes the layout and marker style onto the root; the `htimeline` behaviour
   (behaviors.js) handles the scrolling arrows, the active event and keyboard use. */

const pick = (v, allowed, d) => (allowed.includes(String(v)) ? String(v) : d);
const num = (v, d, min, max) => { const n = parseInt(v, 10); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : d; };

export default {
  id: 'timeline-horizontal',
  name: 'Horizontal Timeline',
  version: '1.0.0',
  category: 'timeline',
  anchor: 'timeline',
  tags: ['timeline', 'history', 'milestones', 'roadmap', 'horizontal', 'scrollable', 'steps', 'light'],
  created: '2026-10-30',
  updated: '2026-10-30',
  seoTitle: 'Horizontal Timeline Template: Scrollable Events on a Line',
  seoDescription: 'Free horizontal timeline: pin and scroll events to the right with GSAP, numbered or icon markers, content above or below, arrows on phones. Export code.',
  description: 'A horizontal timeline for company history, roadmaps and project milestones. Events sit left to right along one continuous line, each with a round numbered or icon marker and its date, title and text above or below. By default the section pins to the screen and scrolling the page slides the events along to the right, with a progress line that grows and each event lighting up as it is reached. On phones, with reduced motion, or in free mode, the row scrolls with swipe, drag or arrow buttons and snaps to each event. It works with a keyboard.',
  bestFor: ['Company history and about pages', 'Product roadmaps and release notes', 'Project milestones, courses and event schedules'],
  behaviors: ['htimeline'],
  /* Writes the layout settings onto the root (called by fillHtml) */
  finalize: (html, state) => {
    const f = state.fields || {};
    const attrs = [
      ['data-layout', pick(f.layout, ['alternate', 'below', 'above'], 'alternate')],
      ['data-marker', pick(f.marker, ['number', 'icon'], 'number')],
      ['data-start', num(f.startAt, 1, 1, 12)],
      ['data-mode', pick(f.scrollMode, ['pin', 'free'], 'pin')],
    ].map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
    return html.replace('<div class="tlh" data-tlh>', () => `<div class="tlh" data-tlh${attrs}>`);
  },

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'settings', label: 'Timeline settings' },
    { id: 'items', label: 'Events' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Our story' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Six years of *building in the open*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'From a spare-room prototype to a product used in 120 countries. Keep scrolling and the timeline moves along.' },
    { key: 'scrollMode', group: 'settings', label: 'Scroll mode', type: 'choice', options: [['pin', 'Pinned: page scroll moves the timeline to the right (GSAP ScrollTrigger)'], ['free', 'Free: swipe, drag and arrow buttons']], value: 'pin', hint: 'Pinned mode holds the section on screen while scrolling the page slides the events along. Phones, reduced motion and no-JavaScript visitors always get the swipe and arrows version.' },
    { key: 'layout', group: 'settings', label: 'Content position', type: 'choice', options: [['alternate', 'Alternate above and below the line'], ['below', 'Always below the line'], ['above', 'Always above the line']], value: 'alternate', hint: 'On phones the content always sits below the line.' },
    { key: 'marker', group: 'settings', label: 'Marker shows', type: 'choice', options: [['number', 'The event number'], ['icon', 'An icon you choose for each event']], value: 'number' },
    { key: 'startAt', group: 'settings', label: 'Active event at the start (number)', type: 'text', value: '1', hint: 'Which event is highlighted when the page loads: 1 is the first.' },
    { key: 'prevLabel', group: 'settings', label: 'Previous button label (screen readers)', type: 'text', value: 'Show earlier events' },
    { key: 'nextLabel', group: 'settings', label: 'Next button label (screen readers)', type: 'text', value: 'Show later events' },
    { key: 'trackLabel', group: 'settings', label: 'Timeline label (screen readers)', type: 'text', value: 'Company timeline' },
  ],
  lists: [{
    key: 'events', group: 'items', label: 'Events', itemLabel: 'Event', titleKey: 'title', min: 2, max: 12,
    fields: [
      { key: 'date', label: 'Date or label', type: 'text', value: '2026' },
      { key: 'title', label: 'Title', type: 'text', value: 'New event' },
      { key: 'text', label: 'Text', type: 'textarea', value: '' },
      { key: 'icon', label: 'Icon (used when markers show icons)', type: 'icon', value: 'sparkles' },
    ],
    value: [
      { date: '2020', title: 'The first prototype', text: 'Two founders build a working version in a spare room and show it to ten friendly teams.', icon: 'sparkles' },
      { date: '2021', title: 'Public launch', text: 'The product opens to everyone. The first thousand users arrive in nine days.', icon: 'rocket' },
      { date: '2022', title: 'The team grows', text: 'Eight people join across design, engineering and support, working from six countries.', icon: 'users' },
      { date: '2023', title: 'Mobile apps', text: 'iOS and Android apps ship together, built from the same design system as the web app.', icon: 'smartphone' },
      { date: '2024', title: 'Open API', text: 'A public API and webhooks let customers connect the product to the tools they already use.', icon: 'code' },
      { date: '2026', title: '120 countries', text: 'Customers in 120 countries, with support in eight languages and a 99.9% uptime record.', icon: 'globe' },
    ],
  }],
  toggles: [],
  theme: { brand: '#6d5ae6', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f4fd', text: '#17142b', muted: '#5d5a74', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="tlh" data-tlh>
    <button type="button" class="tlh-nav tlh-prev" data-tlh-prev data-set="aria-label:prevLabel" disabled><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
    <div class="tlh-track" data-tlh-track role="region" tabindex="0" data-set="aria-label:trackLabel">
      <ol class="tlh-list" data-list="events">
        <li class="tlh-item" data-anim="item">
          <div class="tlh-card">
            <p class="tlh-date" data-edit="date"></p>
            <h3 class="tlh-title" data-edit="title"></h3>
            <p class="tlh-text" data-edit="text"></p>
          </div>
          <button type="button" class="tlh-dot" data-tlh-dot data-set="aria-label:title"><span class="tlh-num" aria-hidden="true"></span><span class="tlh-ico st-icon" data-icon="icon" aria-hidden="true"></span></button>
        </li>
      </ol>
    </div>
    <button type="button" class="tlh-nav tlh-next" data-tlh-next data-set="aria-label:nextLabel"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
  </div>
</div>`,
  css: `.st-timeline-horizontal{padding:clamp(64px,8cqi,112px) 0}
.tlh{position:relative;display:flex;align-items:center;gap:8px}
.tlh-track{flex:1;min-width:0;padding-block:14px 46px;margin-block:-14px -46px;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;-webkit-overflow-scrolling:touch;cursor:grab;outline:none;border-radius:calc(var(--st-radius) * 1px)}
.tlh-track::-webkit-scrollbar{display:none}
.tlh-track.is-dragging{cursor:grabbing;scroll-snap-type:none;user-select:none}
.tlh-track:focus-visible{box-shadow:0 0 0 3px color-mix(in srgb,var(--st-brand) 55%,transparent)}
.tlh-list{--tl-card-h:158px;--tl-item-w:240px;position:relative;display:flex;width:max-content;min-width:100%;margin:0;padding:0 28px;list-style:none;counter-reset:tl}
.tlh-list::before{content:"";position:absolute;left:0;right:0;top:calc(var(--tl-card-h) + 22px);height:4px;margin-top:-2px;border-radius:2px;background:color-mix(in srgb,var(--st-text) 14%,transparent)}
.tlh-list::after{content:"";position:absolute;left:0;top:calc(var(--tl-card-h) + 22px);height:4px;margin-top:-2px;border-radius:2px;width:var(--tl-fill,0px);background:linear-gradient(90deg,color-mix(in srgb,var(--st-brand) 55%,transparent),var(--st-brand));transition:width .7s cubic-bezier(.4,0,.2,1)}
.tlh-item{counter-increment:tl;position:relative;display:flex;flex:1 0 var(--tl-item-w);flex-direction:column;align-items:center;justify-content:flex-start;min-width:var(--tl-item-w);height:calc(var(--tl-card-h) * 2 + 44px);scroll-snap-align:center}
.tlh-dot{position:absolute;top:calc(var(--tl-card-h) + 22px);left:50%;z-index:2;display:grid;place-items:center;width:44px;height:44px;margin:-22px 0 0 -22px;padding:0;border:3px solid var(--st-bg);border-radius:50%;background:var(--st-surface);color:var(--st-brand);font:800 15px/1 var(--st-font-heading);box-shadow:0 0 0 2px color-mix(in srgb,var(--st-brand) 45%,transparent);cursor:pointer;transition:background .3s ease,color .3s ease,transform .3s ease,box-shadow .3s ease}
.tlh-dot:hover{transform:scale(1.1)}
.tlh-dot:focus-visible{outline:3px solid var(--st-brand);outline-offset:3px}
.tlh-num::before{content:counter(tl)}
.tlh-ico{display:none;width:20px;height:20px}
.tlh-ico svg{width:20px;height:20px}
.tlh[data-marker=icon] .tlh-num{display:none}
.tlh[data-marker=icon] .tlh-ico{display:inline-grid}
.tlh-item.is-active .tlh-dot{background:var(--st-brand);color:var(--st-btn-text);transform:scale(1.18);box-shadow:0 0 0 5px color-mix(in srgb,var(--st-brand) 24%,transparent)}
.tlh-card{box-sizing:border-box;position:absolute;left:8px;right:8px;bottom:0;display:flex;flex-direction:column;justify-content:flex-start;gap:4px;height:var(--tl-card-h);padding:14px 16px;border-radius:calc(var(--st-radius) * .8px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);transition:transform .4s ease,box-shadow .4s ease,border-color .4s ease}
.tlh-card::after{content:"";position:absolute;left:50%;top:-7px;width:12px;height:12px;margin-left:-6px;background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);border-bottom:0;border-right:0;transform:rotate(45deg);transition:border-color .4s ease}
@container st (min-width:641px){
.tlh[data-layout=alternate] .tlh-item:nth-child(odd) .tlh-card,.tlh[data-layout=above] .tlh-card{top:0;bottom:auto}
.tlh[data-layout=alternate] .tlh-item:nth-child(odd) .tlh-card::after,.tlh[data-layout=above] .tlh-card::after{top:auto;bottom:-7px;border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);border-top:0;border-left:0}
.tlh[data-layout=alternate] .tlh-item.is-active:nth-child(odd) .tlh-card::after,.tlh[data-layout=above] .tlh-item.is-active .tlh-card::after{border-color:color-mix(in srgb,var(--st-brand) 50%,transparent)}
}
.tlh-item.is-active .tlh-card::after{border-color:color-mix(in srgb,var(--st-brand) 50%,transparent)}
.tlh-item.is-active .tlh-card{transform:translateY(0);border-color:color-mix(in srgb,var(--st-brand) 50%,transparent);box-shadow:0 18px 40px -18px color-mix(in srgb,var(--st-brand) 55%,transparent)}
.tlh-date{color:var(--st-brand);font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.tlh-title{font-size:17px;letter-spacing:-.01em}
.tlh-text{color:var(--st-muted);font-size:14px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.tlh-text:empty{display:none}
.tlh-nav{flex:none;display:grid;place-items:center;width:42px;height:42px;padding:0;border:1px solid color-mix(in srgb,var(--st-text) 14%,transparent);border-radius:50%;background:var(--st-bg);color:var(--st-text);cursor:pointer;box-shadow:0 6px 16px -8px color-mix(in srgb,var(--st-text) 40%,transparent);transition:background .2s ease,color .2s ease,opacity .2s ease}
.tlh-nav:hover:not(:disabled){background:var(--st-brand);color:var(--st-btn-text);border-color:var(--st-brand)}
.tlh-nav:focus-visible{outline:3px solid var(--st-brand);outline-offset:2px}
.tlh-nav:disabled{opacity:.35;cursor:default}
.is-tl-pinned .tlh-track{overflow:hidden;cursor:default}
.is-tl-pinned .tlh-nav{display:none}
.is-tl-pinned .tlh-list{will-change:transform}
.is-tl-pinned .tlh-list::after{transition:none}
.tlh.is-fit .tlh-nav{display:none}
@container st (max-width:640px){
.tlh-list{--tl-item-w:230px;--tl-card-h:172px}
.tlh-list::before,.tlh-list::after{top:22px}
.tlh-item{height:calc(var(--tl-card-h) + 44px)}
.tlh-dot{top:22px}
.tlh-nav{width:36px;height:36px}
}
@media (prefers-reduced-motion:reduce){.tlh-list::after,.tlh-dot,.tlh-card{transition:none}}`,
};
