/* How many things this visitor saved on each day, kept in this browser's localStorage as { 'YYYY-MM-DD': count } (about a
   year of days). Every save through lib/design-store (websites, sections, emails, social posts, AI prompts) and every My Code
   snippet save adds one. The home page workspace draws it as an activity heatmap. Nothing is sent anywhere. */
const KEY = 'wdp-activity-log';
const KEEP_DAYS = 400;

export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function readActivity() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '{}');
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  } catch { return {}; }
}

export function logActivity() {
  try {
    const log = readActivity();
    const today = dayKey();
    log[today] = (log[today] || 0) + 1;
    const oldest = dayKey(new Date(Date.now() - KEEP_DAYS * 86400000));
    for (const k of Object.keys(log)) if (k < oldest) delete log[k];
    localStorage.setItem(KEY, JSON.stringify(log));
  } catch { /* storage blocked: nothing to record */ }
}
