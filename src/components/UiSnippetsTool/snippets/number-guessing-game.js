const numberGuessingGame = {
  id: 'number-guessing-game',
  title: 'Number Guessing Vault Cracker Game',
  lastmod: '2026-11-12',
  category: 'games',
  html: `<div class="ng-fit" id="ng-fit"><div class="ng-wrap" id="ng-wrap">
  <div class="ng-panel" id="ng-panel">
    <div class="ng-hud">
      <div class="ng-hud-left"><span class="ng-kicker" id="ng-kicker">Vault Cracker</span><span class="ng-name" id="ng-name">Pick a vault</span></div>
      <div class="ng-stat"><span class="ng-label">Tries</span><b id="ng-tries">0 / 0</b></div>
      <div class="ng-stat"><span class="ng-label">Range</span><b id="ng-range">1 - 100</b></div>
      <div class="ng-stat" id="ng-extra-wrap"><span class="ng-label" id="ng-extra-label">Par</span><b id="ng-extra">7</b></div>
      <div class="ng-hud-btns">
        <button class="ng-btn-sm" id="ng-coach-btn" type="button" aria-pressed="false" title="Coach (H)">Coach</button>
        <button class="ng-btn-sm" id="ng-mute" type="button" aria-pressed="false">Sound on</button>
        <button class="ng-btn-sm" id="ng-menu-btn" type="button" title="Menu (Esc)">Menu</button>
      </div>
    </div>

    <div class="ng-main">
      <div class="ng-left">
        <div class="ng-vault-row">
          <svg class="ng-door" id="ng-door" viewBox="0 0 180 180" aria-hidden="true">
            <defs>
              <radialGradient id="ng-g1" cx="40%" cy="35%" r="80%"><stop offset="0" stop-color="#7b88a8"/><stop offset="1" stop-color="#2b3350"/></radialGradient>
              <radialGradient id="ng-g2" cx="40%" cy="35%" r="80%"><stop offset="0" stop-color="#9aa6c4"/><stop offset="1" stop-color="#3a4468"/></radialGradient>
            </defs>
            <circle cx="90" cy="90" r="86" fill="url(#ng-g1)" stroke="#12172b" stroke-width="3"/>
            <circle cx="90" cy="90" r="70" fill="none" stroke="#1a2140" stroke-width="3"/>
            <g class="ng-bolts" id="ng-bolts"></g>
            <circle cx="90" cy="90" r="52" fill="url(#ng-g2)" stroke="#12172b" stroke-width="3"/>
            <g class="ng-wheel" id="ng-wheel">
              <circle cx="90" cy="90" r="34" fill="none" stroke="#cbd5e1" stroke-width="6"/>
              <g stroke="#cbd5e1" stroke-width="6" stroke-linecap="round"><line x1="90" y1="90" x2="90" y2="48"/><line x1="90" y1="90" x2="126" y2="111"/><line x1="90" y1="90" x2="54" y2="111"/></g>
              <circle cx="90" cy="48" r="7" fill="#e2e8f0"/><circle cx="126" cy="111" r="7" fill="#e2e8f0"/><circle cx="54" cy="111" r="7" fill="#e2e8f0"/>
              <circle cx="90" cy="90" r="11" fill="#fbbf24" stroke="#92400e" stroke-width="3"/>
            </g>
          </svg>
          <div class="ng-display-col">
            <div class="ng-display" id="ng-display"><span id="ng-disp">---</span></div>
            <p class="ng-msg" id="ng-msg">Type a number and press GO.</p>
            <div class="ng-dots" id="ng-dots"></div>
          </div>
        </div>
        <div class="ng-heat" id="ng-heat"><i></i><i></i><i></i><i></i><i></i><i></i><span id="ng-heat-label">No guess yet</span></div>
        <div class="ng-keypad" id="ng-keypad"></div>
      </div>

      <div class="ng-right">
        <div class="ng-box">
          <div class="ng-box-head"><span>Number line</span><em id="ng-line-note">The green part is still possible</em></div>
          <div class="ng-line" id="ng-line"><div class="ng-line-fill" id="ng-line-fill"></div><div class="ng-line-marks" id="ng-line-marks"></div></div>
          <div class="ng-line-ends"><span id="ng-end-lo">1</span><span id="ng-end-hi">100</span></div>
          <div class="ng-line ng-line-ai" id="ng-line-ai"><div class="ng-line-fill ng-ai-fill" id="ng-ai-fill"></div><div class="ng-line-marks" id="ng-ai-marks"></div></div>
          <div class="ng-line-ends ng-ai-ends" id="ng-ai-ends"><span>AI's line: how much of your number it has narrowed down</span></div>
        </div>
        <div class="ng-box">
          <div class="ng-box-head"><span>Guesses</span><em id="ng-guess-note"></em></div>
          <div class="ng-history" id="ng-history"></div>
        </div>
        <div class="ng-box">
          <div class="ng-box-head"><span>Numbers left after each guess</span><em>bars = you, dots = perfect play</em></div>
          <svg class="ng-chart" id="ng-chart" viewBox="0 0 360 80" preserveAspectRatio="none"></svg>
        </div>
        <div class="ng-box" id="ng-clue-box">
          <div class="ng-box-head"><span>Clues</span><em>each one costs a try</em></div>
          <div class="ng-clues" id="ng-clues"></div>
          <div class="ng-clue-out" id="ng-clue-out"></div>
        </div>
        <div class="ng-coach" id="ng-coach"></div>
      </div>
    </div>
    <div class="ng-toast" id="ng-toast"></div>

    <div class="ng-overlay show" id="ng-menu">
      <p class="ng-logo">Vault Cracker</p>
      <p class="ng-tagline">Crack the secret number with as few tries as you can. Higher or lower, a hot-cold meter, paid clues and a coach that teaches binary search. Perfect play never needs more than a handful of guesses.</p>
      <div class="ng-modes">
        <button class="ng-mode" id="ng-daily" type="button"><span class="ng-mode-title" id="ng-daily-title">Daily Vault</span><span class="ng-mode-sub" id="ng-daily-sub">Same number for everyone</span></button>
        <button class="ng-mode" id="ng-blitz" type="button"><span class="ng-mode-title">Blitz</span><span class="ng-mode-sub" id="ng-blitz-sub">60 seconds, crack as many as you can</span></button>
        <div class="ng-mode ng-duel"><span class="ng-mode-title">Duel the AI</span><span class="ng-mode-sub">First to find the other's secret number wins</span>
          <span class="ng-duel-btns"><button type="button" data-skill="rookie">Rookie</button><button type="button" data-skill="pro">Pro</button><button type="button" data-skill="master">Master</button></span></div>
      </div>
      <div class="ng-tiers" id="ng-tiers"></div>
      <div class="ng-stats" id="ng-stats"></div>
      <div class="ng-ach" id="ng-ach"></div>
    </div>

    <div class="ng-overlay" id="ng-result">
      <p class="ng-result-title" id="ng-result-title">Vault cracked!</p>
      <div class="ng-result-stars" id="ng-result-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
      <p class="ng-result-sub" id="ng-result-sub"></p>
      <div class="ng-result-btns">
        <button class="ng-btn" id="ng-next" type="button">Next vault</button>
        <button class="ng-btn ng-btn-ghost" id="ng-retry" type="button">Play again</button>
        <button class="ng-btn ng-btn-ghost" id="ng-share" type="button">Copy result</button>
        <button class="ng-btn ng-btn-ghost" id="ng-menu-back" type="button">Menu</button>
      </div>
    </div>
  </div>
</div></div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; color: #e2e8f0;
  background: radial-gradient(ellipse at top, #1d2a4f 0%, #0b1226 60%, #060a18 100%);
  min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 10px 12px; overflow: hidden;
}
/* The game scales itself to the space it is given: .ng-fit takes the scaled size, .ng-wrap is laid out at its natural size and shrunk with transform. */
.ng-fit { flex: none; }
.ng-wrap { width: 900px; transform-origin: top left; }
.ng-panel {
  position: relative; display: flex; flex-direction: column; gap: 12px; padding: 14px; border-radius: 20px; overflow: hidden; min-height: 560px;
  background: linear-gradient(180deg, rgba(29,42,79,0.8), rgba(8,12,32,0.96));
  border: 1px solid rgba(125,160,255,0.2); box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 90px rgba(99,102,241,0.12);
}
.ng-hud { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.ng-hud-left { display: flex; flex-direction: column; line-height: 1.15; margin-right: auto; min-width: 0; }
.ng-kicker { font-size: 10px; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #a5b4fc; }
.ng-name { font-size: 17px; font-weight: 800; color: #f8fafc; white-space: nowrap; }
.ng-stat { display: flex; flex-direction: column; align-items: center; min-width: 78px; padding: 4px 10px; border-radius: 10px; background: rgba(255,255,255,0.06); line-height: 1.15; }
.ng-stat b { font-size: 17px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; white-space: nowrap; }
.ng-label { font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8b9bc0; }
.ng-hud-btns { display: flex; gap: 5px; }
.ng-btn-sm { background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 10px; font: inherit; font-size: 11px; font-weight: 700; cursor: pointer; }
.ng-btn-sm:hover { background: rgba(255,255,255,0.14); }
.ng-btn-sm[aria-pressed="true"] { background: #6366f1; border-color: #818cf8; color: #fff; }

.ng-main { display: grid; grid-template-columns: 440px 1fr; gap: 18px; flex: 1; }
.ng-left { display: flex; flex-direction: column; gap: 10px; }
.ng-vault-row { display: flex; gap: 14px; align-items: center; }
.ng-door { width: 150px; height: 150px; flex: none; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.5)); }
.ng-wheel { transform-origin: 90px 90px; transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.1); }
.ng-bolt { fill: #e2e8f0; stroke: #12172b; stroke-width: 1.5; transition: transform 0.7s, opacity 0.7s; }
.ng-door.open .ng-bolt { opacity: 0; transform: scale(0.2); transform-box: fill-box; transform-origin: center; }
.ng-door.open .ng-wheel { animation: ng-spin 1.1s ease-out forwards; }
.ng-door.open { filter: drop-shadow(0 0 22px rgba(251,191,36,0.85)); }
.ng-door.locked { animation: ng-alarm 0.5s linear infinite; }
@keyframes ng-spin { to { transform: rotate(900deg); } }
@keyframes ng-alarm { 0%, 100% { filter: drop-shadow(0 0 4px rgba(239,68,68,0.2)); } 50% { filter: drop-shadow(0 0 22px rgba(239,68,68,0.95)); } }
.ng-display-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.ng-display { height: 66px; border-radius: 12px; background: #070b18; border: 2px solid #1e2a52; box-shadow: inset 0 0 18px rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; font: 800 40px ui-monospace, 'Cascadia Code', Consolas, monospace; letter-spacing: 0.06em; color: #86efac; text-shadow: 0 0 14px rgba(134,239,172,0.6); overflow: hidden; }
.ng-display.empty { color: #334155; text-shadow: none; }
.ng-display.shake { animation: ng-shake 0.3s; border-color: #ef4444; }
@keyframes ng-shake { 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }
.ng-msg { min-height: 36px; font-size: 13px; line-height: 1.4; color: #cbd5e1; }
.ng-msg b { color: #fbbf24; }
.ng-msg.up { color: #7dd3fc; } .ng-msg.down { color: #fca5a5; } .ng-msg.good { color: #86efac; }
.ng-dots { display: flex; gap: 4px; flex-wrap: wrap; min-height: 12px; }
.ng-dots i { width: 10px; height: 10px; border-radius: 50%; background: #1e293b; border: 1px solid #334155; }
.ng-dots i.up { background: #38bdf8; border-color: #38bdf8; } .ng-dots i.down { background: #f87171; border-color: #f87171; } .ng-dots i.hit { background: #4ade80; border-color: #4ade80; } .ng-dots i.clue { background: #a78bfa; border-color: #a78bfa; }
.ng-heat { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; align-items: center; }
.ng-heat i { height: 10px; border-radius: 5px; background: #1e293b; transition: background 0.25s, box-shadow 0.25s; }
.ng-heat span { grid-column: 1 / -1; text-align: center; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8; margin-top: 2px; }
.ng-keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.ng-key { height: 50px; border-radius: 12px; border: 1px solid rgba(148,163,184,0.25); background: linear-gradient(180deg, #1c2748, #141c38); color: #f1f5f9; font: 800 20px system-ui; cursor: pointer; box-shadow: 0 3px 0 #0b1226; transition: transform 0.06s, box-shadow 0.06s, border-color 0.12s; }
.ng-key:hover { border-color: #818cf8; }
.ng-key:active { transform: translateY(2px); box-shadow: 0 1px 0 #0b1226; }
.ng-key.fn { font-size: 15px; color: #94a3b8; }
.ng-key.go { grid-column: span 3; height: 54px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-color: #a5b4fc; box-shadow: 0 3px 0 #312e81, 0 8px 22px rgba(99,102,241,0.35); font-size: 18px; letter-spacing: 0.08em; }
.ng-key:disabled { opacity: 0.4; cursor: not-allowed; }

.ng-right { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.ng-box { padding: 10px 12px; border-radius: 12px; background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.08); }
.ng-box-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 8px; }
.ng-box-head span { font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #a5b4fc; }
.ng-box-head em { font-style: normal; font-size: 10px; color: #64748b; }
.ng-line { position: relative; height: 18px; border-radius: 9px; background: #151c36; border: 1px solid #263055; overflow: visible; }
.ng-line-fill { position: absolute; top: 0; bottom: 0; border-radius: 9px; background: linear-gradient(90deg, #22c55e, #4ade80); opacity: 0.85; transition: left 0.35s, width 0.35s; }
.ng-ai-fill { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
.ng-line-marks { position: absolute; inset: 0; }
.ng-mark { position: absolute; top: -6px; width: 0; height: 0; margin-left: -5px; border-left: 5px solid transparent; border-right: 5px solid transparent; }
.ng-mark.up { border-top: 8px solid #38bdf8; } .ng-mark.down { border-top: 8px solid #f87171; } .ng-mark.hit { border-top: 9px solid #fbbf24; }
.ng-line-ends { display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; margin-top: 3px; font-variant-numeric: tabular-nums; }
.ng-line-ai { height: 10px; margin-top: 8px; display: none; }
.ng-ai-ends { display: none; }
.ng-wrap.is-duel .ng-line-ai { display: block; }
.ng-wrap.is-duel .ng-ai-ends { display: flex; }
.ng-history { display: flex; flex-wrap: wrap; gap: 5px; min-height: 28px; }
.ng-chip { padding: 3px 9px; border-radius: 14px; font-size: 12px; font-weight: 800; background: #151c36; border: 1px solid #263055; color: #cbd5e1; font-variant-numeric: tabular-nums; }
.ng-chip.up { border-color: #1e6f9a; color: #7dd3fc; } .ng-chip.down { border-color: #9a3b3b; color: #fca5a5; } .ng-chip.hit { border-color: #16a34a; color: #86efac; } .ng-chip.clue { border-color: #6d4fd1; color: #c4b5fd; } .ng-chip.ai { opacity: 0.85; border-style: dashed; }
.ng-chart { display: block; width: 100%; height: 80px; }
.ng-clues { display: flex; gap: 6px; flex-wrap: wrap; }
.ng-clue-btn { padding: 6px 11px; border-radius: 9px; cursor: pointer; font: inherit; font-size: 12px; font-weight: 700; color: #ddd6fe; background: rgba(139,92,246,0.14); border: 1px solid rgba(139,92,246,0.45); }
.ng-clue-btn:hover:not(:disabled) { background: rgba(139,92,246,0.3); }
.ng-clue-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.ng-clue-out { margin-top: 7px; font-size: 12px; color: #c4b5fd; line-height: 1.6; min-height: 18px; }
.ng-coach { display: none; padding: 10px 12px; border-radius: 12px; font-size: 12.5px; line-height: 1.55; color: #e0e7ff; background: rgba(99,102,241,0.16); border: 1px solid rgba(129,140,248,0.5); }
.ng-coach.show { display: block; }
.ng-coach b { color: #fde68a; }
.ng-toast { position: absolute; left: 50%; bottom: 16px; transform: translate(-50%, 30px); padding: 8px 16px; border-radius: 12px; background: #fbbf24; color: #3b2a04; font-size: 13px; font-weight: 800; opacity: 0; transition: opacity 0.3s, transform 0.3s; pointer-events: none; z-index: 50; box-shadow: 0 8px 26px rgba(251,191,36,0.45); }
.ng-toast.show { opacity: 1; transform: translate(-50%, 0); }

.ng-overlay { position: absolute; inset: 0; z-index: 30; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 16px; text-align: center; overflow-y: auto; background: radial-gradient(ellipse at center, rgba(9,14,36,0.97), rgba(4,6,20,0.985)); opacity: 0; pointer-events: none; transition: opacity 0.25s; }
.ng-overlay.show { opacity: 1; pointer-events: auto; }
.ng-logo { font-size: 50px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.05; background: linear-gradient(90deg, #818cf8, #c084fc, #f472b6, #fbbf24); -webkit-background-clip: text; background-clip: text; color: transparent; }
.ng-tagline { font-size: 13px; color: #94a3b8; max-width: 600px; line-height: 1.5; }
.ng-modes { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.ng-mode { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; padding: 10px 16px; border-radius: 12px; cursor: pointer; font: inherit; text-align: left; color: #e0e7ff; border: 1px solid rgba(129,140,248,0.5); background: linear-gradient(135deg, rgba(99,102,241,0.22), rgba(139,92,246,0.1)); transition: transform 0.15s, box-shadow 0.15s; max-width: 250px; }
button.ng-mode:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.25); }
.ng-mode-title { font-size: 14px; font-weight: 800; }
.ng-mode-sub { font-size: 11px; color: #a5b4fc; }
.ng-duel { cursor: default; }
.ng-duel-btns { display: flex; gap: 5px; margin-top: 5px; }
.ng-duel-btns button { padding: 5px 10px; border-radius: 8px; border: 1px solid rgba(251,191,36,0.5); background: rgba(251,191,36,0.12); color: #fde68a; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }
.ng-duel-btns button:hover { background: rgba(251,191,36,0.28); }
.ng-tiers { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; width: 100%; max-width: 760px; }
.ng-tile { position: relative; padding: 8px 6px; border-radius: 10px; cursor: pointer; font: inherit; color: #e2e8f0; border: 1px solid rgba(148,163,184,0.22); background: rgba(255,255,255,0.04); display: flex; flex-direction: column; align-items: center; gap: 1px; transition: transform 0.12s, border-color 0.12s; }
.ng-tile:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--g); }
.ng-tile::after { content: ''; position: absolute; left: 10px; right: 10px; bottom: 3px; height: 2px; border-radius: 2px; background: var(--g); opacity: 0.7; }
.ng-tile b { font-size: 14px; } .ng-tile small { font-size: 10px; color: #94a3b8; }
.ng-tile-stars { font-size: 10px; letter-spacing: 1px; color: #334155; margin-bottom: 3px; } .ng-tile-stars .on { color: #facc15; }
.ng-tile:disabled { opacity: 0.32; cursor: not-allowed; }
.ng-tile.perfect { border-color: rgba(250,204,21,0.55); box-shadow: inset 0 0 12px rgba(250,204,21,0.15); }
.ng-stats { font-size: 12px; color: #94a3b8; }
.ng-stats b { color: #f8fafc; }
.ng-ach { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; max-width: 760px; }
.ng-badge { padding: 3px 9px; border-radius: 12px; font-size: 10px; font-weight: 800; letter-spacing: 0.03em; color: #475569; border: 1px solid #263055; }
.ng-badge.on { color: #fde68a; border-color: rgba(251,191,36,0.6); background: rgba(251,191,36,0.1); }

.ng-result-title { font-size: 36px; font-weight: 900; color: #f8fafc; }
.ng-result-stars { display: flex; gap: 10px; font-size: 50px; line-height: 1; }
.ng-result-stars span { color: #1e293b; transform: scale(0.4); opacity: 0; }
.ng-result-stars span.on { color: #facc15; text-shadow: 0 0 22px rgba(250,204,21,0.75); }
.ng-overlay.show .ng-result-stars span { animation: ng-star 0.45s cubic-bezier(0.2, 1.6, 0.4, 1) forwards; }
.ng-overlay.show .ng-result-stars span:nth-child(2) { animation-delay: 0.18s; }
.ng-overlay.show .ng-result-stars span:nth-child(3) { animation-delay: 0.36s; }
@keyframes ng-star { to { transform: scale(1); opacity: 1; } }
.ng-result-sub { font-size: 14px; color: #94a3b8; line-height: 1.7; max-width: 520px; }
.ng-result-btns { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.ng-btn { padding: 10px 18px; border: none; border-radius: 10px; cursor: pointer; font: inherit; font-size: 14px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #6366f1, #8b5cf6); box-shadow: 0 6px 18px rgba(99,102,241,0.35); transition: transform 0.12s; }
.ng-btn:hover { transform: translateY(-1px); }
.ng-btn-ghost { background: rgba(255,255,255,0.06); box-shadow: none; border: 1px solid rgba(255,255,255,0.12); color: #cbd5e1; }
.ng-btn[hidden] { display: none; }
.ng-confetti { position: absolute; top: -12px; width: 8px; height: 14px; border-radius: 2px; z-index: 40; pointer-events: none; animation: ng-fall linear forwards; }
@keyframes ng-fall { to { transform: translate(var(--dx), 700px) rotate(var(--rot)); opacity: 0.9; } }

.ng-narrow .ng-main { grid-template-columns: 1fr; }
.ng-narrow .ng-hud { gap: 8px; }
.ng-narrow .ng-tiers { grid-template-columns: repeat(2, 1fr); }
.ng-narrow .ng-logo { font-size: 38px; }
.ng-narrow .ng-vault-row { flex-direction: row; }
.ng-narrow .ng-door { width: 110px; height: 110px; }
.ng-narrow .ng-display { font-size: 30px; height: 56px; }`,

  js: `/* ============ Vault Cracker: a number guessing game that teaches binary search ============ */
const SAVE_KEY = 'number-vault-save-v1';
const DAY0 = Date.UTC(2026, 10, 12); // Daily Vault #1
const VAULTS = [
  { n: 10, name: 'Pocket Safe', color: '#4ade80' }, { n: 50, name: 'Locker', color: '#a3e635' },
  { n: 100, name: 'Bank Vault', color: '#facc15' }, { n: 250, name: 'Strong Room', color: '#fb923c' },
  { n: 1000, name: 'Fort Knox', color: '#f97316' }, { n: 10000, name: 'Deep Vault', color: '#f472b6' },
  { n: 100000, name: 'Mega Vault', color: '#a78bfa' }, { n: 1000000, name: 'The Million', color: '#38bdf8' },
];
const HEAT = [
  { name: 'Freezing', col: '#38bdf8' }, { name: 'Cold', col: '#60a5fa' }, { name: 'Cool', col: '#a78bfa' },
  { name: 'Warm', col: '#fbbf24' }, { name: 'Hot', col: '#fb923c' }, { name: 'Burning', col: '#ef4444' },
];
const ACH = [
  ['first', 'First crack'], ['lucky', 'Lucky shot'], ['par', 'On par'], ['sniper', 'Sniper'],
  ['million', 'The Million'], ['streak7', '7-day streak'], ['blitz10', 'Blitz x10'], ['master', 'Beat the Master'],
];
const $ = id => document.getElementById(id);
const parOf = n => Math.ceil(Math.log2(n + 1));
const maxTriesOf = n => parOf(n) + 3;
const fmt = n => n.toLocaleString('en-US');
function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function todayNumber() {
  const d = new Date();
  return Math.max(1, Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - DAY0) / 86400000) + 1);
}

/* ---------- Saved progress (localStorage can throw in sandboxed iframes, so every access is guarded) ---------- */
function freshSave() { return { stars: Array(8).fill(0), best: Array(8).fill(0), games: 0, wins: 0, effSum: 0, effN: 0, perfects: 0, streak: 0, bestStreak: 0, blitzBest: 0, duel: {}, ach: {}, daily: { day: 0, tries: 0, stars: 0, streak: 0, lastDay: 0 } }; }
function loadSave() {
  const f = freshSave();
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (s && Array.isArray(s.stars)) {
      f.stars = f.stars.map((_, i) => s.stars[i] || 0); f.best = f.best.map((_, i) => (s.best && s.best[i]) || 0);
      ['games', 'wins', 'effSum', 'effN', 'perfects', 'streak', 'bestStreak', 'blitzBest'].forEach(k => { f[k] = s[k] || 0; });
      f.duel = s.duel || {}; f.ach = s.ach || {}; Object.assign(f.daily, s.daily || {});
    }
  } catch (e) { /* storage blocked */ }
  return f;
}
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* storage blocked */ } }
let save = loadSave();

/* ---------- Sound: a tiny Web Audio synth ---------- */
let audioCtx = null, muted = false;
function getAudio() {
  if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; } }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}
function tone(freq, dur, type, vol, slideTo, delay) {
  if (muted || !audioCtx) return;
  try {
    const t0 = audioCtx.currentTime + (delay || 0), osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    gain.gain.setValueAtTime(vol, t0); gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain); gain.connect(audioCtx.destination); osc.start(t0); osc.stop(t0 + dur);
  } catch (e) { /* audio is optional */ }
}
function noiseTick(delay, vol) {
  if (muted || !audioCtx) return;
  try {
    const n = Math.floor(audioCtx.sampleRate * 0.02), buf = audioCtx.createBuffer(1, n, audioCtx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = audioCtx.createBufferSource(), g = audioCtx.createGain();
    src.buffer = buf; g.gain.value = vol; src.connect(g); g.connect(audioCtx.destination); src.start(audioCtx.currentTime + delay);
  } catch (e) { /* audio is optional */ }
}
const sfx = {
  key() { tone(520, 0.03, 'square', 0.025); },
  up() { tone(300, 0.18, 'triangle', 0.06, 520); },
  down() { tone(520, 0.18, 'triangle', 0.06, 300); },
  bad() { tone(160, 0.14, 'square', 0.04); },
  // a Geiger counter: the hotter the guess, the more and faster the ticks
  geiger(band) { for (let i = 0; i < band + 1; i++) noiseTick(0.12 + i * (0.16 - band * 0.02), 0.12); },
  clue() { tone(660, 0.1, 'sine', 0.05); tone(880, 0.1, 'sine', 0.04, null, 0.08); },
  win() { noiseTick(0, 0.3); tone(90, 0.5, 'sawtooth', 0.06, 50, 0.05); [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.07, null, 0.3 + i * 0.12)); },
  lose() { tone(330, 0.3, 'sawtooth', 0.05, 160); tone(220, 0.5, 'sawtooth', 0.05, 110, 0.25); },
  ai() { tone(400, 0.08, 'sine', 0.04); },
};
$('ng-mute').addEventListener('click', () => { muted = !muted; $('ng-mute').textContent = muted ? 'Sound off' : 'Sound on'; $('ng-mute').setAttribute('aria-pressed', String(muted)); });

/* ---------- Game state ---------- */
let mode = 'classic', vIdx = 2, N = 100, target = 1, low = 1, high = 100, guesses = [], attempts = 0, maxTries = 10;
let phase = 'menu', buf = '', clues = {}, coach = false, runId = 0, dailyNum = 0, usedClue = false;
let secret = 0, aiLow = 1, aiHigh = 100, aiGuesses = [], aiTries = 0, aiSkill = 'pro', blitz = null, blitzTimer = null;
const wrapEl = $('ng-wrap'), panelEl = $('ng-panel'), menuEl = $('ng-menu'), resultEl = $('ng-result');
const dispEl = $('ng-display'), dispTxt = $('ng-disp'), msgEl = $('ng-msg');

function randInt(n) { return Math.floor(Math.random() * n) + 1; }
function resetRound() {
  low = 1; high = N; guesses = []; attempts = 0; buf = ''; clues = {}; usedClue = false;
  aiLow = 1; aiHigh = N; aiGuesses = []; aiTries = 0;
  $('ng-door').classList.remove('open', 'locked'); $('ng-clue-out').textContent = '';
  $('ng-wheel').style.transform = 'rotate(0deg)';
  resultEl.classList.remove('show');
}
function startClassic(i) {
  getAudio(); runId++; mode = 'classic'; vIdx = i; N = VAULTS[i].n; maxTries = maxTriesOf(N); target = randInt(N);
  resetRound(); phase = 'play'; enterGame(VAULTS[i].name, 'Vault ' + (i + 1) + ' of 8: 1 to ' + fmt(N));
  setMsg('I picked a number from 1 to ' + fmt(N) + '. <b>Par is ' + parOf(N) + '</b>: three stars if you crack it in ' + parOf(N) + ' tries.');
}
function startDaily() {
  getAudio(); runId++; mode = 'daily'; dailyNum = todayNumber(); N = 1000; maxTries = maxTriesOf(N);
  target = Math.floor(mulberry32(dailyNum * 7919 + 17)() * N) + 1;
  resetRound(); phase = 'play'; enterGame('Daily Vault #' + dailyNum, 'Same number for everyone today: 1 to 1,000');
  setMsg('Today\\'s vault holds a number from 1 to 1,000. Par is ' + parOf(N) + '.');
}
function startBlitz() {
  getAudio(); runId++; mode = 'blitz'; N = 100; maxTries = 999; target = randInt(N);
  blitz = { end: performance.now() + 60000, solved: 0, score: 0, tries: 0 };
  resetRound(); phase = 'play'; enterGame('Blitz', 'Crack as many vaults as you can in 60 seconds');
  setMsg('Numbers from 1 to 100. Every vault you crack gives points, and cracking it at par adds 3 seconds.');
  clearInterval(blitzTimer); blitzTimer = setInterval(blitzTick, 100);
}
function startDuel(skill) {
  getAudio(); runId++; mode = 'duel'; aiSkill = skill; N = 100; maxTries = 999; target = randInt(N); secret = 0;
  resetRound(); phase = 'secret'; enterGame('Duel: ' + skill.charAt(0).toUpperCase() + skill.slice(1) + ' AI', 'First to find the other\\'s number wins');
  setMsg('First, choose a <b>secret number</b> from 1 to 100 for the AI to find, then press GO. The AI cannot see it.');
}
function enterGame(name, sub) {
  menuEl.classList.remove('show'); resultEl.classList.remove('show');
  $('ng-kicker').textContent = sub; $('ng-name').textContent = name;
  wrapEl.classList.toggle('is-duel', mode === 'duel');
  $('ng-clue-box').style.display = mode === 'classic' || mode === 'daily' ? '' : 'none';
  clearInterval(blitzTimer); if (mode === 'blitz') blitzTimer = setInterval(blitzTick, 100);
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  renderAll(); fitToView();
}
function showMenu() {
  runId++; phase = 'menu'; clearInterval(blitzTimer); resultEl.classList.remove('show'); menuEl.classList.add('show'); renderMenu();
  $('ng-kicker').textContent = 'Vault Cracker'; $('ng-name').textContent = 'Pick a vault';
}
function setMsg(html, cls) { msgEl.innerHTML = html; msgEl.className = 'ng-msg' + (cls ? ' ' + cls : ''); }
let toastTimer = 0;
function toast(text) { const t = $('ng-toast'); t.textContent = text; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2400); }
function unlock(id) {
  if (save.ach[id]) return;
  save.ach[id] = true; persist(); toast('Achievement: ' + ACH.find(a => a[0] === id)[1]);
}

/* ---------- Guessing ---------- */
function bandOf(dist) { const r = dist / N; return r <= 0.02 ? 5 : r <= 0.05 ? 4 : r <= 0.1 ? 3 : r <= 0.2 ? 2 : r <= 0.4 ? 1 : 0; }
function submitGuess() {
  if (phase === 'secret') { setSecret(); return; }
  if (phase !== 'play') return;
  const g = parseInt(buf, 10);
  if (!buf || isNaN(g)) { badInput('Type a number first.'); return; }
  if (g < low || g > high) { badInput('Ruled out already. Pick a number between <b>' + fmt(low) + '</b> and <b>' + fmt(high) + '</b>.'); return; }
  buf = ''; attempts++;
  if (mode === 'blitz') blitz.tries++;
  if (g === target) { guesses.push({ g: g, dir: 'hit', left: 1 }); onSolved(); return; }
  const dir = g < target ? 'up' : 'down';
  if (dir === 'up') low = Math.max(low, g + 1); else high = Math.min(high, g - 1);
  const band = bandOf(Math.abs(g - target));
  guesses.push({ g: g, dir: dir, left: high - low + 1, band: band });
  (dir === 'up' ? sfx.up : sfx.down)(); sfx.geiger(band);
  $('ng-wheel').style.transform = 'rotate(' + attempts * 60 + 'deg)';
  setMsg((dir === 'up' ? '<b>' + fmt(g) + '</b> is too low. Go higher.' : '<b>' + fmt(g) + '</b> is too high. Go lower.') + ' ' + HEAT[band].name + '.', dir);
  if (mode === 'duel') { phase = 'wait'; renderAll(); aiTurn(); return; }
  if ((mode === 'classic' || mode === 'daily') && attempts >= maxTries) { onLost(); return; }
  renderAll();
}
function badInput(html) { setMsg(html); sfx.bad(); dispEl.classList.remove('shake'); void dispEl.offsetWidth; dispEl.classList.add('shake'); }
function setSecret() {
  const g = parseInt(buf, 10);
  if (!buf || isNaN(g) || g < 1 || g > 100) { badInput('Choose a secret number from 1 to 100.'); return; }
  secret = g; buf = ''; phase = 'play';
  setMsg('Secret locked in. You go first: find the AI\\'s number (1 to 100).');
  renderAll();
}
function aiPick() {
  const size = aiHigh - aiLow + 1, mid = Math.floor((aiLow + aiHigh) / 2);
  if (aiSkill === 'rookie') return aiLow + Math.floor(Math.random() * size);
  if (aiSkill === 'pro') return clamp(mid + Math.round((Math.random() - 0.5) * size * 0.3), aiLow, aiHigh);
  return mid;
}
function aiTurn() {
  const id = runId;
  setTimeout(() => {
    if (id !== runId || phase !== 'wait') return;
    const g = aiPick(); aiTries++; sfx.ai();
    if (g === secret) { aiGuesses.push({ g: g, dir: 'hit' }); renderAll(); onDuelEnd(false); return; }
    const dir = g < secret ? 'up' : 'down';
    if (dir === 'up') aiLow = Math.max(aiLow, g + 1); else aiHigh = Math.min(aiHigh, g - 1);
    aiGuesses.push({ g: g, dir: dir });
    phase = 'play';
    setMsg('The AI guessed <b>' + g + '</b> and heard "' + (dir === 'up' ? 'higher' : 'lower') + '". Your turn.', dir === 'up' ? 'up' : 'down');
    renderAll();
  }, 800);
}

/* ---------- Clues: each one costs a try ---------- */
function useClue(kind) {
  if (phase !== 'play' || clues[kind] || (mode !== 'classic' && mode !== 'daily')) return;
  if (attempts >= maxTries - 1) { badInput('Keep your last try for a guess.'); return; }
  clues[kind] = true; attempts++; usedClue = true; sfx.clue();
  let text;
  if (kind === 'parity') text = 'The number is ' + (target % 2 ? 'odd' : 'even') + '.';
  else if (kind === 'd3') text = target % 3 === 0 ? 'It is divisible by 3.' : 'It is not divisible by 3.';
  else if (kind === 'd5') text = target % 5 === 0 ? 'It is divisible by 5.' : 'It is not divisible by 5.';
  else {
    const size = high - low + 1, q = Math.min(3, Math.floor((target - low) * 4 / size));
    const nl = low + Math.ceil(size * q / 4), nh = low + Math.ceil(size * (q + 1) / 4) - 1;
    low = Math.max(low, nl); high = Math.min(high, nh);
    text = 'It is in quarter ' + (q + 1) + ' of the range: ' + fmt(low) + ' to ' + fmt(high) + '.';
  }
  guesses.push({ clue: kind, text: text, left: high - low + 1 });
  $('ng-clue-out').innerHTML = (Object.keys(clues).map(k => guesses.find(x => x.clue === k).text)).join('<br>');
  setMsg('Clue bought. ' + text);
  renderAll();
}

/* ---------- Ending a round ---------- */
function updateEff(n) { const eff = Math.min(1, parOf(N) / Math.max(1, n)); save.effSum += eff; save.effN++; return eff; }
function onSolved() {
  sfx.win(); $('ng-door').classList.add('open'); $('ng-wheel').style.transform = '';
  if (mode === 'blitz') {
    const pts = 50 + Math.max(0, 12 - attempts) * 15; blitz.score += pts; blitz.solved++;
    if (attempts <= parOf(N)) blitz.end += 3000;
    if (blitz.solved >= 10) unlock('blitz10');
    toast('+' + pts + ' points'); setMsg('Cracked in ' + attempts + '! <b>+' + pts + '</b>. Next vault.', 'good');
    phase = 'wait'; renderAll();
    const id = runId;
    setTimeout(() => { if (id !== runId || mode !== 'blitz' || phase !== 'wait') return; target = randInt(N); resetRound(); phase = 'play'; renderAll(); }, 650);
    return;
  }
  if (mode === 'duel') { onDuelEnd(true); return; }
  phase = 'over'; save.games++; save.wins++; save.streak++; save.bestStreak = Math.max(save.bestStreak, save.streak);
  const par = parOf(N), stars = attempts <= par ? 3 : attempts <= par + 1 ? 2 : 1, eff = updateEff(attempts);
  if (stars === 3) save.perfects++;
  unlock('first'); if (guesses.length === 1 && !usedClue) unlock('lucky');
  if (N >= 100 && attempts <= par) unlock('par'); if (N >= 100 && attempts <= par - 1) unlock('sniper');
  if (mode === 'classic') { save.stars[vIdx] = Math.max(save.stars[vIdx], stars); if (!save.best[vIdx] || attempts < save.best[vIdx]) save.best[vIdx] = attempts; if (vIdx === 7) unlock('million'); }
  else {
    const d = save.daily; if (d.day !== dailyNum) { d.day = dailyNum; d.tries = 0; d.stars = 0; }
    d.stars = Math.max(d.stars, stars); d.tries = d.tries ? Math.min(d.tries, attempts) : attempts;
    if (d.lastDay !== dailyNum) { d.streak = d.lastDay === dailyNum - 1 ? d.streak + 1 : 1; d.lastDay = dailyNum; }
    if (d.streak >= 7) unlock('streak7');
  }
  persist(); renderAll();
  showResult(true, stars, 'Cracked ' + fmt(target) + ' in ' + attempts + ' ' + (attempts === 1 ? 'try' : 'tries') + ' (par ' + par + '). Efficiency ' + Math.round(eff * 100) + '%. ' + (stars === 3 ? 'Perfect play!' : 'Perfect play needs at most ' + par + ' tries: always guess the middle of what is left.'));
}
function onLost() {
  phase = 'over'; sfx.lose(); $('ng-door').classList.add('locked'); save.games++; save.streak = 0; persist(); renderAll();
  showResult(false, 0, 'The vault locked itself after ' + maxTries + ' tries. The number was ' + fmt(target) + '. Try the Coach button: it shows the best next guess.');
}
function onDuelEnd(youWon) {
  phase = 'over'; save.games++;
  if (youWon) { save.wins++; save.duel[aiSkill] = (save.duel[aiSkill] || 0) + 1; unlock('first'); if (aiSkill === 'master') unlock('master'); sfx.win(); $('ng-door').classList.add('open'); }
  else { save.streak = 0; sfx.lose(); $('ng-door').classList.add('locked'); }
  persist(); renderAll();
  showResult(youWon, youWon ? 3 : 0, youWon ? 'You found the AI\\'s number ' + fmt(target) + ' in ' + attempts + ' tries, before it found yours (' + secret + ').' : 'The AI found your secret number ' + secret + ' in ' + aiTries + ' tries. Its number was ' + fmt(target) + '.');
}
function showResult(win, stars, sub) {
  $('ng-result-title').textContent = win ? (mode === 'duel' ? 'You win the duel!' : stars === 3 ? 'Perfect crack!' : 'Vault cracked!') : (mode === 'duel' ? 'The AI wins' : 'Vault locked');
  $('ng-result-sub').textContent = sub;
  [...$('ng-result-stars').children].forEach((el, i) => el.classList.toggle('on', i < stars));
  $('ng-result-stars').style.visibility = win && mode !== 'duel' ? 'visible' : 'hidden';
  $('ng-next').hidden = !(mode === 'classic' && win && vIdx < 7);
  $('ng-share').hidden = !(mode === 'daily' && win); $('ng-share').textContent = 'Copy result';
  if (mode === 'daily' && win) {
    const arrows = guesses.map(x => x.dir === 'up' ? '\\u2B06\\uFE0F' : x.dir === 'down' ? '\\u2B07\\uFE0F' : x.dir === 'hit' ? '\\uD83C\\uDFAF' : '\\uD83D\\uDD0E').join('');
    $('ng-share').dataset.text = 'Vault Cracker Daily #' + dailyNum + ' ' + attempts + '/' + maxTries + ' ' + '\\u2605'.repeat(stars) + '\\u2606'.repeat(3 - stars) + ' ' + arrows + ' streak ' + save.daily.streak;
  }
  if (win) confetti();
  const id = runId; setTimeout(() => { if (id === runId && phase === 'over') resultEl.classList.add('show'); }, mode === 'duel' ? 900 : 1300);
}
function blitzTick() {
  if (phase === 'menu' || phase === 'over' || mode !== 'blitz') { clearInterval(blitzTimer); return; }
  const left = Math.max(0, blitz.end - performance.now());
  $('ng-extra').textContent = Math.ceil(left / 1000) + 's';
  if (left <= 0) {
    clearInterval(blitzTimer); phase = 'over'; save.games++; const best = blitz.score > save.blitzBest; if (best) save.blitzBest = blitz.score; persist(); sfx.win();
    showResult(true, 0, blitz.solved + ' vaults cracked, ' + blitz.score + ' points' + (best ? '. New best score!' : '. Best: ' + save.blitzBest + '.'));
    $('ng-result-title').textContent = "Time's up!"; $('ng-result-stars').style.visibility = 'hidden';
  }
}
function confetti() {
  const colors = ['#818cf8', '#c084fc', '#f472b6', '#fbbf24', '#4ade80', '#38bdf8'];
  for (let i = 0; i < 46; i++) {
    const p = document.createElement('div'); p.className = 'ng-confetti'; p.style.left = Math.random() * 100 + '%'; p.style.background = colors[i % colors.length];
    p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px'); p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    p.style.animationDuration = (1.8 + Math.random() * 1.4) + 's'; p.style.animationDelay = (Math.random() * 0.5) + 's';
    panelEl.appendChild(p); setTimeout(() => p.remove(), 4200);
  }
}

/* ---------- Rendering ---------- */
const pct = (v, lo, hi) => ((v - lo) / (hi - lo)) * 100;
function renderLine(kind) {
  const isAI = kind === 'ai', lo = isAI ? aiLow : low, hi = isAI ? aiHigh : high, list = isAI ? aiGuesses : guesses;
  const fill = $(isAI ? 'ng-ai-fill' : 'ng-line-fill'), marks = $(isAI ? 'ng-ai-marks' : 'ng-line-marks');
  fill.style.left = pct(lo - 1, 0, N) + '%'; fill.style.width = Math.max(0.6, pct(hi - lo + 1, 0, N)) + '%';
  marks.innerHTML = '';
  list.forEach(x => { if (x.g === undefined) return; const m = document.createElement('i'); m.className = 'ng-mark ' + x.dir; m.style.left = pct(x.g - 0.5, 0, N) + '%'; marks.appendChild(m); });
}
function renderChart() {
  const svg = $('ng-chart'), slots = Math.min(mode === 'classic' || mode === 'daily' ? maxTries : 12, 24), lg = Math.log2(N) || 1, w = 360, h = 80, bw = w / slots;
  let html = '', ideal = [];
  for (let i = 0; i <= slots; i++) ideal.push((bw * (i + 0.5)).toFixed(1) + ',' + (h - 6 - (Math.max(0, Math.log2(Math.max(1, N / Math.pow(2, i + 1)))) / lg) * (h - 14)).toFixed(1));
  guesses.forEach((x, i) => {
    if (i >= slots) return;
    const hh = Math.max(3, (Math.log2(Math.max(1, x.left)) / lg) * (h - 14) + 3);
    const goodStep = x.left <= N / Math.pow(2, i + 1) * 1.15 + 1;
    html += '<rect x="' + (i * bw + bw * 0.18).toFixed(1) + '" y="' + (h - 6 - hh).toFixed(1) + '" width="' + (bw * 0.64).toFixed(1) + '" height="' + hh.toFixed(1) + '" rx="3" fill="' + (x.clue ? '#a78bfa' : x.dir === 'hit' ? '#4ade80' : goodStep ? '#818cf8' : '#f59e0b') + '"/>';
  });
  html += '<polyline points="' + ideal.slice(0, slots).join(' ') + '" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="3 3" opacity="0.9"/>';
  for (let i = 0; i < slots; i++) html += '<circle cx="' + ideal[i].split(',')[0] + '" cy="' + ideal[i].split(',')[1] + '" r="2.6" fill="#fbbf24"/>';
  html += '<line x1="0" y1="' + (h - 5) + '" x2="' + w + '" y2="' + (h - 5) + '" stroke="#263055"/>';
  svg.innerHTML = html;
}
function renderCoach() {
  const el = $('ng-coach'); el.classList.toggle('show', coach); $('ng-coach-btn').setAttribute('aria-pressed', String(coach));
  if (!coach) return;
  const size = high - low + 1, mid = Math.floor((low + high) / 2), left = Math.ceil(Math.log2(size + 1));
  if (phase !== 'play') { el.innerHTML = 'Coach: the best guess is always the <b>middle</b> of what is left. It cuts the possibilities in half, whatever the answer.'; return; }
  if (size === 1) el.innerHTML = 'Coach: only one number is left: <b>' + fmt(low) + '</b>.';
  else el.innerHTML = 'Coach: <b>' + fmt(size) + '</b> numbers are still possible (' + fmt(low) + ' to ' + fmt(high) + '). Guess <b>' + fmt(mid) + '</b>: whatever the answer, at most ' + fmt(Math.floor(size / 2)) + ' numbers remain. You can finish in at most <b>' + left + '</b> more ' + (left === 1 ? 'guess' : 'guesses') + '.';
}
function renderAll() {
  const duel = mode === 'duel', rem = high - low + 1;
  $('ng-tries').textContent = mode === 'blitz' ? blitz.solved + ' cracked' : duel ? attempts + ' vs ' + aiTries : attempts + ' / ' + maxTries;
  $('ng-range').textContent = fmt(low) + ' - ' + fmt(high);
  if (mode === 'blitz') { $('ng-extra-label').textContent = 'Time'; blitzTick(); }
  else if (mode === 'duel') { $('ng-extra-label').textContent = 'AI'; $('ng-extra').textContent = aiSkill; }
  else { $('ng-extra-label').textContent = 'Par'; $('ng-extra').textContent = parOf(N); }
  if (mode === 'blitz') $('ng-tries').textContent = blitz.score + ' pts, ' + blitz.solved + ' cracked';
  dispTxt.textContent = phase === 'secret' ? '*'.repeat(buf.length) || '---' : buf || '---';
  dispEl.classList.toggle('empty', !buf);
  $('ng-end-lo').textContent = '1'; $('ng-end-hi').textContent = fmt(N);
  $('ng-line-note').textContent = rem === 1 ? 'Only one number left!' : fmt(rem) + ' numbers still possible';
  renderLine('you'); if (duel) renderLine('ai');
  // heat meter from the last real guess
  const last = [...guesses].reverse().find(x => x.band !== undefined), hb = last ? last.band : -1;
  [...$('ng-heat').querySelectorAll('i')].forEach((el, i) => { el.style.background = i <= hb ? HEAT[i].col : ''; el.style.boxShadow = i <= hb ? '0 0 10px ' + HEAT[i].col : 'none'; });
  $('ng-heat-label').textContent = hb >= 0 ? HEAT[hb].name : (guesses.length && guesses[guesses.length - 1].dir === 'hit' ? 'Cracked!' : 'No guess yet');
  $('ng-heat-label').style.color = hb >= 0 ? HEAT[hb].col : '';
  // tries dots
  const dots = $('ng-dots'); dots.innerHTML = '';
  if (mode === 'classic' || mode === 'daily') for (let i = 0; i < maxTries; i++) { const d = document.createElement('i'); const x = guesses[i]; if (x) d.className = x.clue ? 'clue' : x.dir; dots.appendChild(d); }
  // history chips: your guesses, then the AI's in a duel
  const hist = $('ng-history'); hist.innerHTML = '';
  guesses.forEach(x => { const c = document.createElement('span'); c.className = 'ng-chip ' + (x.clue ? 'clue' : x.dir); c.textContent = x.clue ? '?' : fmt(x.g) + (x.dir === 'up' ? ' \\u2191' : x.dir === 'down' ? ' \\u2193' : ' \\u2713'); c.title = x.text || ''; hist.appendChild(c); });
  aiGuesses.forEach(x => { const c = document.createElement('span'); c.className = 'ng-chip ai ' + x.dir; c.textContent = 'AI ' + x.g + (x.dir === 'up' ? ' \\u2191' : x.dir === 'down' ? ' \\u2193' : ' \\u2713'); hist.appendChild(c); });
  $('ng-guess-note').textContent = guesses.length ? '' : 'none yet';
  renderChart(); renderCoach(); renderClues(); renderKeypad();
}
function renderClues() {
  const wrap = $('ng-clues'); if (wrap.dataset.built !== '1') {
    [['parity', 'Even or odd?'], ['d3', 'Divisible by 3?'], ['d5', 'Divisible by 5?'], ['quarter', 'Which quarter?']].forEach(c => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'ng-clue-btn'; b.dataset.k = c[0]; b.textContent = c[1]; b.addEventListener('click', () => useClue(c[0])); wrap.appendChild(b);
    }); wrap.dataset.built = '1';
  }
  [...wrap.children].forEach(b => { b.disabled = phase !== 'play' || !!clues[b.dataset.k] || attempts >= maxTries - 1; });
}
function renderKeypad() {
  const pad = $('ng-keypad');
  if (pad.dataset.built !== '1') {
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '\\u232B'].forEach(k => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'ng-key' + (k === 'C' || k === '\\u232B' ? ' fn' : ''); b.textContent = k; b.dataset.k = k;
      b.addEventListener('click', () => pressKey(k)); pad.appendChild(b);
    });
    const go = document.createElement('button'); go.type = 'button'; go.className = 'ng-key go'; go.id = 'ng-go'; go.textContent = 'GO'; go.addEventListener('click', submitGuess); pad.appendChild(go); pad.dataset.built = '1';
  }
  const can = phase === 'play' || phase === 'secret'; [...pad.children].forEach(b => { b.disabled = !can; });
  $('ng-go').textContent = phase === 'secret' ? 'LOCK SECRET' : phase === 'wait' ? '...' : 'GO';
}
function renderMenu() {
  const today = todayNumber(), d = save.daily;
  if (d.lastDay && d.lastDay < today - 1) d.streak = 0;
  $('ng-daily-title').textContent = 'Daily Vault #' + today;
  $('ng-daily-sub').textContent = d.day === today && d.stars > 0 ? 'Cracked today in ' + d.tries + ' (' + '\\u2605'.repeat(d.stars) + '). Streak ' + d.streak : 'Same number for everyone. Streak ' + d.streak;
  $('ng-blitz-sub').textContent = save.blitzBest ? '60 seconds. Best: ' + save.blitzBest + ' points' : '60 seconds, crack as many as you can';
  const wrap = $('ng-tiers'); wrap.innerHTML = '';
  VAULTS.forEach((v, i) => {
    const unlocked = i === 0 || save.stars[i - 1] > 0, b = document.createElement('button');
    b.type = 'button'; b.className = 'ng-tile' + (save.stars[i] === 3 ? ' perfect' : ''); b.disabled = !unlocked; b.style.setProperty('--g', v.color);
    b.title = unlocked ? 'Par ' + parOf(v.n) : 'Crack the previous vault to unlock';
    b.innerHTML = '<b>' + v.name + '</b><small>1 to ' + fmt(v.n) + '</small><span class="ng-tile-stars">' + [0, 1, 2].map(x => '<span class="' + (x < save.stars[i] ? 'on' : '') + '">\\u2605</span>').join('') + '</span>';
    b.addEventListener('click', () => startClassic(i)); wrap.appendChild(b);
  });
  const avg = save.effN ? Math.round(save.effSum / save.effN * 100) : 0;
  const rank = !save.effN ? 'Rookie' : avg < 45 ? 'Novice' : avg < 60 ? 'Apprentice' : avg < 75 ? 'Detective' : avg < 88 ? 'Safecracker' : 'Binary Master';
  $('ng-stats').innerHTML = 'Rank <b>' + rank + '</b>' + (save.effN ? ' (' + avg + '% efficiency)' : '') + ' &middot; Games <b>' + save.games + '</b> &middot; Wins <b>' + save.wins + '</b> &middot; Perfect <b>' + save.perfects + '</b> &middot; Best streak <b>' + save.bestStreak + '</b>';
  $('ng-ach').innerHTML = ACH.map(a => '<span class="ng-badge' + (save.ach[a[0]] ? ' on' : '') + '">' + a[1] + '</span>').join('');
}

/* ---------- Input ---------- */
function pressKey(k) {
  if (phase !== 'play' && phase !== 'secret') return;
  const maxLen = String(N).length;
  if (k === 'C') buf = ''; else if (k === '\\u232B') buf = buf.slice(0, -1);
  else if (buf.length < maxLen) buf = buf === '0' ? k : buf + k;
  sfx.key(); renderAll();
}
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  if (k === 'Escape') { if (phase !== 'menu') showMenu(); return; }
  if (phase === 'menu') return;
  if (k === 'h' || k === 'H') { coach = !coach; renderCoach(); return; }
  if (phase === 'over') { if (k === 'Enter' && resultEl.classList.contains('show')) $('ng-retry').click(); return; }
  if (/^[0-9]$/.test(k)) { e.preventDefault(); pressKey(k); }
  else if (k === 'Backspace') { e.preventDefault(); pressKey('\\u232B'); }
  else if (k === 'Enter') { e.preventDefault(); submitGuess(); }
  else if ((k === 'ArrowUp' || k === 'ArrowDown') && phase === 'play') {
    e.preventDefault(); const cur = parseInt(buf, 10), base = isNaN(cur) ? Math.floor((low + high) / 2) : cur;
    buf = String(clamp(base + (k === 'ArrowUp' ? 1 : -1) * (e.shiftKey ? 10 : 1), low, high)); sfx.key(); renderAll();
  }
});
$('ng-coach-btn').addEventListener('click', () => { coach = !coach; renderCoach(); $('ng-coach-btn').blur(); });
$('ng-menu-btn').addEventListener('click', showMenu);
$('ng-daily').addEventListener('click', startDaily);
$('ng-blitz').addEventListener('click', startBlitz);
document.querySelectorAll('.ng-duel-btns button').forEach(b => b.addEventListener('click', () => startDuel(b.dataset.skill)));
$('ng-retry').addEventListener('click', () => { if (mode === 'classic') startClassic(vIdx); else if (mode === 'daily') startDaily(); else if (mode === 'blitz') startBlitz(); else startDuel(aiSkill); });
$('ng-menu-back').addEventListener('click', showMenu);
$('ng-next').addEventListener('click', () => startClassic(vIdx + 1));
$('ng-share').addEventListener('click', () => {
  const b = $('ng-share'), text = b.dataset.text || '', done = () => { b.textContent = 'Copied!'; };
  try { navigator.clipboard.writeText(text).then(done, () => { b.textContent = text; }); } catch (e) { b.textContent = text; }
});

/* ---------- The vault door's bolts, then fit the game into the space available ---------- */
(function () { let s = ''; for (let i = 0; i < 12; i++) { const a = i / 12 * 6.2832; s += '<circle class="ng-bolt" cx="' + (90 + Math.cos(a) * 77).toFixed(1) + '" cy="' + (90 + Math.sin(a) * 77).toFixed(1) + '" r="4.5"/>'; } $('ng-bolts').innerHTML = s; })();
const fitEl = $('ng-fit');
function fitToView() {
  const availW = Math.max(240, window.innerWidth - 24), availH = Math.max(240, window.innerHeight - 20), narrow = availW < 760;
  wrapEl.classList.toggle('ng-narrow', narrow);
  document.body.style.overflow = narrow ? 'auto' : 'hidden'; document.body.style.alignItems = narrow ? 'flex-start' : 'center';
  wrapEl.style.transform = 'none';
  if (narrow) { wrapEl.style.width = Math.min(520, availW) + 'px'; fitEl.style.width = wrapEl.style.width; fitEl.style.height = wrapEl.offsetHeight + 'px'; return; }
  wrapEl.style.width = '900px';
  const natH = wrapEl.offsetHeight || 1, k = Math.max(0.4, Math.min(1, availW / 900, availH / natH));
  wrapEl.style.transform = k < 1 ? 'scale(' + k + ')' : 'none';
  fitEl.style.width = Math.round(900 * k) + 'px'; fitEl.style.height = Math.round(natH * k) + 'px';
}
window.addEventListener('resize', fitToView);
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(fitToView).observe(wrapEl);

mode = 'classic'; vIdx = 2; N = 100; maxTries = maxTriesOf(N); target = randInt(N); resetRound();
showMenu(); fitToView();`,

  seo: {
    title: 'Number Guessing Game: Crack the Vault with Binary Search',
    description: 'Free number guessing game in JS: higher or lower with a hot-cold meter, paid clues, a binary-search coach, 8 vaults up to 1,000,000, Daily, Blitz and AI Duel.',
    about: {
      title: 'Number Guessing Vault Cracker — Higher or Lower, a Hot-Cold Meter, Clues, a Binary Search Coach, Daily, Blitz and AI Duel',
      description: `A number guessing game is the first game most programmers write, and it hides one of the most important ideas in computer science: binary search. This version turns it into a vault cracker. The vault holds a secret number, you type guesses on a keypad, and you hear higher or lower, see a hot-cold meter, and watch a number line shrink to the part that is still possible. It is plain HTML, CSS and JavaScript with an SVG vault door, no libraries, no images and no audio files.

**Why the middle guess wins**

Every guess that is not right still gives one bit of information: the number is higher or lower. If you always guess the middle of the range that is left, you cut the possibilities in half each time. That is binary search, and it means that 100 numbers need at most 7 guesses (the first power of two above 100 is 128, which is 2 to the power of 7), 1,000 numbers need 10, and 1,000,000 numbers need only 20. The game calls that number the **par** for each vault: crack it in par tries or fewer for three stars.

**A game around one idea**

There are eight vaults, from a Pocket Safe (1 to 10) to The Million (1 to 1,000,000). A vault locks after par plus three tries. A **Daily Vault** holds the same number for everyone on a given date, with a streak and a copy-result line. **Blitz** gives you 60 seconds to crack as many 1 to 100 vaults as you can, and cracking one at par adds time. In the **Duel** an AI (Rookie, Pro or Master) tries to find your secret number while you look for its number, and the Master AI plays perfect binary search.

**Information you pay for**

Four clues cost one try each: even or odd, divisible by 3, divisible by 5, and which quarter of the remaining range the number is in. The quarter clue shrinks the possible range, so it is a real trade. A **chart** under the guesses shows the numbers left after each guess as bars, with the perfect-halving line as dots, so you can see exactly where you wasted a guess. The **Coach** button names the best next guess and explains why.

**How the code works**

The hot-cold meter uses the distance to the secret as a fraction of the range (2, 5, 10, 20 and 40 percent are the band edges). The number line is a bar whose green part is set from the current low and high, and each guess is a small triangle placed by its value. Par is \`Math.ceil(Math.log2(n + 1))\`. The AI chooses the middle of what is left (Master), the middle plus noise (Pro) or a random number in range (Rookie). Progress, stars, stats, achievements and the daily streak are stored in \`localStorage\` inside try/catch, so the game still works where storage is blocked.

**Controls**

Use the on-screen keypad, or type digits, Backspace and Enter. Up and Down change the number by 1 (Shift for 10). H toggles the coach and Esc opens the menu. The layout is a keypad-first design for phones and a two-column vault and number-line layout on large screens, and it scales to fit short preview areas.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick a vault, the Daily Vault, Blitz or a Duel', text: 'The menu has eight vaults from 1 to 10 up to 1 to 1,000,000, a daily vault with a streak, a 60-second Blitz and an AI duel at three skill levels. Crack a vault to unlock the next.' },
        { title: 'Enter a guess', text: 'Use the on-screen keypad, or type digits on the keyboard, and press GO or Enter. Up and Down arrows nudge the number.' },
        { title: 'Read the three signals', text: 'You get higher or lower, a hot-cold meter that says how close you are, and a number line whose green part shows what is still possible.' },
        { title: 'Aim for par', text: 'Par is the most tries perfect play needs. Crack the vault in par tries for three stars. It locks after par plus three tries.' },
        { title: 'Buy a clue when you are stuck', text: 'Even or odd, divisible by 3, divisible by 5, or which quarter of the range. Each clue costs one try, and the quarter clue shrinks the range.' },
        { title: 'Turn on the Coach to learn binary search', text: 'The coach names the best next guess (the middle of what is left) and explains why. The chart compares your guesses with perfect halving, and your efficiency feeds your rank.' },
      ],
    },
    features: [
      'Eight vaults from 1 to 10 up to 1 to 1,000,000, each with a par worked out as the ceiling of log2(n + 1)',
      'Hot-cold meter with six bands, and a number line that shrinks to the numbers still possible',
      'Daily Vault with the same number for everyone, a streak and a copy-result line',
      '60-second Blitz with time bonuses and a saved best score',
      'AI Duel at three skill levels: random Rookie, noisy Pro and perfect-bisection Master',
      'Four clues that cost a try, including a quarter clue that shrinks the range',
      'Binary-search coach and a chart of numbers left per guess against perfect halving',
      'Stars, efficiency rank from Novice to Binary Master, stats and eight achievements',
      'SVG vault door that spins with each guess and opens on a win, Geiger-style sound from a Web Audio synth',
      'On-screen keypad for phones, keyboard support, scales to fit the preview area and saves to localStorage inside try/catch',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teach binary search with a game', desc: 'Players discover that guessing the middle is best, see the numbers left halve on the chart, and learn why 1,000,000 numbers need only 20 guesses.' },
      { icon: 'CODE', title: 'Reference for a complete small game', desc: 'It shows state, a keypad, a number line, a chart, timers, an AI opponent, seeded daily content, stats and achievements in one readable file.' },
      { icon: 'APP', title: 'A reason to come back', desc: 'A daily vault with a streak, a Blitz best score, ranks and achievements turn a simple game into one people return to, with no account or backend.' },
      { icon: 'DESIGN', title: 'Feedback design: three signals from one guess', desc: 'Higher or lower, a coarse hot-cold meter and a shrinking range show how to give players useful feedback without giving the answer away.' },
      { icon: 'FLOW', title: 'Study a simple AI with skill levels', desc: 'Rookie, Pro and Master differ by one line each (random, noisy middle, exact middle), which makes a clear example of tuning difficulty.' },
      { icon: 'CODE', title: 'Related: Binary Search Visualizer', desc: 'See the [Binary Search Visualizer](/ui-snippets/binary-search-visualizer/) to watch the algorithm step through a sorted list.' },
    ],
    faqs: [
      { q: 'What is the best strategy for a number guessing game?', a: 'Always guess the middle of the range that is still possible. Each answer (higher or lower) then removes half of the numbers. That is binary search: 100 numbers need at most 7 guesses, 1,000 need 10 and 1,000,000 need 20.' },
      { q: 'How is par worked out?', a: 'Par is the ceiling of log2(n + 1), the number of halvings needed to get from n possible numbers down to one. For 1 to 100 that is 7. Cracking the vault in par tries or fewer is three stars, one try over is two stars, and anything else is one star.' },
      { q: 'What does the hot-cold meter tell me?', a: 'It shows how far your last guess was from the secret number as a share of the whole range: within 2 percent is Burning, 5 percent Hot, 10 percent Warm, 20 percent Cool, 40 percent Cold and more than that Freezing. It is a coarse hint, so it helps without replacing binary search.' },
      { q: 'How do the clues work, and why do they cost a try?', a: 'Even or odd, divisible by 3, and divisible by 5 each tell you one fact about the number. The quarter clue splits the remaining range into four parts and tells you which one holds the number, then shrinks the range. Each clue uses one of your tries, so you have to decide whether the information is worth it.' },
      { q: 'How does the AI in the Duel play?', a: 'The Master always guesses the middle of what it still thinks possible. The Pro guesses near the middle with some random noise, and the Rookie guesses randomly inside its range. All three only use the higher or lower answers you give by guessing, so none of them can see your secret number.' },
      { q: 'How is the Daily Vault the same for everyone?', a: 'The number comes from a seeded random generator (mulberry32) based on the date, so everyone gets the same vault on the same day. The streak counts consecutive days you cracked it, and the copy button builds a short result line with arrows for each guess.' },
      { q: 'Does it work on phones and in sandboxed iframes?', a: 'Yes. A big on-screen keypad replaces the system keyboard, the layout stacks on narrow screens, and every localStorage and audio call is wrapped in try/catch, so progress is only lost, never an error, when storage is blocked.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to explain how par is computed from log2, how the number line, hot-cold meter and chart are drawn from the low and high bounds, and how the Rookie, Pro and Master AIs choose a guess. It is also a good base to extend: ask for a Liar mode where one answer is false, a Moving Target mode, a two-player pass-and-play mode, word or date guessing, a weekly leaderboard stored in localStorage, or a visual replay of your guesses against perfect play. You can also ask it to review the keypad handling and the blocked-storage behaviour.`,
      prompt: `Build a number guessing game called Vault Cracker in plain HTML, CSS and JavaScript, with no libraries, images or audio files.

Requirements:
- A secret number in a range. Eight vaults (1 to 10, 50, 100, 250, 1000, 10000, 100000, 1000000). par = Math.ceil(Math.log2(n + 1)); the vault locks after par + 3 tries; stars: 3 if tries <= par, 2 if tries <= par + 1, else 1. Crack a vault to unlock the next.
- Input: an on-screen keypad (0-9, C, backspace, GO) plus keyboard digits, Backspace, Enter and Up/Down (Shift for 10). Reject guesses outside the remaining possible range with a message and a shake animation.
- Feedback for each wrong guess: higher or lower, a six-band hot-cold meter from the distance as a share of the range (2, 5, 10, 20, 40 percent), a number line whose green part is the remaining range with a triangle marker per guess, tries dots, and a chart of numbers left after each guess as bars against the perfect-halving line as dots. An SVG vault door whose wheel turns with each guess, bolts that retract on a win and a red alarm on a loss.
- Clues that each cost one try: even or odd, divisible by 3, divisible by 5, and which quarter of the remaining range (this one shrinks the range).
- A Coach toggle that names the best next guess (the middle), says how many numbers are left and the most guesses still needed.
- Modes: Classic vaults; Daily Vault (1 to 1000, number from mulberry32 seeded by the date, a streak, a copy result line of arrows); Blitz (60 seconds, 1 to 100, points per vault, +3 seconds for a par crack, saved best); Duel (you choose a hidden secret number, an AI with Rookie = random in range, Pro = middle with noise, Master = exact middle guesses yours in turn, first to find the other wins).
- Stats and an efficiency rank (par / tries averaged: Novice, Apprentice, Detective, Safecracker, Binary Master), eight achievements with a toast, all in localStorage inside try/catch.
- Web Audio sounds (key tick, up and down glides, a Geiger-style tick count by heat band, vault clunk on a win), a mute button, confetti, an animated star result screen, scale-to-fit for short areas and a stacked layout for narrow screens.`,
    },
  },
};

export default numberGuessingGame;
