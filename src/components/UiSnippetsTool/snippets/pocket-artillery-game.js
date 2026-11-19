const pocketArtilleryGame = {
  id: 'pocket-artillery-game',
  title: 'Pocket Artillery Tank Duel',
  lastmod: '2026-11-19',
  category: 'games',
  previewCss: '.pa-overlay{display:none}', // thumbnail only: show the field with both tanks, not the start card
  html: `<div class="pa-wrap menu" id="pa-wrap">
  <div class="pa-header">
    <h2>Pocket Artillery</h2>
    <div class="pa-scores">
      <span class="pa-you"><span id="pa-name-you">You</span> <strong id="pa-score-you">0</strong></span>
      <span class="pa-shot" id="pa-shot">Shot 1 / 10</span>
      <span class="pa-cpu"><span id="pa-name-cpu">CPU</span> <strong id="pa-score-cpu">0</strong></span>
    </div>
  </div>

  <div class="pa-stage">
    <canvas id="pa-canvas" aria-label="Artillery battlefield with two tanks"></canvas>
    <div class="pa-overlay" id="pa-overlay">
      <p class="pa-title" id="pa-title">Pocket Artillery</p>
      <p class="pa-sub" id="pa-sub">Drag on the field to aim. Pick 6, 10 or 15 shots each, closest blasts score most.</p>
      <div class="pa-opts">
        <div class="pa-seg" id="pa-mode" role="group" aria-label="Mode">
          <button type="button" data-v="cpu" class="on">vs CPU</button>
          <button type="button" data-v="two">2 players</button>
        </div>
        <div class="pa-seg" id="pa-diff" role="group" aria-label="CPU level">
          <button type="button" data-v="0">Easy</button>
          <button type="button" data-v="1" class="on">Normal</button>
          <button type="button" data-v="2">Hard</button>
        </div>
        <div class="pa-seg" id="pa-shots" role="group" aria-label="Shots each">
          <button type="button" data-v="6">6 shots</button>
          <button type="button" data-v="10" class="on">10 shots</button>
          <button type="button" data-v="15">15 shots</button>
        </div>
        <div class="pa-seg" id="pa-terrain" role="group" aria-label="Terrain">
          <button type="button" data-v="-1" class="on">Random</button>
          <button type="button" data-v="0">Meadow</button>
          <button type="button" data-v="1">Desert</button>
          <button type="button" data-v="2">Snow</button>
          <button type="button" data-v="3">Night</button>
        </div>
        <div class="pa-seg" id="pa-wmode" role="group" aria-label="Weapons">
          <button type="button" data-v="random" class="on">Random weapons</button>
          <button type="button" data-v="pick" id="pa-wpick">Choose weapons</button>
        </div>
      </div>
      <div class="pa-btns">
        <button class="pa-btn" id="pa-play" type="button">Play</button>
        <button class="pa-btn pa-btn-alt" id="pa-daily" type="button">Daily map</button>
      </div>
      <button class="pa-btn pa-btn-share" id="pa-share" type="button" hidden>Share result</button>
      <p class="pa-best" id="pa-best"></p>
    </div>
    <div class="pa-pick" id="pa-pick" role="dialog" aria-label="Choose your weapons" hidden>
      <button class="pa-x" id="pa-pick-x" type="button" aria-label="Close weapon picker">&times;</button>
      <p class="pa-pick-title">Choose your weapons <span id="pa-pick-n">0 / 10</span></p>
      <p class="pa-pick-sub">Pick up to one weapon per shot. Both tanks get the same weapons. Anything you leave out is picked at random. A Dirt Ball always comes with a Dirt Remover.</p>
      <div class="pa-pick-grid" id="pa-pick-grid"></div>
      <div class="pa-btns">
        <button class="pa-btn pa-btn-alt" id="pa-pick-clear" type="button">Clear</button>
        <button class="pa-btn" id="pa-pick-done" type="button">Done</button>
      </div>
    </div>
  </div>
  <div class="pa-sharebox" id="pa-sharebox" hidden>
    <span id="pa-sharemsg">Share your result:</span>
    <button type="button" id="pa-copyimg">Copy image</button>
    <a id="pa-dl" download="pocket-artillery-result.png">Download image</a>
    <button type="button" id="pa-more" hidden>More&hellip;</button>
    <a id="pa-sh-wa" target="_blank" rel="noopener">WhatsApp</a>
    <a id="pa-sh-x" target="_blank" rel="noopener">X</a>
    <a id="pa-sh-fb" target="_blank" rel="noopener">Facebook</a>
    <button type="button" class="pa-x pa-x-share" id="pa-share-x" aria-label="Close share options">&times;</button>
  </div>

  <div class="pa-panel" id="pa-panel">
    <label class="pa-ctl"><span>Angle <strong id="pa-angle-val">55</strong>&deg;</span>
      <input id="pa-angle" type="range" min="0" max="180" value="55" aria-label="Angle">
    </label>
    <label class="pa-ctl"><span>Power <strong id="pa-power-val">60</strong></span>
      <input id="pa-power" type="range" min="10" max="100" value="60" aria-label="Power">
    </label>
    <div class="pa-move" role="group" aria-label="Move tank">
      <button type="button" id="pa-left" aria-label="Move left">&#9664;</button>
      <span>Move <strong id="pa-fuel">50</strong></span>
      <button type="button" id="pa-right" aria-label="Move right">&#9654;</button>
    </div>
    <button class="pa-fire" id="pa-fire" type="button">Fire!</button>
  </div>
  <div class="pa-weapons" id="pa-weapons" role="group" aria-label="Weapons"></div>
  <div class="pa-foot">
    <span class="pa-keys">Drag the field or arrows to aim &middot; A / D: move &middot; Space: fire &middot; 1-9, 0: weapon</span>
    <span class="pa-touch">Drag on the field to aim &middot; hold &#9664; &#9654; to move</span>
    <button class="pa-mute" id="pa-mute" type="button" aria-pressed="false">Sound on</button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #eef6fb; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; color: #1e293b; }

.pa-wrap { width: 100%; max-width: max(640px, min(1100px, calc((100vh - 270px) * 1.7778))); display: flex; flex-direction: column; gap: 10px; }
.pa-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.pa-header h2 { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
.pa-scores { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; color: #64748b; }
.pa-scores strong { font-size: 17px; margin-left: 3px; }
.pa-you strong { color: #e8553a; }
.pa-cpu strong { color: #3b63e0; }
.pa-shot { font-size: 11px; background: #fff; border: 1px solid #d5e2ee; border-radius: 99px; padding: 3px 10px; }

.pa-stage { position: relative; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 26px rgba(60, 100, 140, 0.22); border: 2px solid #fff; }
#pa-canvas { display: block; width: 100%; aspect-ratio: 16 / 9; touch-action: none; background: #cfeaff; }

.pa-overlay { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: min(92%, 440px); background: rgba(255, 255, 255, 0.92); border-radius: 14px; box-shadow: 0 6px 22px rgba(60, 100, 140, 0.25); display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center; padding: 10px 14px 12px; max-height: calc(100% - 20px); overflow-x: hidden; overflow-y: auto; }
.pa-overlay.hide { display: none; }
.pa-pick { position: absolute; inset: 8px; background: #fff; border-radius: 14px; box-shadow: 0 6px 22px rgba(60, 100, 140, 0.25); display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 10px 10px 10px; overflow: auto; text-align: center; z-index: 3; }
.pa-pick[hidden] { display: none; }
.pa-pick-title { font-size: 17px; font-weight: 800; }
.pa-pick-title span { font-size: 12px; font-weight: 800; color: #e8553a; margin-left: 6px; }
.pa-pick-sub { font-size: 11px; line-height: 1.35; color: #475569; }
.pa-pick-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; width: 100%; }
.pa-chip { display: flex; align-items: center; justify-content: center; gap: 4px; padding: 5px 3px; font-size: 11px; font-weight: 700; font-family: inherit; color: #334155; background: #fff; border: 2px solid #d5e2ee; border-radius: 8px; cursor: pointer; white-space: nowrap; }
.pa-chip.on { border-color: #e8553a; background: #fff3ef; color: #b83f28; }
.pa-pick .pa-btn { padding: 7px 18px; font-size: 13px; }
.pa-x { position: absolute; top: 6px; right: 6px; width: 34px; height: 34px; border: none; border-radius: 99px; background: #f1f5f9; color: #334155; font-size: 22px; line-height: 1; cursor: pointer; font-family: inherit; }
.pa-x:active { background: #e2e8f0; }
.pa-pick-title { padding: 0 34px; }
.pa-x-share { position: static; width: 30px; height: 30px; padding: 0 !important; font-size: 19px; margin-left: auto; }
.pa-title { font-size: 21px; font-weight: 800; letter-spacing: -0.02em; }
.pa-sub { font-size: 12px; line-height: 1.4; color: #475569; max-width: 360px; }
.pa-btns { display: flex; gap: 8px; }
.pa-btn { padding: 10px 24px; font-size: 14px; font-weight: 800; border: none; border-radius: 10px; background: #e8553a; color: #fff; cursor: pointer; font-family: inherit; box-shadow: 0 3px 0 #b83f28; }
.pa-btn-alt { background: #3b63e0; box-shadow: 0 3px 0 #2a47a8; }
.pa-btn:active { transform: translateY(2px); box-shadow: none; }
.pa-btn-share { background: #16a34a; box-shadow: 0 3px 0 #11793a; }
.pa-btn[hidden], .pa-sharebox[hidden], .pa-sharebox [hidden] { display: none; }
.pa-sharebox { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; background: #fff; border: 1px solid #d5e2ee; border-radius: 12px; padding: 8px 12px; font-size: 12px; font-weight: 700; color: #64748b; }
.pa-sharebox button, .pa-sharebox a { border: 1px solid #d5e2ee; background: #f8fafc; color: #1e293b; border-radius: 99px; padding: 5px 12px; font-size: 12px; font-weight: 700; font-family: inherit; text-decoration: none; cursor: pointer; }
.pa-best { font-size: 12px; font-weight: 700; color: #64748b; min-height: 16px; }
.pa-opts { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.pa-seg { display: inline-flex; flex-wrap: wrap; justify-content: center; background: #fff; border: 1px solid #d5e2ee; border-radius: 99px; padding: 3px; }
.pa-seg button { border: none; background: transparent; padding: 5px 12px; font-size: 12px; font-weight: 700; color: #64748b; border-radius: 99px; cursor: pointer; font-family: inherit; }
.pa-seg button.on { background: #1e293b; color: #fff; }
.pa-seg.dim { opacity: 0.35; pointer-events: none; }
.pa-btn { padding: 8px 20px; font-size: 13px; }
.pa-touch { display: none; }
@media (pointer: coarse) { .pa-keys { display: none; } .pa-touch { display: inline; } }

.pa-panel { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; background: #fff; border: 1px solid #d5e2ee; border-radius: 12px; padding: 10px 12px; }
.pa-ctl { flex: 1 1 140px; display: flex; flex-direction: column; gap: 4px; font-size: 12px; font-weight: 700; color: #64748b; }
.pa-ctl strong { color: #1e293b; font-size: 14px; }
.pa-ctl input { width: 100%; accent-color: #e8553a; }
.pa-fire { padding: 11px 26px; font-size: 14px; font-weight: 800; border: none; border-radius: 10px; background: #e8553a; color: #fff; cursor: pointer; font-family: inherit; box-shadow: 0 3px 0 #b83f28; }
.pa-fire:active { transform: translateY(2px); box-shadow: none; }
.pa-move { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #64748b; }
.pa-move strong { color: #1e293b; display: inline-block; min-width: 22px; text-align: center; }
.pa-move button { width: 38px; height: 38px; border: 2px solid #d5e2ee; background: #fff; border-radius: 10px; font-size: 14px; color: #334155; cursor: pointer; touch-action: none; user-select: none; -webkit-user-select: none; }
.pa-move button:active { background: #fff3ef; border-color: #e8553a; }
.pa-panel.off { opacity: 0.5; pointer-events: none; }

.pa-weapons { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.pa-weapons[data-n="6"] { grid-template-columns: repeat(6, 1fr); }
.pa-weapon { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 6px; font-size: 12px; font-weight: 700; font-family: inherit; color: #334155; background: #fff; border: 2px solid #d5e2ee; border-radius: 9px; cursor: pointer; }
.pa-ico { font-size: 15px; line-height: 1; flex: none; }
.pa-weapon.on { border-color: #e8553a; background: #fff3ef; }
.pa-weapon.shuffling { background: #fff7e6; border-color: #f59e0b; color: #92400e; }
.pa-weapon.used { opacity: 0.35; text-decoration: line-through; cursor: not-allowed; }

.pa-foot { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 11px; color: #64748b; font-weight: 600; }
.pa-mute { background: #fff; color: #64748b; border: 1px solid #d5e2ee; border-radius: 8px; padding: 4px 10px; font-size: 11px; font-weight: 700; cursor: pointer; font-family: inherit; white-space: nowrap; }

/* Phones: the start / results menu and the weapon picker no longer float over the small field (they were cut off).
   They sit in the page flow right under the field, full size, and the unused controls hide while a menu is open. */
@media (max-width: 700px) {
  body { padding: 12px; align-items: flex-start; }
  .pa-overlay, .pa-pick { position: static; transform: none; inset: auto; width: auto; border-radius: 0; box-shadow: none; background: #fff; border-top: 1px solid #e2ecf5; overflow: visible; }
  .pa-overlay { gap: 10px; padding: 14px 12px 16px; }
  .pa-pick { gap: 10px; padding: 14px 10px 16px; position: relative; }
  .pa-title { font-size: 19px; }
  .pa-sub { font-size: 13px; }
  .pa-opts { gap: 8px; }
  .pa-seg { flex-wrap: wrap; justify-content: center; border-radius: 20px; }
  .pa-seg button { padding: 8px 10px; font-size: 13px; }
  .pa-btns { width: 100%; }
  .pa-btns .pa-btn { flex: 1; padding: 12px 10px; font-size: 15px; }
  .pa-btn-share { width: 100%; padding: 12px 10px; font-size: 15px; }
  .pa-pick-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
  .pa-chip { padding: 10px 4px; font-size: 13px; }
  .pa-pick .pa-btn { padding: 12px 10px; font-size: 15px; }
  .pa-wrap.menu .pa-panel, .pa-wrap.menu .pa-weapons, .pa-wrap.menu .pa-foot .pa-touch, .pa-wrap.menu .pa-foot .pa-keys { display: none; }
  .pa-wrap.picking .pa-overlay { display: none; }
  .pa-panel { gap: 10px; }
  .pa-ctl input { height: 28px; }
  .pa-fire { flex: 1 1 auto; padding: 13px 20px; font-size: 16px; }
  .pa-move button { width: 44px; height: 44px; }
  .pa-weapons { grid-template-columns: repeat(5, 1fr); gap: 5px; }
  .pa-weapons[data-n="6"] { grid-template-columns: repeat(3, 1fr); }
  .pa-weapon { flex-direction: column; gap: 3px; padding: 7px 2px; font-size: 10px; line-height: 1.15; text-align: center; border-radius: 10px; }
  .pa-weapon .pa-ico { font-size: 18px; }
  .pa-sharebox { justify-content: center; }
  .pa-sharebox > span { width: 100%; text-align: center; }
  .pa-sharebox button, .pa-sharebox a { padding: 9px 14px; font-size: 13px; }
  .pa-x-share { position: absolute; top: 4px; right: 4px; }
  .pa-sharebox { position: relative; padding: 10px 12px; }
  .pa-mute { padding: 8px 12px; font-size: 12px; }
}`,

  js: `const canvas = document.getElementById('pa-canvas');
const ctx = canvas.getContext('2d');
const W = 640, H = 360;
const dpr = Math.min(window.devicePixelRatio || 1, 2);
/* The field is drawn in 640 x 360 game units; the backing store follows the on-screen size so a big desktop field stays sharp. */
let SCALE = 0;
function fitCanvas() {
  const k = Math.min(3, Math.max(1, (canvas.clientWidth || W) / W) * dpr);
  if (Math.abs(k - SCALE) < 0.05) return;
  SCALE = k;
  canvas.width = Math.round(W * k); canvas.height = Math.round(H * k);
  ctx.setTransform(k, 0, 0, k, 0, 0);
}
fitCanvas();
window.addEventListener('resize', fitCanvas);

const $ = id => document.getElementById(id);
const angleIn = $('pa-angle'), powerIn = $('pa-power');
const overlay = $('pa-overlay'), panel = $('pa-panel');
const GRAVITY = 0.11, WIND_K = 0.0025, POWER_K = 0.085;
/* Shots each = weapons in the hand (each weapon fires once). The player picks 6, 10 or 15; the Daily map is always 10 so scores compare. */
let SHOTS = 10, shotsPick = 10;

/* The pool: 27 weapons. Every match deals a shuffled hand of 10 from it (the daily map deals the same hand to everyone), each usable once.
   r = blast radius, pts = points for a direct hit, g / wd = gravity and wind multipliers, nocpu = the CPU does not pick it. */
const POOL = [
  { id: 'missile', name: 'Missile', r: 22, pts: 100, col: '#e8553a', tip: 'Reliable all-rounder' },
  { id: 'big', name: 'Big Boom', r: 36, pts: 90, col: '#f59e0b', tip: 'Big blast radius' },
  { id: 'triple', name: 'Triple', r: 16, pts: 60, col: '#8b5cf6', tip: 'Three shells in a spread' },
  { id: 'bouncer', name: 'Bouncer', r: 24, pts: 100, col: '#10b981', tip: 'Hops twice before it blows' },
  { id: 'nuke', name: 'Mini Nuke', r: 54, pts: 70, col: '#ef4444', tip: 'Huge crater, fewer points' },
  { id: 'roller', name: 'Roller', r: 20, pts: 110, col: '#0ea5e9', tip: 'Lands, then rolls to the target' },
  { id: 'digger', name: 'Digger', r: 14, pts: 120, col: '#64748b', tip: 'Tunnels straight down' },
  { id: 'napalm', name: 'Napalm', r: 16, pts: 40, col: '#f97316', tip: 'Leaves a burning patch' },
  { id: 'dirt', name: 'Dirt Ball', r: 30, pts: 0, col: '#a16207', tip: 'Buries a tank: it must fire Dirt Remover first or it blows itself up' },
  { id: 'remover', name: 'Dirt Remover', r: 18, pts: 0, col: '#78716c', nocpu: true, tip: 'Clears dirt in the direction you fire. Needed after being buried' },
  { id: 'cluster', name: 'Cluster', r: 22, pts: 0, col: '#d946ef', tip: 'Splits into 5 bomblets at the top of its arc' },
  { id: 'zap', name: 'Zapper', r: 14, pts: 50, col: '#eab308', tip: 'Lightning jumps to a tank within 130 px' },
  { id: 'homing', name: 'Homing', r: 14, pts: 90, col: '#14b8a6', tip: 'Flies the normal arc and locks on if it passes close to the enemy tank' },
  { id: 'sticky', name: 'Sticky', r: 34, pts: 130, col: '#84cc16', tip: 'Sticks to what it hits, blows up after a moment' },
  { id: 'balloon', name: 'Balloon', r: 32, pts: 70, col: '#ec4899', nocpu: true, tip: 'Floats down slowly along the same arc, then a big soft blast' },
  { id: 'meteor', name: 'Meteors', r: 14, pts: 40, col: '#fb7185', tip: 'Calls four meteors from the sky around the impact' },
  { id: 'firework', name: 'Firework', r: 12, pts: 0, col: '#f43f5e', tip: 'Bursts into ten coloured sparks at the top of its arc' },
  { id: 'popcorn', name: 'Popcorn', r: 16, pts: 80, col: '#f59e0b', tip: 'Pops four times along the ground, then a final bang' },
  { id: 'mole', name: 'Mole', r: 22, pts: 110, col: '#a16207', tip: 'Lands, then burrows towards the enemy and digs a trench' },
  { id: 'snowball', name: 'Snowball', r: 14, pts: 60, col: '#38bdf8', tip: 'Rolls along the ground and grows bigger the further it goes' },
  { id: 'blackhole', name: 'Black Hole', r: 44, pts: 70, col: '#7c3aed', tip: 'Swallows a huge hole in the ground' },
  { id: 'boomerang', name: 'Boomerang', r: 22, pts: 100, col: '#f97316', nocpu: true, tip: 'Swings out past the arc and curves back to land where a normal shell would' },
  { id: 'laser', name: 'Laser Strike', r: 12, pts: 0, col: '#06b6d4', tip: 'Calls a beam from orbit: cuts a deep shaft and hits any tank in that column, even behind a hill' },
  { id: 'quake', name: 'Quake', r: 12, pts: 40, col: '#b45309', tip: 'Two shockwaves race along the ground left and right and hit the first tank they reach' },
  { id: 'magnet', name: 'Magnet', r: 14, pts: 50, col: '#e11d48', tip: 'Drags the enemy tank up to 44 px toward where it lands (if it is within 160 px)' },
  { id: 'volcano', name: 'Volcano', r: 16, pts: 40, col: '#dc2626', tip: 'Builds a mound and spits six lava blobs around it' },
  { id: 'teleport', name: 'Teleporter', r: 0, pts: 0, col: '#a855f7', nocpu: true, tip: 'No damage: your tank jumps to where it lands' },
];
const ICONS = { missile: '🚀', big: '💣', triple: '🔱', bouncer: '🏀', nuke: '☢️', roller: '🛞', digger: '⛏️', napalm: '🔥', dirt: '🟤', remover: '🧹', cluster: '🍇', zap: '⚡', homing: '🎯', sticky: '🍭', balloon: '🎈', meteor: '☄️', firework: '🎆', popcorn: '🍿', mole: '🐹', snowball: '⛄', blackhole: '🌀', boomerang: '🌙', laser: '🛰️', quake: '〰️', magnet: '🧲', volcano: '🌋', teleport: '✨' };
const POP = { id: 'pop', name: 'Pop', r: 11, pts: 40, col: '#f59e0b' };
const SPARK = { id: 'spark', name: 'Spark', r: 11, pts: 45, col: '#fde047' };
const BOMBLET = { id: 'bomblet', name: 'Bomblet', r: 12, pts: 55, col: '#d946ef' };
const METEOR = { id: 'piece', name: 'Meteor', r: 15, pts: 50, col: '#f59e0b' };
const LAVA = { id: 'lava', name: 'Lava', r: 10, pts: 30, col: '#f97316' };
const WAVE = { id: 'wave', name: 'Quake', r: 6, pts: 0, col: '#b45309' };
let WEAPONS = POOL.slice(0, 10);
let weaponMode = 'random', picked = []; /* picked = ids chosen on the start menu */
function dealHand(seed) {
  const rr = mulberry32((seed | 0) ^ 0x2545f491), a = POOL.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rr() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  const N = SHOTS;
  let h = a.slice(0, N);
  /* Player's picks: those weapons first, the rest of the 10 filled at random. Both tanks share the hand. The Daily map ignores picks. */
  if (!isDaily && weaponMode === 'pick' && picked.length) {
    const mine = POOL.filter(w => picked.indexOf(w.id) >= 0);
    h = mine.concat(a.filter(w => picked.indexOf(w.id) < 0)).slice(0, N);
  }
  /* A hand with the Dirt Ball always has the Dirt Remover too, so a buried tank can dig itself out. */
  if (h.some(w => w.id === 'dirt') && !h.some(w => w.id === 'remover')) {
    h[h[N - 1].id === 'dirt' ? N - 2 : N - 1] = POOL.find(w => w.id === 'remover');
  }
  return h;
}
let bolts = [];
/* Themes only change colours. The seed picks one, so the daily map always looks the same for everyone that day. */
const THEMES = [
  { name: 'Meadow', sky: ['#bfe6ff', '#fff3dc'], sun: '#ffe9a8', hills: '#d6ecd9', soil: ['#f1d5a2', '#d9a76a'], grass: '#7ccf7a', cloud: 'rgba(255,255,255,0.85)', ink: '#334155' },
  { name: 'Desert', sky: ['#ffd9a0', '#fff1d6'], sun: '#fff6c9', hills: '#f3d9b1', soil: ['#f0c27a', '#d49a4f'], grass: '#e3b862', cloud: 'rgba(255,255,255,0.6)', ink: '#5b3a1a' },
  { name: 'Snow', sky: ['#cfe3f5', '#f4f8fc'], sun: '#ffffff', hills: '#e3edf5', soil: ['#e8eef4', '#b7c6d6'], grass: '#ffffff', cloud: 'rgba(255,255,255,0.95)', ink: '#334155' },
  { name: 'Night', sky: ['#0f172a', '#3b3f73'], sun: '#e2e8f0', hills: '#27305a', soil: ['#4a4e7a', '#2a2c52'], grass: '#4fb3a0', cloud: 'rgba(148,163,184,0.25)', ink: '#e2e8f0', stars: true },
];
let theme = THEMES[0], mapKind = 'Hills', terrain = -1; /* -1 = random from the seed; 0-3 = the player's pick (the Daily map ignores it) */

/* CPU skill: aim error in degrees, and the chance of a bigger slip. */
const LEVELS = [{ err: 6, slip: 0.4 }, { err: 2.4, slip: 0.25 }, { err: 0.7, slip: 0.05 }];

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let rng = mulberry32(1);
let ground = new Float32Array(W + 1);
let tanks = [];
let turn = 0, phase = 'menu', wind = 0, sel = 0, waitFrames = 0, mode = 'cpu', diff = 1, drag = null;
const MOVE = 50;
let moveLeft = MOVE, moveDir = 0, cpuGoal = null;
let lastPath = [[], []], fires = [], isDaily = false, dly = {};
let beams = [], pulls = [];
let blasts = [], flashA = 0, vort = [], shots = [], parts = [], rings = [], floats = [], shake = 0, muted = false, audio = null;
const clouds = [{ x: 90, y: 40, s: 1 }, { x: 330, y: 70, s: 0.8 }, { x: 540, y: 34, s: 1.2 }];
/* Birds cross the sky: none on Easy, 1 on Normal and in 2-player, 2 on Hard. A shell that touches one is wasted: the bird drops and the turn passes on. */
const birds = [];
const birdCount = () => (mode === 'two' ? 1 : diff);
const liveBirds = () => birds.slice(0, birdCount());
function spawnBird(b, fromEdge) {
  const dir = Math.random() < 0.5 ? 1 : -1;
  b.dir = dir; b.speed = 0.45 + Math.random() * 0.6;
  b.x = fromEdge ? (dir > 0 ? -30 : W + 30) : 40 + Math.random() * (W - 80);
  b.base = 55 + Math.random() * 100; b.y = b.base; b.ph = Math.random() * 6; b.fall = 0; b.spin = 0; b.alive = true;
  return b;
}
for (let i = 0; i < 2; i++) birds.push(spawnBird({}, false));
/* A little propeller plane now and then flies past up near the high clouds. It is only scenery. */
const plane = { on: false, x: 0, y: 40, dir: 1, wait: 420, ph: 0 };
function planeStep() {
  if (!plane.on) {
    if (--plane.wait <= 0) { plane.on = true; plane.dir = Math.random() < 0.5 ? 1 : -1; plane.x = plane.dir > 0 ? -60 : W + 60; plane.y = 26 + Math.random() * 30; }
    return;
  }
  if (plane.down) {
    /* Shot down: it tumbles, trailing smoke and fire, and crashes into the ground. */
    plane.vy += 0.06; plane.x += plane.vx; plane.y += plane.vy; plane.rot += 0.07 * plane.dir; plane.ph += 0.9;
    if (Math.random() < 0.7) parts.push({ x: plane.x - plane.dir * 12, y: plane.y, vx: (Math.random() - 0.5) * 0.6, vy: -0.3 - Math.random() * 0.5, life: 26, col: Math.random() < 0.5 ? '#475569' : '#fb923c' });
    const gx = Math.round(plane.x);
    if (gx < 0 || gx > W) { if (plane.y > H || gx < -70 || gx > W + 70) { plane.on = false; plane.down = false; plane.wait = 1200 + Math.random() * 1200; } return; }
    /* it crashes on the ground, or straight into a tank it falls onto */
    if (plane.y >= ground[gx] - 4 || tanks.some(tk => Math.abs(tk.x - plane.x) < 26 && plane.y > tk.y - 22)) planeCrash();
    return;
  }
  plane.x += plane.dir * 1.25; plane.ph += 0.9;
  if (plane.x < -70 || plane.x > W + 70) { plane.on = false; plane.wait = 600 + Math.random() * 900; }
}
const CRASH = { id: 'planecrash', name: 'Plane', r: 30, pts: 0, col: '#f97316' };
function planeHit(s) {
  const p = plane;
  if (!p.on || p.down || Math.hypot(s.x - p.x, s.y - p.y) > 17) return false;
  /* a shot-down plane nose-dives close to where it was hit (about 25 px of drift), so it lands on what is below it */
  p.down = true; p.owner = s.owner; p.vx = p.dir * 0.35; p.vy = 0; p.rot = 0;
  s.dead = true;
  blast(POP, p.x, p.y);
  for (let i = 0; i < 18; i++) { const a = Math.random() * 6.283, v = 1 + Math.random() * 2.4; parts.push({ x: p.x, y: p.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 30 + Math.random() * 20, col: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#fb923c' : '#e2e8f0' }); }
  floats.push({ x: p.x, y: p.y - 16, t: 60, txt: 'Plane hit!', col: '#ef4444' });
  tone(700, 120, 0.3, 'sawtooth', 0.08);
  return true;
}
function planeCrash() {
  const p = plane, gx = Math.max(0, Math.min(W, Math.round(p.x))), gy = ground[gx];
  crater(p.x, gy, CRASH.r);
  blast(CRASH, p.x, gy - 4); blast({ id: 'big', r: 34, col: '#f97316' }, p.x, gy - 4);
  rings.push({ x: p.x, y: gy, r: 4, max: 46, col: '#f97316' });
  for (let i = 0; i < 30; i++) { const a = Math.random() * 6.283, v = 1 + Math.random() * 3.4; parts.push({ x: p.x, y: gy - 6, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.5, life: 34 + Math.random() * 20, col: i % 3 === 0 ? '#475569' : i % 3 === 1 ? '#fb923c' : '#c99a62' }); }
  shake = Math.max(shake, 10); sfxBoom(true);
  tanks.forEach((tk, i) => {
    /* own tank: -100 (you shot it down onto yourself); enemy tank: +100 to whoever shot it */
    if (Math.hypot(p.x - tk.x, gy - (tk.y - 8)) < 36) {
      if (i !== p.owner) { tanks[p.owner].score += 100; floats.push({ x: tk.x, y: tk.y - 30, t: 80, txt: '+100 Plane crash!', col: tanks[p.owner].col }); }
      else { tk.score -= 100; floats.push({ x: tk.x, y: tk.y - 30, t: 80, txt: '-100 Plane crash!', col: '#dc2626' }); }
    }
  });
  p.on = false; p.down = false; p.wait = 1200 + Math.random() * 1200;
  syncUi();
}
function drawPlane() {
  if (!plane.on) return;
  const p = plane;
  ctx.save(); ctx.translate(p.x, p.down ? p.y : p.y + Math.sin(p.ph * 0.05) * 2); if (p.down) ctx.rotate(p.rot); ctx.scale(p.dir, 1);
  const tr = ctx.createLinearGradient(-16, 0, -70, 0);
  tr.addColorStop(0, 'rgba(255,255,255,0.35)'); tr.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.strokeStyle = tr; ctx.lineWidth = 1; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-16, 1); ctx.lineTo(-70, 1); ctx.stroke();
  ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.ellipse(0, 0, 15, 4.5, 0, 0, 6.3); ctx.fill();
  ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(-12, -1); ctx.lineTo(-19, -9); ctx.lineTo(-15, -9); ctx.lineTo(-8, -1); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#94a3b8'; ctx.beginPath(); ctx.moveTo(-2, 1); ctx.lineTo(-7, 8); ctx.lineTo(3, 8); ctx.lineTo(5, 1); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#7dd3fc'; ctx.beginPath(); ctx.ellipse(5, -2, 4, 2.4, 0, 0, 6.3); ctx.fill();
  ctx.fillStyle = '#ef4444'; ctx.fillRect(-9, -1, 14, 1.6);
  ctx.fillStyle = '#475569'; ctx.save(); ctx.translate(15, 0); ctx.scale(0.5, Math.abs(Math.sin(p.ph)) * 9 + 1); ctx.beginPath(); ctx.arc(0, 0, 1, 0, 7); ctx.fill(); ctx.restore();
  ctx.restore();
}
/* A wild animal that matches the terrain (deer on Meadow, camel on Desert, polar bear on Snow, deer or bear at Night) walks in at one edge of
   the field, stops to watch the battle, then wanders off. It follows the ground height and slope. Scenery only. */
const critter = { on: false, wait: 420, side: 1, kind: 'deer', x: 0, st: 'in', t: 0, ph: 0 };
function critterStep() {
  if (!tanks.length || phase === 'menu') return;
  const c = critter;
  if (!c.on) {
    if (--c.wait > 0) return;
    c.on = true; c.st = 'in'; c.t = 0; c.side = Math.random() < 0.5 ? 1 : -1;
    const n = theme.name;
    c.kind = n === 'Desert' ? 'camel' : n === 'Snow' ? 'bear' : n === 'Night' ? (Math.random() < 0.5 ? 'deer' : 'bear') : 'deer';
    c.x = c.side > 0 ? -34 : W + 34;
    return;
  }
  const inward = c.side, goal = c.side > 0 ? 22 : W - 22;
  c.ph += 0.16;
  if (c.st === 'in') {
    c.x += inward * 0.35;
    if ((c.side > 0 && c.x >= goal) || (c.side < 0 && c.x <= goal)) { c.st = 'look'; c.t = 0; c.hold = 260 + Math.random() * 200; }
  } else if (c.st === 'look') {
    if (++c.t > c.hold) c.st = 'out';
  } else if (c.st === 'dead') {
    if (++c.t > 120) { c.on = false; c.wait = 800 + Math.random() * 900; }
  } else {
    c.x -= inward * 0.5;
    if (c.x < -40 || c.x > W + 40) { c.on = false; c.wait = 900 + Math.random() * 1200; }
  }
}
/* Blasts and shells can kill the animal: it flips over, fades away, and returns later in the war. */
function critterHit(x, y, rad) {
  const c = critter;
  if (!c.on || c.st === 'dead') return false;
  const gx = Math.max(0, Math.min(W, Math.round(c.x))), gy = ground[gx];
  if (Math.hypot(x - c.x, y - (gy - 10)) >= rad + 12) return false;
  c.st = 'dead'; c.t = 0; c.dy = gy;
  for (let i = 0; i < 20; i++) { const a = Math.random() * 6.283, v = 1 + Math.random() * 2.4; parts.push({ x: c.x, y: gy - 10, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.5, life: 30 + Math.random() * 20, col: i % 3 === 0 ? '#ffffff' : i % 3 === 1 ? '#c99a62' : '#94a3b8' }); }
  floats.push({ x: c.x, y: gy - 34, t: 60, txt: 'Oh no!', col: '#64748b' });
  tone(520, 140, 0.25, 'square', 0.06);
  return true;
}
function drawCritter() {
  const c = critter;
  if (!c.on) return;
  const dead = c.st === 'dead', gx = Math.max(0, Math.min(W, Math.round(c.x))), gy = dead ? c.dy : ground[gx];
  const sx0 = Math.max(0, gx - 6), sx1 = Math.min(W, gx + 6), slope = Math.max(-0.6, Math.min(0.6, Math.atan2(ground[sx1] - ground[sx0], Math.max(1, sx1 - sx0))));
  const walking = c.st !== 'look' && !dead, face = c.st === 'out' ? -c.side : c.side;
  const look = c.st === 'look' ? Math.min(1, c.t / 30) : 0, k = c.kind, snow = theme.name === 'Snow';
  const leg = (x, y0, y1, ph, w, col) => { const sw = walking ? Math.sin(c.ph + ph) * 3 : 0; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x + sw, y1); ctx.stroke(); };
  ctx.save(); ctx.translate(c.x, gy + 2); ctx.rotate(slope); ctx.scale(face * 1.05, 1.05);
  if (dead) { const u = Math.min(1, c.t / 40); ctx.translate(0, -Math.sin(u * Math.PI) * 22 - 10); ctx.rotate(u * 3.6); ctx.translate(0, 10); ctx.globalAlpha = c.t > 70 ? Math.max(0, 1 - (c.t - 70) / 40) : 1; }
  if (k === 'deer') {
    const body = '#a16a3a', dark = '#7c4f26', head = Math.sin(c.ph * 0.5) * (walking ? 1 : 0.4);
    leg(-7, -12, 0, 0, 2, dark); leg(-4, -12, 0, 3.1, 2, dark); leg(5, -12, 0, 3.1, 2, dark); leg(8, -12, 0, 0, 2, dark);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-10.5, -16, 2.2, 0, 7); ctx.fill();
    ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(0, -15, 10.5, 5, 0, 0, 6.3); ctx.fill();
    ctx.fillStyle = '#e7c9a0'; ctx.beginPath(); ctx.ellipse(1, -12.5, 8, 2.2, 0, 0, 6.3); ctx.fill();
    ctx.save(); ctx.translate(8, -17); ctx.rotate(-look * 0.25 + head * 0.05);
    ctx.strokeStyle = body; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(5, -9); ctx.stroke();
    ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(7, -10.5, 4.2, 2.6, -0.3, 0, 6.3); ctx.fill();
    ctx.fillStyle = dark; ctx.beginPath(); ctx.ellipse(3.8, -13, 1.2, 2.4, -0.5, 0, 6.3); ctx.fill();
    ctx.strokeStyle = '#6b4423'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(5, -12); ctx.lineTo(3, -18); ctx.moveTo(4, -16); ctx.lineTo(7, -18); ctx.moveTo(5.6, -12.2); ctx.lineTo(8, -17); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(8, -11.2, 1, 0, 7); ctx.fill(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(8.3, -11.2, 0.5, 0, 7); ctx.fill();
    ctx.restore();
  } else if (k === 'camel') {
    const body = '#c99a4a', dark = '#a77a30';
    leg(-8, -13, 0, 0, 2.4, dark); leg(-5, -13, 0, 3.1, 2.4, dark); leg(6, -13, 0, 3.1, 2.4, dark); leg(9, -13, 0, 0, 2.4, dark);
    ctx.strokeStyle = dark; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-11, -16); ctx.lineTo(-13, -9); ctx.stroke();
    ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(0, -16, 11.5, 5.5, 0, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.arc(-3.5, -21, 4.6, Math.PI, 0); ctx.arc(4, -20.5, 4, Math.PI, 0); ctx.fill();
    ctx.save(); ctx.translate(10, -18); ctx.rotate(-look * 0.2);
    ctx.strokeStyle = body; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(7, -3, 5, -11); ctx.stroke();
    ctx.fillStyle = body; ctx.beginPath(); ctx.ellipse(8, -12.5, 4.6, 2.6, 0.1, 0, 6.3); ctx.fill();
    ctx.fillStyle = dark; ctx.beginPath(); ctx.arc(4.5, -14, 1.3, 0, 7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(8.6, -13.4, 1, 0, 7); ctx.fill(); ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(8.9, -13.4, 0.5, 0, 7); ctx.fill();
    ctx.restore();
  } else {
    /* Bear: simple side view. Long low body, head held out front in line with the body, small ears on top, short snout, four stubby legs. */
    const body = snow ? '#f8fafc' : '#7a5233', line = snow ? '#9db2c9' : '#4a2f1a', snout = snow ? '#e3ebf4' : '#c9a37a';
    ctx.scale(1.6, 1.6);
    const sw = walking ? Math.sin(c.ph) * 2 : 0;
    ctx.lineCap = 'round';
    [[-7, 3.1], [-3, 0], [5, 0], [9, 3.1]].forEach(l => {
      const x = l[0] + (l[1] ? -sw : sw);
      ctx.strokeStyle = line; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(l[0], -6); ctx.lineTo(x, 1.5); ctx.stroke();
      ctx.strokeStyle = body; ctx.lineWidth = 4.6; ctx.beginPath(); ctx.moveTo(l[0], -6); ctx.lineTo(x, 1.5); ctx.stroke();
    });
    ctx.fillStyle = body; ctx.strokeStyle = line; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.ellipse(0, -10, 12, 7.5, -0.06, 0, 6.3); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-12, -11, 2.3, 0, 7); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(11.5, -11.5, 5.2, 0, 7); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(8.6, -16, 2, 0, 7); ctx.arc(13.2, -16.6, 2, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = snout; ctx.beginPath(); ctx.ellipse(15.6, -9.6, 3.2, 2.4, 0.1, 0, 6.3); ctx.fill(); ctx.stroke();
    dot(18.2, -10.4, 1.3, '#111827'); dot(12.2, -12.8, 1.1, '#111827');
  }
  ctx.restore();
}
function birdsStep() {
  planeStep();
  critterStep();
  liveBirds().forEach(b => {
    if (b.alive) {
      b.x += b.dir * b.speed; b.ph += 0.2; b.y = b.base + Math.sin(b.ph * 0.35) * 6;
      if (b.x < -40 || b.x > W + 40) spawnBird(b, true);
    } else {
      b.fall += 0.12; b.y += b.fall; b.x += b.dir * 0.3; b.spin += 0.25;
      if (b.y > H + 20) { spawnBird(b, true); b.x = b.dir > 0 ? -30 : W + 30; }
    }
  });
}
function birdHit(s) {
  const lb = liveBirds();
  for (let i = 0; i < lb.length; i++) {
    const b = lb[i];
    if (b.alive && Math.hypot(s.x - b.x, s.y - b.y) < 12) {
      b.alive = false; b.fall = -1.2; s.dead = true;
      for (let k = 0; k < 14; k++) parts.push({ x: b.x, y: b.y, vx: (Math.random() - 0.5) * 3, vy: -Math.random() * 2, life: 30 + Math.random() * 20, col: k % 2 ? '#ffffff' : '#94a3b8' });
      floats.push({ x: b.x, y: b.y - 10, t: 50, txt: 'Bird!', col: '#64748b' });
      rings.push({ x: b.x, y: b.y, r: 4, max: 22, col: '#94a3b8' });
      tone(760, 220, 0.18, 'square', 0.07);
      return true;
    }
  }
  return false;
}
let best = 0;
try { best = Number(localStorage.getItem('pa-best')) || 0; } catch (e) {}
try { dly = JSON.parse(localStorage.getItem('pa-daily')) || {}; } catch (e) { dly = {}; }
const dayKey = d => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
const todayKey = () => dayKey(new Date());
const prevKey = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d); };
/* Daily streak: finishing the daily map on consecutive days; a missed day resets it to 1. */
function recordDaily(score) {
  const k = todayKey();
  if (dly.last !== k) { dly.streak = dly.last === prevKey() ? (dly.streak || 0) + 1 : 1; dly.last = k; dly.today = 0; }
  dly.today = Math.max(dly.today || 0, score);
  try { localStorage.setItem('pa-daily', JSON.stringify(dly)); } catch (e) {}
}

/* ---------- sound (Web Audio, no files) ---------- */
function ensureAudio() {
  if (audio || muted) return;
  try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audio = null; }
}
function tone(f1, f2, dur, type, vol) {
  if (!audio || muted) return;
  const o = audio.createOscillator(), g = audio.createGain();
  o.type = type; o.frequency.setValueAtTime(f1, audio.currentTime);
  o.frequency.exponentialRampToValueAtTime(f2, audio.currentTime + dur);
  g.gain.setValueAtTime(vol, audio.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + dur);
  o.connect(g); g.connect(audio.destination);
  o.start(); o.stop(audio.currentTime + dur);
}
const sfxFire = () => tone(520, 140, 0.22, 'triangle', 0.14);
const sfxBoom = big => tone(big ? 110 : 160, 30, big ? 0.55 : 0.35, 'sawtooth', 0.2);

/* ---------- map ---------- */
function buildMap(seed) {
  rng = mulberry32(seed);
  const hh = Math.imul(seed | 0, 2654435761) >>> 0;
  theme = THEMES[!isDaily && terrain >= 0 ? terrain : (hh >>> 8) % 4];
  const valley = (hh >>> 4) % 4 === 0;
  mapKind = valley ? 'Valley' : 'Hills';
  const p1 = rng() * 6, p2 = rng() * 6, p3 = rng() * 6;
  const a1 = 38 + rng() * 22, a2 = 16 + rng() * 14;
  for (let x = 0; x <= W; x++) {
    const v = H * 0.64 + Math.sin(x / 95 + p1) * a1 + Math.sin(x / 41 + p2) * a2 + Math.sin(x / 17 + p3) * 4;
    /* Valley: high ridges at both ends and a deep dip in the middle that every shot has to cross. */
    const d = Math.abs(x - W / 2) / (W / 2);
    const vv = 255 - 125 * Math.pow(d, 1.5) + Math.sin(x / 41 + p2) * 6 + Math.sin(x / 17 + p3) * 3;
    ground[x] = Math.max(120, Math.min(H - 50, valley ? vv : v));
  }
  const px = 46 + rng() * 80, cx = W - 46 - rng() * 80;
  tanks = [
    { x: px, y: ground[Math.round(px)], dy: 0, a: 55, p: 60, col: '#e8553a', dark: '#b83f28', score: 0, used: [], name: 'You' },
    { x: cx, y: ground[Math.round(cx)], dy: 0, a: 125, p: 60, col: '#3b63e0', dark: '#2a47a8', score: 0, used: [], name: 'CPU' },
  ];
  tanks.forEach(t => { t.dy = t.y; });
}

function crater(cx, cy, r) {
  for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(W, Math.ceil(cx + r)); x++) {
    const dx = x - cx, dy = Math.sqrt(Math.max(0, r * r - dx * dx));
    if (ground[x] <= cy + dy && ground[x] >= cy - dy) ground[x] = Math.min(H - 6, cy + dy);
  }
}
function addDirt(cx, cy, r) {
  for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(W, Math.ceil(cx + r)); x++) {
    const dx = x - cx, dy = Math.sqrt(Math.max(0, r * r - dx * dx));
    const t = cy - dy * 0.85;
    if (ground[x] > t) ground[x] = Math.max(60, t);
  }
}

/* ---------- turns ---------- */
const who = () => turn % 2;
const cur = () => tanks[who()];

function startTurn() {
  moveLeft = MOVE; moveDir = 0; cpuGoal = null;
  wind = Math.round(rng() * 10 - 5);
  if (!(mode === 'cpu' && diff === 2)) wind = 0; /* Wind only on Hard; Easy, Normal and 2-player are calm (the number is still drawn so the map sequence stays the same) */
  if (who() === 0 || mode === 'two') {
    phase = 'aim';
    if (cur().used[sel]) sel = WEAPONS.findIndex((w, i) => !cur().used[i]);
    if (cur().buried) { const ri = WEAPONS.findIndex((w, i) => w.id === 'remover' && !cur().used[i]); if (ri >= 0) sel = ri; }
    syncUi();
  } else {
    phase = 'cpu';
    syncUi();
    setTimeout(cpuTurn, 900);
  }
}

function nextTurn() {
  turn++;
  if (turn >= SHOTS * 2) return endGame();
  startTurn();
}

function fire(wi) {
  moveDir = 0;
  const t = tanks[who()], w = WEAPONS[wi];
  t.used[wi] = true;
  lastPath[who()] = [];
  if (t.buried && w.id !== 'remover') {
    /* Buried under dirt: the shell has nowhere to go and goes off on its own tank. */
    crater(t.x, t.y - 8, Math.max(w.r, 28));
    t.buried = false;
    t.score -= 40;
    rings.push({ x: t.x, y: t.y - 8, r: 4, max: 44, col: '#dc2626' });
    for (let i = 0; i < 22; i++) { const a = Math.random() * 6.28, v = 1 + Math.random() * 3; parts.push({ x: t.x, y: t.y - 8, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, life: 30 + Math.random() * 20, col: i % 2 ? '#c99a62' : '#ef4444' }); }
    floats.push({ x: t.x, y: t.y - 34, t: 70, txt: '-40 Self blast!', col: '#dc2626' });
    shake = Math.max(shake, 8); ensureAudio(); sfxBoom(true);
    phase = 'fly'; syncUi();
    return;
  }
  if (w.id === 'remover') {
    /* Dirt Remover: digs a short trench along the barrel direction, which also clears the dirt on top of the tank. */
    const ra = t.a * Math.PI / 180;
    for (let k = 0; k < 6; k++) crater(t.x + Math.cos(ra) * k * 12, t.y - 8 - Math.sin(ra) * k * 12, 17);
    if (t.buried) floats.push({ x: t.x, y: t.y - 34, t: 60, txt: 'Dug out!', col: '#16a34a' });
    t.buried = false;
    for (let k = 0; k < 18; k++) parts.push({ x: t.x + Math.cos(ra) * k * 3, y: t.y - 10 - Math.sin(ra) * k * 3, vx: Math.cos(ra) * 2 + (Math.random() - 0.5) * 2, vy: -Math.sin(ra) * 2 - Math.random() * 2, life: 28, col: '#c99a62' });
    ensureAudio(); tone(200, 80, 0.3, 'sawtooth', 0.1);
    phase = 'fly'; syncUi();
    return;
  }
  const offs = w.id === 'triple' ? [-7, 0, 7] : [0];
  offs.forEach(o => {
    const rad = (t.a + o) * Math.PI / 180, sp = t.p * POWER_K;
    const sh = { x: t.x + Math.cos(rad) * 18, y: t.y - 12 - Math.sin(rad) * 18, vx: Math.cos(rad) * sp, vy: -Math.sin(rad) * sp, w: w, owner: who(), age: 0, bounces: 0, dead: false, trail: [], rec: o === 0, dir: Math.cos(rad) >= 0 ? 1 : -1 };
    if (w.id === 'boomerang') sh.T = flightFrames(sh.x, sh.y, sh.vx, sh.vy);
    shots.push(sh);
  });
  phase = 'fly';
  ensureAudio();
  sfxFire();
  syncUi();
}

/* One physics step of the standard shell flight (60 Hz): wind pushes sideways, gravity pulls down. Every shell uses it. */
function ballistic(o) { o.vx += wind * WIND_K; o.vy += GRAVITY; o.x += o.vx; o.y += o.vy; }
/* How many steps the standard arc takes to reach the ground (used to time the Boomerang's swing). */
function flightFrames(x, y, vx, vy) {
  const o = { x: x, y: y, vx: vx, vy: vy };
  for (let n = 1; n < 1500; n++) {
    ballistic(o);
    if (o.x < 0 || o.x > W || o.y > H) return n;
    if (o.y >= ground[Math.round(o.x)]) return n;
  }
  return 1500;
}

/* Laser Strike: a beam from orbit at the landing x. Hits the enemy anywhere in that column, even behind a hill.
   (The firing tank's own side is covered by the normal friendly-fire check in explode.) */
function laserStrike(s) {
  beams.push({ x: s.x, t: 34 });
  const en = tanks[1 - s.owner], dx = Math.abs(en.x - s.x);
  if (dx < 24) {
    const pts = Math.max(10, Math.round(120 * (1 - dx / 24)));
    tanks[s.owner].score += pts;
    floats.push({ x: en.x, y: en.y - 30, t: 70, txt: '+' + pts + ' Laser!', col: tanks[s.owner].col });
  }
  flashA = Math.max(flashA, 0.45); tone(1800, 180, 0.5, 'sawtooth', 0.07);
}
/* Quake: each shockwave runs 3 px a frame along the surface, cracking it, and stops at the first tank it reaches. */
function waveStep(s) {
  s.n++; s.x += s.dir * 3;
  if (s.x < 2 || s.x > W - 2 || s.n > 48) { s.dead = true; return; }
  s.y = ground[Math.round(s.x)];
  if (s.n % 4 === 0) {
    crater(s.x, s.y + 3, 5);
    for (let k = 0; k < 3; k++) parts.push({ x: s.x, y: s.y, vx: (Math.random() - 0.5) * 1.6, vy: -1 - Math.random() * 1.8, life: 18, col: k % 2 ? '#c99a62' : '#78350f' });
  }
  shake = Math.max(shake, 2.5);
  for (let i = 0; i < 2; i++) {
    const tk = tanks[i];
    if (s.n > 2 && Math.abs(tk.x - s.x) < 10) {
      if (i !== s.owner) { tanks[s.owner].score += 50; floats.push({ x: tk.x, y: tk.y - 30, t: 70, txt: '+50 Quake!', col: tanks[s.owner].col }); }
      else { tk.score -= 50; floats.push({ x: tk.x, y: tk.y - 30, t: 70, txt: '-50 Friendly fire!', col: '#dc2626' }); }
      rings.push({ x: tk.x, y: tk.y - 6, r: 4, max: 26, col: '#b45309' });
      s.dead = true; syncUi(); return;
    }
  }
}
/* Teleporter: the firing tank jumps to the landing spot, if a tank can stand there. */
function teleport(s) {
  const t = tanks[s.owner], o = tanks[1 - s.owner], x = Math.round(s.x);
  rings.push({ x: s.x, y: s.y, r: 4, max: 30, col: '#a855f7' });
  if (x < 18 || x > W - 18 || Math.abs(x - o.x) < 36 || inHole(x)) {
    floats.push({ x: s.x, y: s.y - 16, t: 60, txt: 'No room to land', col: '#7c3aed' });
    tone(300, 150, 0.25, 'sine', 0.06); syncUi(); return;
  }
  const sparkle = () => { for (let k = 0; k < 18; k++) { const a = Math.random() * 6.283, v = 0.6 + Math.random() * 1.8; parts.push({ x: t.x, y: t.y - 8, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 0.6, life: 30, col: k % 2 ? '#c084fc' : '#f5d0fe' }); } };
  sparkle(); rings.push({ x: t.x, y: t.y - 8, r: 4, max: 26, col: '#a855f7' });
  t.x = x; t.y = ground[x]; t.dy = t.y; t.buried = false;
  sparkle();
  floats.push({ x: t.x, y: t.y - 34, t: 60, txt: 'Teleported!', col: '#7c3aed' });
  tone(400, 1600, 0.3, 'sine', 0.08); syncUi();
}

function explode(s) {
  s.dead = true;
  if (s.w.id === 'teleport') { teleport(s); return; }
  critterHit(s.x, s.y, s.w.r);
  if (s.snow) s.w = Object.assign({}, s.w, { r: Math.round(s.size * 1.35), pts: 50 + Math.round(s.size * 2.5) });
  const w = s.w, enemy = tanks[1 - s.owner];
  if (w.pts) {
    const d = Math.hypot(s.x - enemy.x, s.y - (enemy.y - 8)), reach = w.r + 13;
    if (d < reach) {
      const pts = Math.max(5, Math.round(w.pts * (1 - d / reach)));
      tanks[s.owner].score += pts;
      floats.push({ x: enemy.x, y: enemy.y - 24, t: 60, txt: '+' + pts, col: tanks[s.owner].col });
    }
  }
  /* Friendly fire: ANY weapon whose blast reaches the firing tank's own side costs points (weapons worth 0 count as 50), and the score can go below zero. */
  const own = tanks[s.owner], od = Math.hypot(s.x - own.x, s.y - (own.y - 8)), oreach = w.r + 13;
  if (od < oreach) {
    const loss = Math.max(5, Math.round((w.pts || 50) * (1 - od / oreach)));
    own.score -= loss;
    floats.push({ x: own.x, y: own.y - 30, t: 70, txt: '-' + loss + ' Friendly fire!', col: '#dc2626' });
  }
  if (w.id === 'zap') {
    const zd = Math.hypot(s.x - enemy.x, s.y - (enemy.y - 8));
    if (zd < 130) {
      tanks[s.owner].score += 25;
      bolts.push({ x1: s.x, y1: s.y, x2: enemy.x, y2: enemy.y - 8, t: 18 });
      floats.push({ x: enemy.x, y: enemy.y - 34, t: 50, txt: '+25 zap', col: '#ca8a04' });
      tone(1200, 90, 0.25, 'sawtooth', 0.08);
    }
  }
  if (w.id === 'meteor') {
    for (let i = 0; i < 4; i++) shots.push({ x: s.x + (i - 1.5) * 34, y: -10 - i * 45, vx: 0, vy: 1.5, w: METEOR, owner: s.owner, age: 7, bounces: 0, dead: false, trail: [] });
  }
  if (w.id === 'napalm') fires.push({ x: s.x, t: 150, owner: s.owner });
  if (w.id === 'laser') laserStrike(s);
  if (w.id === 'quake') {
    [-1, 1].forEach(d => shots.push({ wave: true, dir: d, x: s.x, y: s.y, w: WAVE, owner: s.owner, age: 0, n: 0, bounces: 0, dead: false, trail: [] }));
    shake = Math.max(shake, 12); tone(90, 35, 0.7, 'sawtooth', 0.12);
  }
  if (w.id === 'magnet' && Math.abs(enemy.x - s.x) < 160 && Math.abs(enemy.x - s.x) > 4) {
    pulls.push({ i: 1 - s.owner, x: s.x, left: 44 });
    floats.push({ x: enemy.x, y: enemy.y - 40, t: 60, txt: 'Pulled!', col: '#e11d48' });
    tone(220, 520, 0.4, 'square', 0.05);
  }
  if (w.id === 'volcano') {
    for (let k = 0; k < 6; k++) shots.push({ x: s.x, y: s.y - 14, vx: (k - 2.5) * 0.75 + (Math.random() - 0.5) * 0.4, vy: -3.3 - Math.random() * 1.6, w: LAVA, owner: s.owner, age: 7, bounces: 0, dead: false, trail: [], delay: 10 + k * 8 });
  }
  if (w.id === 'dirt') {
    tanks.forEach(tk => {
      if (Math.hypot(s.x - tk.x, s.y - (tk.y - 8)) < w.r + 8) {
        tk.buried = true;
        floats.push({ x: tk.x, y: tk.y - 34, t: 70, txt: 'Buried!', col: '#a16207' });
      }
    });
    addDirt(s.x, s.y, w.r);
  }
  else if (w.id === 'digger') { for (let i = 0; i < 5; i++) crater(s.x, s.y + i * 11, w.r); }
  else if (w.id === 'laser') { for (let i = 0; i < 9; i++) crater(s.x, s.y + i * 10, 8); }
  else if (w.id === 'volcano') { crater(s.x, s.y, 8); addDirt(s.x, s.y + 2, 24); }
  else crater(s.x, s.y, w.r);
  if (w.id !== 'dirt') {
    tanks.forEach(tk => {
      if (tk.buried && Math.hypot(s.x - tk.x, s.y - (tk.y - 8)) < w.r + 14) {
        tk.buried = false;
        floats.push({ x: tk.x, y: tk.y - 34, t: 60, txt: 'Freed!', col: '#16a34a' });
      }
    });
  }
  rings.push({ x: s.x, y: s.y, r: 4, max: w.r * 1.5, col: s.col || w.col });
  blast(w, s.x, s.y);
  if (w.id === 'blackhole') {
    vort.push({ x: s.x, y: s.y, t: 45 });
    for (let i = 0; i < 36; i++) { const a = Math.random() * 6.283, r0 = 50 + Math.random() * 30; parts.push({ x: s.x + Math.cos(a) * r0, y: s.y + Math.sin(a) * r0, vx: -Math.cos(a) * 2.6, vy: -Math.sin(a) * 2.6, life: 26, col: i % 3 ? '#a78bfa' : '#1e1b4b' }); }
    tone(600, 60, 0.5, 'sine', 0.1);
  }
  if (s.snow) for (let i = 0; i < 22; i++) { const a = Math.random() * 6.283, v = 1 + Math.random() * 3; parts.push({ x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.5, life: 34, col: i % 2 ? '#f8fafc' : '#bae6fd' }); }
  const n = w.id === 'dirt' ? 14 : 24;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, v = 1 + Math.random() * 3.2;
    parts.push({ x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.2, life: 30 + Math.random() * 20, col: i % 2 ? '#c99a62' : '#8fd18a' });
  }
  shake = Math.max(shake, w.r > 30 ? 9 : 4);
  sfxBoom(w.r > 30);
  syncUi();
}

function roll(s) {
  /* Roller and Snowball run along the ground (the snowball grows); the Mole burrows and digs a trench. They blow up on a wall, a tank or when the run ends. */
  const dir = s.vx >= 0 ? 1 : -1, nx = s.x + dir * s.speed;
  if (nx < 0 || nx > W) { s.dead = true; return; }
  s.roll++;
  if (s.mole) {
    const ax = Math.max(0, Math.min(W, Math.round(nx + dir * 8))), ga = ground[ax];
    if (s.roll > 80 || (s.lvl !== undefined && ga < s.lvl - 14)) { explode(s); return; }
    s.lvl = ga;
    crater(nx, ga - 1, 7);
    s.x = nx; s.y = ground[Math.round(nx)] - 3;
    for (let i = 0; i < 2; i++) parts.push({ x: s.x, y: s.y + 2, vx: -dir * (0.4 + Math.random()), vy: -1 - Math.random() * 1.4, life: 16, col: i ? '#8b5a2b' : '#c99a62' });
    if (s.roll % 8 === 0) tone(140, 90, 0.08, 'square', 0.04);
    for (let i = 0; i < 2; i++) {
      if (Math.hypot(s.x - tanks[i].x, s.y - (tanks[i].y - 8)) < 15) { explode(s); return; }
    }
    return;
  }
  const g0 = ground[Math.round(s.x)], g1 = ground[Math.round(nx)];
  if (g1 < g0 - 5 || s.roll > 130) { explode(s); return; }
  s.speed = Math.max(1.1, Math.min(3.4, s.speed + (g1 - g0) * 0.12 - 0.01));
  if (s.snow) s.size = Math.min(34, s.size + 0.3);
  s.x = nx; s.y = g1 - (s.snow ? s.size * 0.75 : 3);
  if (s.roll % 3 === 0) parts.push({ x: s.x, y: g1, vx: -dir * 0.6, vy: -0.8, life: 14, col: s.snow ? '#f1f5f9' : '#c99a62' });
  const reach = 12 + (s.snow ? s.size * 0.4 : 0);
  for (let i = 0; i < 2; i++) {
    if (Math.hypot(s.x - tanks[i].x, s.y - (tanks[i].y - 8)) < reach) { explode(s); return; }
  }
}

/* A hole = a spot clearly lower than the ground 12 px away on both sides (a crater). Tanks will not drive into one. */
function inHole(x) {
  const i = Math.round(x), a = ground[Math.max(0, i - 12)], b = ground[Math.min(W, i + 12)];
  return ground[i] - a > 6 && ground[i] - b > 6;
}
function canStand(t, nx, o) {
  return !inHole(nx) && nx >= 18 && nx <= W - 18 && Math.abs(nx - o.x) >= 36 && Math.abs(ground[Math.round(nx)] - ground[Math.round(t.x)]) <= 3;
}
function step() {
  /* Move: 1.5 px per step while a button or key is held, up to MOVE pixels per turn; blocked by steep slopes, edges and the other tank. */
  if (phase === 'aim' && moveDir && moveLeft > 0) {
    const t = cur(), nx = t.x + moveDir * 1.5;
    if (canStand(t, nx, tanks[1 - who()])) {
      t.x = nx; moveLeft = Math.max(0, moveLeft - 1.5);
      $('pa-fuel').textContent = Math.round(moveLeft);
      if (Math.random() < 0.35) parts.push({ x: t.x - moveDir * 10, y: t.y, vx: -moveDir * 0.5, vy: -0.6, life: 14, col: '#c99a62' });
    }
  }
  if (phase === 'cpu' && cpuGoal !== null) {
    const t = tanks[1], dir = Math.sign(cpuGoal - t.x), nx = t.x + dir * 1.5;
    if (Math.abs(cpuGoal - t.x) < 1.5 || !canStand(t, nx, tanks[0])) { cpuGoal = null; setTimeout(cpuShoot, 350); }
    else { t.x = nx; if (Math.random() < 0.35) parts.push({ x: t.x - dir * 10, y: t.y, vx: -dir * 0.5, vy: -0.6, life: 14, col: '#c99a62' }); }
  }
  shots.forEach(s => {
    if (s.dead) return;
    if (s.wave) { waveStep(s); return; }
    if (s.delay > 0) { if (--s.delay === 0) tone(160, 90, 0.15, 'sawtooth', 0.05); return; }
    if (s.rolling) { roll(s); return; }
    if (s.stuck) {
      /* Sticky: glued to a tank or the ground, blinks, then blows up. */
      if (s.stuckTo !== null) { s.x = tanks[s.stuckTo].x; s.y = tanks[s.stuckTo].y - 8; }
      else s.y = ground[Math.max(0, Math.min(W, Math.round(s.x)))] - 2;
      if (--s.timer <= 0) explode(s);
      return;
    }
    s.age++;
    const sw = s.w;
    /* Same angle + power (+ wind) = same landing spot with every weapon. Balloon, Boomerang and Homing keep their character
       but ride the standard arc underneath, so they still come down where a Missile would. */
    if (sw.id === 'balloon') {
      /* slow motion: the standard arc advanced every other frame, drawn halfway between steps */
      if (!s.base) s.base = { x: s.x, y: s.y, vx: s.vx, vy: s.vy, px: s.x, py: s.y };
      const bs = s.base, odd = s.age % 2 === 1;
      if (odd) { bs.px = bs.x; bs.py = bs.y; ballistic(bs); }
      const f = odd ? 0.5 : 1;
      s.x = bs.px + (bs.x - bs.px) * f; s.y = bs.py + (bs.y - bs.py) * f; s.vx = bs.vx; s.vy = bs.vy;
    } else if (sw.id === 'boomerang' && s.T) {
      /* swings out past the arc and curves back onto it: the sideways offset is zero again at the standard landing frame */
      if (!s.base) s.base = { x: s.x, y: s.y, vx: s.vx, vy: s.vy };
      const bs = s.base, amp = Math.min(46, s.T * 0.6), k = Math.PI / s.T, u = Math.min(s.age, s.T);
      ballistic(bs);
      s.x = bs.x + s.dir * amp * Math.sin(k * u); s.y = bs.y;
      s.vx = bs.vx + (s.age < s.T ? s.dir * amp * k * Math.cos(k * u) : 0); s.vy = bs.vy;
    } else if (sw.id === 'homing') {
      /* normal arc; locks on only if it passes within 60 px of the enemy tank */
      const he = tanks[1 - s.owner], hx = he.x - s.x, hy = (he.y - 8) - s.y, hd = Math.hypot(hx, hy) || 1;
      if (!s.lock && s.age > 10 && hd < 60) { s.lock = true; floats.push({ x: s.x, y: s.y - 12, t: 40, txt: 'Locked!', col: '#14b8a6' }); }
      if (s.lock) { const sp = Math.max(2.6, Math.hypot(s.vx, s.vy)); s.vx += (hx / hd * sp - s.vx) * 0.25; s.vy += (hy / hd * sp - s.vy) * 0.25; s.x += s.vx; s.y += s.vy; }
      else ballistic(s);
    } else ballistic(s);
    if (s.age % 2 === 0) {
      if (sw.id === 'missile' || sw.id === 'homing' || sw.id === 'nuke' || sw.id === 'piece' || sw.id === 'napalm' || sw.id === 'meteor') parts.push({ x: s.x - s.vx * 2, y: s.y - s.vy * 2, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8, life: 12 + Math.random() * 8, col: Math.random() < 0.5 ? '#fb923c' : '#fde047' });
      else if (sw.id === 'spark') parts.push({ x: s.x, y: s.y, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6, life: 14, col: s.col });
    }
    if (sw.id === 'firework' && s.vy > 0 && s.age > 8) {
      s.dead = true;
      const cols = ['#f43f5e', '#fde047', '#38bdf8', '#a3e635', '#c084fc', '#fb923c'];
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * 6.283 + Math.random() * 0.4, v = 1.3 + Math.random() * 0.6;
        shots.push({ x: s.x, y: s.y, vx: s.vx * 0.7 + Math.cos(a) * v, vy: s.vy * 0.3 + Math.sin(a) * v, w: SPARK, col: cols[i % cols.length], owner: s.owner, age: 7, bounces: 0, dead: false, trail: [] });
      }
      for (let i = 0; i < 26; i++) { const a = Math.random() * 6.283, v = 1 + Math.random() * 2.6; parts.push({ x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 26, col: cols[i % cols.length] }); }
      rings.push({ x: s.x, y: s.y, r: 4, max: 34, col: '#fde047' });
      tone(500, 1400, 0.25, 'triangle', 0.07);
      return;
    }
    if (sw.id === 'cluster' && s.vy > 0) {
      s.dead = true;
      for (let i = 0; i < 5; i++) shots.push({ x: s.x, y: s.y, vx: s.vx + (i - 2) * 0.5, vy: s.vy * 0.6, w: BOMBLET, owner: s.owner, age: 7, bounces: 0, dead: false, trail: [] });
      tone(900, 400, 0.12, 'square', 0.06);
      return;
    }
    if (s.rec && s.age % 2 === 0) lastPath[s.owner].push({ x: s.x, y: s.y });
    if (s.age % 2 === 0) { s.trail.push({ x: s.x, y: s.y }); if (s.trail.length > 26) s.trail.shift(); }
    if (s.x < -30 || s.x > W + 30 || s.y > H + 40) { s.dead = true; return; }
    if (birdHit(s)) return;
    if (planeHit(s)) return;
    if (critterHit(s.x, s.y, 2)) { explode(s); return; }
    if (s.x >= 0 && s.x <= W) {
      const g = ground[Math.round(s.x)];
      if (s.y >= g) {
        if (s.w.id === 'bouncer' && s.bounces < 2) {
          s.y = g - 1; s.vy = -Math.abs(s.vy) * 0.62; s.vx *= 0.85; s.bounces++;
          for (let i = 0; i < 6; i++) parts.push({ x: s.x, y: g, vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 2, life: 18, col: '#c99a62' });
        } else if (s.w.id === 'popcorn' && s.bounces < 4) {
          explode({ x: s.x, y: g, w: POP, owner: s.owner, dead: false });
          s.bounces++; s.y = ground[Math.max(0, Math.min(W, Math.round(s.x)))] - 2; s.vy = -Math.max(1.8, Math.abs(s.vy) * 0.7); s.vx *= 0.9;
        } else if (s.w.id === 'mole') {
          s.rolling = true; s.mole = true; s.roll = 0; s.speed = 1.4; s.y = g - 3;
        } else if (s.w.id === 'snowball') {
          s.rolling = true; s.snow = true; s.size = 7; s.roll = 0; s.speed = 1.5; s.y = g - 5;
        } else if (s.w.id === 'roller') {
          s.rolling = true; s.roll = 0; s.speed = 1.6; s.y = g - 3;
        } else if (s.w.id === 'sticky') {
          s.stuck = true; s.stuckTo = null; s.timer = 85; s.y = g - 2; return;
        } else { explode(s); return; }
      }
    }
    if (s.age > 6) {
      for (let i = 0; i < 2; i++) {
        if (Math.hypot(s.x - tanks[i].x, s.y - (tanks[i].y - 8)) < 11) {
          if (s.w.id === 'sticky') { s.stuck = true; s.stuckTo = i; s.timer = 85; return; }
          explode(s); return;
        }
      }
    }
  });
  blasts.forEach(b => { b.t++; });
  blasts = blasts.filter(b => b.t < b.max);
  flashA *= 0.9;
  vort.forEach(v => { v.t--; });
  vort = vort.filter(v => v.t > 0);
  bolts.forEach(b => { b.t--; });
  bolts = bolts.filter(b => b.t > 0);
  beams.forEach(b => { b.t--; });
  beams = beams.filter(b => b.t > 0);
  /* Magnet: the pulled tank slides toward the impact, stopping at crater edges, steep slopes and the other tank */
  pulls.forEach(pl => {
    const t = tanks[pl.i], o = tanks[1 - pl.i], dir = Math.sign(pl.x - t.x), nx = t.x + dir * 1.5;
    if (pl.left <= 0 || Math.abs(pl.x - t.x) < 3 || !canStand(t, nx, o)) { pl.done = true; return; }
    t.x = nx; pl.left -= 1.5;
    if (Math.random() < 0.5) parts.push({ x: t.x - dir * 10, y: t.y, vx: -dir * 0.6, vy: -0.7, life: 14, col: '#c99a62' });
  });
  pulls = pulls.filter(pl => !pl.done);
  if (phase === 'fly' && shots.every(s => s.dead)) { phase = 'wait'; waitFrames = 50; shots = []; }
  else if (phase === 'wait' && --waitFrames <= 0 && !fires.length && !pulls.length) nextTurn();
  fires.forEach(f => {
    f.t--;
    const en = tanks[1 - f.owner];
    const fo = tanks[f.owner];
    if (f.t % 25 === 0 && Math.abs(fo.x - f.x) < 30 && Math.abs(fo.y - ground[Math.max(0, Math.min(W, Math.round(f.x)))]) < 22) {
      fo.score -= 12;
      floats.push({ x: fo.x, y: fo.y - 24, t: 50, txt: '-12 Friendly fire!', col: '#dc2626' });
      syncUi();
    }
    if (f.t % 25 === 0 && Math.abs(en.x - f.x) < 30 && Math.abs(en.y - ground[Math.max(0, Math.min(W, Math.round(f.x)))]) < 22) {
      tanks[f.owner].score += 12;
      floats.push({ x: en.x, y: en.y - 24, t: 40, txt: '+12', col: '#f97316' });
      syncUi();
    }
    if (f.t % 4 === 0) parts.push({ x: f.x + (Math.random() - 0.5) * 50, y: ground[Math.max(0, Math.min(W, Math.round(f.x)))] - 4, vx: 0, vy: -1.2, life: 16, col: '#fb923c' });
  });
  fires = fires.filter(f => f.t > 0);
  parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life--; });
  parts = parts.filter(p => p.life > 0);
  rings.forEach(r => { r.r += (r.max - r.r) * 0.25 + 0.5; });
  rings = rings.filter(r => r.r < r.max - 0.5);
  floats.forEach(f => { f.y -= 0.5; f.t--; });
  floats = floats.filter(f => f.t > 0);
  shake *= 0.86;
  clouds.forEach(c => { c.x += 0.05 * c.s; if (c.x > W + 60) c.x = -60; });
  tanks.forEach(t => { t.y = ground[Math.round(t.x)]; t.dy += (t.y - t.dy) * 0.25; });
}

/* ---------- dramatic blasts ---------- */
/* Each weapon family gets its own explosion: fireball with rays, concentric shockwave rings, radial lightning with glowing discs,
   rainbow streaks with a bead ring, or ice spikes rising from the ground. Purely visual; the real blast is the crater and the score. */
function blast(w, x, y) {
  const id = w.id;
  const type = id === 'big' || id === 'nuke' || id === 'balloon' || id === 'sticky' ? 'shock' : id === 'zap' ? 'bolts' : id === 'spark' ? 'streaks' : id === 'snowball' ? 'spikes' : id === 'blackhole' ? '' : id === 'dirt' ? 'dust' : 'fire';
  if (!type) return;
  const R = type === 'bolts' ? 48 : type === 'streaks' ? 26 : w.r;
  const b = { type: type, x: x, y: y, R: R, t: 0, max: type === 'fire' ? 26 : 36, seed: Math.random() * 6.28, col: w.col };
  if (type === 'bolts') b.lines = Array.from({ length: 12 }, (_, k) => ({ a: k / 12 * 6.283 + Math.random() * 0.3, j: Array.from({ length: 8 }, () => (Math.random() - 0.5) * 14) }));
  if (type === 'spikes') b.sp = Array.from({ length: 9 }, (_, k) => ({ dx: (k - 4) * R * 0.32 + (Math.random() - 0.5) * 6, h: R * (0.9 + Math.random() * 1.1), d: Math.random() * 0.25 }));
  if (type === 'fire' || type === 'shock' || type === 'dust') {
    const n = type === 'dust' ? 14 : 8 + Math.round(R / 4);
    b.em = Array.from({ length: n }, (_, k) => { const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.6, v = 1.4 + Math.random() * 2.4; return { vx: Math.cos(a) * v, vy: Math.sin(a) * v, c: k % 2 }; });
  }
  blasts.push(b);
  if (id === 'nuke') flashA = 0.8; else if (id === 'big') flashA = Math.max(flashA, 0.35);
}
function drawBlasts() {
  blasts.forEach(b => {
    const p = b.t / b.max, e = 1 - (1 - p) * (1 - p), fade = 1 - p * p;
    ctx.save();
    if (b.type === 'fire') {
      const r = b.R * (0.7 + e) + 4, g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
      g.addColorStop(0, 'rgba(255,251,224,' + fade + ')'); g.addColorStop(0.35, 'rgba(253,224,71,' + fade + ')');
      g.addColorStop(0.7, 'rgba(249,115,22,' + fade * 0.85 + ')'); g.addColorStop(1, 'rgba(220,38,38,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, 7); ctx.fill();
      ctx.strokeStyle = 'rgba(255,237,160,' + fade + ')'; ctx.lineWidth = 2;
      for (let k = 0; k < 10; k++) {
        const a = k * 0.628 + b.seed, d0 = r * 0.7, d1 = r * (0.95 + 0.5 * e);
        ctx.beginPath(); ctx.moveTo(b.x + Math.cos(a) * d0, b.y + Math.sin(a) * d0); ctx.lineTo(b.x + Math.cos(a) * d1, b.y + Math.sin(a) * d1); ctx.stroke();
      }
      if (p > 0.4) { ctx.fillStyle = 'rgba(71,85,105,' + 0.3 * (1 - p) + ')'; ctx.beginPath(); ctx.arc(b.x, b.y - p * 18, b.R * 0.7, 0, 7); ctx.fill(); }
    } else if (b.type === 'shock') {
      const R = b.R * 1.8, g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, R * e + 1);
      g.addColorStop(0, 'rgba(255,255,255,' + fade * 0.9 + ')'); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, R * e + 1, 0, 7); ctx.fill();
      for (let k = 0; k < 6; k++) {
        const rr = R * e - k * R * 0.1; if (rr <= 1) continue;
        ctx.strokeStyle = k % 2 ? b.col : '#fde68a'; ctx.globalAlpha = fade; ctx.lineWidth = 4 - k * 0.4;
        ctx.beginPath(); ctx.arc(b.x, b.y, rr, 0, 7); ctx.stroke();
      }
    } else if (b.type === 'bolts') {
      const reach = b.R * (0.5 + e);
      ctx.strokeStyle = '#a5f3fc'; ctx.lineWidth = 1.6; ctx.lineJoin = 'round'; ctx.globalAlpha = Math.min(1, fade * 1.6);
      b.lines.forEach(l => {
        ctx.beginPath(); ctx.moveTo(b.x, b.y);
        for (let j = 0; j < 8; j++) { const d = reach * (j + 1) / 8, o = l.j[j]; ctx.lineTo(b.x + Math.cos(l.a) * d - Math.sin(l.a) * o, b.y + Math.sin(l.a) * d + Math.cos(l.a) * o); }
        ctx.stroke();
      });
      for (let k = 0; k < 4; k++) {
        const a = b.seed + k * 1.6, d = b.R * 0.3 * (k % 2 + 1), cx = b.x + Math.cos(a) * d, cy = b.y + Math.sin(a) * d, rr = 9 + e * 9, g = ctx.createRadialGradient(cx, cy, 1, cx, cy, rr);
        g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(0.5, 'rgba(34,211,238,0.7)'); g.addColorStop(1, 'rgba(34,211,238,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fill();
      }
    } else if (b.type === 'streaks') {
      ctx.lineWidth = 2; ctx.globalAlpha = fade;
      for (let k = 0; k < 14; k++) {
        const a = k * 0.449 + b.seed, d0 = b.R * e * 0.5;
        ctx.strokeStyle = 'hsl(' + k * 26 + ',90%,60%)';
        ctx.beginPath(); ctx.moveTo(b.x + Math.cos(a) * d0, b.y + Math.sin(a) * d0); ctx.lineTo(b.x + Math.cos(a) * (d0 + 7), b.y + Math.sin(a) * (d0 + 7)); ctx.stroke();
      }
      ctx.fillStyle = '#fde047';
      for (let k = 0; k < 10; k++) { const a = k * 0.628; ctx.beginPath(); ctx.arc(b.x + Math.cos(a) * b.R * e * 0.9, b.y + Math.sin(a) * b.R * e * 0.9, 2.2 * fade + 0.4, 0, 7); ctx.fill(); }
    } else if (b.type === 'spikes') {
      b.sp.forEach(q => {
        const u = Math.max(0, Math.min(1, (p - q.d) * 1.6)), h = q.h * Math.sin(u * Math.PI), x = b.x + q.dx;
        if (h < 1 || x < 0 || x > W) return;
        const y0 = ground[Math.round(x)];
        ctx.fillStyle = 'rgba(224,242,254,0.95)'; ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x - 4, y0 + 2); ctx.lineTo(x + 0.5, y0 - h); ctx.lineTo(x + 4, y0 + 2); ctx.closePath(); ctx.fill(); ctx.stroke();
      });
    }
    if (b.em) {
      ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.globalAlpha = Math.min(1, fade * 1.4);
      b.em.forEach(m => {
        const t1 = b.t, t0 = Math.max(0, b.t - 3);
        ctx.strokeStyle = b.type === 'dust' ? (m.c ? '#a16207' : '#c99a62') : (m.c ? '#fb923c' : '#fbbf24');
        ctx.beginPath(); ctx.moveTo(b.x + m.vx * t0, b.y + m.vy * t0 + 0.04 * t0 * t0); ctx.lineTo(b.x + m.vx * t1, b.y + m.vy * t1 + 0.04 * t1 * t1); ctx.stroke();
      });
    }
    ctx.restore();
  });
  if (flashA > 0.02) { ctx.fillStyle = 'rgba(255,255,255,' + flashA + ')'; ctx.fillRect(0, 0, W, H); }
}

/* ---------- weapon sprites ---------- */
function flame(len) {
  const f = len * (0.7 + Math.random() * 0.6);
  ctx.fillStyle = '#fb923c'; ctx.beginPath(); ctx.moveTo(-7, -2.5); ctx.lineTo(-7 - f, 0); ctx.lineTo(-7, 2.5); ctx.fill();
  ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.moveTo(-7, -1.3); ctx.lineTo(-7 - f * 0.6, 0); ctx.lineTo(-7, 1.3); ctx.fill();
}
function dot(x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
function drawShot(s) {
  if (s.wave || s.delay > 0) return;
  const w = s.w, id = w.id, t = s.age, ang = Math.atan2(s.vy, s.vx), dirn = s.vx >= 0 ? 1 : -1;
  ctx.save(); ctx.translate(s.x, s.y);
  ctx.shadowColor = s.col || w.col; ctx.shadowBlur = 8;
  if (id === 'missile' || id === 'homing' || id === 'nuke') {
    const k = id === 'nuke' ? 1.35 : 1;
    ctx.rotate(ang); ctx.scale(k, k);
    flame(7);
    ctx.fillStyle = '#334155';
    ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-10, -6); ctx.lineTo(-2, -3); ctx.lineTo(-2, 3); ctx.lineTo(-10, 6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = w.col; ctx.beginPath(); ctx.roundRect(-8, -3.2, 15, 6.4, 3); ctx.fill();
    ctx.fillStyle = '#fff7ed'; ctx.beginPath(); ctx.moveTo(6, -3.2); ctx.lineTo(12, 0); ctx.lineTo(6, 3.2); ctx.closePath(); ctx.fill();
    if (id === 'nuke') { ctx.fillStyle = '#fde047'; ctx.fillRect(-2, -3.2, 3.5, 6.4); }
    if (id === 'homing') { dot(2, 0, 2.2, '#fff'); dot(2.8, 0, 1.1, '#0f172a'); } else dot(1, 0, 1.5, '#bae6fd');
  } else if (id === 'big') {
    dot(0, 1, 6.5, '#1f2937'); dot(-2, -1.5, 2, 'rgba(255,255,255,0.35)');
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(2, -5); ctx.quadraticCurveTo(5, -9, 8, -8); ctx.stroke();
    dot(8, -8, 2.2, Math.random() < 0.5 ? '#fde047' : '#fb923c');
  } else if (id === 'triple') {
    ctx.rotate(ang); ctx.fillStyle = w.col;
    ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-4, -3); ctx.lineTo(-2, 0); ctx.lineTo(-4, 3); ctx.closePath(); ctx.fill();
    dot(2, 0, 1, '#fff');
  } else if (id === 'bouncer') {
    ctx.rotate(t * 0.2); dot(0, 0, 5.5, w.col);
    ctx.strokeStyle = '#d1fae5'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(0, 0, 3.6, 0.3, 2.4); ctx.stroke();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, 5.5, 0, 7); ctx.stroke();
  } else if (id === 'snowball') {
    const rad = s.size || 7;
    ctx.rotate((s.rolling ? s.roll * 0.3 : t * 0.2) * dirn);
    dot(0, 0, rad, '#f8fafc'); dot(rad * 0.25, rad * 0.25, rad * 0.7, 'rgba(148,163,184,0.5)');
    dot(-rad * 0.35, -rad * 0.2, rad * 0.14, '#94a3b8'); dot(rad * 0.3, -rad * 0.4, rad * 0.12, '#94a3b8'); dot(-rad * 0.1, rad * 0.4, rad * 0.13, '#94a3b8');
    ctx.strokeStyle = '#bae6fd'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, rad, 0, 7); ctx.stroke();
  } else if (id === 'roller') {
    ctx.rotate((s.rolling ? s.roll * 0.35 : t * 0.3) * dirn); dot(0, 0, 5.5, w.col); dot(0, 0, 2, '#e0f2fe');
    ctx.strokeStyle = '#0c4a6e'; ctx.lineWidth = 1.4;
    for (let k = 0; k < 4; k++) { const a = k * 0.785; ctx.beginPath(); ctx.moveTo(Math.cos(a) * 5, Math.sin(a) * 5); ctx.lineTo(-Math.cos(a) * 5, -Math.sin(a) * 5); ctx.stroke(); }
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, 5.5, 0, 7); ctx.stroke();
  } else if (id === 'digger') {
    ctx.rotate(ang); ctx.fillStyle = '#94a3b8';
    ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(-6, -5); ctx.lineTo(-6, 5); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    for (let k = 0; k < 3; k++) { const x = ((t * 1.2 + k * 5) % 15) - 6, h = 5 * (9 - x) / 15; ctx.beginPath(); ctx.moveTo(x, -h); ctx.lineTo(x + 2.5, h); ctx.stroke(); }
    ctx.fillStyle = '#475569'; ctx.fillRect(-8, -5, 3, 10);
  } else if (id === 'napalm') {
    ctx.rotate(ang); ctx.fillStyle = '#f97316';
    ctx.beginPath(); ctx.moveTo(-12 - Math.random() * 3, 0); ctx.lineTo(-1, -4.5); ctx.lineTo(-1, 4.5); ctx.closePath(); ctx.fill();
    dot(0, 0, 4.8, '#f97316'); dot(1, 0, 2.6, '#fde047');
  } else if (id === 'dirt') {
    dot(0, 0, 5.5, '#a16207'); dot(-2, -1, 1.4, '#78350f'); dot(2, 2, 1.6, '#78350f'); dot(1.5, -2.5, 1, '#78350f');
  } else if (id === 'cluster') {
    dot(0, 0, 5.5, w.col);
    for (let k = 0; k < 5; k++) { const a = k * 1.2566 + t * 0.1; dot(Math.cos(a) * 3, Math.sin(a) * 3, 0.9, '#fdf4ff'); }
    ctx.strokeStyle = '#fdf4ff'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, 5.5, 0, 7); ctx.stroke();
  } else if (id === 'zap') {
    ctx.rotate(t * 0.25); ctx.fillStyle = '#fde047'; ctx.beginPath();
    for (let k = 0; k < 8; k++) { const r = k % 2 ? 2.2 : 7, a = k * 0.785; if (k) ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); else ctx.moveTo(r, 0); }
    ctx.closePath(); ctx.fill(); dot(0, 0, 1.8, '#fff');
  } else if (id === 'sticky') {
    const wob = 1 + Math.sin(t * 0.4) * 0.12;
    ctx.scale(wob, 2 - wob); dot(0, 0, 6, s.stuck && Math.floor(s.timer / 6) % 2 ? '#ecfccb' : w.col);
    dot(-2, -1.5, 1.7, '#fff'); dot(2, -1.5, 1.7, '#fff'); dot(-1.7, -1.4, 0.8, '#14532d'); dot(2.3, -1.4, 0.8, '#14532d');
  } else if (id === 'balloon') {
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 8); ctx.quadraticCurveTo(3 * Math.sin(t * 0.2), 13, 0, 18); ctx.stroke();
    ctx.fillStyle = w.col; ctx.beginPath(); ctx.ellipse(0, 0, 6, 7.5, 0, 0, 6.3); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, 7.5); ctx.lineTo(-2, 10); ctx.lineTo(2, 10); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.ellipse(-2, -2.5, 1.6, 2.6, 0.5, 0, 6.3); ctx.fill();
  } else if (id === 'meteor' || id === 'piece') {
    ctx.rotate(ang); flame(10);
    dot(0, 0, 5, '#6b4423'); dot(-1, -1, 2.5, '#8b5a2b');
    ctx.strokeStyle = w.col; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, 5, 0, 7); ctx.stroke();
  } else if (id === 'bomblet') {
    dot(0, 0, 3.4, w.col); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, 3.4, 0, 7); ctx.stroke();
  } else if (id === 'spark') {
    dot(0, 0, 3.6, s.col || w.col); dot(0, 0, 1.5, '#fff');
  } else if (id === 'firework') {
    ctx.rotate(ang); flame(6);
    ctx.fillStyle = '#b91c1c'; ctx.fillRect(-7, -2.4, 12, 4.8);
    ctx.fillStyle = '#fde047'; ctx.fillRect(-3, -2.4, 2, 4.8);
    ctx.fillStyle = '#fff7ed'; ctx.beginPath(); ctx.moveTo(5, -2.4); ctx.lineTo(9, 0); ctx.lineTo(5, 2.4); ctx.closePath(); ctx.fill();
  } else if (id === 'popcorn') {
    ctx.rotate(t * 0.15);
    dot(-2.5, 0, 3.4, '#fef3c7'); dot(2.5, 0.5, 3.4, '#fef3c7'); dot(0, -2.5, 3.6, '#fffbeb'); dot(0.5, 2.5, 3, '#fef3c7'); dot(0, 0, 1.6, '#fbbf24');
  } else if (id === 'mole') {
    if (s.rolling) {
      ctx.shadowBlur = 0; ctx.fillStyle = '#8b5a2b'; ctx.beginPath(); ctx.arc(0, 3, 8, Math.PI, 0); ctx.closePath(); ctx.fill();
      dot(-3 * dirn, 0, 2, '#6b4423'); dot(3 * dirn, -1.5, 1.7, '#fff'); dot(3.4 * dirn, -1.5, 0.8, '#0f172a'); dot(7 * dirn, 1.5, 1.8, '#f9a8d4');
    } else {
      dot(0, 0, 5.5, '#a16207'); dot(-3.5, -4.5, 2, '#78350f'); dot(3.5, -4.5, 2, '#78350f');
      dot(-2, -0.5, 1.5, '#fff'); dot(2, -0.5, 1.5, '#fff'); dot(-2, -0.4, 0.7, '#0f172a'); dot(2, -0.4, 0.7, '#0f172a'); dot(0, 2, 1.4, '#f9a8d4');
    }
  } else if (id === 'blackhole') {
    dot(0, 0, 5.5, '#0b0b14');
    ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2;
    for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(0, 0, 8, t * 0.3 + k * 2.09, t * 0.3 + k * 2.09 + 1.2); ctx.stroke(); }
    ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, 5.5, 0, 7); ctx.stroke();
  } else if (id === 'boomerang') {
    ctx.rotate(t * 0.4); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = w.col; ctx.lineWidth = 4.5; ctx.beginPath(); ctx.moveTo(-7, -5); ctx.lineTo(0, 3); ctx.lineTo(7, -5); ctx.stroke();
    ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(0, 2); ctx.lineTo(6, -4); ctx.stroke();
  } else if (id === 'laser') {
    ctx.rotate(t * 0.08); ctx.fillStyle = '#475569'; ctx.fillRect(-11, -2.5, 6, 5); ctx.fillRect(5, -2.5, 6, 5);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, 0); ctx.stroke();
    dot(0, 0, 4, w.col); dot(0, 0, 1.7, '#ecfeff');
  } else if (id === 'quake') {
    ctx.rotate(t * 0.15); dot(0, 0, 5.5, '#92400e');
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(-2.5, -2.5); ctx.lineTo(0, 2.5); ctx.lineTo(2.5, -2.5); ctx.lineTo(5, 0); ctx.stroke();
  } else if (id === 'magnet') {
    ctx.rotate(ang + Math.PI / 2); ctx.lineCap = 'butt';
    ctx.strokeStyle = w.col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.fillRect(-7, -3, 4, 3); ctx.fillRect(3, -3, 4, 3);
  } else if (id === 'volcano' || id === 'lava') {
    const r0 = id === 'lava' ? 3.8 : 5.5;
    dot(0, 0, r0, '#7f1d1d'); dot(0, 0, r0 * 0.62, Math.random() < 0.5 ? '#f97316' : '#fbbf24');
  } else if (id === 'teleport') {
    ctx.rotate(t * 0.2); ctx.fillStyle = w.col; ctx.beginPath();
    for (let k = 0; k < 8; k++) { const r = k % 2 ? 2.4 : 6.5, a = k * 0.785; if (k) ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); else ctx.moveTo(r, 0); }
    ctx.closePath(); ctx.fill(); dot(0, 0, 1.8, '#faf5ff');
    ctx.strokeStyle = 'rgba(216,180,254,0.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, 8 + Math.sin(t * 0.3) * 1.5, 0, 7); ctx.stroke();
  } else {
    dot(0, 0, 4, w.col); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(0, 0, 4, 0, 7); ctx.stroke();
  }
  ctx.restore();
}

/* ---------- CPU ---------- */
function simulate(x, y, vx, vy) {
  for (let i = 0; i < 700; i++) {
    vx += wind * WIND_K; vy += GRAVITY; x += vx; y += vy;
    if (x < 0 || x > W) return { x: x, y: H };
    if (y >= ground[Math.round(x)]) return { x: x, y: y };
    if (y > H + 40) return { x: x, y: H };
  }
  return { x: x, y: y };
}

function cpuTurn() {
  if (phase !== 'cpu') return;
  /* Normal and Hard shuffle a little before shooting, always staying on their half of the field. */
  if (diff > 0) {
    const goal = Math.max(W / 2 + 40, Math.min(W - 18, tanks[1].x + (Math.random() < 0.5 ? -1 : 1) * (15 + Math.random() * 35)));
    if (Math.abs(goal - tanks[1].x) > 3) { cpuGoal = goal; return; }
  }
  cpuShoot();
}
function cpuShoot() {
  if (phase !== 'cpu') return;
  const t = tanks[1], me = tanks[0];
  const free = WEAPONS.map((w, i) => i).filter(i => !t.used[i]);
  const real = free.filter(i => WEAPONS[i].id !== 'dirt' && !WEAPONS[i].nocpu);
  const pool = real.length ? real : free;
  let wi = pool[Math.floor(Math.random() * pool.length)];
  if (t.buried) { const ri = free.find(i => WEAPONS[i].id === 'remover'); if (ri !== undefined) wi = ri; }
  let bestA = 120, bestP = 60, bestD = 1e9;
  if (WEAPONS[wi].id === 'dirt' || WEAPONS[wi].id === 'remover') {
    bestA = 100 + Math.random() * 60; bestP = 30 + Math.random() * 60;
  } else {
    for (let a = 10; a <= 170; a += 3) {
      for (let p = 25; p <= 100; p += 3) {
        const rad = a * Math.PI / 180, sp = p * POWER_K;
        const hit = simulate(t.x + Math.cos(rad) * 18, t.y - 12 - Math.sin(rad) * 18, Math.cos(rad) * sp, -Math.sin(rad) * sp);
        /* a Roller should land a little short of the target and roll the rest of the way */
        const tx = me.x + (WEAPONS[wi].id === 'roller' || WEAPONS[wi].id === 'snowball' || WEAPONS[wi].id === 'mole' ? 45 : 0);
        const d = Math.hypot(hit.x - tx, hit.y - (me.y - 8));
        if (d < bestD) { bestD = d; bestA = a; bestP = p; }
      }
    }
    const lv = LEVELS[diff], e = Math.random() < lv.slip ? lv.err * 2.5 : lv.err;
    bestA += (Math.random() * 2 - 1) * e;
    bestP += (Math.random() * 2 - 1) * e * 1.3;
  }
  t.a = Math.max(0, Math.min(180, Math.round(bestA)));
  t.p = Math.max(10, Math.min(100, Math.round(bestP)));
  setTimeout(() => { if (phase === 'cpu') fire(wi); }, 650);
}

/* ---------- UI ---------- */
function syncUi() {
  $('pa-score-you').textContent = tanks.length ? tanks[0].score : 0;
  $('pa-score-cpu').textContent = tanks.length ? tanks[1].score : 0;
  $('pa-fuel').textContent = Math.round(moveLeft);
  $('pa-shot').textContent = 'Shot ' + Math.min(SHOTS, Math.floor(turn / 2) + 1) + ' / ' + SHOTS;
  const my = tanks.length ? (phase === 'cpu' ? tanks[1] : cur()) : null;
  if (my) {
    angleIn.value = my.a; powerIn.value = my.p;
    $('pa-angle-val').textContent = my.a; $('pa-power-val').textContent = my.p;
  }
  panel.classList.toggle('off', phase !== 'aim');
  const box = $('pa-weapons');
  if (!box.children.length) buildWeapons();
  [].forEach.call(box.children, (b, i) => {
    b.classList.toggle('on', i === sel && phase === 'aim');
    b.classList.toggle('used', !!(my && my.used[i]));
  });
}

function wLabel(w) { return '<span class="pa-ico">' + (ICONS[w.id] || '') + '</span>' + w.name; }
function buildWeapons() {
  const box = $('pa-weapons');
  box.innerHTML = '';
  box.dataset.n = WEAPONS.length;
  WEAPONS.forEach((w, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'pa-weapon'; b.dataset.i = i; b.title = w.tip || '';
    b.innerHTML = wLabel(w);
    b.addEventListener('click', () => { if (phase === 'aim' && !cur().used[i]) { sel = i; syncUi(); } });
    box.appendChild(b);
  });
}
/* Start of a match: the weapon buttons flicker through random names, then settle on this match's hand. */
function shuffleIn(done) {
  phase = 'shuffle';
  buildWeapons();
  const box = $('pa-weapons');
  let n = 0;
  syncUi();
  const iv = setInterval(() => {
    n++;
    const last = n >= 14;
    [].forEach.call(box.children, (b, i) => {
      const w = last ? WEAPONS[i] : POOL[Math.floor(Math.random() * POOL.length)];
      b.innerHTML = wLabel(w); b.title = last ? (w.tip || '') : '';
      b.classList.toggle('shuffling', !last);
    });
    tone(300 + n * 35, 340 + n * 35, 0.04, 'square', 0.03);
    if (last) { clearInterval(iv); done(); }
  }, 70);
}

function setAim(a, p) {
  if (phase !== 'aim') return;
  if (a !== null) cur().a = Math.max(0, Math.min(180, a));
  if (p !== null) cur().p = Math.max(10, Math.min(100, p));
  syncUi();
}

/* ---------- drag to aim: pull back from the tank like a slingshot ---------- */
function pointer(e) {
  const r = canvas.getBoundingClientRect();
  return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height };
}
function dragAim(pt) {
  const t = cur(), dx = t.x - pt.x, dy = (t.y - 14) - pt.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 6) return;
  let a = Math.atan2(-dy, dx) * 180 / Math.PI;
  if (a < 0) a = dx >= 0 ? 0 : 180;
  setAim(Math.round(a), Math.round(Math.max(10, Math.min(100, dist / 1.3))));
}
canvas.addEventListener('pointerdown', e => {
  if (phase !== 'aim') return;
  canvas.setPointerCapture(e.pointerId);
  drag = pointer(e); dragAim(drag);
});
canvas.addEventListener('pointermove', e => { if (drag) { drag = pointer(e); dragAim(drag); } });
['pointerup', 'pointercancel'].forEach(n => canvas.addEventListener(n, () => { drag = null; }));
angleIn.addEventListener('input', () => setAim(Number(angleIn.value), null));
powerIn.addEventListener('input', () => setAim(null, Number(powerIn.value)));
$('pa-fire').addEventListener('click', () => { if (phase === 'aim') { moveDir = 0; fire(sel); } });

[['pa-left', -1], ['pa-right', 1]].forEach(a => {
  const b = $(a[0]);
  b.addEventListener('pointerdown', e => { e.preventDefault(); if (phase === 'aim') moveDir = a[1]; });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(n => b.addEventListener(n, () => { if (moveDir === a[1]) moveDir = 0; }));
});
document.addEventListener('keyup', e => {
  const k = e.key.toLowerCase();
  if ((k === 'a' && moveDir < 0) || (k === 'd' && moveDir > 0)) moveDir = 0;
});
document.addEventListener('keydown', e => {
  if (phase !== 'aim' || (e.target && e.target.tagName === 'INPUT')) return;
  const k = e.key, big = e.shiftKey ? 5 : 1;
  if (k === 'a' || k === 'A') moveDir = -1;
  else if (k === 'd' || k === 'D') moveDir = 1;
  else if (k === 'ArrowLeft') setAim(cur().a + big, null);
  else if (k === 'ArrowRight') setAim(cur().a - big, null);
  else if (k === 'ArrowUp') setAim(null, cur().p + big);
  else if (k === 'ArrowDown') setAim(null, cur().p - big);
  else if ((k === ' ' || k === 'Enter') && !(e.target && e.target.tagName === 'BUTTON')) fire(sel);
  else if (k >= '0' && k <= '9' && !cur().used[(Number(k) + 9) % 10]) { sel = (Number(k) + 9) % 10; syncUi(); }
  else return;
  e.preventDefault();
});

$('pa-mute').addEventListener('click', () => {
  muted = !muted;
  $('pa-mute').textContent = muted ? 'Sound off' : 'Sound on';
  $('pa-mute').setAttribute('aria-pressed', String(muted));
});

function setupSeg(id, onPick) {
  const box = $(id);
  box.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    [].forEach.call(box.children, c => c.classList.toggle('on', c === b));
    onPick(b.dataset.v);
  });
}
setupSeg('pa-mode', v => { mode = v; $('pa-diff').classList.toggle('dim', v === 'two'); });
setupSeg('pa-diff', v => { diff = Number(v); });
setupSeg('pa-shots', v => { shotsPick = Number(v); if (picked.length > shotsPick) picked = picked.slice(0, shotsPick); pickLabel(); });
setupSeg('pa-terrain', v => { terrain = Number(v); });
setupSeg('pa-wmode', v => { weaponMode = v; if (v === 'pick') openPicker(); });
function pickLabel() {
  $('pa-wpick').textContent = picked.length ? 'Choose weapons (' + picked.length + ')' : 'Choose weapons';
  $('pa-pick-n').textContent = picked.length + ' / ' + shotsPick;
  [].forEach.call($('pa-pick-grid').children, b => b.classList.toggle('on', picked.indexOf(b.dataset.id) >= 0));
}
function openPicker() {
  const grid = $('pa-pick-grid');
  if (!grid.children.length) {
    POOL.forEach(w => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'pa-chip'; b.dataset.id = w.id; b.title = w.tip || '';
      b.innerHTML = '<span class="pa-ico">' + (ICONS[w.id] || '') + '</span>' + w.name;
      b.addEventListener('click', () => {
        const i = picked.indexOf(w.id);
        if (i >= 0) picked.splice(i, 1); else if (picked.length < shotsPick) picked.push(w.id);
        pickLabel();
      });
      grid.appendChild(b);
    });
  }
  pickLabel();
  $('pa-pick').hidden = false;
  $('pa-wrap').classList.add('picking');
  $('pa-pick-x').focus({ preventScroll: true });
  /* phones: the picker sits under the field, so bring its top into view */
  if (window.matchMedia && window.matchMedia('(max-width: 700px)').matches) $('pa-pick').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
function closePicker() {
  if ($('pa-pick').hidden) return;
  $('pa-pick').hidden = true;
  $('pa-wrap').classList.remove('picking');
  if (!picked.length) { weaponMode = 'random'; [].forEach.call($('pa-wmode').children, c => c.classList.toggle('on', c.dataset.v === 'random')); }
  $('pa-wpick').focus({ preventScroll: true });
}
$('pa-pick-clear').addEventListener('click', () => { picked = []; pickLabel(); });
$('pa-pick-done').addEventListener('click', closePicker);
$('pa-pick-x').addEventListener('click', closePicker);
$('pa-share-x').addEventListener('click', () => { $('pa-sharebox').hidden = true; });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!$('pa-pick').hidden) closePicker();
  else if (!$('pa-sharebox').hidden) $('pa-sharebox').hidden = true;
});

function newGame(seed, daily) {
  isDaily = !!daily;
  birds.forEach(b => spawnBird(b, false));
  ensureAudio();
  buildMap(seed);
  if (mode === 'two') { tanks[0].name = 'P1'; tanks[1].name = 'P2'; }
  $('pa-name-you').textContent = tanks[0].name;
  $('pa-name-cpu').textContent = tanks[1].name;
  SHOTS = isDaily ? 10 : shotsPick;
  WEAPONS = dealHand(seed);
  turn = 0; sel = 0; bolts = []; beams = []; pulls = []; vort = []; blasts = []; critter.on = false; critter.wait = 300 + Math.random() * 300; plane.on = false; plane.down = false; plane.wait = 400; flashA = 0; shots = []; parts = []; rings = []; floats = []; fires = []; lastPath = [[], []];
  overlay.classList.add('hide');
  $('pa-wrap').classList.remove('menu');
  $('pa-share').hidden = true; $('pa-sharebox').hidden = true;
  shuffleIn(startTurn);
}
function showBest() {
  const bits = [];
  if (best) bits.push('Best score: ' + best);
  if (dly.last === todayKey()) bits.push('Daily today: ' + dly.today);
  if (dly.streak && (dly.last === todayKey() || dly.last === prevKey())) bits.push('Streak: ' + dly.streak + (dly.streak > 1 ? ' days' : ' day'));
  $('pa-best').textContent = bits.join(' · ');
}
function endGame() {
  phase = 'over';
  const a = tanks[0].score, b = tanks[1].score;
  const two = mode === 'two';
  if (!two && a > best) { best = a; try { localStorage.setItem('pa-best', String(best)); } catch (e) {} }
  if (!two && isDaily) recordDaily(a);
  const n0 = two ? 'Player 1' : 'You', n1 = two ? 'Player 2' : 'CPU';
  $('pa-title').textContent = a === b ? 'Draw at ' + a : a > b ? n0 + (two ? ' wins ' : ' win! ') + a + ' to ' + b : n1 + ' wins ' + b + ' to ' + a;
  $('pa-sub').textContent = two ? 'Good duel. Swap sides and go again.' : a > b ? 'Nice shooting. Try the daily map or a fresh one.' : (mode === 'cpu' && diff === 2 ? 'So close. Mind the wind and go again.' : 'So close. Tweak the angle or power and go again.');
  $('pa-play').textContent = 'New map';
  showBest();
  $('pa-share').hidden = false;
  overlay.classList.remove('hide');
  $('pa-wrap').classList.add('menu');
  syncUi();
  /* phones: the results sit under the field; scroll so the score and buttons are on screen */
  if (window.matchMedia && window.matchMedia('(max-width: 700px)').matches) setTimeout(() => $('pa-wrap').scrollIntoView({ block: 'start', behavior: 'smooth' }), 50);
}

/* ---------- share the result (win, loss or draw) ---------- */
const SHARE_URL = 'https://webdevpuneet.com/ui-snippets/pocket-artillery-game/';
function shareText() {
  const a = tanks[0].score, b = tanks[1].score, two = mode === 'two';
  const res = a === b ? 'drew ' + a + '-' + b : a > b ? (two ? 'Player 1 won ' : 'I won ') + a + '-' + b : (two ? 'Player 2 won ' : 'I lost ') + b + '-' + a;
  return 'Pocket Artillery: ' + res + (two ? '' : ' vs the CPU') + '. Can you beat it? ' + SHARE_URL;
}
/* Draws a 1080 x 1080 result card in memory (no screenshot, no download): title, score and the final battlefield. */
function makeCard(cb) {
  const S = 1080, c = document.createElement('canvas');
  c.width = S; c.height = S;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, S);
  grad.addColorStop(0, '#eaf4ff'); grad.addColorStop(1, '#fff3ef');
  g.fillStyle = grad; g.fillRect(0, 0, S, S);
  const a = tanks[0].score, b = tanks[1].score, two = mode === 'two';
  g.textAlign = 'center'; g.fillStyle = '#1e293b';
  g.font = '800 64px system-ui, sans-serif'; g.fillText('Pocket Artillery', S / 2, 130);
  g.font = '800 120px system-ui, sans-serif';
  g.fillStyle = a === b ? '#475569' : a > b ? '#e8553a' : '#3b63e0';
  g.fillText(a + '  :  ' + b, S / 2, 290);
  g.fillStyle = '#475569'; g.font = '700 44px system-ui, sans-serif';
  g.fillText(a === b ? 'A draw' : a > b ? (two ? 'Player 1 wins' : 'You win!') : (two ? 'Player 2 wins' : 'The CPU wins'), S / 2, 360);
  const w = 960, h = Math.round(w * H / W), x = (S - w) / 2, y = 410;
  g.save(); g.shadowColor = 'rgba(60,100,140,0.3)'; g.shadowBlur = 30; g.shadowOffsetY = 10;
  g.fillStyle = '#fff'; g.fillRect(x - 8, y - 8, w + 16, h + 16); g.restore();
  g.drawImage(canvas, x, y, w, h);
  g.fillStyle = '#1e293b'; g.font = '800 46px system-ui, sans-serif';
  g.fillText('Can you beat it?', S / 2, 1000);
  g.fillStyle = '#64748b'; g.font = '700 34px system-ui, sans-serif';
  g.fillText('Play free at webdevpuneet.com', S / 2, 1050);
  c.toBlob(cb, 'image/png');
}
let cardBlob = null;
function openFallback() {
  const t = encodeURIComponent(shareText());
  $('pa-sh-wa').href = 'https://wa.me/?text=' + t;
  $('pa-sh-x').href = 'https://twitter.com/intent/tweet?text=' + t;
  $('pa-sh-fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(SHARE_URL) + '&quote=' + t;
  $('pa-sharebox').hidden = false;
}
$('pa-share').addEventListener('click', () => {
  makeCard(blob => {
    cardBlob = blob;
    if (!blob) { openFallback(); return; }
    const file = new File([blob], 'pocket-artillery-result.png', { type: 'image/png' });
    const canNative = !!(navigator.canShare && navigator.canShare({ files: [file] }));
    const desktop = !(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    try { if (cardUrl) URL.revokeObjectURL(cardUrl); cardUrl = URL.createObjectURL(blob); $('pa-dl').href = cardUrl; } catch (e) {}
    $('pa-more').hidden = !canNative;
    if (canNative && !desktop) {
      /* phone or tablet: straight to the native share sheet with the image attached */
      doNativeShare(file);
    } else {
      /* desktop (or no file sharing): Copy image, Download image and links are always shown */
      openFallback();
    }
  });
});
let cardUrl = '';
function doNativeShare(file) {
  /* if the share sheet is not allowed here (for example inside an iframe), show Copy / Download / links instead; a user cancel does nothing */
  navigator.share({ files: [file], title: 'Pocket Artillery', text: shareText() }).catch(e => { if (!e || e.name !== 'AbortError') openFallback(); });
}
$('pa-more').addEventListener('click', () => {
  if (cardBlob) doNativeShare(new File([cardBlob], 'pocket-artillery-result.png', { type: 'image/png' }));
});
$('pa-copyimg').addEventListener('click', () => {
  const msg = $('pa-sharemsg');
  try {
    navigator.clipboard.write([new ClipboardItem({ 'image/png': cardBlob })]).then(
      () => { msg.textContent = 'Image copied. Paste it into your chat or post.'; },
      () => { msg.textContent = 'Could not copy here. Try Download image.'; }
    );
  } catch (e) { msg.textContent = 'Copying images is not supported here. Try Download image.'; }
});
$('pa-play').addEventListener('click', () => newGame(Math.floor(Math.random() * 1e9)));
$('pa-daily').addEventListener('click', () => {
  newGame(todayKey(), true);
});

/* ---------- drawing ---------- */
function cloud(x, y, s) {
  ctx.fillStyle = theme.cloud;
  ctx.beginPath();
  ctx.ellipse(x, y, 30 * s, 10 * s, 0, 0, 7);
  ctx.ellipse(x - 16 * s, y + 3 * s, 18 * s, 8 * s, 0, 0, 7);
  ctx.ellipse(x + 18 * s, y + 3 * s, 20 * s, 8 * s, 0, 0, 7);
  ctx.fill();
}

/* Ground texture: drawn once per theme on a hidden canvas (strata, speckles, pebbles), then clipped to the live terrain shape every frame so craters cut through it. */
const texCache = {};
function groundTex() {
  if (texCache[theme.name] && texCache[theme.name].k === SCALE) return texCache[theme.name];
  const c = document.createElement('canvas');
  c.width = Math.round(W * SCALE); c.height = Math.round(H * SCALE); c.k = SCALE;
  const g = c.getContext('2d'), rr = mulberry32(99);
  g.scale(SCALE, SCALE);
  for (let b = 0; b < 8; b++) {
    const y0 = 140 + b * 30;
    g.beginPath();
    for (let x = 0; x <= W; x += 8) { const y = y0 + Math.sin(x / 55 + b * 1.7) * 6; if (x) g.lineTo(x, y); else g.moveTo(x, y); }
    g.strokeStyle = 'rgba(0,0,0,0.07)'; g.lineWidth = 3; g.stroke();
    g.translate(0, 3); g.strokeStyle = 'rgba(255,255,255,0.14)'; g.lineWidth = 1.5; g.stroke(); g.translate(0, -3);
  }
  for (let i = 0; i < 800; i++) {
    g.fillStyle = i % 3 ? 'rgba(0,0,0,0.13)' : 'rgba(255,255,255,0.3)';
    const z = 0.8 + rr() * 1.4;
    g.fillRect(rr() * W, 110 + rr() * (H - 110), z, z);
  }
  for (let i = 0; i < 46; i++) {
    const x = rr() * W, y = 125 + rr() * (H - 125), a = 2.5 + rr() * 3.5;
    g.fillStyle = 'rgba(0,0,0,0.11)'; g.beginPath(); g.ellipse(x, y, a, a * 0.65, 0, 0, 7); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.3)'; g.beginPath(); g.ellipse(x - a * 0.25, y - a * 0.25, a * 0.5, a * 0.3, 0, 0, 7); g.fill();
  }
  texCache[theme.name] = c;
  return c;
}

function drawTank(t, active) {
  const y = t.dy, s = t.x < W / 2 ? 1 : -1;
  const slope = Math.atan2(ground[Math.min(W, Math.round(t.x + 9))] - ground[Math.max(0, Math.round(t.x - 9))], 18);
  ctx.save();
  ctx.translate(t.x, y); ctx.rotate(slope * 0.9);
  ctx.fillStyle = '#475569';
  ctx.beginPath(); ctx.roundRect(-14, -7, 28, 8, 4); ctx.fill();
  ctx.fillStyle = t.col;
  ctx.beginPath(); ctx.roundRect(-12, -12, 24, 8, 3); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -12, 7, Math.PI, 0); ctx.fill();
  ctx.restore();
  const rad = t.a * Math.PI / 180;
  ctx.strokeStyle = t.dark; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(t.x, y - 14); ctx.lineTo(t.x + Math.cos(rad) * 17, y - 14 - Math.sin(rad) * 17); ctx.stroke();
  if (t.buried) {
    ctx.fillStyle = theme.soil[0]; ctx.beginPath(); ctx.arc(t.x, y + 3, 21, Math.PI, 0); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.14)';
    for (let k = 0; k < 9; k++) ctx.fillRect(t.x - 16 + k * 4, y - 3 - ((k * 7) % 12), 2, 2);
    ctx.strokeStyle = theme.grass; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(t.x, y + 3, 21, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();
  }
  ctx.fillStyle = theme.ink; ctx.font = '700 9px system-ui, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(t.name, t.x, y - 28);
  if (active) {
    const b = Math.sin(performance.now() / 180) * 2;
    ctx.fillStyle = t.col;
    ctx.beginPath(); ctx.moveTo(t.x - 5, y - 44 + b); ctx.lineTo(t.x + 5, y - 44 + b); ctx.lineTo(t.x, y - 37 + b); ctx.fill();
  }
}

function draw() {
  ctx.save();
  if (shake > 0.3) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, theme.sky[0]); sky.addColorStop(1, theme.sky[1]);
  ctx.fillStyle = sky; ctx.fillRect(-10, -10, W + 20, H + 20);
  if (theme.stars) {
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 46; i++) {
      ctx.globalAlpha = 0.45 + 0.45 * Math.abs(Math.sin(performance.now() / 700 + i * 2.1));
      ctx.fillRect((i * 97) % W, (i * 53) % 150, i % 5 === 0 ? 2 : 1.4, i % 5 === 0 ? 2 : 1.4);
    }
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = theme.sun; ctx.beginPath(); ctx.arc(W - 70, 52, 24, 0, 7); ctx.fill();
  clouds.forEach(c => cloud(c.x, c.y, c.s));
  drawPlane();
  ctx.fillStyle = theme.hills;
  ctx.beginPath(); ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 8) ctx.lineTo(x, H * 0.55 + Math.sin(x / 70 + 1) * 26 + Math.sin(x / 29) * 8);
  ctx.lineTo(W, H); ctx.fill();

  liveBirds().forEach(b => {
    ctx.save(); ctx.translate(b.x, b.y);
    if (b.alive) ctx.scale(b.dir, 1); else { ctx.rotate(b.spin); ctx.globalAlpha = Math.max(0.2, 1 - b.fall / 6); }
    const w = b.alive ? Math.sin(b.ph) * 6 : 5;
    ctx.strokeStyle = theme.ink; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(-9, w); ctx.quadraticCurveTo(-4, -4 + w * 0.3, 0, 0); ctx.quadraticCurveTo(4, -4 + w * 0.3, 9, w); ctx.stroke();
    ctx.restore();
  });
  if (tanks.length) {
    const soil = ctx.createLinearGradient(0, 120, 0, H);
    soil.addColorStop(0, theme.soil[0]); soil.addColorStop(1, theme.soil[1]);
    ctx.fillStyle = soil;
    ctx.beginPath(); ctx.moveTo(0, H + 4);
    for (let x = 0; x <= W; x++) ctx.lineTo(x, ground[x]);
    ctx.lineTo(W, H + 4); ctx.fill();
    ctx.save(); ctx.clip(); ctx.drawImage(groundTex(), 0, 0, W, H); ctx.restore();
    /* soft shadow under the grass edge, then little grass tufts that follow the live surface */
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let x = 0; x <= W; x += 2) { if (x) ctx.lineTo(x, ground[x] + 6); else ctx.moveTo(x, ground[x] + 6); }
    ctx.stroke();
    ctx.strokeStyle = theme.grass; ctx.lineWidth = 5; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let x = 0; x <= W; x += 2) { if (x) ctx.lineTo(x, ground[x] + 1); else ctx.moveTo(x, ground[x] + 1); }
    ctx.stroke();

    ctx.strokeStyle = theme.grass; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
    ctx.beginPath();
    for (let x = 3; x < W; x += 5) {
      const h = 2 + ((x * 7919) % 5), gy = ground[x];
      ctx.moveTo(x, gy); ctx.lineTo(x + ((x * 31) % 3) - 1, gy - h - 1);
    }
    ctx.stroke();
    drawCritter();
    tanks.forEach((t, i) => drawTank(t, (phase === 'aim' || phase === 'cpu') && who() === i));

    if (phase === 'aim') {
      const t = cur(), rad = t.a * Math.PI / 180;
      if (drag) {
        ctx.strokeStyle = 'rgba(30,41,59,0.45)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
        ctx.beginPath(); ctx.moveTo(drag.x, drag.y); ctx.lineTo(t.x, t.y - 14); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = t.col; ctx.beginPath(); ctx.arc(drag.x, drag.y, 6, 0, 7); ctx.fill();
      }
      if (mode === 'cpu' && diff === 0 && lastPath[who()].length > 1) {
        /* Easy only: faint ghost of this player's previous shot, so the next aim can be corrected from it. */
        const lp = lastPath[who()];
        ctx.strokeStyle = t.col; ctx.globalAlpha = 0.3; ctx.lineWidth = 2; ctx.setLineDash([2, 5]);
        ctx.beginPath(); ctx.moveTo(lp[0].x, lp[0].y);
        for (let i = 1; i < lp.length; i++) ctx.lineTo(lp[i].x, lp[i].y);
        ctx.stroke(); ctx.setLineDash([]);
        const e = lp[lp.length - 1];
        ctx.beginPath(); ctx.arc(e.x, e.y, 4, 0, 7); ctx.stroke(); ctx.globalAlpha = 1;
      }
      if (drag && mode === 'cpu' && diff === 0) {
        /* Easy only: dotted preview of the first part of the flight, using the same gravity and wind as a real shell. */
        const sp = t.p * POWER_K;
        let px = t.x + Math.cos(rad) * 18, py = t.y - 12 - Math.sin(rad) * 18, pvx = Math.cos(rad) * sp, pvy = -Math.sin(rad) * sp;
        ctx.fillStyle = t.col;
        for (let i = 1; i <= 70; i++) {
          pvx += wind * WIND_K; pvy += GRAVITY; px += pvx; py += pvy;
          if (px < 0 || px > W || py >= ground[Math.round(px)]) break;
          if (i % 4 === 0) { ctx.globalAlpha = 0.75 - i / 110; ctx.beginPath(); ctx.arc(px, py, 2.2, 0, 7); ctx.fill(); }
        }
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = t.col; ctx.globalAlpha = 0.6;
      for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.arc(t.x + Math.cos(rad) * (18 + k * 11), t.y - 14 - Math.sin(rad) * (18 + k * 11), 2, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
    }
    shots.forEach(s => {
      const tc = s.col || s.w.col;
      s.trail.forEach((p, i) => { const q = i / s.trail.length; ctx.fillStyle = tc; ctx.globalAlpha = q * 0.4; ctx.beginPath(); ctx.arc(p.x, p.y, 0.8 + q * 2.2, 0, 7); ctx.fill(); });
      ctx.globalAlpha = 1;
      if (!s.dead) drawShot(s);
    });
    vort.forEach(v => {
      const q = v.t / 45;
      ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 2.5; ctx.globalAlpha = Math.min(1, q * 1.5);
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        for (let j = 0; j <= 16; j++) { const u = j / 16, rr = (1 - u) * 46 * q + 2, a = k * 2.094 + u * 5 + (1 - q) * 9, px = v.x + Math.cos(a) * rr, py = v.y + Math.sin(a) * rr; if (j) ctx.lineTo(px, py); else ctx.moveTo(px, py); }
        ctx.stroke();
      }
      ctx.fillStyle = '#0b0b14'; ctx.beginPath(); ctx.arc(v.x, v.y, 7 * q + 2, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
    });
    fires.forEach(f => {
      const gx = ground[Math.max(0, Math.min(W, Math.round(f.x)))], fade = Math.min(1, f.t / 30), tm = performance.now() / 90;
      for (let k = -3; k <= 3; k++) {
        const h = (10 + Math.abs(Math.sin(tm + k * 1.7)) * 12) * fade, fx = f.x + k * 8;
        ctx.fillStyle = k % 2 ? '#f97316' : '#fbbf24';
        ctx.beginPath(); ctx.moveTo(fx - 6, gx + 1); ctx.lineTo(fx, gx - h); ctx.lineTo(fx + 6, gx + 1); ctx.fill();
      }
    });
    bolts.forEach(b => {
      ctx.strokeStyle = '#facc15'; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.globalAlpha = Math.min(1, b.t / 8);
      ctx.beginPath(); ctx.moveTo(b.x1, b.y1);
      for (let k = 1; k < 7; k++) ctx.lineTo(b.x1 + (b.x2 - b.x1) * k / 7 + (Math.random() - 0.5) * 16, b.y1 + (b.y2 - b.y1) * k / 7 + (Math.random() - 0.5) * 16);
      ctx.lineTo(b.x2, b.y2); ctx.stroke(); ctx.globalAlpha = 1;
    });
    beams.forEach(b => {
      const q = b.t / 34, gy = ground[Math.max(0, Math.min(W, Math.round(b.x)))] + 8, wd = 12 * q + 3;
      ctx.globalAlpha = Math.min(1, q * 1.6);
      ctx.fillStyle = 'rgba(103,232,249,0.35)'; ctx.fillRect(b.x - wd, 0, wd * 2, gy);
      ctx.fillStyle = '#ecfeff'; ctx.fillRect(b.x - (2.5 * q + 1), 0, (2.5 * q + 1) * 2, gy);
      ctx.globalAlpha = 1;
    });
    drawBlasts();
    rings.forEach(r => { ctx.strokeStyle = r.col; ctx.globalAlpha = 0.6; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; });
    parts.forEach(p => { ctx.fillStyle = p.col; ctx.globalAlpha = Math.min(1, p.life / 20); ctx.fillRect(p.x, p.y, 3, 3); ctx.globalAlpha = 1; });
    floats.forEach(f => { ctx.globalAlpha = Math.min(1, f.t / 20); ctx.fillStyle = f.col; ctx.font = '800 16px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(f.txt, f.x, f.y); ctx.globalAlpha = 1; });

    /* Wind badge only when there is wind (Hard): one chevron per wind point, pointing the way the wind blows */
    if (wind !== 0) {
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath(); ctx.roundRect(W / 2 - 56, 8, 112, 22, 11); ctx.fill();
      ctx.fillStyle = '#334155'; ctx.font = '700 12px system-ui, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('Wind ' + (wind < 0 ? '\\u2039' : '\\u203a').repeat(Math.abs(wind)) + ' ' + Math.abs(wind), W / 2, 23);
    }
  }
  if (tanks.length) {
    ctx.fillStyle = theme.ink; ctx.globalAlpha = 0.7; ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(theme.name + ' · ' + mapKind, 10, 19); ctx.globalAlpha = 1;
    if (phase === 'aim' && cur().buried) {
      ctx.fillStyle = '#dc2626'; ctx.font = '800 12px system-ui, sans-serif';
      ctx.fillText('Buried! Fire Dirt Remover first, or you blow yourself up', 10, 38);
    }
  }
  ctx.restore();
}

let last = performance.now(), acc = 0;
function frame(now) {
  acc += Math.min(0.05, (now - last) / 1000); last = now;
  while (acc >= 1 / 60) { birdsStep(); if (tanks.length && phase !== 'menu') step(); acc -= 1 / 60; }
  draw();
  requestAnimationFrame(frame);
}

buildMap(20261113);
phase = 'menu';
syncUi();
showBest();
requestAnimationFrame(frame);`,

  seo: {
    title: 'Pocket Artillery – Free HTML, CSS & JS Tank Duel Game',
    description: 'Free tank duel game in plain JavaScript: destructible terrain, 27 weapons with big blasts, a plane to shoot down, wildlife and a daily streak. Copy it.',
    about: {
      title: 'Pocket Artillery — Drag-to-Aim, Destructible Terrain, a Shuffled Hand of Weapons & an AI That Simulates Its Shots',
      description: `Artillery duels are one of the oldest game ideas on the PC: two tanks, a hill between them, and a guess at angle and power. Pocket Artillery is a reimagined game inspired by the classic Pocket Tanks, rebuilt from scratch with its own look, weapons and code. This snippet is a bright, light-themed canvas version you can play at once: 6, 10 or 15 shots each (10 by default), a hand of one weapon per shot dealt from a pool of 27 when the match starts (each fired only once), wind on the Hard level, birds, a plane and wildlife in the sky, big explosions that fit each weapon, and terrain that really crumbles when it is hit. Careful where you aim: a blast that lands on your own tank costs you points. Pull back on the field like a slingshot to aim, drive your tank a short way to find a better spot, play the CPU on three levels, or hand the device to a friend for a two-player duel. Pick your terrain (Meadow, Desert, Snow or Night), try the Valley map, and use the streak counter on the Daily map give you a reason to come back tomorrow.

**Terrain as a height map you can carve**

The ground is one array, \`ground[x]\`, holding the surface height of every pixel column. A blast calls \`crater(cx, cy, r)\`, which lowers each column inside the circle to the bottom of that circle, and the Dirt Ball does the opposite with \`addDirt()\`. Because the map is just numbers, collision is a single lookup (\`s.y >= ground[Math.round(s.x)]\`), the tanks settle by reading the same array, and the soil and grass are drawn from it every frame.

**Ballistics with wind on a fixed time step**

Each shell gets a velocity from the angle and power (\`speed = power * 0.085\`), then gravity pulls \`vy\` down and the wind adds a small sideways push each step (only on Hard; Easy, Normal and 2-player have no wind, so the same angle and power always land in the same spot). The loop runs on a 60 Hz accumulator, so the flight is identical on a 144 Hz monitor, and the same step rule is reused by the CPU when it plans a shot.

**A CPU that tests shots before it fires**

On its turn the computer tries about 1,300 angle and power pairs through \`simulate()\`, a copy of the physics that stops at the first terrain hit, and keeps the pair that lands closest to your tank. Then it adds a random error, with an occasional bigger slip. The three levels only change those numbers: Easy errs by about 6 degrees and slips often, Normal by 2.4, Hard by under 1, so the same code gives a beatable opponent or a sharp one.

**Scoring by closeness**

A blast scores \`pts * (1 - distance / reach)\` for the enemy tank, so a direct hit is worth the full value and a near miss still pays a little. Each weapon trades radius against points: the Mini Nuke covers a huge area for fewer points, and the Dirt Ball scores nothing but buries a tank: the buried tank must fire a Dirt Remover first, because any other shot goes off on its own tank.

**Friendly fire**

The same formula runs for your own tank. If a blast reaches the tank that fired it, the shooter loses \`pts * (1 - distance / reach)\` points (at least 5, and weapons worth 0 count as 50), a red "Friendly fire!" label floats up, and the score is allowed to go below zero. A burning Napalm patch costs 12 points per tick if you stand in your own flames.

**Weapons with their own behaviour**

The Roller lands, then runs along the height map, faster downhill, until it meets a wall, a tank or runs out of steps. The Digger carves five stacked craters straight down and scores only on a tight radius. The Triple fires three shells 7 degrees apart, the Bouncer hops twice before it explodes, and the Napalm leaves a flame patch that keeps scoring while an enemy tank stands in it. The Cluster splits into five bomblets at the top of its arc, the Zapper arcs lightning to a tank within 130 pixels, the Homing dart locks on when it passes close to its target, the Sticky bomb glues itself to whatever it touches and blows up after a blink, the light Balloon is carried far by the wind, and Meteors rain from the sky around the impact. Six more were added for fun: the Firework bursts into ten coloured sparks at the top of its arc, the Popcorn pops four times along the ground, the Mole lands and burrows toward the enemy digging a trench, the Snowball rolls and grows bigger as it goes, the Black Hole swallows a huge crater with a spinning vortex, and the Boomerang curves back toward you in flight. Each one is a few lines in fire(), step() or explode(), keyed by its id.

**Explosions that match the weapon**

A visual-only layer draws a different blast for each weapon family. Missiles and rollers get a fireball with rays and embers, the Big Boom and Mini Nuke send out concentric shockwave rings (the nuke adds a white flash), the Zapper throws radial lightning with glowing discs, each Firework spark leaves rainbow streaks and a ring of beads, the Snowball raises ice spikes, and the Dirt Ball sprays dust. The real blast is still just a crater and a score, so these effects can be changed freely.

**A fresh hand every match**

At the start of a match the weapon buttons flicker through random names, then settle on ten weapons dealt from the pool of 27 with a seeded shuffle. You pick 6, 10 or 15 shots each on the start menu (the Daily map is always 10) and the hand has one weapon per shot, so every weapon in it gets fired once. The Daily map uses the date as the seed, so everyone gets the same map, theme and hand that day.

**Move, bury and dig out**

Hold the move buttons or the A and D keys to drive up to 50 pixels a turn. Slopes that are too steep, craters, the field edge and the other tank all block the move. A Dirt Ball that lands on a tank buries it, and a buried tank that fires anything but the Dirt Remover blows itself up for a 40 point penalty, so the Remover digs a trench in the fired direction to set it free. A hand with a Dirt Ball always includes a Remover.

**A sky with birds, four themes and textured soil**

Birds flap across the sky, none on Easy, one on Normal and two on Hard, and a shell that touches one is wasted. A little propeller plane drifts past near the high clouds, and a shell that hits it shoots it down: it tumbles, trailing smoke, and crashes in a fireball. If it lands on a tank, the shooter scores 100 points when it is the enemy tank and loses 100 when it is their own. Now and then a deer (Meadow), camel (Desert) or polar bear (Snow) walks in at the edge of the field and watches the battle. Blasts and shells can kill it; it vanishes and walks back in later, with no score change. The seed picks one of four colour themes unless you choose a terrain (Meadow, Desert, Snow or Night with twinkling stars) and sometimes a Valley map with high ridges and a deep dip. The soil texture is drawn once per theme to a hidden canvas and clipped to the live terrain, so craters cut straight through it.

**Drag to aim, or play two-player**

On the field, a pointer drag measures the pull from the tank: the direction gives the angle and the length gives the power, so it feels like a slingshot and works the same with a mouse or a finger. In the two-player mode the same controls act on whichever tank is up (cur()), and the CPU turn is simply skipped.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start a match', text: 'Choose "vs CPU" (Easy, Normal or Hard) or "2 players", pick a terrain (Random, Meadow, Desert, Snow or Night), choose Random weapons or pick up to ten yourself (both tanks get the same ones), then press "Play" for a map or "Daily map" for the same map everyone gets today. You are the coral tank on the left.' },
        { title: 'Set angle and power', text: 'Drag on the field away from your tank like a slingshot (the pull sets both), or use the sliders, or the arrow keys (Shift moves five at a time). A dotted line shows where the barrel points, and on Easy a dotted arc previews the first part of the flight while you drag and a faint ghost line shows where your previous shot went.' },
        { title: 'Move your tank', text: 'Hold the left and right arrow buttons beside the Fire button, or the A and D keys, to drive up to 50 pixels each turn. Steep slopes, craters (holes), the field edge and the other tank block you, and the Move number shows how much is left.' },
      { title: 'Read the wind', text: 'On Hard the Wind badge at the top shows the direction and strength for this turn (Easy, Normal and 2-player have no wind, so the same angle and power always land in the same spot). Aim a little into it so the shell drifts back onto the target.' },
        { title: 'Pick a weapon and fire', text: 'The weapon list shuffles at the start of every match and deals you ten of 27 weapons (the Daily map deals everyone the same hand). Choose one (keys 1 to 9 and 0, hover for a tip) and press "Fire!" or Space. Each weapon can be used once per match, and you get one shot per weapon (6, 10 or 15, chosen on the start menu), so every weapon in your hand gets used once.' },
        { title: 'Score the closest blast', text: 'Watch your own tank: a blast that reaches it costs you points, and the score can go negative. Shoot down the plane for a bonus if it crashes on the enemy. After the last shot the higher score wins. Your best score is saved in the browser. Finish the Daily map on consecutive days to build a streak.' },
      ],
    },
    features: [
      'Destructible terrain stored as a one-dimensional height map, carved by craters and raised by dirt',
      'Wind that changes every turn on Hard and bends the shells, shown in a badge on the field; Easy, Normal and 2-player are calm',
      'A shuffled hand of ten weapons from a pool of 27, each usable once, 6, 10 or 15 shots per player: Missile, Big Boom, Triple, Bouncer, Mini Nuke, Roller, Digger, Napalm, Dirt Ball, Cluster, Zapper, Homing, Sticky, Balloon, Meteors, Dirt Remover, Firework, Popcorn, Mole, Snowball, Black Hole, Boomerang, Laser Strike, Quake, Magnet, Volcano and Teleporter',
      'Bury and dig out: a Dirt Ball that lands on a tank buries it, a buried tank that fires anything else blows itself up (-40 points), and the Dirt Remover digs a trench in the fired direction to free it; a hand with a Dirt Ball always includes a Dirt Remover',
      'Creative weapons: Cluster splits into bomblets, Zapper arcs lightning to a nearby tank, Homing locks on when it passes close to the enemy, Sticky glues to a tank and blows up, Balloon floats down in slow motion, Meteors rain from the sky',
      'Friendly fire: any weapon whose blast reaches your own tank costs you points, and the score can go below zero',
      'Dramatic blast effects per weapon: fireballs with embers, shockwave rings, lightning, rainbow streaks, ice spikes and dust',
      'A plane you can shoot down: it tumbles, crashes in a fireball, and scores 100 points if it lands on the enemy tank (or costs 100 on your own)',
      'Wildlife that matches the terrain (deer, camel or polar bear) walks in to watch the battle; blasts can kill it and it returns later',
      'Drag-to-aim on the field, slingshot style, plus sliders and keyboard controls',
      'Easy level also keeps a faint ghost of your previous shot on the field, like Worms, so the next aim can be corrected from it',
      'Wind badge shows one chevron per wind point in the direction it blows',
      'Easy level shows a dotted trajectory preview while dragging, so new players learn what angle, power and wind do',
      'Two-player hot-seat mode on one device, or a CPU with Easy, Normal and Hard levels',
      'CPU opponent that simulates around 1,300 shots, picks the closest and adds a level-based human-like error',
      'Distance-based scoring, so near misses still earn points',
      'Daily map from a date seed plus a random map button, using a small seeded random generator',
      'Tank movement: hold the move buttons or A and D for up to 50 pixels per turn, blocked by steep slopes, craters, the edges and the other tank; the CPU shuffles a little on Normal and Hard',
      'Birds flap across the sky (none on Easy, one on Normal, two on Hard); a shell that hits one is wasted, the bird tumbles down with feathers, and the next turn begins',
      'Textured ground: soil strata, speckles and pebbles drawn once to a hidden canvas per theme and clipped to the terrain, plus grass tufts that follow the surface',
      'Choose your terrain (Random, Meadow, Desert, Snow or Night) and your weapons (random, or pick up to ten that both tanks share; the Daily map stays fixed for everyone): four colour themes (Meadow, Desert, Snow, Night with twinkling stars) and a Valley map type with high ridges and a deep dip, all chosen from the map seed',
      'Daily streak and the best daily score kept in localStorage, so there is a reason to come back tomorrow',
      'Fixed 60 Hz physics step, so shell flight is the same on every screen refresh rate',
      'Bright light theme with a sky, clouds and soft hills, plus particles, rings and screen shake',
      'Mouse, touch and keyboard controls, Web Audio sound with a mute button, best score in localStorage',
    ],
    useCases: [
      { icon: 'APP', title: 'Quick arcade mini-game for a site', desc: 'A match takes about two minutes and needs no assets or libraries, so it fits an Easter egg page, a 404 screen or a "while you wait" corner.' },
      { icon: 'LEARN', title: 'Teaching projectile motion', desc: 'Angle, power, gravity and wind are all visible and adjustable, which makes the game a hands-on demo for a physics or maths lesson.' },
      { icon: 'CODE', title: 'Reference for height-map terrain', desc: 'Carving and filling a column array is the simplest way to get destructible ground, and the code shows it in under 20 lines.' },
      { icon: 'FLOW', title: 'Example of an AI that plans by simulation', desc: 'The CPU does not cheat: it runs the same physics offline, scores each result and picks the best, a pattern reused in many turn-based games.' },
      { icon: 'DESIGN', title: 'Branded reskin for a campaign', desc: 'Swap the tank colours, the sky and the weapon names for brand versions to make a "beat our mascot" promo game.' },
      { icon: 'APP', title: 'Local two-player duel on one screen', desc: 'The built-in 2 players mode hands the same controls to each tank in turn, which suits a classroom, a break room or a phone passed between friends.' },
      { icon: 'APP', title: 'Daily challenge with a streak', desc: 'The Daily map gives everyone the same map and weapon hand, and the saved streak and best daily score show a simple way to bring visitors back each day without a server.' },
      { icon: 'CODE', title: 'Related: Tank Arena', desc: 'See the [Tank Arena](/ui-snippets/tank-arena-game/) for a top-down tank shooter that pairs well with this turn-based duel.' },
    ],
    faqs: [
      { q: 'How does the terrain get destroyed?', a: 'The ground is an array with one surface height per pixel column. A blast lowers every column inside its circle to the bottom of that circle, so the hole is round, and the tanks then read the new height and drop down into it.' },
      { q: 'Why does the CPU not always hit me?', a: 'It finds the best angle and power by simulating many shots, then adds a random error of a couple of degrees, and now and then a bigger one. Lower the error values in LEVELS for a harder opponent or raise them for an easier one.' },
      { q: 'How is the wind applied?', a: 'Each physics step adds wind * 0.0025 to the shell\'s horizontal speed. The wind is a whole number from -5 to 5 picked from the seeded generator at the start of every turn, and it is forced to 0 everywhere except the Hard CPU level.' },
      { q: 'How does the daily streak work?', a: 'Finishing a vs-CPU match on the Daily map stores the date and score in localStorage. If the last finished daily was yesterday the streak goes up by one, otherwise it restarts at 1. Two-player matches do not count.' },
      { q: 'What is friendly fire?', a: 'If a blast reaches the tank that fired it, the shooter loses points using the same distance formula as a hit on the enemy, with a minimum of 5. Weapons that normally score nothing count as 50. The score can go below zero.' },
      { q: 'Can I shoot the plane or the animals?', a: 'Yes. A shell that touches the plane shoots it down; if it crashes onto a tank, the shooter gets 100 points for the enemy tank or loses 100 for their own. Blasts can also kill the animal at the field edge, which returns later.' },
      { q: 'How does Napalm work?', a: 'It makes a small crater, then adds a fire object at that spot that lasts 150 steps. Every 25 steps an enemy tank within about 30 pixels of it gives the shooter 12 points, and the next turn waits until the flames die out.' },
      { q: 'How do I add a new theme?', a: 'Add an object to the THEMES array with a name, two sky colours, a sun colour, hill colour, two soil colours, a grass colour, a cloud colour and a text colour. Themes change colours only, so no other code needs to change.' },
      { q: 'What happens when a shell hits a bird?', a: 'The number of birds depends on the level: none on Easy, one on Normal and in 2-player, two on Hard. Each bird is a small object with a position, speed and flap phase. If a shell comes within about 12 pixels, the shell is marked dead without exploding, the bird switches to a falling state with feather particles, and the turn moves on. It respawns off screen after it drops.' },
      { q: 'How does tank movement work?', a: 'While a move button or the A or D key is held, the active tank moves 1.5 pixels per physics step, up to 50 pixels per turn. A move is refused if the new column is more than 3 pixels higher or lower, if the spot is a hole (clearly lower than the ground 12 pixels away on both sides), if it leaves the field, or if it would come within 36 pixels of the other tank. The tank then reads the height of its new column, so it follows the terrain.' },
      { q: 'How does the weapon shuffle work?', a: 'When a match starts, dealHand(seed) shuffles the POOL array with a seeded Fisher-Yates shuffle and keeps the first ten. The buttons flicker through random names for about a second as a shuffle effect, then show the hand. Because the Daily map uses the date as the seed, everyone gets the same hand that day.' },
      { q: 'What happens when a tank is buried?', a: 'A Dirt Ball that lands within its blast radius of a tank sets that tank buried flag and draws a mound over it. While buried, any weapon except the Dirt Remover explodes on the tank itself, costs the shooter 40 points and clears the dirt. The Dirt Remover carves a short trench along the barrel direction and clears the flag. A nearby blast from a normal weapon also frees a buried tank. The hand dealer always adds a Dirt Remover when the hand contains a Dirt Ball.' },
      { q: 'What is the daily map?', a: 'It seeds the random generator with today\'s date as a number, so the terrain, the theme, the tank positions and the wind sequence are the same for everyone that day.' },
      { q: 'How do I add a new weapon?', a: 'Add an entry to the POOL array with a name, blast radius, points and colour. Special behaviour such as the Triple spread, the Bouncer hops, the Roller run or the Digger tunnel lives in fire(), step() and explode(), keyed by the weapon id. The weapon buttons are built from the array, so a new entry shows up by itself.' },
      { q: 'How do I change the CPU difficulty?', a: 'Edit the LEVELS array: err is the aim error in degrees and slip is the chance of a bigger mistake. Easy, Normal and Hard just select one of the three rows, and the search over angles and powers stays the same.' },
      { q: 'How does drag-to-aim work?', a: 'A pointerdown on the canvas starts a drag. The vector from the pointer to the tank gives the angle (atan2) and its length divided by 1.3 gives the power, and both are clamped. Pointer events and touch-action: none make it work for mouse and touch.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the height-map terrain, the fixed-step physics and the simulate() function the CPU uses fit together, then ask for a new weapon such as a freeze ray that locks a tank for a turn, or a campaign of maps with rising CPU levels.`,
      prompt: `Build a turn-based artillery tank duel with the HTML5 Canvas API in plain HTML, CSS and JavaScript, no frameworks and no audio files.
- Light, bright look: pale sky gradient, clouds, soft hills, green-topped soil, one coral tank (player, left) and one blue tank (CPU, right).
- Store terrain as a height array with one value per pixel column. Explosions carve a circular crater by lowering columns; a Dirt Ball weapon raises them. Tanks sit on the surface and settle after each blast.
- Controls: Angle slider 0-180, Power slider 10-100, Fire button, arrow keys to aim (Shift for bigger steps), Space to fire, keys 1-9 and 0 to choose a weapon, and slingshot-style drag on the field (pull back from the tank: direction = angle, length = power). Works with touch.
- Physics on a fixed 60 Hz step: shell velocity from angle and power, constant gravity, and a per-turn wind from -5 to 5 shown in a badge (wind only on the Hard level).
- A pool of 27 weapons; at the start of each match the weapon buttons flicker through random names (a shuffle animation) and settle on a hand of ten, the Daily map dealing everyone the same hand. Hover shows a tip. Each usable once per match. Extra pool weapons: Cluster (splits into 5 bomblets at the apex), Zapper (lightning to a tank within 130 px, +25), Homing (normal arc, locks on within 60 px of the enemy), Sticky (sticks to a tank or the ground, blinks, explodes after about 1.4 s), Balloon (floats down the standard arc in slow motion), Meteors (four meteors fall around the impact). Base weapons: Missile, Big Boom (large radius), Triple (three shells spread by 7 degrees), Bouncer (two hops), Mini Nuke (huge crater, fewer points), Roller (rolls along the ground after landing), Digger (five stacked craters straight down), Napalm (small blast that leaves a burning patch scoring 12 points every 25 frames an enemy tank stands in it), Dirt Ball (no points, but it buries a tank that lands inside its radius). Also a Dirt Remover weapon: a buried tank that fires anything else blows up on itself for a 40 point penalty, the Dirt Remover digs a trench along the barrel direction and frees it, and a dealt hand with a Dirt Ball always includes a Dirt Remover.
- Every weapon flies the same standard arc, so the same angle and power (and wind) always land on the same spot; weapons only differ in what happens at the apex or on landing (Balloon is the same arc in slow motion, Boomerang swings out and returns to it, Homing only locks on near the enemy).
- 6, 10 or 15 shots each (picked on the start menu, 10 by default, the Daily map always 10), alternating, one per weapon in the hand. Score the enemy by blast distance: pts * (1 - distance / (radius + 13)), with floating +points text.
- CPU opponent with Easy, Normal and Hard levels (aim error and slip chance): pick an unused weapon, try many angle and power pairs with an offline simulate() copy of the physics, choose the closest landing to the player, add a random error. Also a 2 players mode on one device that swaps the controls between the tanks.
- On the Easy level only, while dragging, draw a short dotted trajectory preview using the same gravity and wind as a real shell.
- On Easy, also keep a faint dashed ghost arc of the previous shot visible during the next aim. The wind badge shows one chevron per wind point in the wind direction.
- Give the soil a texture (wavy strata lines, speckles, pebbles) pre-rendered to an offscreen canvas per theme and clipped to the terrain shape each frame, with a soft shadow under the grass edge and small grass tufts along the surface.
- Four colour-only themes (Meadow, Desert, Snow, Night with twinkling stars) and a Valley map type (high ridges at both ends, deep dip in the middle), the theme is chosen by the player or, on Random, from a hash of the map seed and named in a small label on the field.
- Birds fly across the sky (none on Easy, one on Normal and 2-player, two on Hard) with flapping wings. A shell that touches a bird is wasted: the bird falls with feather particles and the turn passes on.
- Tank movement: hold on-screen left/right buttons or the A and D keys to drive up to 50 pixels per turn (1.5 px per step), blocked by slopes steeper than 3 px per step, holes (a spot more than 6 px below the ground 12 px away on both sides), the field edge and the other tank. The CPU on Normal and Hard moves 15-50 px on its own half before shooting.
- Random map button, Daily map button seeded from the date, best score and a daily streak (consecutive days the daily map was finished, with today's score) saved in localStorage inside try/catch.
- Also six extra weapons: Firework (bursts into ten coloured sparks at the apex), Popcorn (four small pops along the ground, then a final bang), Mole (lands, then burrows towards the enemy digging a trench and explodes on a tank or after about 80 steps), Snowball (rolls and grows, bigger blast the further it rolls), Black Hole (huge crater with a spinning vortex and particles pulled inward) and Boomerang (swings out past the standard arc and curves back to the same landing spot; the CPU never picks it). Laser Strike (a beam from orbit at the landing x: deep shaft, hits the enemy anywhere in that column), Quake (two shockwaves run 3 px a frame along the surface, cracking it, +50 to the first tank reached), Magnet (drags the enemy up to 44 px toward the impact, stopping at crater edges and steep slopes), Volcano (raises a mound and spits six lava blobs, 30 pts each) and Teleporter (no damage, moves your own tank to the landing spot if it can stand there; the CPU never picks it).
- Friendly fire: any weapon whose blast reaches the tank that fired it subtracts pts * (1 - distance / reach) (min 5, zero-point weapons count as 50) from the shooter, with a red floating label; scores may go negative.
- Per-weapon blast effects: fireball with rays and embers, concentric shockwave rings (white flash for the nuke), radial lightning with glowing discs, rainbow streaks with a bead ring, ice spikes, dust.
- Each weapon has its own drawn sprite while flying (rocket, round bomb with a fuse, spinning wheel, drill, flame drop, balloon on a string and so on) and a matching emoji icon on its button.
- A propeller plane flies across near the clouds now and then. A shell that hits it makes it fall in a spin with smoke and crash with a fireball; if it lands within 30 px of a tank the shooter gets +100 for the enemy tank or -100 for their own.
- A wild animal that fits the terrain (deer on Meadow, camel on Desert, polar bear on Snow, deer or bear at Night) walks in at a field edge, watches, then leaves. Blasts and shells kill it (tumble and fade); it returns after 15-30 seconds. No score effect.
- A terrain picker on the start menu (Random, Meadow, Desert, Snow, Night) and a weapons option: Random weapons, or a picker panel where the player chooses up to 10 of the 22 (the rest are filled at random, both tanks share the hand, a Dirt Ball always brings a Dirt Remover). The Daily map ignores both.
- Particles, expanding rings, screen shake, Web Audio synth sounds with a mute button, a start overlay and a results overlay.`,
    },
  },
};

export default pocketArtilleryGame;
