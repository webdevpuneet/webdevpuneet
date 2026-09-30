const timezoneMeetingOverlapFinder = {
  id: 'timezone-meeting-overlap-finder',
  title: 'Timezone Meeting Overlap Finder',
  lastmod: '2026-08-27',
  category: 'tools',
  html: `<div class="demo">
  <div class="overlap-card">
    <div class="overlap-head">
      <h3>Find a meeting time</h3>
      <p>Green columns show hours between 8am–6pm local time for everyone</p>
    </div>

    <div class="zone-list" id="zoneList">
      <div class="zone-row" data-offset="-7">
        <span class="zone-name">San Francisco</span>
        <span class="zone-offset">UTC−7</span>
      </div>
      <div class="zone-row" data-offset="-4">
        <span class="zone-name">New York</span>
        <span class="zone-offset">UTC−4</span>
      </div>
      <div class="zone-row" data-offset="1">
        <span class="zone-name">London</span>
        <span class="zone-offset">UTC+1</span>
      </div>
      <div class="zone-row" data-offset="5.5">
        <span class="zone-name">Mumbai</span>
        <span class="zone-offset">UTC+5:30</span>
      </div>
    </div>

    <div class="grid-wrap">
      <div class="hour-grid" id="hourGrid"></div>
    </div>

    <div class="overlap-summary" id="overlapSummary" role="status" aria-live="polite"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.overlap-card { width: 480px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 16px; }
.overlap-head h3 { font-size: 14.5px; font-weight: 800; color: #111827; margin-bottom: 3px; }
.overlap-head p { font-size: 11px; color: #94a3b8; }

.zone-list { display: flex; flex-direction: column; gap: 6px; }
.zone-row { display: flex; align-items: center; justify-content: space-between; font-size: 12px; padding: 2px 2px; }
.zone-name { font-weight: 700; color: #334155; }
.zone-offset { font-weight: 600; color: #94a3b8; font-variant-numeric: tabular-nums; }

.grid-wrap { overflow-x: auto; }
.hour-grid { display: grid; grid-template-columns: repeat(24, 1fr); grid-auto-rows: 22px; gap: 2px; min-width: 480px; }

.hour-cell { border-radius: 3px; background: #f1f5f9; position: relative; }
.hour-cell.in-window { background: #bbf7d0; }
.hour-cell.overlap { background: #22c55e; }
.hour-cell.now { box-shadow: inset 0 0 0 2px #6366f1; }

.overlap-summary { font-size: 12.5px; font-weight: 700; color: #15803d; background: #f0fdf4; border-radius: 10px; padding: 10px 14px; }
.overlap-summary.none { color: #b91c1c; background: #fef2f2; }`,
  js: `const zoneList = document.getElementById('zoneList');
const hourGrid = document.getElementById('hourGrid');
const summaryEl = document.getElementById('overlapSummary');

const zones = Array.from(zoneList.querySelectorAll('.zone-row')).map((row) => ({
  name: row.querySelector('.zone-name').textContent,
  offset: parseFloat(row.dataset.offset),
}));

const WORK_START = 8; // 8am local
const WORK_END = 18; // 6pm local

// For a given UTC hour (0-23) and a zone's offset, what is that zone's local hour?
function localHour(utcHour, offset) {
  let h = (utcHour + offset) % 24;
  if (h < 0) h += 24;
  return h;
}

function isWithinWorkHours(localH) {
  return localH >= WORK_START && localH < WORK_END;
}

function buildGrid() {
  hourGrid.innerHTML = '';
  const overlapHours = [];

  for (let utcHour = 0; utcHour < 24; utcHour++) {
    const inWindowForAll = zones.every((z) => isWithinWorkHours(localHour(utcHour, z.offset)));
    if (inWindowForAll) overlapHours.push(utcHour);
  }

  // One row per zone, 24 cells each, colored by whether that specific UTC hour
  // falls in that zone's working window AND whether it's a shared overlap hour.
  zones.forEach((zone) => {
    for (let utcHour = 0; utcHour < 24; utcHour++) {
      const cell = document.createElement('div');
      const localH = localHour(utcHour, zone.offset);
      const inWindow = isWithinWorkHours(localH);
      const isOverlap = overlapHours.includes(utcHour);

      cell.className = 'hour-cell' + (isOverlap ? ' overlap' : inWindow ? ' in-window' : '');
      cell.title = \`\${zone.name}: \${formatHour(localH)} local (UTC hour \${utcHour})\`;
      hourGrid.appendChild(cell);
    }
  });

  renderSummary(overlapHours);
}

function formatHour(h) {
  const period = h < 12 ? 'AM' : 'PM';
  let display = h % 12;
  if (display === 0) display = 12;
  return \`\${display}:00 \${period}\`;
}

function formatRange(hours) {
  // Group consecutive UTC hours into contiguous ranges for readable output.
  const ranges = [];
  let start = hours[0];
  let prev = hours[0];

  for (let i = 1; i <= hours.length; i++) {
    if (hours[i] !== prev + 1) {
      ranges.push([start, prev]);
      start = hours[i];
    }
    prev = hours[i];
  }
  return ranges;
}

function renderSummary(overlapHours) {
  if (overlapHours.length === 0) {
    summaryEl.textContent = 'No shared 8am–6pm window across all these time zones.';
    summaryEl.classList.add('none');
    return;
  }

  summaryEl.classList.remove('none');
  const ranges = formatRange(overlapHours);
  const zoneTimes = zones.map((z) => {
    const localStart = formatHour(localHour(ranges[0][0], z.offset));
    return \`\${z.name} \${localStart}\`;
  }).join(' · ');

  const hourCount = overlapHours.length;
  summaryEl.textContent = \`\${hourCount} shared hour\${hourCount === 1 ? '' : 's'} available — starting at \${zoneTimes}\`;
}

buildGrid();`,
  seo: {
    title: 'Timezone Meeting Overlap Finder — Computed Shared Availability Across Multiple Zones',
    description: 'A scheduling utility that computes, for a list of time zones, exactly which UTC hours fall inside everyone\'s 8am–6pm local working window, rendering a genuine grid-based overlap visualization.',
    about: {
      title: 'Timezone Meeting Overlap Finder — Real Overlap Computation, Not Just a Converter',
      description: `A simple timezone converter tells you what time it is in another zone right now. This tool solves a different, more useful problem: given several people's working-hours windows across different time zones, which hours of the day (if any) fall inside *everyone's* working window at once — computed correctly, for every hour of the day, not just checked one at a time.

**Anchoring every zone to a shared UTC hour axis**

Rather than comparing local times to each other directly (which gets error-prone fast across several zones), every calculation is anchored to a loop over UTC hours 0–23. \`localHour(utcHour, offset)\` converts a given UTC hour into that specific zone's local hour — \`(utcHour + offset) % 24\`, corrected for negative results with an added 24 — so every zone's working-hours check happens against the same universal reference point, UTC, rather than each zone comparing itself pairwise against every other zone.

**A genuine "in every zone's window" check, not just pairwise**

For each of the 24 UTC hours, \`zones.every((z) => isWithinWorkHours(localHour(utcHour, z.offset)))\` checks whether *every single zone* in the list has that UTC hour fall within its own 8am–6pm local window — Array's \`.every()\` is what correctly generalizes this to any number of zones, not just two. Adding a fifth or sixth zone to the list doesn't require any new comparison logic; the same loop and the same \`.every()\` check simply now demand agreement from more parties before an hour counts as shared.

**Half-hour offsets are handled correctly, not rounded away**

Mumbai's UTC+5:30 offset is stored as the decimal \`5.5\`, and the modulo arithmetic in \`localHour()\` works correctly with fractional offsets exactly as it does with whole-hour ones — a detail that matters because several real-world time zones (India, parts of Australia, Newfoundland) use half-hour or even 45-minute offsets, and naively assuming every zone sits on a whole-hour boundary would silently produce wrong overlap results for any of them.

**Turning a set of "yes/no per hour" results into a readable range**

\`formatRange()\` walks the sorted list of overlapping UTC hours and groups consecutive ones into contiguous \`[start, end]\` ranges — so if hours 14, 15, and 16 are all shared, the summary reports one range rather than three disconnected single-hour mentions, which is what makes the final "N shared hours available, starting at…" sentence read naturally instead of like raw computed output.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Add or remove time zones', text: 'Add a new .zone-row with a name and a data-offset value (in hours from UTC, decimals allowed for half-hour zones) to include another participant.' },
        { title: 'Adjust the working-hours window', text: 'Change the WORK_START and WORK_END constants in the JS panel to model a different standard working day.' },
        { title: 'Hover any cell for its exact local time', text: 'Each grid cell carries a tooltip showing that zone\'s exact local time and the corresponding UTC hour.' },
        { title: 'Read the overlap summary', text: 'The bottom summary states how many shared hours exist and each zone\'s local start time for the first shared window.' },
        { title: 'Handle DST manually if needed', text: 'Offsets are treated as fixed for this demo; for a production tool, recompute each zone\'s offset dynamically based on the target date to correctly account for daylight saving time.' },
      ],
    },
    features: [
      'Real overlap computation across UTC hours, generalizing correctly to any number of time zones via Array.every()',
      'Correct handling of fractional (half-hour) UTC offsets like UTC+5:30, not just whole-hour zones',
      'Every zone anchored to a shared UTC hour axis rather than fragile pairwise local-time comparisons',
      'Consecutive overlapping hours grouped into readable ranges instead of listed as disconnected single hours',
      'Full 24-hour grid visualization per zone, distinguishing in-window, shared-overlap, and outside-window hours',
      'Per-cell tooltips showing exact local time and corresponding UTC hour for precise inspection',
      'Accessible live-region summary announces the computed overlap result',
      'Easy to extend to more zones or a different working-hours window by editing plain data, not logic',
    ],
    useCases: [
      { icon: 'REMOTE', title: 'Remote Team Meeting Scheduling', desc: 'Find genuinely shared working hours across a distributed team before proposing a meeting time.' },
      { icon: 'SAAS', title: 'Scheduling Tool Integration', desc: 'A building block for any scheduling product that needs to compute cross-timezone availability.' },
      { icon: 'RECRUITING', title: 'Interview Scheduling Across Regions', desc: 'Quickly check whether a candidate and an international interview panel share any working-hours overlap.' },
      { icon: 'EVENTS', title: 'Global Event/Webinar Time Selection', desc: 'Pick a broadcast time that falls within reasonable hours for the largest possible international audience.' },
      { icon: 'CODE', title: 'Related: Environment Badge', desc: 'See the [Environment Badge](/ui-snippets/environment-badge/) for a related misc pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the shared overlap window actually computed?', a: 'For each of the 24 possible UTC hours, the tool converts that hour into each zone\'s local time and checks whether it falls within that zone\'s 8am–6pm working window, using Array.every() to confirm all zones agree simultaneously — an hour only counts as shared if every single zone in the list passes that check for it.' },
      { q: 'Does this handle time zones with half-hour offsets correctly?', a: 'Yes — offsets are stored as decimal numbers (e.g. 5.5 for UTC+5:30), and the local-hour conversion math works correctly with fractional offsets exactly as it does with whole-hour ones, unlike a naive implementation that assumes every zone sits on a whole-hour boundary.' },
      { q: 'What happens if there is no shared working-hours window at all?', a: 'The summary clearly states "No shared 8am–6pm window across all these time zones" with a distinct red/error styling, rather than silently showing an empty or ambiguous result.' },
      { q: 'Does the tool account for daylight saving time?', a: 'Not in this demo — each zone\'s offset is treated as a fixed value. A production version would need to compute each zone\'s actual UTC offset dynamically based on the specific target date, since DST shifts several zones\' effective offsets at different times of year.' },
      { q: 'How are consecutive overlapping hours combined into readable ranges?', a: 'formatRange() walks the sorted list of overlapping UTC hours and detects breaks where the next hour isn\'t exactly one more than the previous one, splitting the list into contiguous [start, end] ranges — so three consecutive shared hours are reported as one range rather than three separate single-hour mentions.' },
      { q: 'Can I add more than four time zones?', a: 'Yes — the overlap logic is not limited to any specific number of zones; add more .zone-row elements with their name and data-offset, and the same Array.every() check and grid-rendering logic automatically account for however many zones are present.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why anchoring every zone's working-hours check to a shared UTC hour axis (rather than comparing zones' local times to each other pairwise) is the more robust and scalable approach as more zones are added, and to walk through the modulo arithmetic in localHour() for a negative-offset edge case. It's also worth asking for a version that accounts for real daylight saving time by computing each zone's actual offset from a specific calendar date using the Intl API, or one that lets each participant specify their own custom working-hours window instead of a single shared 8am–6pm default.`,
      prompt: `Build a timezone meeting overlap finder in HTML, CSS and vanilla JavaScript that computes which hours of the day fall within every listed time zone's working hours simultaneously — no external libraries.

Requirements:
- Accept a list of named time zones, each with a UTC offset in hours (supporting fractional offsets like +5.5 for zones with half-hour differences, not just whole-hour zones).
- For each of the 24 possible UTC hours, determine whether that hour falls within a defined working-hours window (e.g. 8am–6pm) in EVERY listed zone's local time simultaneously — the check must correctly generalize to any number of zones, not just two, using a method like Array.every() rather than hardcoded pairwise comparisons.
- Render a visual grid with one row per time zone and one column per UTC hour of the day, distinctly styling cells that are within that zone's working window, cells that are within the shared overlap window across all zones, and cells that are outside working hours entirely.
- Give each grid cell a tooltip showing that zone's exact local time and the corresponding UTC hour.
- Group consecutive overlapping UTC hours into contiguous readable ranges (rather than listing each shared hour separately) and display a plain-language summary stating how many shared hours exist and each zone's local start time for the shared window — or a clear message if no shared window exists at all.
- Use an accessible live region for the summary so the computed result is announced to screen reader users.`,
    },
  },
};

export default timezoneMeetingOverlapFinder;
