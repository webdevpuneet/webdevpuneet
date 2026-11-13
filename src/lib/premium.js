/* Patreon supporters: a soft lock, in the browser.

   Supporters enter the passcode (posted on Patreon for the paying tier) once. It is remembered in this browser's
   localStorage, and from then on:
     - no ads anywhere on the site (src/lib/use-ad-free.js, the ad components and globals.css), and
     - Export and Fork work on the Patreon-only website templates.
   Without it those templates can still be previewed and edited by anyone.

   This runs in the browser only, so it keeps honest visitors honest; it does not hide a template's code (the site is
   static, see __directions/ideas/PATREON-LOCK.txt). The settings (passcode hash, Patreon link, price, which templates)
   live in their own file: src/lib/patreon-settings.js. */

import { PATREON_URL, PATREON_PRICE, PASSCODE_SHA256, PREMIUM_TEMPLATE_IDS, PREMIUM_SOCIAL_TEMPLATE_IDS, PREMIUM_EMAIL_TEMPLATE_IDS, LOCK_SECTION_EXPORT, LOCK_BACKUP, LOCK_SOCIAL_VIDEO, LOCK_SOCIAL_BULK, LOCK_SNIPPET_AI, LOCK_TEMPLATE_AI, LOCK_GAME_CODE, isPatreonGame } from './patreon-settings.js';

export { PATREON_URL, PATREON_PRICE, PASSCODE_SHA256, LOCK_SECTION_EXPORT, LOCK_BACKUP, LOCK_SOCIAL_VIDEO, LOCK_SOCIAL_BULK, LOCK_SNIPPET_AI, LOCK_TEMPLATE_AI, LOCK_GAME_CODE };

export const isPremiumTemplate = id => PREMIUM_TEMPLATE_IDS.includes(id);
export const isPremiumSocialTemplate = id => PREMIUM_SOCIAL_TEMPLATE_IDS.includes(id);
export const isPremiumEmailTemplate = id => PREMIUM_EMAIL_TEMPLATE_IDS.includes(id);
/** A snippet whose code, export and fork are for supporters: every snippet in the Games category (LOCK_GAME_CODE) */
export const isPremiumGameSnippet = sn => !!sn && isPatreonGame(sn.id);

const KEY = 'wdp_premium_unlock_v1';
const EVENT = 'wdp-premium-change';
const SALT = 'webdevpuneet-premium:';
const SUPPORTER_KEY = 'wdp_support_prompt_off'; // "I'm already a supporter" (no passcode): holds the time it lasts until, in ms
const SUPPORTER_DAYS = 30;                      // after that the thank-you goes and the support prompt may ask again

/** Remembers in this browser for 30 days that the visitor says they already support the site (no ads change, just the thank-you and no prompts) */
export function markSupporter() {
  try { localStorage.setItem(SUPPORTER_KEY, String(Date.now() + SUPPORTER_DAYS * 24 * 60 * 60 * 1000)); } catch { /* ignore */ }
  try { window.dispatchEvent(new Event(EVENT)); } catch { /* ignore */ }
}
export function isMarkedSupporter() {
  try { return Number(localStorage.getItem(SUPPORTER_KEY) || 0) > Date.now(); } catch { return false; }
}

async function hashOf(code) {
  const data = new TextEncoder().encode(SALT + String(code).trim().toLowerCase());
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

let unlockedNow = false; // right passcode entered in this tab, even when storage is blocked
export function isUnlocked() {
  if (unlockedNow) return true;
  // A passcode stored in an earlier month no longer matches the current hash: it stops working with the new build
  try { return localStorage.getItem(KEY) === PASSCODE_SHA256; } catch { return false; }
}

/** Checks the passcode; remembers it in this browser (localStorage) when it is right. Resolves true / false.
    `notify: false` stores it without telling the open page (nothing re-renders; the caller reloads right after). */
export async function tryUnlock(code, { notify = true } = {}) {
  try {
    if (!code || !String(code).trim() || !crypto?.subtle) return false;
    if ((await hashOf(code)) !== PASSCODE_SHA256) return false;
    unlockedNow = true;
    try { localStorage.setItem(KEY, PASSCODE_SHA256); } catch { /* storage blocked: unlocked for this visit only */ }
    if (notify) window.dispatchEvent(new Event(EVENT));
    return true;
  } catch { return false; }
}

export function lockAgain() {
  unlockedNow = false;
  try { localStorage.removeItem(KEY); localStorage.removeItem(SUPPORTER_KEY); } catch { /* ignore */ }
  window.dispatchEvent(new Event(EVENT));
}

/** Subscribes to unlock changes (this tab and other tabs) */
export function onUnlockChange(fn) {
  const on = e => { if (!e || e.type === EVENT || e.key === KEY || e.key === SUPPORTER_KEY) fn(); };
  window.addEventListener(EVENT, on);
  window.addEventListener('storage', on);
  return () => { window.removeEventListener(EVENT, on); window.removeEventListener('storage', on); };
}
