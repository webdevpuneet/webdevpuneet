/* PATREON SETTINGS: the one file to edit when the passcode changes (monthly), when your Patreon page or price changes, or
   when another template becomes Patreon-only. Everything else reads from here (src/lib/premium.js).

   Supporters ($3/month) get: no ads anywhere on the site, Export + Fork on the Patreon-only templates (website, email, social
   post), the Backup panel (LOCK_BACKUP)
   and Bulk create from CSV (LOCK_SOCIAL_BULK). The code, export and fork of the Games snippets (LOCK_GAME_CODE) are supporters-only too. Social post video export and section template export/backup are free.
   If you change a lock below, update the copy that describes it: about, terms, privacy-policy, the passcode dialog
   (components/PremiumGate) and the sidebar tooltip.

   CHANGING THE PASSCODE, in two steps:
     1. node scripts/set-patreon-passcode.mjs your-new-passcode     (writes the new hash into this file)
     2. deploy, then post the new passcode in the supporter post on Patreon.
   The old passcode stops working for everyone at the moment the new build goes live. The passcode is not case-sensitive.
   Only its hash is kept here, so the passcode itself is not in the site. */

/* Your Patreon join page: every "Get the passcode" button opens it (your page is https://www.patreon.com/c/webdevpuneet) */
export const PATREON_URL = 'https://www.patreon.com/17076973/join';

/* What the supporter tier costs, shown in the dialogs (set the same price on Patreon; there is no free trial since 2026-11-11) */
export const PATREON_PRICE = '$3 a month';

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

/* Website Section Templates: Fork and Export are FREE (decided 2026-11-13). true: in that editor (every section template, and
   the Custom Section builder) Fork and Export need the passcode again. Previewing, editing, Save and Add to page stay free. */
export const LOCK_SECTION_EXPORT = false;

/* true: the Backup / Import-Export panel (download or restore all saved designs as a backup file) in the Website Builder, Email
   Templates and Social Post Templates editors is for supporters only. Website Section Templates are always free, backup included. */
export const LOCK_BACKUP = true;

/* true: in the Social Post Templates editor the animated video (MP4 / WebM) in Export is for supporters, on every
   template. Play (the animated preview), PNG, JPG, PDF, ZIP and HTML stay free. */
export const LOCK_SOCIAL_VIDEO = false;

/* true: the "AI" prompt button in the UI Snippets editor toolbar is for supporters only (others see a locked button that
   opens the passcode dialog). */
/* The AI prompt on UI snippets is FREE since 2026-11-13, EXCEPT games listed in PATREON_GAME_IDS: their AI prompt (page section
   and editor button) stays supporters-only along with their code. true: every snippet's prompt supporters only (then also update the copy). */
export const LOCK_SNIPPET_AI = false;

/* true: the code of every snippet in the Games category (the HTML, CSS and JS panels), its Copy buttons, every Export format
   (HTML, Tailwind, React, Vue, Angular, Test Exports) and Fork are for supporters only. The game itself stays playable for
   everyone, and the Embed link stays free. (A soft lock, in the browser: the preview runs the same code.) */
export const LOCK_GAME_CODE = true;

/* WHICH games are locked: only the snippet ids listed here (when LOCK_GAME_CODE is true). Every other game's code,
   export and fork are free. Since 2026-11-11 EVERY game is Patreon-only (all 66); a new game must be added here too. */
export const PATREON_GAME_IDS = [
  'matter-js-stacking-tower-game',
  'matter-js-hill-climb-car',
  'matter-js-slingshot-tower-knockdown',
  'sky-hopper-game',
  'asteroids-game',
  'lane-runner-game',
  'tank-arena-game',
  'pixel-platformer-game',
  'blackjack-card-game',
  'dots-and-boxes-game',
  'dot-muncher-game',
  'cave-flyer-game',
  'frog-crossing-game',
  'space-blaster-game',
  'dodge-the-blocks-game',
  'breakout-brick-game',
  'maze-runner-game',
  'rhythm-tap-game',
  'pong-game',
  'snake-game',
  'switchyard-train-puzzle-game',
  'memory-match-game',
  'typing-speed-test',
  'reaction-time-tester',
  'simon-sequence-game',
  'whack-a-mole-game',
  'sliding-puzzle-game',
  'tic-tac-toe-game',
  'word-guess-game',
  'rock-paper-scissors-game',
  'hex-color-guess-game',
  'number-guessing-game',
  'connect-four-game',
  'hangman-word-game',
  'minesweeper-game',
  'tile-merge-2048-game',
  'flap-dodge-game',
  'word-unscramble-game',
  'quick-math-game',
  'word-search-puzzle',
  'color-sort-puzzle',
  'battleship-game',
  'click-speed-test',
  'mini-sudoku-game',
  'css-selector-challenge-game',
  'flexbox-align-game',
  'regex-match-game',
  'binary-bit-flip-game',
  'code-output-quiz-game',
  'bug-hunt-game',
  'robot-loop-programmer-game',
  'terminal-command-game',
  'sorting-swap-puzzle-game',
  'logic-gate-puzzle-game',
  'color-match-reflex-game',
  'tower-stack-timing-game',
  'number-sequence-memory-game',
  'precision-aim-trainer-game',
  'word-ladder-game',
  'lights-out-puzzle-game',
  'mastermind-code-breaker-game',
  'tower-of-hanoi-game',
  'sokoban-puzzle-game',
  'checkers-game',
  'nonogram-puzzle-game',
  'matter-js-plinko-board',
];
export const isPatreonGame = id => LOCK_GAME_CODE && PATREON_GAME_IDS.includes(id);

/* true: the same for every template type (website templates, website section templates, email templates, social post
   templates): the "AI" prompt button in the editor toolbar and the "Extend with AI" section on the template's page are for
   supporters only. */
/* The AI prompt on every template (website, section, email, social) is FREE since 2026-11-13. true: supporters only again. */
export const LOCK_TEMPLATE_AI = false;

/* true: "Bulk create from CSV" (one post per spreadsheet row, as a ZIP) in the Social Post Templates editor is for supporters,
   on every template. */
export const LOCK_SOCIAL_BULK = true;
