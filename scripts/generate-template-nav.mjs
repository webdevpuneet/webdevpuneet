// Writes src/data/template-nav.json: the Email Templates, Social Post Templates and
// Website Section Templates libraries as { categories: [{ id, label, items: [{ id, name }] }] }, for the sidebar.
// The sidebar loads on every page, so it reads this small list instead of importing the
// template registries (which carry every template's HTML, CSS and build code).
// Runs automatically before `npm run build` (prebuild); run by hand after adding templates:
//   node scripts/generate-template-nav.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EMAIL_TEMPLATES, EMAIL_CATEGORIES } from '../src/components/EmailTemplates/templates/index.js';
import { TEMPLATES as SOCIAL_TEMPLATES, TEMPLATE_CATEGORIES as SOCIAL_CATEGORIES } from '../src/components/SocialPostTemplates/templates/index.js';
import { SECTION_TEMPLATES, SECTION_CATEGORIES } from '../src/components/SectionTemplates/templates/index.js';

import { WEBSITE_TEMPLATES } from '../src/components/SectionTemplates/templates/starters.js';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'template-nav.json');

const group = (templates, categories) => categories
  .map(c => ({ id: c.id, label: c.label, items: templates.filter(t => t.category === c.id).map(t => ({ id: t.id, name: t.name })) }))
  .filter(c => c.items.length);

const nav = {
  email: { total: EMAIL_TEMPLATES.length, categories: group(EMAIL_TEMPLATES, EMAIL_CATEGORIES) },
  social: { total: SOCIAL_TEMPLATES.length, categories: group(SOCIAL_TEMPLATES, SOCIAL_CATEGORIES) },
  section: { total: SECTION_TEMPLATES.length, categories: group(SECTION_TEMPLATES, SECTION_CATEGORIES) },
};
writeFileSync(OUT, `${JSON.stringify(nav, null, 1)}\n`);
console.log(`template nav: ${nav.email.total} email, ${nav.social.total} social, ${nav.section.total} section -> ${OUT}`);

// Website Builder templates, for the "Related website templates" strip under the editor
const WEB_OUT = join(dirname(OUT), 'website-templates-nav.json');
writeFileSync(WEB_OUT, `${JSON.stringify(WEBSITE_TEMPLATES.map(t => ({ id: t.id, name: t.name, industry: t.industry })), null, 1)}
`);
console.log(`website templates nav: ${WEBSITE_TEMPLATES.length} -> ${WEB_OUT}`);
