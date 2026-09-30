const calendarWidget = {
  id: 'calendar-widget',
  title: 'Calendar Widget',
  category: 'dashboards',
  html: `<div class="wrap">
  <div class="cal">
    <div class="cal-head">
      <button class="nav-btn" onclick="shift(-1)">‹</button>
      <div class="month-label" id="month-label"></div>
      <button class="nav-btn" onclick="shift(1)">›</button>
    </div>

    <div class="day-names">
      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span>
      <span>Th</span><span>Fr</span><span>Sa</span>
    </div>

    <div class="days" id="days"></div>

    <div class="events-section">
      <div class="events-head">Upcoming</div>
      <ul class="events-list" id="events-list"></ul>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 320px; }

.cal { background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0 1px 8px rgba(0,0,0,0.07); border: 1px solid #e2e8f0; }

.cal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.month-label { font-size: 15px; font-weight: 700; color: #0f172a; }
.nav-btn { width: 28px; height: 28px; border-radius: 7px; border: 1px solid #e2e8f0; background: #fff; color: #64748b; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.12s; }
.nav-btn:hover { border-color: #6366f1; color: #6366f1; }

.day-names { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; margin-bottom: 6px; }
.day-names span { font-size: 10px; font-weight: 600; color: #94a3b8; padding: 4px 0; }

.days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 12px; border-radius: 6px; cursor: pointer; color: #374151; position: relative; transition: background 0.12s; font-family: system-ui, sans-serif; }
.day:hover { background: #f1f5f9; }
.day.other { color: #cbd5e1; }
.day.today { background: #6366f1; color: #fff !important; font-weight: 700; }
.day.today:hover { background: #4f46e5; }
.day.has-event::after { content: ''; position: absolute; bottom: 3px; width: 4px; height: 4px; border-radius: 50%; background: #6366f1; }
.day.today.has-event::after { background: #fff; }
.day.selected { background: rgba(99,102,241,0.1); color: #6366f1; font-weight: 600; }

.events-section { margin-top: 16px; padding-top: 14px; border-top: 1px solid #f1f5f9; }
.events-head { font-size: 11px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: #94a3b8; margin-bottom: 10px; }
.events-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.event-item { display: flex; align-items: center; gap: 10px; }
.event-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.event-body { flex: 1; min-width: 0; }
.event-title { font-size: 12px; font-weight: 600; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.event-date  { font-size: 11px; color: #94a3b8; }
.no-events { font-size: 12px; color: #94a3b8; font-style: italic; }`,
  js: `const events = [
  { date: '2026-05-30', title: 'Team standup', color: '#6366f1' },
  { date: '2026-05-30', title: 'Design review', color: '#ec4899' },
  { date: '2026-06-02', title: 'Sprint planning', color: '#10b981' },
  { date: '2026-06-05', title: 'Client demo', color: '#f59e0b' },
  { date: '2026-06-10', title: 'Product launch', color: '#0ea5e9' },
  { date: '2026-06-15', title: 'Quarterly review', color: '#6366f1' },
];

const today = new Date();
let cur = new Date(today.getFullYear(), today.getMonth(), 1);

function render() {
  const year = cur.getFullYear(), month = cur.getMonth();
  document.getElementById('month-label').textContent =
    cur.toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const grid = document.getElementById('days');
  grid.innerHTML = '';

  // Prev month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    addDay(grid, prevDays - i, true);
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = year + '-' + String(month+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
    const isToday = year === today.getFullYear() && month === today.getMonth() && d === today.getDate();
    const hasEv = events.some(e => e.date === dateStr);
    addDay(grid, d, false, isToday, hasEv, dateStr);
  }
  // Next month padding
  const total = firstDay + daysInMonth;
  const rem = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let i = 1; i <= rem; i++) addDay(grid, i, true);

  // Upcoming events (next 30 days)
  const list = document.getElementById('events-list');
  const now = new Date(); now.setHours(0,0,0,0);
  const cutoff = new Date(now); cutoff.setDate(cutoff.getDate() + 30);
  const upcoming = events.filter(e => { const d = new Date(e.date); return d >= now && d <= cutoff; })
    .sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0, 4);

  list.innerHTML = upcoming.length === 0
    ? '<li class="no-events">No upcoming events</li>'
    : upcoming.map(e => {
        const d = new Date(e.date + 'T00:00:00');
        const label = d.toLocaleDateString('default', { month: 'short', day: 'numeric' });
        return '<li class="event-item"><span class="event-dot" style="background:'+e.color+'"></span><div class="event-body"><div class="event-title">'+e.title+'</div><div class="event-date">'+label+'</div></div></li>';
      }).join('');
}

function addDay(grid, n, other, isToday, hasEv, dateStr) {
  const el = document.createElement('div');
  el.className = 'day' + (other ? ' other' : '') + (isToday ? ' today' : '') + (hasEv ? ' has-event' : '');
  el.textContent = n;
  if (dateStr) el.onclick = () => {
    grid.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
    if (!isToday) el.classList.add('selected');
  };
  grid.appendChild(el);
}

function shift(dir) { cur.setMonth(cur.getMonth() + dir); render(); }

render();`,
  seo: {
    title: 'Calendar Widget — Free HTML CSS JS Snippet',
    description: 'Mini monthly calendar with navigation, today highlight, event dots and an upcoming events list. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Calendar Widget — Monthly Grid, Today Highlight, Event Dots & Upcoming Events Panel',
      description: `A calendar widget is a fundamental dashboard component for displaying date-based context alongside other metrics and tasks. This snippet provides a complete mini monthly calendar: previous/next month navigation, a 7-column day grid with today highlighted, event dot indicators on days that have events, click-to-select days, and a dynamic upcoming events panel that filters events within the next 30 days — all in plain HTML, CSS, and vanilla JavaScript.\n\n**How the calendar grid is generated**\n\nThe render() function computes three things: the day of the week the month starts on (firstDay), the number of days in the month, and the number of days in the previous month (for padding). The grid always starts on Sunday. Padding days from the previous month fill the start of the first row; padding days from the next month fill the end of the last row. Each day div is created with classList flags: .other (padding days), .today (today's date), .has-event (dot indicator), and .selected (click selection).\n\n**The event dot indicator**\n\nDays with matching events get the .has-event class which adds a ::after pseudo-element — a 4px circle positioned at the bottom of the day cell. The dot is accent coloured for normal days and white on the .today cell (since the today background is the accent colour). This is a standard calendar pattern used by Apple Calendar, Google Calendar, and iOS date pickers.\n\n**The upcoming events panel**\n\nBelow the calendar grid, an upcoming events list filters the events array to entries within the next 30 days from today. Events are sorted by date ascending and limited to 4 items. Each event shows a coloured dot matching the event's colour, the event title (truncated with text-overflow: ellipsis), and the formatted date. If no upcoming events exist, a "No upcoming events" italic message shows instead.\n\n**Month navigation**\n\nThe shift(dir) function calls cur.setMonth(cur.getMonth() + dir) — JavaScript's Date handles month boundary arithmetic automatically. Shifting from January by -1 gives December of the previous year. The calendar re-renders fully on each navigation.\n\n**Customising events**\n\nReplace the events array with your own event data. Each event needs date (YYYY-MM-DD format), title, and color. Wire to a calendar API (Google Calendar, CalDAV) by replacing the events array with data fetched from the API on render.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Navigate months', text: 'Click the ‹ and › buttons to move to the previous or next month. The grid regenerates, today highlight remains on the current date, and event dots update for each month.' },
      { title: 'Click a day to select it', text: 'Click any day in the current month to highlight it with a selected state (indigo tint). The previously selected day deselects. Today cannot be selected — it always shows the filled accent background.' },
      { title: 'Update the events array', text: 'In the JS panel, edit the events array. Each event needs: date in YYYY-MM-DD format, title string, and color hex. Events show as dots on the calendar and appear in the upcoming panel if within the next 30 days.' },
      { title: 'Change the week start day', text: 'The calendar starts on Sunday (getDay() = 0). To start on Monday, subtract 1 from firstDay and adjust the day-names header order: Mo Tu We Th Fr Sa Su.' },
      { title: 'Extend upcoming events range', text: 'In render(), change the cutoff from 30 days to any number: cutoff.setDate(cutoff.getDate() + N). Increase the .slice(0, 4) limit to show more upcoming events in the panel.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component managing cur state with useState and events with useMemo, or "Tailwind" for a Tailwind CSS version.' },
    ]},
    features: ['Monthly grid: firstDay padding + daysInMonth + trailing padding — always 7 columns','today class: highlighted with accent background colour','has-event class: ::after dot indicator at bottom of day cell','selected class: click-to-select with accent tint, auto-deselects previous','Upcoming events panel: filtered to next 30 days, sorted ascending, limited to 4','Event items: coloured dot + truncated title + formatted short date','shift(dir): setMonth handles month boundary wrap automatically','Prev/next nav buttons with hover accent border effect'],
    useCases: [
      { icon: 'APP', title: 'Dashboard date context and event overview widget', desc: 'Show the current month alongside key events — sprint deadlines, team meetings, product launches — in a compact sidebar widget. The upcoming events panel gives date-aware context without opening a full calendar application.' },
      { icon: 'FLOW', title: 'Booking and appointment date picker for scheduling UIs', desc: 'Wire the day click handler to a [time slot picker](/ui-snippets/time-slot-picker/) panel, or use a single-field [date picker](/ui-snippets/date-picker/) for compact forms. When a day is clicked, fetch available slots from your API and display them below the calendar. The visual selected state confirms the chosen date before the user picks a time.' },
      { icon: 'DESIGN', title: 'Content calendar and publishing schedule displays', desc: 'Mark content publishing dates, social media post days, and email campaign sends as events — for a week-grid view, see the [schedule timetable](/ui-snippets/schedule-table/). Colour-code by content type (blog = indigo, social = pink, email = green). The dot indicators give a visual density map of publishing frequency.' },
      { icon: 'CODE', title: 'Integration with Google Calendar or CalDAV APIs', desc: 'Replace the static events array with a fetch call to the Google Calendar API or any CalDAV endpoint. Parse the events from the API response into the {date, title, color} format the widget expects. Re-fetch on each month navigation to load events for the new month.' },
      { icon: 'LEARN', title: 'Learn JavaScript Date arithmetic for calendar generation', desc: 'The render function demonstrates how to use JavaScript Date to compute month grids: getDay() for the starting weekday, setDate(0) to get the last day of the previous month, and setMonth() for month navigation. These techniques apply to any date-driven UI.' },
      { icon: 'PEOPLE', title: 'Team availability and leave calendar overview widgets', desc: 'Show team leave days, public holidays, and team events in a shared calendar widget. Each team member can have a distinct event colour. The upcoming list surfaces the next important dates across all event categories in one scannable list.' },
      { icon: 'CODE', title: 'Related: Consistent Hashing Visualizer', desc: 'See the [Consistent Hashing Visualizer](/ui-snippets/consistent-hashing-visualizer/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the calendar generate the correct grid for any month?', a: 'render() creates a Date for the first day of cur month and reads .getDay() to know which column (0=Sunday, 6=Saturday) the month starts on. It fills leftward from that column with trailing days from the previous month. It then places all days in the current month. Finally it fills any remaining cells in the last row with leading days of the next month. This always produces a complete 7-column grid, typically 5 rows (35 cells) or occasionally 6 rows (42 cells) for months that start on Saturday or Sunday.' },
      { q: 'How do I fetch events from Google Calendar API?', a: 'Call the Google Calendar Events API: fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin="+startOfMonth+"&timeMax="+endOfMonth+"&key="+API_KEY). Map the response items to {date: item.start.dateTime || item.start.date, title: item.summary, color: "#6366f1"}. Call render() after the fetch resolves. For authentication, use Google OAuth2 and pass the access token in the Authorization header instead of the API key.' },
      { q: 'How do I make the calendar start on Monday instead of Sunday?', a: 'Change the firstDay calculation: const firstDay = (new Date(year, month, 1).getDay() + 6) % 7. This converts Sunday (0) to 6 and Monday (1) to 0, shifting the week start. Also update the day-names header to Mo Tu We Th Fr Sa Su. The padding calculations for prev/next month days remain the same.' },
      { q: 'How do I use this calendar widget in React?', a: 'Click "JSX" to download. Manage cur with useState<Date>(new Date(year, month, 1)). Compute grid days with useMemo([cur]) — run the same padding and day calculations, returning an array of day objects. Render the array to day divs. Manage selectedDate with useState<string|null>(null). For events, fetch from your API in a useEffect that re-runs when cur changes.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the padding math by hand to see how this grid always comes out to complete weeks. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how firstDay, daysInMonth, and prevDays combine to produce leading and trailing padding days so the grid is always a multiple of seven cells, and why new Date(year, month, 0) correctly returns the last day of the previous month. The same assistant can help optimize it — asking whether recomputing the entire events filter and sort on every render call is wasteful compared to memoizing it per month, or whether string-concatenating the date in three separate padStart calls could be simplified. It's also useful for extending the widget: ask it to support multi-day events spanning several cells, add a week-view mode, or wire the events array to a real Google Calendar or CalDAV feed. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "monthly calendar widget" in plain HTML, CSS, and JavaScript with an events list, using native Date arithmetic only — no date library.

Requirements:
- Render a 7-column grid for the current month that always fills complete rows: compute the weekday the first day of the month falls on to determine how many trailing days of the previous month to show as padding at the start, render every day of the current month, then compute how many leading days of the next month are needed to fill out the final row to a multiple of seven.
- Visually distinguish three day states with separate CSS classes: padding days from adjacent months (dimmed), today's actual date (filled with an accent background), and any day with at least one matching event (a small dot indicator) — and today with an event must correctly show both states simultaneously.
- Store events as a plain array of objects with a date string, a title, and a color, and match events to calendar days by exact date-string comparison.
- Clicking any day in the current month (but not today, and not padding days) must toggle a "selected" visual state on that cell, removing the selected state from any previously selected cell first.
- Below the grid, render an "upcoming events" list that filters the events array down to only dates between today and 30 days from now, sorts them chronologically, limits the list to at most 4 entries, and shows a colored dot, the event title (truncated with ellipsis if too long), and a short formatted date for each — with a distinct empty-state message when no events fall in that window.
- Provide previous/next navigation buttons that shift the displayed month by exactly one month using Date's setMonth (which must correctly roll over year boundaries) and fully regenerate the grid and events list on every navigation.`,
    },
  },
};

export default calendarWidget;
