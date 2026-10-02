const leaderboardPodium = {
  id: 'leaderboard-podium',
  title: 'Leaderboard Podium',
  lastmod: '2026-06-23',
  category: 'dashboards',
  html: `<div class="lp-card">
  <h3>Top performers</h3>
  <div class="lp-podium" id="lpPodium"></div>
  <ol class="lp-rest" id="lpRest"></ol>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.lp-card{background:#fff;border-radius:18px;padding:24px;width:100%;max-width:400px;box-shadow:0 24px 60px rgba(0,0,0,.35)}
.lp-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:22px;text-align:center}

.lp-podium{display:flex;align-items:flex-end;justify-content:center;gap:10px;margin-bottom:22px}
.lp-col{display:flex;flex-direction:column;align-items:center;flex:1}
.lp-ava{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:17px;margin-bottom:8px;border:3px solid #fff;box-shadow:0 4px 12px rgba(15,23,42,.18);position:relative}
.lp-col-1 .lp-ava{width:58px;height:58px;font-size:20px}
.lp-medal{position:absolute;bottom:-6px;right:-6px;width:22px;height:22px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 6px rgba(15,23,42,.2)}
.lp-name{font-size:12px;font-weight:700;color:#0f172a;text-align:center;line-height:1.2}
.lp-score{font-size:11px;font-weight:800;color:#6366f1;margin-bottom:8px}
.lp-bar{width:100%;border-radius:9px 9px 0 0;display:flex;align-items:flex-start;justify-content:center;padding-top:8px;color:rgba(255,255,255,.9);font-size:18px;font-weight:900;transform-origin:bottom;transform:scaleY(0);transition:transform .6s cubic-bezier(.22,1,.36,1)}
.lp-podium.lp-in .lp-bar{transform:scaleY(1)}
.lp-col-1 .lp-bar{height:96px;background:linear-gradient(180deg,#fbbf24,#f59e0b)}
.lp-col-2 .lp-bar{height:72px;background:linear-gradient(180deg,#cbd5e1,#94a3b8)}
.lp-col-3 .lp-bar{height:56px;background:linear-gradient(180deg,#d8a878,#b45309)}

.lp-rest{list-style:none}
.lp-rest li{display:flex;align-items:center;gap:12px;padding:10px 6px;border-top:1px solid #f1f5f9}
.lp-rank{width:22px;font-size:13px;font-weight:800;color:#94a3b8;text-align:center}
.lp-rava{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:12px;flex-shrink:0}
.lp-rname{font-size:13.5px;font-weight:600;color:#334155;flex:1}
.lp-rscore{font-size:13px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}`,

  js: `var PLAYERS = [
  { name: 'Aisha K.', score: 9840, color: '#6366f1' },
  { name: 'Marco R.', score: 9120, color: '#22c55e' },
  { name: 'Lena P.', score: 8730, color: '#f59e0b' },
  { name: 'Tom B.', score: 8210, color: '#ec4899' },
  { name: 'Priya N.', score: 7950, color: '#0ea5e9' },
  { name: 'Sara L.', score: 7480, color: '#14b8a6' },
];

function initials(name) { return name.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2); }

var sorted = PLAYERS.slice().sort(function (a, b) { return b.score - a.score; });
var top3 = sorted.slice(0, 3);
var medals = ['🥇', '🥈', '🥉'];
// Podium display order: 2nd, 1st, 3rd (so the winner is centre and tallest).
var order = [1, 0, 2];

var podium = document.getElementById('lpPodium');
podium.innerHTML = order.map(function (idx) {
  var p = top3[idx];
  if (!p) return '';
  var rank = idx + 1;
  return '<div class="lp-col lp-col-' + rank + '">' +
    '<div class="lp-ava" style="background:' + p.color + '">' + initials(p.name) +
      '<span class="lp-medal">' + medals[idx] + '</span></div>' +
    '<div class="lp-name">' + p.name + '</div>' +
    '<div class="lp-score">' + p.score.toLocaleString() + '</div>' +
    '<div class="lp-bar">' + rank + '</div></div>';
}).join('');

document.getElementById('lpRest').innerHTML = sorted.slice(3).map(function (p, i) {
  return '<li><span class="lp-rank">' + (i + 4) + '</span>' +
    '<span class="lp-rava" style="background:' + p.color + '">' + initials(p.name) + '</span>' +
    '<span class="lp-rname">' + p.name + '</span>' +
    '<span class="lp-rscore">' + p.score.toLocaleString() + '</span></li>';
}).join('');

// Animate the podium bars rising once rendered.
requestAnimationFrame(function () { podium.classList.add('lp-in'); });`,

  seo: {
    title: 'Leaderboard Podium — Top 3 Podium HTML CSS JS',
    description: `A leaderboard with a 1-2-3 winners podium (gold/silver/bronze, winner centred and tallest) plus a ranked list below. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Leaderboard Podium — Gold-Silver-Bronze Winners Stand with a Ranked List',
      description: `A leaderboard podium celebrates the top three with a winners' stand — gold in the centre and tallest, silver and bronze flanking — then lists the rest in rank order. It's the high-impact way to show standings in games, sales contests, fitness challenges, and competitions, far more motivating than a plain list. This snippet builds it in plain HTML, CSS, and vanilla JavaScript, with an animated podium and a ranked remainder — no library.

**Podium order vs. rank order**

The clever bit is the *display order*. The winner ranks first but is rendered in the *middle*, with second on the left and third on the right — the real-Olympic-podium arrangement. The snippet sorts players by score to get true ranks, then renders the top three in a deliberate \`[2nd, 1st, 3rd]\` order so the centre column is the winner. Separating logical rank from visual position is the detail that makes a podium read correctly; rendering them left-to-right by rank would look wrong.

**Heights and medals encode placement**

The three podium bars have descending heights (gold tallest, bronze shortest) and gold/silver/bronze gradients, and each avatar carries a 🥇🥈🥉 medal badge. The winner also gets a larger avatar. These redundant cues — position, height, colour, and medal — make first/second/third unmistakable at a glance, which is the whole point of a podium over a list.

**Animated rise**

The bars animate up with a \`scaleY\` transform from a bottom origin, triggered on the next animation frame so the CSS transition runs — the standard requestAnimationFrame technique. The bars growing from the floor mimics a podium rising, giving the reveal a celebratory feel appropriate to a winners' stand.

**Ranked list for everyone else**

Below the podium, ranks four onward render as a clean numbered list with avatars, names, and scores in a tabular-figure column. Combining a podium (for the celebrated top) with a list (for the long tail) is the standard leaderboard structure — the podium draws the eye and provides aspiration, while the list gives complete standings without wasting space on more podium columns.

**Data-driven and drop-in**

Everything comes from a \`PLAYERS\` array; the component sorts it, splits the top three onto the podium, and lists the rest, with avatar initials generated from names. Swap in your scores — points, sales, steps, reputation — and it renders the standings. It's a clear reference for podium ordering, placement encoding, and combining a hero podium with a ranked list. One edge case worth handling explicitly: ties. Sorting by score alone leaves the order of equal scores up to the sort's stability, so for a leaderboard where ties are likely, add a deterministic tiebreaker — alphabetical name, or whoever reached the score first by timestamp — otherwise the same dataset can render players in a different podium order on each reload. The same care applies to live, frequently-updating leaderboards: re-rendering the podium from scratch on every score update would re-trigger the rise animation and steal focus from whatever the user was looking at, so for a live feed you'd diff the new ranking against the current one and only re-run the entrance animation for players whose position actually changed.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A leaderboard renders with a gold/silver/bronze podium and a ranked list beneath.` },
      { title: 'See the podium order', text: `The winner is centred and tallest, with second left and third right.` },
      { title: 'Watch the rise', text: `The podium bars animate up from the floor on load.` },
      { title: 'Swap in your data', text: `Replace the PLAYERS array with your own { name, score, color } entries.` },
      { title: 'Use any score type', text: `Points, sales, steps, or reputation — it sorts and ranks automatically.` },
      { title: 'Restyle it', text: `Change the medal emojis, podium colours, or bar heights to fit your theme.` },
    ] },
    features: [
      { title: 'Olympic podium ordering', text: `Winner centred and tallest, second left, third right — via a deliberate 2-1-3 render order.` },
      { title: 'Placement encoded four ways', text: `Position, bar height, gold/silver/bronze colour, and medal badge all signal rank.` },
      { title: 'Larger winner avatar', text: `First place gets a bigger avatar for extra emphasis.` },
      { title: 'Animated rise', text: `Bars grow with a scaleY transform triggered via requestAnimationFrame.` },
      { title: 'Ranked remainder list', text: `Ranks four onward show as a numbered list with avatars and scores.` },
      { title: 'Auto sort and rank', text: `Players are sorted by score, so ranks and placement derive from the data.` },
      { title: 'Generated avatar initials', text: `Initials come from each name — no images needed.` },
      { title: 'Data-driven & no library', text: `Renders from a PLAYERS array in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Game and app leaderboards', text: 'Celebrate the top three with a gold, silver and bronze stand, with the winner centred and tallest while the remaining ranks list below.' },
      { title: 'Sales contest standings', text: 'Show top reps on a team dashboard, with bars rising via a `scaleY` transform so the reveal feels like an awards ceremony.' },
      { title: 'Step and fitness challenges', text: 'Pair with [activity rings](/ui-snippets/activity-rings/) so each ranked participant also shows how close they are to their own daily goals.' },
      { title: 'Plain ranked tables', text: 'Use the [leaderboard table](/ui-snippets/leaderboard-table/) instead when many columns of stats matter more than a single podium moment for the top three.' },
      { title: 'Rank-versus-position layout reference', text: 'Study how placement is encoded four ways, with order, bar height, medal colour and a larger winner avatar all reinforcing the same ranking.' },
      { icon: 'CODE', title: 'Related: New Hire Day-One Checklist', desc: 'See the [New Hire Day-One Checklist](/ui-snippets/onboarding-day-one-checklist/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is the winner rendered in the middle, not first?', a: `Because a real podium puts first place centre and tallest, with second to the left and third to the right. The snippet computes true ranks by sorting on score, then renders the top three in a deliberate [2nd, 1st, 3rd] order so the centre column is the winner. Separating logical rank from visual position is what makes the podium look correct — rendering left-to-right by rank would misplace everyone.` },
      { q: 'How is each placement made unmistakable?', a: `Through redundant cues: centre/left/right position, descending bar heights, gold/silver/bronze gradients, 🥇🥈🥉 medal badges, and a larger avatar for first. Encoding rank multiple ways means a glance is enough to read first, second, and third — which is the advantage a podium has over a plain ranked list.` },
      { q: 'Why split into a podium plus a list?', a: `The podium celebrates and draws attention to the top three, providing aspiration; the list gives complete standings for everyone else without the visual weight of more podium columns. This podium-plus-list structure is the standard leaderboard layout because it balances impact (the hero podium) with completeness (the full ranking) efficiently.` },
      { q: 'How do the bars animate up?', a: `Each bar has transform-origin: bottom and starts at scaleY(0). On the next animation frame a class is added that sets scaleY(1), and a CSS transition animates the growth — so the bars rise from the floor like a podium being raised. The requestAnimationFrame defer is needed so the browser paints the collapsed state first, letting the transition run.` },
      { q: 'How do I use this leaderboard podium in React, Vue, or Angular?', a: `Hold the players in state, sort and slice into top-3 and the rest, and render the podium (in 2-1-3 order) and list from those. Add the rise animation class in a useEffect (React), onMounted (Vue), or ngAfterViewInit (Angular). The ordering and initials logic is framework-agnostic — only the state and the deferred animation trigger move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to untangle the podium's rank-versus-position logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why the order array is [1, 0, 2] instead of [0, 1, 2], and how that produces the centered, tallest winner column while sorted still reflects true rank. The same assistant can help optimize it, for example asking how to avoid re-triggering the scaleY rise animation on every score refresh in a live leaderboard, or how to add a deterministic tiebreaker when two players share a score. It is also useful for extending the effect, such as adding a confetti burst behind first place, animating rank changes between refreshes with a FLIP transition, or supporting ties by rendering shared medal badges. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "leaderboard podium" in plain HTML, CSS, and JavaScript with no libraries.

Requirements:
- Accept an array of player objects with at least a name, a numeric score, and a color, and sort them by score descending to compute true rank.
- Render only the top three on a podium, but display them in the order [second place, first place, third place] left to right, so the winner is visually centered — while an internal order array separate from the sorted rank array drives this display order.
- Give the podium columns three different fixed heights (tallest for first, medium for second, shortest for third), each with a distinct gold, silver, or bronze CSS gradient background, and attach a medal emoji badge positioned on the corner of each avatar.
- Give the first-place avatar a visibly larger size than second and third to add a fourth redundant cue on top of position, height, color, and medal.
- Generate each avatar's visible content as initials derived from the player's name (not an image), with a background color pulled from that player's data.
- Animate the three podium bars rising from zero height using a CSS transform: scaleY with transform-origin: bottom, triggered by adding a class inside a requestAnimationFrame callback so the transition actually plays instead of being skipped.
- Below the podium, render everyone ranked fourth and lower as a plain numbered list with rank number, avatar initials, name, and score, reusing the same sorted data array without re-deriving it.`,
    },
  },
};

export default leaderboardPodium;
