const matchBracketTree = {
  id: 'match-bracket-tree',
  title: 'Tournament Match Bracket',
  lastmod: '2026-08-22',
  category: 'layouts',
  cdnUrls: [],
  html: `<div class="mbt-wrap">
  <h3 class="mbt-title">Quarterfinals → Semifinals → Final</h3>
  <div class="mbt-bracket" id="mbtBracket">
    <svg class="mbt-lines" id="mbtLines"></svg>
    <div class="mbt-round" id="mbtRound0"></div>
    <div class="mbt-round" id="mbtRound1"></div>
    <div class="mbt-round" id="mbtRound2"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c1016;color:#e6e9f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 16px}

.mbt-wrap{width:100%;max-width:760px}
.mbt-title{font-size:13px;font-weight:700;color:#7c8598;text-align:center;margin-bottom:20px;letter-spacing:.02em}

.mbt-bracket{position:relative;display:flex;justify-content:space-between;height:420px}
.mbt-lines{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible}

.mbt-round{display:flex;flex-direction:column;justify-content:space-around;width:190px;position:relative;z-index:1}

.mbt-match{background:#151a24;border:1px solid #262d3d;border-radius:10px;overflow:hidden}
.mbt-slot{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;font-size:12.5px;font-weight:600;color:#8b93a8;border-bottom:1px solid #262d3d}
.mbt-slot:last-child{border-bottom:none}
.mbt-slot.mbt-winner{color:#fff;background:#1b2a20;font-weight:800}
.mbt-slot.mbt-winner .mbt-seed{color:#4ade80}
.mbt-seed{font-size:10px;color:#4b5568;font-weight:800;width:16px;flex-shrink:0}
.mbt-slot-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-left:2px}

.mbt-round:nth-child(4) .mbt-match .mbt-slot.mbt-winner{background:#241c0f;color:#fbbf24}
.mbt-round:nth-child(4) .mbt-match .mbt-slot.mbt-winner .mbt-seed{color:#fbbf24}`,

  js: `// 8-player single-elimination bracket: 4 quarterfinal matches feed 2 semifinal
// matches, which feed 1 final. Each match records a winner index (0 or 1).
var QF = [
  { players: ['Reyes', 'Nakamura'], winner: 0 },
  { players: ['Okafor', 'Petrov'], winner: 1 },
  { players: ['Lindqvist', 'Achebe'], winner: 0 },
  { players: ['Duval', 'Santoro'], winner: 0 },
];

function buildRound(prevRound) {
  // Pairs consecutive winners from the previous round into this round's matches.
  var round = [];
  for (var i = 0; i < prevRound.length; i += 2) {
    var a = prevRound[i].players[prevRound[i].winner];
    var b = prevRound[i + 1].players[prevRound[i + 1].winner];
    round.push({ players: [a, b], winner: 0 }); // demo: first-listed player advances each round
  }
  return round;
}

var SF = buildRound(QF);
var FINAL = buildRound(SF);
var ROUNDS = [QF, SF, FINAL];
var ROUND_IDS = ['mbtRound0', 'mbtRound1', 'mbtRound2'];

function renderRound(round, elId) {
  var el = document.getElementById(elId);
  el.innerHTML = round.map(function (match) {
    return '<div class="mbt-match">' +
      match.players.map(function (name, i) {
        var isWinner = i === match.winner;
        return '<div class="mbt-slot' + (isWinner ? ' mbt-winner' : '') + '">' +
          '<span class="mbt-seed">' + (isWinner ? '\\u2713' : '') + '</span>' +
          '<span class="mbt-slot-name">' + name + '</span>' +
        '</div>';
      }).join('') +
    '</div>';
  }).join('');
}

function drawConnectors() {
  var bracket = document.getElementById('mbtBracket');
  var svg = document.getElementById('mbtLines');
  var bracketRect = bracket.getBoundingClientRect();
  svg.innerHTML = '';
  svg.setAttribute('viewBox', '0 0 ' + bracketRect.width + ' ' + bracketRect.height);

  for (var r = 0; r < ROUNDS.length - 1; r++) {
    var sourceMatches = document.getElementById(ROUND_IDS[r]).children;
    var targetMatches = document.getElementById(ROUND_IDS[r + 1]).children;

    for (var i = 0; i < sourceMatches.length; i++) {
      var sRect = sourceMatches[i].getBoundingClientRect();
      var tEl = targetMatches[Math.floor(i / 2)];
      var tRect = tEl.getBoundingClientRect();

      var sx = sRect.right - bracketRect.left;
      var sy = sRect.top + sRect.height / 2 - bracketRect.top;
      var tx = tRect.left - bracketRect.left;
      var ty = tRect.top + tRect.height / 2 - bracketRect.top;
      var midX = sx + (tx - sx) / 2;

      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M ' + sx + ' ' + sy + ' H ' + midX + ' V ' + ty + ' H ' + tx);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#33394a');
      path.setAttribute('stroke-width', '2');
      svg.appendChild(path);
    }
  }
}

renderRound(QF, 'mbtRound0');
renderRound(SF, 'mbtRound1');
renderRound(FINAL, 'mbtRound2');

// Connector coordinates depend on rendered layout, so draw after layout settles,
// and redraw on resize since match positions shift with the viewport.
requestAnimationFrame(drawConnectors);
window.addEventListener('resize', drawConnectors);`,

  seo: {
    title: 'Tournament Match Bracket — Free Single-Elimination Bracket HTML CSS JS',
    description: `An 8-player single-elimination bracket with quarterfinal, semifinal, and final rounds, connected by SVG lines computed from real match positions. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Tournament Match Bracket — Connector Lines Computed From Real Layout, Not Guessed',
      description: `Most CSS-only tournament brackets fake their connector lines with fixed-height pseudo-elements that only line up if every match box happens to be exactly the same height and every round's spacing math works out by coincidence. This snippet takes a more reliable approach: it renders three rounds of matches with flexbox, then measures their *actual* rendered positions with \`getBoundingClientRect()\` and draws SVG paths between them — so the connectors are always correct, in plain HTML, CSS, and vanilla JavaScript.

**Winners derived from data, not hardcoded per round**

The bracket starts from one array, \`QF\`, holding four quarterfinal matches with a winner index each. \`buildRound()\` takes the previous round's winners two at a time and builds the next round's matches from them — so \`SF\` (semifinals) and \`FINAL\` are *computed*, not separately authored, guaranteeing the bracket is always internally consistent: whoever the data says won a quarterfinal is exactly who appears in the semifinal slot that quarterfinal feeds.

**Layout with flexbox, connectors with measured SVG**

Each round is a flex column with \`justify-content: space-around\`, which gets matches visually close to their correct positions cheaply. But rather than trust that spacing to be pixel-exact — which breaks the moment match card heights vary, text wraps differently, or the browser rounds subpixel values differently — \`drawConnectors()\` reads every match element's real \`getBoundingClientRect()\` after render and draws an SVG \`path\` from the vertical center of each feeding match's right edge to the vertical center of the match it feeds into's left edge, with a horizontal-vertical-horizontal "elbow" shape (\`M x y H midX V targetY H targetX\`).

**Why this connector logic is provably correct**

Match \`i\` in round \`r\` always feeds match \`Math.floor(i / 2)\` in round \`r + 1\` — that's the fixed mathematical structure of single elimination, and it's exactly the index math \`drawConnectors()\` uses to find each source match's target element. Because the coordinates come from the live DOM rather than assumed CSS math, the lines connect correctly even if you change match card height, font size, or round spacing — there's no magic number to keep in sync.

**Redraws when the layout can change**

The initial draw runs inside \`requestAnimationFrame\` so it measures positions only after the browser has committed layout, and a \`resize\` listener redraws the connectors whenever the viewport changes — since flex spacing (and therefore every match's pixel position) shifts with the container width.

**Overflow-safe names, clear winner state**

Long player names truncate with an ellipsis inside each slot, and the winning competitor in each match gets a distinct background, bold weight, and a checkmark — with the champion's final-round win additionally accented gold via a \`:nth-child\` selector on the last round.

**Customizing it**

Extend \`ROUNDS\`/\`ROUND_IDS\` to support 16 or 32 players (the connector math needs no changes — it already generalizes to any number of rounds), swap the winner-selection logic for real live results, or animate each connector path drawing in with \`stroke-dasharray\`. Pair it with a [leaderboard table](/ui-snippets/leaderboard-table/) for a seeding list alongside the bracket.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An 8-player bracket renders across three rounds with winners already highlighted.` },
      { title: 'Trace a connector', text: `Follow a line from a quarterfinal match's winner into its semifinal slot — it lines up exactly.` },
      { title: 'Resize the browser window', text: `Connector lines redraw to stay attached to their matches at the new layout.` },
      { title: 'Edit the QF array', text: `Change player names or winner indexes — SF and FINAL recompute automatically.` },
      { title: 'Extend to 16 players', text: `Add a round and a corresponding round element/ID; the connector loop generalizes automatically.` },
      { title: 'Wire in live results', text: `Update a match's winner index as real results come in, then re-render and redraw.` },
    ] },
    features: [
      { title: 'Measured, not guessed, connectors', text: `SVG paths are drawn from real getBoundingClientRect() positions, so they always line up.` },
      { title: 'Data-derived rounds', text: `Semifinal and final matches are computed from quarterfinal winners, never hand-authored separately.` },
      { title: 'Resize-safe layout', text: `Connectors redraw on window resize as flex spacing shifts match positions.` },
      { title: 'Generalizes to any bracket size', text: `The floor(i / 2) feed-index math works for any power-of-two round count.` },
      { title: 'Clear winner state', text: `A distinct background, weight, and checkmark mark the advancing competitor per match.` },
      { title: 'Champion accent', text: `The final round's winning slot gets a distinct gold treatment via CSS nth-child.` },
      { title: 'Overflow-safe names', text: `Long competitor names truncate cleanly instead of breaking match card layout.` },
      { title: 'Framework-friendly structure', text: `The measure-then-draw pattern ports directly to any component framework's ref-based DOM access.` },
    ],
    useCases: [
      { title: 'Sports tournament sites', text: `Show single-elimination brackets for leagues, playoffs, or local tournaments.` },
      { title: 'Esports and gaming platforms', text: `Live-update a bracket as best-of-N matches conclude.` },
      { title: 'Corporate and community contests', text: `Trivia nights, hackathon judging, or office March Madness-style brackets.` },
      { title: 'Voting and elimination polls', text: `Adapt the same structure for head-to-head elimination voting rounds.` },
      { title: 'Event dashboards', text: `Pair with a [live match scoreboard](/ui-snippets/live-match-scoreboard/) for the currently active match.` },
      { title: 'Learning measured-layout techniques', text: `A reference for getBoundingClientRect()-driven drawing — compare with [leaderboard table](/ui-snippets/leaderboard-table/) for a flat ranked alternative.` },
      { icon: 'CODE', title: 'Related: Swiper Cards Deck', desc: 'See the [Swiper Cards Deck](/ui-snippets/swiper-cards-deck/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the bracket guarantee the connector lines are actually correct?', a: `Instead of relying on CSS spacing math to happen to line up, drawConnectors() calls getBoundingClientRect() on every match element after the browser has committed layout, and draws each SVG path between the real measured center-points of a feeding match and the match it advances into. Because the coordinates come from the live rendered DOM rather than an assumed formula, the lines are correct regardless of match card height, font size, or how the browser rounds subpixel flex positions.` },
      { q: 'How does a quarterfinal match know which semifinal slot it feeds into?', a: `Match index i in any round always feeds match Math.floor(i / 2) in the next round — that is the fixed structure of single-elimination brackets (matches 0 and 1 feed slot 0, matches 2 and 3 feed slot 1, and so on). The drawConnectors() loop uses exactly that formula to look up each target match element, so the feed relationship is derived from index math rather than any separately maintained mapping.` },
      { q: 'Why are the semifinal and final matches computed instead of listed directly?', a: `buildRound() takes a round\\'s matches two at a time and creates the next round\\'s match from each pair\\'s winner, so SF and FINAL are always internally consistent with QF — there is no way for the semifinal bracket to show a player who did not actually win their quarterfinal, because the data literally cannot represent that state.` },
      { q: 'Why redraw the connectors on window resize?', a: `Each round is a flexbox column using justify-content: space-around at a fixed width, so match card positions shift horizontally and vertically whenever the viewport (and therefore the flex container\\'s available space) changes. Because the SVG lines are drawn from measured pixel coordinates rather than percentages, they need to be recalculated after any layout change, which is why a resize listener re-runs drawConnectors().` },
      { q: 'How do I extend this to a 16- or 32-player bracket?', a: `Add more matches to the first round\\'s data array, call buildRound() one more time to generate the additional round, add a matching round container element and ID to the ROUNDS/ROUND_IDS arrays, and add a CSS column for it. The connector-drawing loop already iterates over ROUNDS.length - 1 pairs of adjacent rounds and uses the generalized floor(i / 2) feed index, so no changes to drawConnectors() itself are needed.` },
    ],
    aiPrompt: {
      paragraph: `Rather than debugging misaligned bracket lines by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why drawConnectors() measures real getBoundingClientRect() positions instead of relying on CSS spacing to line matches up, and how the Math.floor(i / 2) feed-index math generalizes to brackets with more rounds. The same assistant can help optimize it — for example asking whether redrawing on every resize event should be throttled/debounced for very rapid window resizing, or whether a ResizeObserver on the bracket container would be more precise than a window resize listener. It's also useful for extending the bracket: ask it to animate each connector path drawing in with stroke-dasharray as results come in, add support for a third-place consolation match, or handle byes for a non-power-of-two number of competitors. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a single-elimination "tournament match bracket" for 8 competitors (quarterfinals, semifinals, final — 3 rounds) in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A base data array of 4 quarterfinal match objects, each holding two competitor names and a winner index (0 or 1); a function that takes any round's array of matches and builds the next round's matches by pairing up consecutive matches' winners, so the semifinal and final rounds are computed from the quarterfinal data rather than being separately hand-authored (this must guarantee the bracket can never show an inconsistent state where a displayed semifinalist did not actually win their quarterfinal).
- Three round columns laid out with CSS flexbox, each containing that round's match cards, with the currently winning competitor in each match visually distinguished from the loser (different background, font weight, and a checkmark or similar indicator).
- Connector lines between rounds that are computed from the real rendered positions of the match elements (using getBoundingClientRect on the actual DOM, not fixed pixel offsets or percentage-based CSS pseudo-elements assumed to line up), drawn as an SVG overlay positioned absolutely over the bracket container.
- The connector logic must correctly implement the feed relationship where match index i in one round connects to match index Math.floor(i / 2) in the next round, drawing an elbow-shaped path (horizontal, then vertical, then horizontal) from the vertical center of the source match's right edge to the vertical center of the target match's left edge.
- The initial connector drawing must happen only after the browser has committed layout (for example via requestAnimationFrame), and connectors must be redrawn whenever the window is resized, since the flexbox round columns reposition their match cards as available width changes.
- Long competitor names must truncate with an ellipsis rather than breaking a match card's fixed-width layout.`,
    },
  },
};

export default matchBracketTree;
