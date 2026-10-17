/* Server-only: which captured images exist (scripts/capture-email-previews.mjs).
   Pages only reference images that are on disk, so a new template still builds and
   falls back to its live preview until it has been captured. */
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'public/images/email-templates');
export const emailPreviewIds = () => {
  try { return fs.readdirSync(path.join(DIR, 'previews')).map(f => f.replace(/\.png$/, '')); }
  catch { return []; }
};
export const hasEmailOg = id => fs.existsSync(path.join(DIR, 'og', `${id}.jpg`));
export const emailOgUrl = id => `https://webdevpuneet.com/images/email-templates/og/${id}.jpg`;
export const emailPreviewUrl = id => `/images/email-templates/previews/${id}.png`;
