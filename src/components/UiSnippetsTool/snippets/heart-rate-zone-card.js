const heartRateZoneCard = {
  id: 'heart-rate-zone-card',
  title: 'Heart Rate Zone Card',
  category: 'cards',
  html: `<div class="wrap">
  <div class="hr-card">
    <div class="hr-top">
      <div class="hr-pulse-wrap">
        <svg class="hr-pulse-icon" id="pulseIcon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        <span class="hr-bpm" id="bpm">142</span>
        <span class="hr-unit">bpm</span>
      </div>
      <span class="hr-zone-badge" id="zoneBadge">Cardio</span>
    </div>

    <svg class="hr-wave" viewBox="0 0 300 50" preserveAspectRatio="none">
      <polyline id="hrWave" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points=""/>
    </svg>

    <div class="hr-zones" id="zones"></div>

    <div class="hr-summary">
      <div class="hr-sum-item"><span class="hr-sum-val">18:24</span><span class="hr-sum-label">Duration</span></div>
      <div class="hr-sum-item"><span class="hr-sum-val" id="avgBpm">138</span><span class="hr-sum-label">Avg bpm</span></div>
      <div class="hr-sum-item"><span class="hr-sum-val">312</span><span class="hr-sum-label">Kcal</span></div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; }

.wrap { width: 100%; max-width: 380px; }
.hr-card { background: #fff; border-radius: 20px; padding: 22px; box-shadow: 0 18px 44px rgba(15,23,42,0.1); border: 1px solid #f1f5f9; }

.hr-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
.hr-pulse-wrap { display: flex; align-items: baseline; gap: 6px; }
.hr-pulse-icon { color: #ef4444; align-self: center; animation: beat 0.86s ease-in-out infinite; }
@keyframes beat { 0%, 100% { transform: scale(1); } 25% { transform: scale(1.22); } 40% { transform: scale(1); } }
.hr-bpm { font-size: 30px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }
.hr-unit { font-size: 12px; font-weight: 700; color: #94a3b8; }
.hr-zone-badge { font-size: 11.5px; font-weight: 800; padding: 6px 12px; border-radius: 999px; background: #fee2e2; color: #dc2626; transition: background 0.2s, color 0.2s; }

.hr-wave { width: 100%; height: 40px; margin: 6px 0 14px; }

.hr-zones { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.hr-zone-row { display: flex; align-items: center; gap: 10px; }
.hr-zone-name { font-size: 11.5px; font-weight: 700; color: #64748b; width: 74px; flex-shrink: 0; }
.hr-zone-track { flex: 1; height: 8px; background: #f1f5f9; border-radius: 999px; overflow: hidden; position: relative; }
.hr-zone-fill { height: 100%; border-radius: 999px; transition: width 0.4s ease; }
.hr-zone-pct { font-size: 11px; font-weight: 700; color: #94a3b8; width: 30px; text-align: right; flex-shrink: 0; font-variant-numeric: tabular-nums; }
.hr-zone-row.active .hr-zone-name { color: #0f172a; }

.hr-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding-top: 16px; border-top: 1px solid #f1f5f9; }
.hr-sum-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.hr-sum-val { font-size: 15px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }
.hr-sum-label { font-size: 10.5px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }`,
  js: `// Five standard training zones as percentages of max heart rate, with the
// share of the current session's time (in minutes) spent in each so far.
var ZONES = [
  { name: 'Warm up', min: 50, max: 60, color: '#94a3b8', minutes: 2.1 },
  { name: 'Fat burn', min: 60, max: 70, color: '#22c55e', minutes: 4.8 },
  { name: 'Cardio',   min: 70, max: 85, color: '#f59e0b', minutes: 8.6 },
  { name: 'Peak',     min: 85, max: 95, color: '#ef4444', minutes: 2.4 },
  { name: 'Max',      min: 95, max: 100, color: '#b91c1c', minutes: 0.5 },
];
var MAX_HR = 190; // age-estimated max heart rate driving the zone bpm ranges

function zoneForBpm(bpm) {
  var pctOfMax = (bpm / MAX_HR) * 100;
  for (var i = ZONES.length - 1; i >= 0; i--) {
    if (pctOfMax >= ZONES[i].min) return ZONES[i];
  }
  return ZONES[0];
}

function renderZones(currentZoneName) {
  var totalMinutes = ZONES.reduce(function (s, z) { return s + z.minutes; }, 0);
  var el = document.getElementById('zones');
  el.innerHTML = ZONES.map(function (z) {
    var pct = totalMinutes ? Math.round((z.minutes / totalMinutes) * 100) : 0;
    var active = z.name === currentZoneName;
    return '<div class="hr-zone-row' + (active ? ' active' : '') + '">' +
      '<span class="hr-zone-name">' + z.name + '</span>' +
      '<div class="hr-zone-track"><div class="hr-zone-fill" style="width:' + pct + '%;background:' + z.color + '"></div></div>' +
      '<span class="hr-zone-pct">' + pct + '%</span>' +
    '</div>';
  }).join('');
}

// Simulated live bpm stream (in production this comes from a wearable/BLE heart-rate sensor feed).
var bpmHistory = [128, 131, 135, 138, 140, 142, 141, 139, 143, 145];
var bpmEl = document.getElementById('bpm');
var badgeEl = document.getElementById('zoneBadge');
var waveEl = document.getElementById('hrWave');

function drawWave() {
  var w = 300, h = 50, n = bpmHistory.length;
  var minB = Math.min.apply(null, bpmHistory) - 4;
  var maxB = Math.max.apply(null, bpmHistory) + 4;
  var points = bpmHistory.map(function (b, i) {
    var x = (i / (n - 1)) * w;
    var y = h - ((b - minB) / (maxB - minB)) * h;
    return x.toFixed(1) + ',' + y.toFixed(1);
  }).join(' ');
  waveEl.setAttribute('points', points);
}

function tick() {
  var last = bpmHistory[bpmHistory.length - 1];
  var next = Math.round(Math.max(105, Math.min(178, last + (Math.random() * 10 - 5))));
  bpmHistory.push(next);
  if (bpmHistory.length > 10) bpmHistory.shift();

  bpmEl.textContent = next;
  drawWave();

  var zone = zoneForBpm(next);
  badgeEl.textContent = zone.name;
  badgeEl.style.background = zone.color + '22';
  badgeEl.style.color = zone.color;
  renderZones(zone.name);

  var avg = Math.round(bpmHistory.reduce(function (s, b) { return s + b; }, 0) / bpmHistory.length);
  document.getElementById('avgBpm').textContent = avg;
}

drawWave();
renderZones(zoneForBpm(bpmHistory[bpmHistory.length - 1]).name);
setInterval(tick, 1800);`,
  seo: {
    title: 'Heart Rate Zone Card — Free HTML CSS JS Snippet',
    description: 'A live workout card showing current bpm, a scrolling waveform, and time-in-zone breakdown across five heart-rate training zones. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Heart Rate Zone Card — Live BPM, Waveform & Time-in-Zone Breakdown',
      description: `A raw beats-per-minute number tells you almost nothing on its own — 142 bpm means something completely different for someone walking versus someone sprinting intervals. Training zones fix this by expressing heart rate as a percentage of an estimated maximum, bucketed into named ranges (Warm up, Fat burn, Cardio, Peak, Max) that map to actual training intent. This card shows a live bpm reading, a small scrolling waveform, and a per-zone breakdown of how the current session's time has actually been spent.

**Deriving the zone from a percentage of max, not a raw number**

\`zoneForBpm()\` never compares a bpm value against hardcoded thresholds. It first converts to \`pctOfMax = (bpm / MAX_HR) * 100\`, then walks \`ZONES\` from highest to lowest looking for the first zone whose \`min\` percentage the current reading has reached. This is exactly how real heart-rate zone calculations work — zones are always relative to an individual's estimated max heart rate (commonly \`220 - age\` as a rough formula, though the card just takes \`MAX_HR\` as a plain constant), not a fixed bpm number that would mean something different for every person.

**A waveform built from the last 10 readings, not a canned animation**

\`bpmHistory\` is a rolling array capped at 10 entries — \`tick()\` pushes a new reading and shifts the oldest one off. \`drawWave()\` maps that array onto an SVG \`<polyline>\`'s \`points\` attribute, normalizing each value between the array's own current min and max (with a small padding) so the waveform always uses the full height of its viewBox regardless of whether the session is currently calm or spiking — a fixed y-axis range would either flatten small fluctuations at low effort or clip a real spike at high effort.

**Time-in-zone, not just current zone**

The badge at the top shows the *current* zone, but the bar chart beneath the wave answers a different, arguably more useful question: how has this session's *time* actually been distributed across zones so far? Each \`ZONES[i].minutes\` value accumulates independently of the live bpm stream in this demo, and \`renderZones()\` computes each bar's width as that zone's share of total elapsed minutes — this is the number athletes actually care about post-workout ("I spent 8 of my 18 minutes in Cardio"), distinct from momentary bpm.

**Connecting a real sensor feed**

The \`setInterval(tick, 1800)\` loop simulates a live stream by nudging the last reading up or down by a small random amount, clamped to a plausible range. A production version would replace this entirely with a callback from a Bluetooth Low Energy (BLE) heart-rate sensor's Web Bluetooth API subscription or a wearable vendor's SDK stream — since every visual (bpm text, badge color, waveform, zone bars) is driven from the same \`bpmHistory\` array and \`tick()\` function, wiring in a real sensor is a matter of calling the same update logic from the sensor's own callback instead of \`setInterval\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch it update live', text: 'The demo simulates a live bpm stream every 1.8 seconds — bpm, the badge, the waveform, and the zone bars all update together.' },
        { title: 'Set your max heart rate', text: 'Change MAX_HR to the athlete\'s estimated maximum (a common formula is 220 minus age) — every zone threshold is a percentage of this value.' },
        { title: 'Adjust zone ranges', text: 'Edit the min/max percentages and colors in the ZONES array to match your training program\'s exact zone definitions.' },
        { title: 'Connect a real sensor', text: 'Replace the setInterval simulation in tick() with a callback from a Web Bluetooth heart-rate sensor or wearable SDK that calls the same update logic with each real reading.' },
        { title: 'Reset time-in-zone per session', text: 'Zero out each ZONES[i].minutes at the start of a new workout, then increment the current zone\'s minutes by elapsed time inside tick().' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'zoneForBpm() derives the current zone from percentage of MAX_HR, not a fixed bpm threshold',
      'Rolling 10-reading bpm history array feeds a self-normalizing SVG waveform',
      'Waveform y-axis auto-scales to the current session\'s own min/max so both calm and spiking readings stay visible',
      'Time-in-zone bar chart shows accumulated minutes per zone, independent of the momentary bpm',
      'Zone badge color and background derive directly from the active zone\'s own color value',
      'Animated pulse icon (CSS keyframes) mimics a heartbeat rhythm next to the live number',
      'Live simulated bpm stream via setInterval, structured so a real BLE sensor callback is a drop-in replacement',
      'Rolling average bpm recomputed from the same history array used by the waveform',
    ],
    useCases: [
      { icon: 'APP', title: 'Fitness and workout tracking apps', desc: 'The core use case — a live in-workout card showing current effort, zone, and how the session\'s time has broken down across zones so far.' },
      { icon: 'DASH', title: 'Gym equipment and studio class displays', desc: 'Drive the same card from a chest-strap or wrist sensor feed on a gym\'s cardio equipment or group class leaderboard display.' },
      { icon: 'CHART', title: 'Post-workout summary screens', desc: 'Freeze the final time-in-zone bars and averages as a session recap card once a workout ends, rather than updating live.' },
      { icon: 'LEARN', title: 'Learn percentage-of-max zone calculations', desc: 'A clean example of deriving a categorical state (which zone) from a continuous value (bpm) via a percentage-of-max comparison rather than fixed thresholds.' },
      { icon: 'STAR', title: 'Wearable device companion dashboards', desc: 'Pair with a smartwatch or chest-strap companion app\'s workout detail screen, feeding the same tick() logic from the device\'s real data stream.' },
      { icon: 'FORM', title: 'Personal training and coaching platforms', desc: 'Let a coach set an athlete\'s specific MAX_HR and zone ranges to match a prescribed training program rather than generic defaults.' },
    ],
    faqs: [
      { q: 'How is the current heart-rate zone determined?', a: 'zoneForBpm() converts the raw bpm to a percentage of MAX_HR, then finds the highest zone in the ZONES array whose min percentage threshold that value has reached. Zones are never compared against fixed bpm numbers, only percentages of the individual\'s own maximum.' },
      { q: 'How do I calculate a reasonable MAX_HR value?', a: 'A common rough estimate is 220 minus age, though more accurate lab or field tests exist. Set MAX_HR to whatever value your fitness platform already uses for this athlete — every zone threshold in ZONES is a percentage of it.' },
      { q: 'Why does the waveform rescale instead of using a fixed range?', a: 'drawWave() normalizes each point between the current bpmHistory array\'s own min and max (with small padding), so the waveform always fills the available height. A fixed y-axis range would flatten small fluctuations during a calm warm-up or clip a real spike during a hard interval.' },
      { q: 'What is the difference between the badge and the zone bars?', a: 'The badge shows the single zone the athlete is in right now, based on the latest bpm reading. The zone bars beneath the waveform show accumulated time-in-zone across the whole session so far — a separate, session-level statistic that updates independently of the live badge.' },
      { q: 'How do I connect this to a real heart-rate sensor?', a: 'Replace the setInterval(tick, 1800) simulation with a subscription to your sensor source (for example, the Web Bluetooth API\'s heart-rate service, or a wearable vendor SDK\'s live-data callback) that calls a version of tick() using the sensor\'s real bpm value instead of the randomly nudged simulated one.' },
      { q: 'Can I reset the time-in-zone bars for a new workout?', a: 'Yes — set every ZONES[i].minutes back to 0 when a new session starts, then increment the currently active zone\'s minutes by the elapsed interval each time tick() runs, instead of using the static demo minutes values.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why zoneForBpm compares a percentage of MAX_HR rather than the raw bpm value against fixed thresholds, and why that distinction matters for two athletes of different ages and fitness levels using the same card. The same assistant can help optimize it — for instance asking whether accumulating ZONES[i].minutes should be driven by actual elapsed wall-clock time rather than static demo values once wired to a real sensor. It's also useful for extending the card: ask it to add a target-zone alert that changes color when the athlete drifts outside a prescribed zone, connect it to the Web Bluetooth heart-rate service for a real chest-strap sensor, or add a post-workout summary view that freezes the final numbers. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a live "heart rate zone card" in plain HTML, CSS, and JavaScript — no charting library, no framework.

Requirements:
- Define five named training zones (for example Warm up, Fat burn, Cardio, Peak, Max) as a plain JavaScript array, each with a minimum and maximum percentage-of-max-heart-rate threshold and its own accent color, plus a separate constant for the athlete's estimated maximum heart rate in bpm.
- Write a function that takes a raw bpm reading, converts it to a percentage of the maximum heart rate constant, and returns whichever zone's percentage range that value falls into — the comparison must be against the percentage of max, never against fixed bpm numbers, so changing the max heart rate constant alone changes every zone's effective bpm range.
- Show a large live bpm number with a small pulsing heart icon animated via CSS keyframes, and a colored badge showing the current zone's name, whose background and text color come directly from that zone's own color value.
- Maintain a rolling array of the last 10 or so bpm readings and render them as a smooth SVG polyline waveform whose vertical scale is normalized to that array's own current minimum and maximum (with small padding) rather than a fixed range, so the line always uses the available height whether readings are calm or spiking.
- Render a horizontal bar per zone showing what percentage of total accumulated session minutes has been spent in that zone, separate from and updating independently of the single current-zone badge.
- Simulate a live data stream with a repeating timer that nudges the previous bpm reading by a small random amount within a clamped realistic range, structured so replacing the timer with a real sensor callback would require touching only the one line that generates the next bpm value.`,
    },
  },
};

export default heartRateZoneCard;
