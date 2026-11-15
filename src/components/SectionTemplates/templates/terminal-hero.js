/* Terminal Hero: a developer's opening section. Copy on the left (availability badge, a big headline, a short intro, two buttons and
   social icons) and a terminal window on the right whose lines type themselves out one after another. The "termtype" behaviour does
   the typing; visitors who prefer reduced motion, and the editors, see every line at once. This is the page's main heading (h1). */

export default {
  id: 'terminal-hero',
  name: 'Terminal Hero',
  version: '1.0.0',
  category: 'hero',
  tags: ['hero', 'developer', 'terminal', 'portfolio', 'code', 'typing', 'dark', 'programmer', 'engineer'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Terminal Hero Section — Free Developer Portfolio Hero HTML',
  seoDescription: 'Free developer portfolio hero: your headline and buttons beside a terminal that types out who you are, line by line. Calm for reduced motion, no libraries.',
  description: 'A first screen that looks like the work. The left side holds an availability badge, a large headline, a short introduction, two buttons and social icons; the right side is a terminal window whose lines type themselves out, with commands, output, success lines and comments in their own colours. You write every line, so it can say who you are, what your stack is and what you are working on now. Visitors who prefer reduced motion see the finished terminal at once. Made for developer, engineer and DevOps portfolios.',
  bestFor: ['Developer, engineer and DevOps portfolios', 'Open-source project and library landing pages', 'Bootcamp, dev-tool and API product sites'],

  groups: [
    { id: 'main', label: 'Heading and text' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'social', label: 'Social links', toggle: 'showSocials' },
    { id: 'term', label: 'Terminal' },
    { id: 'items', label: 'Terminal lines' },
  ],
  fields: [
    { key: 'badge', group: 'main', label: 'Availability badge (optional)', type: 'text', value: 'Available for new projects' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'textarea', value: 'I build fast, *reliable* web apps' },
    { key: 'lead', group: 'main', label: 'Introduction', type: 'textarea', value: 'Full-stack developer with eight years of experience in React, Node and cloud infrastructure. I turn complicated ideas into products people enjoy using.' },
    { key: 'cta1', group: 'buttons', label: 'Main button text', type: 'text', value: 'See my projects' },
    { key: 'cta1Url', group: 'buttons', label: 'Main button link', type: 'url', value: '#projects' },
    { key: 'cta2', group: 'buttons', label: 'Second button text (optional)', type: 'text', value: 'Get in touch' },
    { key: 'cta2Url', group: 'buttons', label: 'Second button link', type: 'url', value: '#contact' },
    { key: 'windowTitle', group: 'term', label: 'Window title', type: 'text', value: 'arjun@dev: ~/portfolio' },
    { key: 'prompt', group: 'term', label: 'Prompt', type: 'text', value: '$' },
    { key: 'speed', group: 'term', label: 'Typing speed', type: 'choice', options: [['slow', 'Slow'], ['normal', 'Normal'], ['fast', 'Fast']], value: 'normal' },
    { key: 'termLabel', group: 'term', label: 'Terminal description (screen readers)', type: 'text', value: 'A terminal window showing a few commands about the developer' },
  ],
  lists: [
    {
      key: 'lines', group: 'items', label: 'Lines', itemLabel: 'Line', titleKey: 'text', min: 1, max: 14,
      fields: [
        { key: 'kind', label: 'Type', type: 'choice', options: [['cmd', 'Command (typed)'], ['out', 'Output'], ['ok', 'Success'], ['dim', 'Comment']], value: 'cmd' },
        { key: 'text', label: 'Text', type: 'text', value: 'echo hello' },
      ],
      value: [
        { kind: 'cmd', text: 'whoami' },
        { kind: 'out', text: 'Arjun Mehta, full-stack developer' },
        { kind: 'cmd', text: 'cat stack.txt' },
        { kind: 'out', text: 'TypeScript · React · Next.js · Node · PostgreSQL · AWS' },
        { kind: 'cmd', text: 'git log --oneline -3' },
        { kind: 'dim', text: 'a1f3c9e Ship the checkout redesign' },
        { kind: 'dim', text: '7b20de4 Cut API latency by 40%' },
        { kind: 'dim', text: 'c55a018 Add dark mode everywhere' },
        { kind: 'cmd', text: 'npm run hire-me' },
        { kind: 'ok', text: '✓ Ready for your next project' },
      ],
    },
    {
      key: 'socials', group: 'social', label: 'Social links', itemLabel: 'Link', titleKey: 'label', min: 1, max: 6,
      fields: [
        { key: 'icon', label: 'Icon', type: 'icon', value: 'github' },
        { key: 'label', label: 'Name (for screen readers)', type: 'text', value: 'GitHub' },
        { key: 'url', label: 'Link', type: 'url', value: 'https://github.com/' },
      ],
      value: [
        { icon: 'github', label: 'GitHub', url: 'https://github.com/' },
        { icon: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' },
        { icon: 'twitter', label: 'X (Twitter)', url: 'https://x.com/' },
      ],
    },
  ],
  toggles: [{ key: 'showSocials', label: 'Social links', value: true }],
  theme: { brand: '#5eead4', brandText: '#06201c', bg: '#0a0f1c', surface: '#131b2e', text: '#e8edf7', muted: '#97a6c0', radius: '14' },
  fonts: { heading: 'space', body: 'inter' },
  behaviors: ['termtype'],

  html: `<div class="st-wrap th" data-termtype data-set="data-speed:speed;data-prompt:prompt">
  <div class="th-copy">
    <p class="th-badge" data-anim="item" data-show-if="badge"><span class="th-pulse" aria-hidden="true"></span><span data-edit="badge"></span></p>
    <h1 class="th-title" data-anim="item" data-anim-text data-edit="headline"></h1>
    <p class="th-lead" data-anim="item" data-edit="lead"></p>
    <div class="st-btns" data-anim="item">
      <a class="st-btn" data-show-if="cta1" data-href="cta1Url"><span data-edit="cta1"></span></a>
      <a class="st-btn st-btn--ghost" data-show-if="cta2" data-href="cta2Url"><span data-edit="cta2"></span></a>
    </div>
    <ul class="th-socials" data-anim="item" data-show="showSocials" data-list="socials">
      <li><a class="th-social" data-href="url" data-set="aria-label:label"><span class="st-icon" data-icon="icon"></span></a></li>
    </ul>
  </div>
  <div class="th-term" data-anim="media" role="group" data-set="aria-label:termLabel">
    <div class="th-bar" aria-hidden="true"><i></i><i></i><i></i><span class="th-wtitle" data-edit="windowTitle"></span></div>
    <ol class="th-lines" data-list="lines">
      <li class="th-line" data-set="data-kind:kind"><span class="th-p" aria-hidden="true"></span><span class="th-t" data-edit="text"></span></li>
    </ol>
  </div>
</div>`,
  css: `.st-terminal-hero{padding:clamp(56px,8cqi,120px) 0}
.th{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(28px,5cqi,72px);align-items:center}
.th-copy{display:flex;flex-direction:column;align-items:flex-start;gap:clamp(14px,1.8cqi,22px)}
.th-badge{display:inline-flex;align-items:center;gap:9px;padding:6px 14px;border-radius:99px;background:color-mix(in srgb,var(--st-brand) 14%,transparent);color:var(--st-brand);font:600 13.5px/1 var(--st-font-body)}
.th-pulse{width:8px;height:8px;border-radius:50%;background:var(--st-brand);box-shadow:0 0 0 0 color-mix(in srgb,var(--st-brand) 60%,transparent);animation:th-pulse 2s infinite}
@keyframes th-pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--st-brand) 55%,transparent)}70%{box-shadow:0 0 0 9px transparent}100%{box-shadow:0 0 0 0 transparent}}
.th-title{font:700 clamp(36px,5.2cqi,64px)/1.05 var(--st-font-heading);letter-spacing:-.03em}
.th-lead{color:var(--st-muted);font-size:clamp(16px,1.6cqi,19px);line-height:1.65;max-width:52ch}
.th-socials{list-style:none;display:flex;gap:10px;margin:4px 0 0;padding:0}
.th-social{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;border:1px solid color-mix(in srgb,var(--st-text) 18%,transparent);color:var(--st-text);transition:background .2s,color .2s,border-color .2s}
.th-social:hover{background:var(--st-brand);border-color:var(--st-brand);color:var(--st-btn-text)}
.th-social .st-icon{background:none;width:20px;height:20px}
.th-term{border-radius:calc(var(--st-radius) * 1.2px);background:#070b14;border:1px solid rgba(148,163,184,.22);box-shadow:0 30px 70px -30px rgba(0,0,0,.7);overflow:hidden;color:#cbd5e1;font:500 clamp(13px,1.35cqi,15.5px)/1.7 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.th-bar{display:flex;align-items:center;gap:7px;padding:12px 16px;background:#0e1524;border-bottom:1px solid rgba(148,163,184,.15)}
.th-bar i{width:11px;height:11px;border-radius:50%;background:#ef4444}
.th-bar i:nth-child(2){background:#f59e0b}
.th-bar i:nth-child(3){background:#22c55e}
.th-wtitle{margin-left:10px;color:#7d8aa3;font-size:12.5px}
.th-lines{list-style:none;margin:0;padding:18px 20px 22px;min-height:clamp(240px,26cqi,330px)}
.th-line{white-space:pre-wrap;overflow-wrap:anywhere}
.th-line[hidden]{display:none}
.th-p{color:var(--st-brand);margin-right:10px}
.th-line[data-kind="out"] .th-t{color:#e2e8f0}
.th-line[data-kind="ok"] .th-t{color:#4ade80}
.th-line[data-kind="dim"] .th-t{color:#7d8aa3}
.th-line[data-kind="cmd"] .th-t{color:#f8fafc}
.th-cursor{display:inline-block;width:.6em;height:1.1em;margin-left:2px;vertical-align:-.2em;background:var(--st-brand);animation:th-blink 1s steps(1) infinite}
@keyframes th-blink{50%{opacity:0}}
@media (prefers-reduced-motion:reduce){.th-pulse,.th-cursor{animation:none}}
@container st (max-width:860px){.th{grid-template-columns:1fr}}`,
};
