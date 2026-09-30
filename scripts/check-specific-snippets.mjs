import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';
import fs from 'fs';

const idsArg = process.argv[2];
const ids = fs.readFileSync(idsArg, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);

let issues = {};
function flag(id, msg) { (issues[id] ||= []).push(msg); }

for (const id of ids) {
  const sn = SNIPPETS.find(s => s.id === id);
  if (!sn) { flag(id, 'NOT FOUND'); continue; }
  const seo = sn.seo || {};
  const aboutText = seo.about?.description || seo.about?.about || '';
  const aboutWords = aboutText.split(/\s+/).filter(Boolean).length;
  if (aboutWords < 400) flag(id, `about text too short (${aboutWords} words)`);
  if (!seo.howToUse || (seo.howToUse.items || seo.howToUse).length < 4) flag(id, 'howToUse missing or <4 steps');
  if (!seo.features || seo.features.length < 6) flag(id, `features <6 (${seo.features?.length||0})`);
  if (!seo.useCases || seo.useCases.length < 4) flag(id, `useCases <4 (${seo.useCases?.length||0})`);
  if (!seo.faqs || seo.faqs.length < 4) flag(id, `faqs <4 (${seo.faqs?.length||0})`);
  const totalWords = JSON.stringify(seo).replace(/[{}":,]/g,' ').split(/\s+/).filter(Boolean).length;
  if (totalWords < 1200) flag(id, `total seo words <1200 (~${totalWords})`);
}

const failing = Object.keys(issues);
console.log('checked:', ids.length, 'failing:', failing.length);
for (const id of failing) {
  console.log(`${id}: ${issues[id].join(' | ')}`);
}
