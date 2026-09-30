import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src/components/UiSnippetsTool/snippets');
const noindexIds = fs.readdirSync(dir)
  .filter(f => fs.readFileSync(path.join(dir, f), 'utf8').includes('noindex'))
  .map(f => f.replace('.js', ''));

console.log('dev-mode (noindex) snippets:', noindexIds.length);

let issues = {};
function flag(id, msg) {
  (issues[id] ||= []).push(msg);
}

for (const id of noindexIds) {
  const sn = SNIPPETS.find(s => s.id === id);
  if (!sn) { flag(id, 'NOT FOUND in SNIPPETS export'); continue; }
  if (!sn.seo) { flag(id, 'missing seo block entirely'); continue; }
  const seo = sn.seo;
  const t = seo.title || '';
  const d = seo.description || '';
  if (t.length > 60) flag(id, `title too long (${t.length})`);
  if (t.length < 20) flag(id, `title too short (${t.length})`);
  if (d.length < 120) flag(id, `description too short (${d.length})`);
  if (d.length > 165) flag(id, `description too long (${d.length})`);

  const aboutText = seo.about?.description || seo.about?.about || '';
  const aboutWords = aboutText.split(/\s+/).filter(Boolean).length;
  if (aboutWords < 400) flag(id, `about text too short (${aboutWords} words)`);

  if (!seo.howToUse || (seo.howToUse.items || seo.howToUse).length < 4) flag(id, 'howToUse missing or <4 steps');
  if (!seo.features || seo.features.length < 6) flag(id, `features <6 (${seo.features?.length||0})`);
  if (!seo.useCases || seo.useCases.length < 4) flag(id, `useCases <4 (${seo.useCases?.length||0})`);
  if (!seo.faqs || seo.faqs.length < 4) flag(id, `faqs <4 (${seo.faqs?.length||0})`);

  const blob = JSON.stringify(seo).toLowerCase();
  if (!blob.includes('tailwind')) flag(id, 'no tailwind mention');
  if (!blob.includes('react')) flag(id, 'no react mention');
  if (!blob.includes('angular') && !blob.includes('vue')) flag(id, 'no angular/vue mention');

  // interlinks check
  const linkMatches = blob.match(/\/ui-snippets\/[a-z0-9-]+\//g) || [];
  if (linkMatches.length < 2) flag(id, `interlinks <2 (${linkMatches.length})`);

  const totalWords = JSON.stringify(seo).replace(/[{}":,]/g,' ').split(/\s+/).filter(Boolean).length;
  if (totalWords < 1200) flag(id, `total seo words <1200 (~${totalWords})`);
}

const failing = Object.keys(issues);
console.log('\nfailing:', failing.length, '/', noindexIds.length);
for (const id of failing) {
  console.log(`\n${id}:`);
  for (const m of issues[id]) console.log('  -', m);
}
const passing = noindexIds.filter(id => !issues[id]);
console.log('\npassing (ready to go live):', passing.length);
console.log(passing.join(', '));
