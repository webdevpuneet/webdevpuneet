import fs from 'node:fs';
import { SECTION_TEMPLATES, SECTION_CATEGORIES } from '../src/components/SectionTemplates/templates/index.js';
import { SECTION_SEO } from '../src/components/SectionTemplates/templates/seo-content.js';
import { SECTION_CATEGORY_SEO } from '../src/components/SectionTemplates/templates/seo-categories.js';
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

const IDS = ['accessibility-toolbar', 'team-accordion', 'scroll-zoom', 'cursor-follower', 'timeline-horizontal', 'back-to-top'];
const CATS = ['accessibility', 'effects', 'timeline'];
const w = s => String(s).trim().split(/\s+/).length;
const heads = s => (s.match(/^\*\*[^*]+\*\*\s*$/gm) || []).length;
const rows = []; let fail = 0;
const chk = (n, c, x = '') => { if (!c) fail++; rows.push((c ? 'PASS ' : 'FAIL ') + n + (x !== '' ? '  [' + x + ']' : '')); };
const snipIds = new Set(SNIPPETS.map(x => x.id)); const secIds = new Set(SECTION_TEMPLATES.map(x => x.id)); const catIds = new Set(SECTION_CATEGORIES.map(c => c.id));
const badLinks = text => [...new Set([...text.matchAll(/\]\((\/[^)]+)\)/g)].map(m => m[1]))].filter(l => {
  let m;
  if ((m = l.match(/^\/ui-snippets\/([^/]+)\/$/))) return !(snipIds.has(m[1]) || m[1] === 'mycode');
  if ((m = l.match(/^\/website-section-templates\/category\/([^/]+)\/$/))) return !catIds.has(m[1]);
  if ((m = l.match(/^\/website-section-templates\/([^/]+)\/$/))) return !secIds.has(m[1]);
  return l !== '/website-builder/';
});

for (const id of IDS) {
  const t = SECTION_TEMPLATES.find(x => x.id === id); const e = SECTION_SEO[id];
  rows.push('--- ' + id);
  if (!t || !e) { chk('exists', false); continue; }
  const others = SECTION_TEMPLATES.filter(x => x.id !== id);
  chk('title 50-60', t.seoTitle.length >= 50 && t.seoTitle.length <= 60, t.seoTitle.length);
  chk('description 150-160', t.seoDescription.length >= 150 && t.seoDescription.length <= 160, t.seoDescription.length);
  chk('title+description unique', !others.some(x => x.seoTitle === t.seoTitle || x.seoDescription === t.seoDescription));
  chk('about 300+ words', w(e.about.description) >= 300, w(e.about.description));
  chk('5+ sub-headings', heads(e.about.description) >= 5, heads(e.about.description));
  chk('8+ features', e.features.length >= 8, e.features.length);
  chk('3 reasons', e.why?.length === 3);
  chk('4 use cases 18-42 words', e.useCases.filter(u => u.title && u.desc && !u.title.startsWith('Related')).length >= 4 && e.useCases.filter(u => !String(u.title).startsWith('Related')).every(u => w(u.desc) >= 18 && w(u.desc) <= 42), e.useCases.map(u => w(u.desc)).join(','));
  chk('4+ FAQs, answers 25-70 words', e.faqs.length >= 4 && e.faqs.every(f => w(f.a) >= 25 && w(f.a) <= 70), e.faqs.map(f => w(f.a)).join(','));
  chk('FAQ questions unique across sections', !others.some(x => (SECTION_SEO[x.id]?.faqs || []).some(f => e.faqs.some(g => g.q === f.q))));
  chk('AI prompt', !!e.aiPrompt?.paragraph && !!e.aiPrompt?.prompt);
  chk('2+ internal links, all resolve', [...e.about.description.matchAll(/\]\((\/[^)]+)\)/g)].length >= 2 && badLinks(JSON.stringify(e)).length === 0, badLinks(JSON.stringify(e)).join(',') || 'ok');
  chk('keywords present', (e.keywords || []).length >= 4, (e.keywords || []).length);
  chk('preview + og files', fs.existsSync(`public/images/section-templates/previews/${id}.png`) && fs.existsSync(`public/images/section-templates/og/${id}.jpg`));
  chk('category exists', !!SECTION_CATEGORIES.find(c => c.id === t.category), t.category);
  chk('has behaviour code', !t.behaviors?.length || !!fs.readFileSync('src/components/SectionTemplates/templates/behaviors.js', 'utf8').includes('BEHAVIORS.' + t.behaviors[0] + ' ='), (t.behaviors || []).join());
}
for (const c of CATS) {
  const e = SECTION_CATEGORY_SEO[c];
  rows.push('--- category ' + c);
  if (!e) { chk('exists', false); continue; }
  chk('title 50-60', e.title.length >= 50 && e.title.length <= 60, e.title.length);
  chk('description 150-160', e.description.length >= 150 && e.description.length <= 160, e.description.length);
  chk('title unique', !Object.entries(SECTION_CATEGORY_SEO).some(([k, v]) => k !== c && v.title === e.title));
  chk('intro 150+ words', w(e.intro) >= 150, w(e.intro));
  chk('4+ FAQs', e.faqs.length >= 4, e.faqs.length);
  chk('links resolve', badLinks(e.intro).length === 0, badLinks(e.intro).join(',') || 'ok');
}
console.log(rows.join('\n'));
console.log('\nFAILURES:', fail);
