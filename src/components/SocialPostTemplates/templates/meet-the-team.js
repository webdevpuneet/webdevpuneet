export default {
  id: 'meet-the-team',
  name: 'Meet the Team',
  version: '1.0.0',
  category: 'announcements',
  tags: ['team', 'employees', 'behind-the-scenes', 'photo', 'linkedin', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Meet the Team Post Template — Free Instagram & LinkedIn Post',
  seoDescription: 'Free "Meet the team" post template with three team member photos, names and roles, a headline and intro. Edit it online, download PNG sizes or copy the HTML.',
  description: 'A friendly team introduction post: a "Meet the team" headline, a short intro, and three member cards with round photos, names and roles, plus your handle. It also works as a single new-hire welcome.',
  bestFor: ['Introducing your team or founders', 'New hire and employee spotlights', 'Agency and studio about-us posts'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fff7ed' },
    { key: 'card', label: 'Card', value: '#ffffff' },
    { key: 'text', label: 'Text', value: '#1c1917' },
    { key: 'accent', label: 'Accent', value: '#ea580c' },
  ],
  fields: [
    { key: 'eyebrow', label: 'Small label', type: 'text', value: 'Behind the scenes' },
    { key: 'heading', label: 'Heading', type: 'text', value: 'Meet the *team*' },
    { key: 'intro', label: 'Intro', type: 'textarea', value: 'The people building, shipping and answering your messages every day.' },
    { key: 'm1Photo', label: 'Member 1 photo', type: 'image' },
    { key: 'm1Name', label: 'Member 1 name', type: 'text', value: 'Maya Chen' },
    { key: 'm1Role', label: 'Member 1 role', type: 'text', value: 'Founder & CEO' },
    { key: 'm2Photo', label: 'Member 2 photo', type: 'image' },
    { key: 'm2Name', label: 'Member 2 name', type: 'text', value: 'Sam Patel' },
    { key: 'm2Role', label: 'Member 2 role', type: 'text', value: 'Lead Designer' },
    { key: 'm3Photo', label: 'Member 3 photo', type: 'image' },
    { key: 'm3Name', label: 'Member 3 name', type: 'text', value: 'Leo Martins' },
    { key: 'm3Role', label: 'Member 3 role', type: 'text', value: 'Customer Success' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
  ],
  html: `<div class="mt">
  <div class="mt-head">
    <span class="mt-eyebrow" data-edit="eyebrow"></span>
    <h2 class="mt-title" data-edit="heading"></h2>
    <p class="mt-intro" data-edit="intro"></p>
  </div>
  <div class="mt-grid">
    <div class="mt-card"><div class="mt-photo" data-image="m1Photo"></div><div class="mt-who"><span class="mt-name" data-edit="m1Name"></span><span class="mt-role" data-edit="m1Role"></span></div></div>
    <div class="mt-card"><div class="mt-photo" data-image="m2Photo"></div><div class="mt-who"><span class="mt-name" data-edit="m2Name"></span><span class="mt-role" data-edit="m2Role"></span></div></div>
    <div class="mt-card"><div class="mt-photo" data-image="m3Photo"></div><div class="mt-who"><span class="mt-name" data-edit="m3Name"></span><span class="mt-role" data-edit="m3Role"></span></div></div>
  </div>
  <span class="mt-handle" data-edit="handle"></span>
</div>`,
  css: `.mt{position:absolute;inset:0;display:flex;flex-direction:column;gap:calc(var(--u)*5);padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 100% 0%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 42%),var(--bg)}
.mt-head{display:flex;flex-direction:column;gap:calc(var(--u)*2)}
.mt-eyebrow{font-size:calc(var(--u)*3);font-weight:700;text-transform:uppercase;letter-spacing:.16em;color:var(--accent)}
.mt-title{font-family:var(--font-heading);font-size:calc(var(--u)*11);line-height:1;font-weight:800;letter-spacing:-.025em}
.mt-intro{font-size:calc(var(--u)*3.8);line-height:1.4;opacity:.75;max-width:88%}
.mt-grid{flex:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:calc(var(--u)*3);align-items:center;min-height:0}
.mt-card{display:flex;flex-direction:column;align-items:center;text-align:center;gap:calc(var(--u)*1.4);height:100%;max-height:calc(var(--u)*44);justify-content:center;padding:calc(var(--u)*4.4) calc(var(--u)*2);border-radius:calc(var(--u)*4);background:var(--card);box-shadow:0 calc(var(--u)*1.4) calc(var(--u)*5) rgba(28,25,23,.08)}
.mt-photo{flex:none;width:calc(var(--u)*17);height:calc(var(--u)*17);border-radius:50%;margin-bottom:calc(var(--u)*1.4);box-shadow:0 0 0 calc(var(--u)*.9) var(--card),0 0 0 calc(var(--u)*1.6) var(--accent)}
.mt-who{display:flex;flex-direction:column;gap:calc(var(--u)*.8);min-width:0}
.mt-name{font-family:var(--font-heading);font-size:calc(var(--u)*3.4);font-weight:800;line-height:1.15}
.mt-role{font-size:calc(var(--u)*2.8);opacity:.65;line-height:1.25}
.mt-handle{align-self:flex-end;font-size:calc(var(--u)*3.2);font-weight:700;color:var(--accent)}
.is-story .mt-grid{grid-template-columns:1fr;align-content:center;gap:calc(var(--u)*4)}
.is-story .mt-card{flex-direction:row;text-align:left;gap:calc(var(--u)*4);padding:calc(var(--u)*4);height:auto;max-height:none;justify-content:flex-start}
.is-story .mt-photo{margin:0;flex:none}
.is-landscape .mt{display:grid;grid-template-columns:.9fr 1.6fr;grid-template-rows:1fr auto;column-gap:calc(var(--u)*6)}
.is-landscape .mt-head{justify-content:center}
.is-landscape .mt-grid{grid-row:1/3}
.is-landscape .mt-title{font-size:calc(var(--u)*10)}`,
};
