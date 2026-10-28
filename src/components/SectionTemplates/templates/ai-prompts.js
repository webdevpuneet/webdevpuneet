/* "Build with AI" prompt for a website template page. Built from the template's own data (sections in order
   with their real headings, theme colours, fonts, pages and home SEO), so every prompt is specific to its
   template and stays correct when the template changes. Rendered by app/website-builder/templates/[id]/page.js. */
import { sectionTemplateById } from './index.js';
import { DEFAULT_THEME } from './meta.js';

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/\s*\n\s*/g, ' ').trim();
const clip = (s, n = 72) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);
const field = (tplId, state, key) => {
  const own = state?.fields?.[key];
  if (own !== undefined && own !== '') return own;
  return sectionTemplateById(tplId)?.fields?.find(f => f.key === key)?.value ?? '';
};
const headingOf = (tplId, state) => {
  for (const k of ['headline', 'heading', 'name', 'title']) {
    const v = plain(field(tplId, state, k));
    if (v) return clip(v);
  }
  return '';
};
const BARE = new Set(['navbar', 'footer', 'popup', 'social']); // listed by name only

/** { paragraph, prompt } for a website template (`t` from WEBSITE_TEMPLATES) */
export function websiteAiPrompt(t, { theme: given, fontNames, pages }) {
  const theme = { ...DEFAULT_THEME, ...(given || {}) }; // preset-based templates carry colours only
  const nav = t.sections.find(([id]) => sectionTemplateById(id)?.category === 'navbar');
  const brand = plain(field(nav?.[0], nav?.[1], 'logoText')) || t.name.replace(/ (Website|Landing Page)$/, '');
  const industry = t.industry.toLowerCase();
  const kind = t.name.replace(/ (Website|Landing Page)$/, '').toLowerCase();
  const lines = t.sections.map(([id, state], i) => {
    const s = sectionTemplateById(id);
    if (!s) return null;
    const h = BARE.has(s.category) ? '' : headingOf(id, state);
    return `${i + 1}. ${s.name}${h ? `: “${h}”` : ''}`;
  }).filter(Boolean);
  const pageLines = (pages || []).filter(p => p.file !== 'index.html').map(p => `${p.name} (${p.file})`);
  const prompt = `Build a complete ${kind} website for “${brand}” as clean HTML, CSS and a little JavaScript.

Page structure, top to bottom:
${lines.join('\n')}

Look and feel:
- Colours as CSS custom properties: brand ${theme.brand}, page background ${theme.bg}, cards ${theme.surface}, text ${theme.text}, muted text ${theme.muted}. Corner radius ${theme.radius}px, content width ${theme.maxWidth || 1200}px.
- Headings in ${fontNames[0]}, body text in ${fontNames[1]} (load both from Google Fonts with display=swap).
- Mobile first. Sections use CSS grid or flexbox and stack cleanly below 700px.

Content:
- Write real, believable ${industry} copy for every section instead of lorem ipsum: specific offers, numbers, names and calls to action.
- One clear primary action in the hero and again near the end.

Quality:
- Semantic HTML (header, main, section, footer) with exactly one h1, the hero headline, and one h2 per section.
- Accessible: alt text on every image, visible focus states, labelled form fields, buttons and links with clear text, and prefers-reduced-motion respected.
- SEO: title “${t.homeTitle || t.seoTitle}”, a meta description of 150 to 160 characters, Open Graph tags and JSON-LD that suits a ${industry} business.
- Optional: a subtle GSAP ScrollTrigger fade-up on section headings, with content visible without JavaScript.${pageLines.length ? `

Also create these pages with the same navbar, footer and theme, and link them from the menu:
${pageLines.map(p => `- ${p}`).join('\n')}` : ''}`;
  const paragraph = `Give this prompt to an AI assistant to generate your own version of the ${t.name} template: swap in your business name, services and tone, add or remove sections, translate it, or turn the page into a Next.js project or a WordPress theme. Use the template above as the visual reference, so you and the AI start from a design that already works.`;
  return { paragraph, prompt };
}
