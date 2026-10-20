// Fetches a curated set of Lucide icons (ISC licence) and writes
// src/components/SectionTemplates/templates/icons.js with each icon's inner SVG markup.
import { writeFileSync } from 'node:fs';

const VERSION = '0.460.0';
// Usage: node scripts/build-section-icons.mjs   (edit ICONS below to change the set)
const OUT = new URL('../src/components/SectionTemplates/templates/icons.js', import.meta.url);
const ICONS = [
  ['zap', 'Lightning'], ['sparkles', 'Sparkles'], ['rocket', 'Rocket'], ['shield-check', 'Shield'], ['lock', 'Lock'],
  ['chart-column', 'Bar chart'], ['trending-up', 'Trending up'], ['gauge', 'Speed'], ['target', 'Target'], ['layers', 'Layers'],
  ['layout-dashboard', 'Dashboard'], ['workflow', 'Workflow'], ['puzzle', 'Integrations'], ['plug', 'Plug'], ['code', 'Code'],
  ['cpu', 'Chip'], ['database', 'Database'], ['cloud', 'Cloud'], ['bot', 'AI bot'], ['refresh-cw', 'Sync'],
  ['users', 'Team'], ['user-round', 'Person'], ['message-circle', 'Chat'], ['headphones', 'Support'], ['mail', 'Email'],
  ['phone', 'Phone'], ['map-pin', 'Location'], ['globe', 'Globe'], ['search', 'Search'], ['settings', 'Settings'],
  ['smartphone', 'Mobile'], ['monitor', 'Desktop'], ['palette', 'Design'], ['pen-tool', 'Pen'], ['camera', 'Camera'],
  ['bell', 'Notifications'], ['calendar', 'Calendar'], ['clock', 'Clock'], ['file-text', 'Document'], ['link', 'Link'],
  ['eye', 'Visibility'], ['heart', 'Heart'], ['star', 'Star'], ['award', 'Award'], ['thumbs-up', 'Thumbs up'],
  ['circle-check', 'Check'], ['wallet', 'Wallet'], ['credit-card', 'Payments'], ['shopping-cart', 'Cart'], ['truck', 'Delivery'],
  ['gift', 'Gift'], ['leaf', 'Eco'], ['infinity', 'Unlimited'], ['wand-sparkles', 'Magic'], ['lightbulb', 'Idea'],
  ['graduation-cap', 'Learning'], ['briefcase', 'Business'], ['building-2', 'Company'], ['house', 'Home'], ['coffee', 'Coffee'],
  ['arrow-up', 'Arrow up'], ['send', 'Send'],
  // Social networks (Lucide's brand icons; check each brand's guidelines for official logos)
  ['github', 'GitHub'], ['linkedin', 'LinkedIn'], ['twitter', 'X / Twitter'], ['instagram', 'Instagram'],
  ['youtube', 'YouTube'], ['facebook', 'Facebook'], ['dribbble', 'Dribbble'], ['figma', 'Figma'],
];

const out = [];
for (const [id, label] of ICONS) {
  const res = await fetch(`https://cdn.jsdelivr.net/npm/lucide-static@${VERSION}/icons/${id}.svg`);
  if (!res.ok) { console.error('MISSING', id, res.status); continue; }
  const svg = await res.text();
  const inner = svg.replace(/<!--[\s\S]*?-->/g, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
    .replace(/\s*\n\s*/g, '').trim();
  out.push(`  ${JSON.stringify(id)}: [${JSON.stringify(label)}, '${inner.replace(/'/g, "\\'")}'],`);
}

writeFileSync(OUT, `/* Icons for section templates: a curated set from Lucide (https://lucide.dev, ISC licence),
   lucide-static@${VERSION}. Each entry is [label, inner SVG markup] for a 24×24 stroke icon.
   Regenerate with: node scripts/build-section-icons.mjs. */

export const ICONS = {
${out.join('\n')}
};

export const ICON_IDS = Object.keys(ICONS);

/** Inline SVG for an icon id ('' when unknown). Uses currentColor so CSS sets the colour. */
export function iconSvg(id, size = 24) {
  const ic = ICONS[id];
  if (!ic) return '';
  return \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\${ic[1]}</svg>\`;
}
`);
console.log(`${out.length}/${ICONS.length} icons -> ${OUT}`);
