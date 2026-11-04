/* PATREON SETTINGS: the one file to edit when the passcode changes (monthly), when your Patreon page or price changes, or
   when another template becomes Patreon-only. Everything else reads from here (src/lib/premium.js).

   Supporters ($5/month) get two things: no ads anywhere on the site, and Export + Fork on the Patreon-only website templates.

   CHANGING THE PASSCODE, in two steps:
     1. node scripts/set-patreon-passcode.mjs your-new-passcode     (writes the new hash into this file)
     2. deploy, then post the new passcode in the supporter post on Patreon.
   The old passcode stops working for everyone at the moment the new build goes live. The passcode is not case-sensitive.
   Only its hash is kept here, so the passcode itself is not in the site. */

/* Your Patreon join page: every "Get the passcode" button opens it (your page is https://www.patreon.com/c/webdevpuneet) */
export const PATREON_URL = 'https://www.patreon.com/17076973/join';

/* What the supporter tier costs, shown in the dialogs (set the same price on Patreon) */
export const PATREON_PRICE = '$5 a month';

/* The current passcode, as a hash (written by scripts/set-patreon-passcode.mjs; the first one was "meridian-nov26") */
export const PASSCODE_SHA256 = '7821824c1d41f265545f86184234ad7583250a859afb9bd575abbedcbbc3051c';

/* Website templates that are Patreon-only (ids). Their Export and Fork need the passcode. */
export const PREMIUM_TEMPLATE_IDS = ['corporate'];
