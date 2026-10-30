import { WEBSITE_TEMPLATES } from '../src/components/SectionTemplates/templates/starters.js';
import { siteFromStarter, siteFiles, starterPageList } from '../src/components/SectionTemplates/templates/site.js';
import { STARTER_WIDGET_EXTRAS } from '../src/components/SectionTemplates/templates/starters-widgets.js';
const NEW = ['back-to-top', 'accessibility-toolbar', 'cursor-follower', 'timeline-horizontal', 'scroll-zoom', 'team-accordion'];
let bad = 0;
for (const t of WEBSITE_TEMPLATES) {
  const added = (STARTER_WIDGET_EXTRAS[t.id] || []).map(e => (typeof e.section === 'function' ? e.section()[0] : e.section[0]));
  const mine = t.sections.filter(s => NEW.includes(s[0])).map(s => s[0]);
  const row = [t.id.padEnd(14), String(t.sections.length).padStart(2) + ' sections', 'new: ' + (mine.join(', ') || '-')];
  try {
    const one = siteFiles(siteFromStarter(t.id, { multi: false }), {});
    const idx = one.find(f => f.path === 'index.html').content;
    const h1 = (idx.match(/<h1[\s>]/g) || []).length;
    const miss = added.filter(id => id !== 'team-accordion' ? !idx.includes(id === 'timeline-horizontal' ? 'class="tlh"' : id === 'back-to-top' ? 'class="btt"' : id === 'accessibility-toolbar' ? 'class="a11y"' : id === 'cursor-follower' ? 'class="cf"' : id === 'scroll-zoom' ? 'class="kb"' : '') : !idx.includes('class="ta"'));
    row.push('1-page h1=' + h1, miss.length ? 'MISSING ' + miss.join() : 'ok');
    if (h1 !== 1 || miss.length) bad++;
    const multi = siteFiles(siteFromStarter(t.id, { multi: true }), {});
    const pages = multi.filter(f => f.path.endsWith('.html'));
    const perPage = pages.map(p => ({ f: p.path, btt: p.content.includes('class="btt"'), a11y: p.content.includes('class="a11y"'), cf: p.content.includes('class="cf"'), h1: (p.content.match(/<h1[\s>]/g) || []).length }));
    const wantBtt = added.includes('back-to-top'), wantA = added.includes('accessibility-toolbar'), wantC = added.includes('cursor-follower');
    const badPages = perPage.filter(p => (wantBtt && !p.btt) || (wantA && !p.a11y) || (wantC && !p.cf) || p.h1 > 1);
    row.push('multi ' + pages.length + ' pages', badPages.length ? 'PAGES WITHOUT WIDGET/h1: ' + badPages.map(p => p.f + (p.h1 > 1 ? '(h1=' + p.h1 + ')' : '')).join() : 'widgets on every page');
    if (badPages.length) bad++;
  } catch (e) { row.push('ERROR ' + e.message.slice(0, 120)); bad++; }
  console.log(row.join(' | '));
}
console.log('\nproblems:', bad);
