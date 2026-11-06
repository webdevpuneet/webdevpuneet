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
export const PREMIUM_TEMPLATE_IDS = [
  'corporate', 'saas', 'agency', 'law-firm', 'real-estate', 'hotel', 'dental', 'product-store',
  'online-course', 'coach', 'event',
];

/* Social post templates that are Patreon-only (ids). Their Fork and Export need the passcode. */
export const PREMIUM_SOCIAL_TEMPLATE_IDS = [
  'cyber-monday', 'holiday-sale', 'giveaway', 'advent-calendar', 'five-star-review', 'year-in-review',
];

/* Email templates that are Patreon-only (ids): the revenue-driving campaign emails. Their Fork, Export and AI button need the passcode.
   The everyday and account emails (welcome, password reset, receipts, newsletters ...) stay free, they are what brings visitors in. */
export const PREMIUM_EMAIL_TEMPLATE_IDS = [
  'abandoned-cart',
  'black-friday-sale',
  'last-chance-sale',
  'back-in-stock',
  'refer-a-friend',
  'webinar-invitation',
  're-engagement',
  'trial-ending',
  'review-request',
  'holiday-gift-guide',
];

/* true: in the Website Section Templates editor (every section template, and the Custom Section builder) Fork and Export need
   the passcode too. Previewing, editing, Save and Add to page stay free. */
export const LOCK_SECTION_EXPORT = false;

/* true: the Backup / Import-Export panel (download or restore all saved designs as a backup file) in the Website Builder, Email
   Templates and Social Post Templates editors is for supporters only. Website Section Templates are always free, backup included. */
export const LOCK_BACKUP = true;

/* true: in the Social Post Templates editor the animated video (MP4 / WebM) in Export is for supporters, on every
   template. Play (the animated preview), PNG, JPG, PDF, ZIP and HTML stay free. */
export const LOCK_SOCIAL_VIDEO = true;

/* true: "Bulk create from CSV" (one post per spreadsheet row, as a ZIP) in the Social Post Templates editor is for supporters,
   on every template. */
export const LOCK_SOCIAL_BULK = true;
