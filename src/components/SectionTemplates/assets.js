/* Server-only: which captured images exist (scripts/capture-section-previews.mjs).
   Pages only reference images that are on disk, so a new section still builds and
   falls back to its live preview until it has been captured. */
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'public/images/section-templates');
export const sectionPreviewIds = () => {
  try { return fs.readdirSync(path.join(DIR, 'previews')).map(f => f.replace(/\.png$/, '')); }
  catch { return []; }
};
export const hasSectionOg = id => fs.existsSync(path.join(DIR, 'og', `${id}.jpg`));
export const sectionOgUrl = id => `https://webdevpuneet.com/images/section-templates/og/${id}.jpg`;
export const sectionPreviewUrl = id => `/images/section-templates/previews/${id}.png`;
