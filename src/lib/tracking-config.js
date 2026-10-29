/* ─────────────────────────────────────────────────────────────
   Tracking toggles — flip a flag and redeploy.
   When a flag is false, the layout never renders that tracker, so
   its script tag and code never reach any production page.
───────────────────────────────────────────────────────────── */

// Microsoft Clarity (heatmaps and session recordings). Disabled 2026-10-20.
export const CLARITY_ENABLED = false;

// Statcounter (project 13361076, invisible counter). Enabled 2026-10-20, disabled 2026-10-29.
export const STATCOUNTER_ENABLED = false;

/* Analytics services that are currently on, for policy pages and the cookie
   banner, so the wording always matches what actually runs */
export const ANALYTICS_NAMES = [
  'Google Analytics',
  ...(CLARITY_ENABLED ? ['Microsoft Clarity'] : []),
  ...(STATCOUNTER_ENABLED ? ['Statcounter'] : []),
];
/** "A", "A and B", "A, B and C" */
export const joinNames = list => (list.length > 1 ? `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}` : list[0] || '');
