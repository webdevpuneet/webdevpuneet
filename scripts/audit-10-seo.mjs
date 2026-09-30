// SEO audit for the 10 newest dev snippets — full standard check
import { readFileSync } from 'fs';

const IDS = [
  'notification-center','chip-filter','mega-menu','auto-resize-textarea',
  'circular-steps','stacked-cards','css-animated-border',
  'photo-gallery','parallax-hero','floating-dock',
];

const dir = 'src/components/UiSnippetsTool/snippets';

// dynamic import each to read the actual object
const mods = {};
for (const id of IDS) {
  const m = await import(`../${dir}/${id}.js`);
  mods[id] = m.default;
}

function wordCount(seo) {
  const parts = [];
  parts.push(seo.about?.description || '');
  (seo.howToUse?.items || []).forEach(s => { parts.push(s.title||''); parts.push(s.text||''); });
  (seo.features || []).forEach(f => { parts.push(f.title||''); parts.push(f.text||f.desc||''); });
  (seo.useCases || []).forEach(c => { parts.push(c.title||''); parts.push(c.text||c.desc||''); });
  (seo.faqs || []).forEach(f => { parts.push(f.q||''); parts.push(f.a||''); });
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

function interlinks(seo) {
  const blob = JSON.stringify(seo);
  return (blob.match(/\]\(\/ui-snippets\//g) || []).length;
}

function hasFwFaq(seo) {
  const blob = JSON.stringify(seo.faqs || []).toLowerCase();
  return blob.includes('react') || blob.includes('vue') || blob.includes('angular') || blob.includes('tailwind');
}

function fwInDesc(seo) {
  const d = (seo.description||'').toLowerCase();
  return /react|vue|angular|tailwind/.test(d);
}

console.log('id'.padEnd(22), 'idx', 'title', 'desc', 'words', 'links', 'fwFAQ', 'fwDesc', 'faqs');
console.log('-'.repeat(80));
for (const id of IDS) {
  const sn = mods[id];
  const seo = sn.seo || {};
  const t = (seo.title||'').length;
  const d = (seo.description||'').length;
  const wc = wordCount(seo);
  const links = interlinks(seo);
  const fwFaq = hasFwFaq(seo) ? 'Y' : 'n';
  const fwd = fwInDesc(seo) ? 'Y' : 'n';
  const faqs = (seo.faqs||[]).length;
  const idx = sn.noindex ? 'DEV' : 'LIVE';

  const flags = [];
  if (t > 60) flags.push(`title=${t}>60`);
  if (t < 30) flags.push(`title=${t}<30`);
  if (d < 120) flags.push(`desc=${d}<120`);
  if (d > 165) flags.push(`desc=${d}>165`);
  if (wc < 1200) flags.push(`words=${wc}<1200`);
  if (links < 3) flags.push(`links=${links}<3`);
  if (fwFaq === 'n') flags.push('NO-fw-FAQ');
  if (fwd === 'n') flags.push('NO-fw-desc');
  if (faqs < 4) flags.push(`faqs=${faqs}<4`);

  console.log(
    id.padEnd(22),
    idx.padEnd(4),
    String(t).padEnd(5),
    String(d).padEnd(4),
    String(wc).padEnd(5),
    String(links).padEnd(5),
    fwFaq.padEnd(5),
    fwd.padEnd(6),
    String(faqs).padEnd(4),
    flags.length ? '⚠ ' + flags.join(', ') : '✅'
  );
}
