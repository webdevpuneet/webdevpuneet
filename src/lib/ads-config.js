/* ─────────────────────────────────────────────────────────────
   Ads toggle — flip ADS_ENABLED to turn all ads on or off
   across the entire site without touching any component.
───────────────────────────────────────────────────────────── */

export const ADS_ENABLED = true;
export const SIDEBAR_AD_ENABLED = true;

// My Code (/ui-snippets/mycode/…) is a personal editor, not publisher content, and it must
// keep its full-height layout. Auto ads there injected a "Discover more" block into the
// code column and rewrote ancestor heights, collapsing the editor. So no AdSense on it.
export function adsAllowedOnPath(pathname) {
  return !/^\/ui-snippets\/mycode(\/|$)/.test(pathname || '');
}
