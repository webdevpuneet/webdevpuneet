export default {
  id: 'hiring',
  name: 'We’re Hiring',
  version: '1.0.0',
  category: 'announcements',
  tags: ['hiring', 'job', 'careers', 'chips'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'We’re Hiring Post Template — Free Job Post for LinkedIn & IG',
  seoDescription: 'Free hiring post template with the role title, location and job type chips, and an apply link. Edit online, download each post size as PNG or copy the HTML.',
  description: 'A bright recruiting post with a "We’re hiring" kicker, the role title, three detail chips (location, type, team) and an apply link.',
  bestFor: ['Job openings on LinkedIn, Instagram and X', 'Startup recruiting', 'Internship and freelance calls'],
  fonts: { heading: 'dmsans', body: 'dmsans' },
  vars: [
    { key: 'bg', label: 'Background', value: '#fff7ed' },
    { key: 'text', label: 'Text', value: '#431407' },
    { key: 'accent', label: 'Accent', value: '#ea580c' },
  ],
  fields: [
    { key: 'kicker', label: 'Kicker', type: 'text', value: 'We’re hiring' },
    { key: 'role', label: 'Role', type: 'textarea', value: 'Senior *Frontend* Engineer' },
    { key: 'chip1', label: 'Detail 1', type: 'text', value: 'Remote · US' },
    { key: 'chip2', label: 'Detail 2', type: 'text', value: 'Full-time' },
    { key: 'chip3', label: 'Detail 3', type: 'text', value: 'React · TypeScript' },
    { key: 'apply', label: 'Apply link', type: 'text', value: 'Apply → webdevpuneet.com/careers' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="h">
  <div class="h-top"><span class="h-kicker" data-edit="kicker"></span><div class="h-logo" data-image="logo" data-image-fit="contain"></div></div>
  <div class="h-body" data-fit-box><h2 class="h-role" data-edit="role" data-fit></h2>
    <div class="h-chips"><span data-edit="chip1"></span><span data-edit="chip2"></span><span data-edit="chip3"></span></div>
  </div>
  <span class="h-apply" data-edit="apply"></span>
</div>`,
  css: `.h{position:absolute;inset:0;display:flex;flex-direction:column;padding:var(--pt) var(--pad) var(--pb);background:var(--bg);border:calc(var(--u)*1.6) solid var(--accent)}
.h-top{display:flex;align-items:center;justify-content:space-between}
.h-kicker{font-family:var(--font-heading);font-size:calc(var(--u)*5);font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:.04em}
.h-logo{width:calc(var(--u)*9);height:calc(var(--u)*9)}
.h-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*5)}
.h-role{font-family:var(--font-heading);font-size:calc(var(--u)*11);line-height:1.02;font-weight:800;letter-spacing:-.03em}
.h-chips{display:flex;flex-wrap:wrap;gap:calc(var(--u)*1.8)}
.h-chips span{font-size:calc(var(--u)*3.2);font-weight:600;padding:calc(var(--u)*1.4) calc(var(--u)*3);border-radius:99px;border:calc(var(--u)*.3) solid color-mix(in srgb,var(--text) 30%,transparent)}
.h-apply{align-self:flex-start;font-size:calc(var(--u)*3.4);font-weight:700;color:#fff;background:var(--accent);padding:calc(var(--u)*2.2) calc(var(--u)*4);border-radius:calc(var(--u)*1.6)}`,
};
