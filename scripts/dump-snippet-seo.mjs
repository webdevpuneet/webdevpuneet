// Dumps id|title|description for snippets whose title exceeds 60 chars
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

for (const sn of SNIPPETS) {
  if (!sn.seo) continue;
  if ((sn.seo.title || '').length <= 60) continue;
  console.log(`${sn.id}\nT: ${sn.seo.title}\nD: ${sn.seo.description}\n`);
}
