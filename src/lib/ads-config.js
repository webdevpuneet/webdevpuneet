/* ─────────────────────────────────────────────────────────────
   Ads toggle — flip ADS_ENABLED to turn all ads on or off
   across the entire site without touching any component.
───────────────────────────────────────────────────────────── */

export const ADS_ENABLED = true;
export const SIDEBAR_AD_ENABLED = true;

// Ads run on every page, My Code included. My Code must keep its full-height editor:
// AdSense *auto* ads once injected a "Discover more" block into the code column and
// rewrote ancestor heights, so on those pages auto-placed ads are hidden (see
// noAutoAdsOnPath + globals.css) and only our own units show. Also exclude
// /ui-snippets/mycode/ from Auto ads in AdSense (Ads → By site → Page exclusions).
export function adsAllowedOnPath() {
  return true;
}
/** Pages whose layout auto-placed ads would break */
export function noAutoAdsOnPath(pathname) {
  return /^\/ui-snippets\/mycode(\/|$)/.test(pathname || '');
}
