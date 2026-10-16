/* Server-only: which captured images exist (scripts/capture-template-previews.mjs).
   Pages only reference images that are really on disk, so a template added before
   its previews are captured still builds cleanly and falls back to live previews. */
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'public/images/social-post-templates');
const list = sub => {
  try { return fs.readdirSync(path.join(DIR, sub)).map(f => f.replace(/\.(png|jpg)$/, '')); }
  catch { return []; }
};

export const previewIds = () => list('previews');
export const hasOg = id => fs.existsSync(path.join(DIR, 'og', `${id}.jpg`));
export const ogUrl = id => `https://webdevpuneet.com/images/social-post-templates/og/${id}.jpg`;
export const previewUrl = id => `/images/social-post-templates/previews/${id}.png`;
