/* Month calendar grid built from plain text fields (used by Now Booking via [data-cal] in render.js).
   - month: "December 2026", "Dec 2026" or just "March" (current year). Gives the real first weekday and day count.
     Anything unreadable falls back to a 28-day grid that starts on a Monday.
   - open:  dates that are free, e.g. "8, 17, 22" or "8-10, 22". They glow.
   - off:   weekdays and/or dates you don't work, e.g. "Sat, Sun" or "Sun, 24, 25, 26". They are faded.
   Every other day is booked and gets stamped with a cross in the video. Weeks start on Monday. */

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export function parseMonth(text) {
  const s = String(text || '').toLowerCase().replace(/<[^>]*>|\*/g, '');
  const mi = MONTHS.findIndex(m => new RegExp(`\\b${m}`).test(s));
  if (mi < 0) return null;
  const y = s.match(/\b(19|20|21)\d{2}\b/);
  const year = y ? Number(y[0]) : new Date().getFullYear();
  const days = new Date(year, mi + 1, 0).getDate();
  const lead = (new Date(year, mi, 1).getDay() + 6) % 7; // Monday = 0
  return { year, month: mi, days, lead };
}

/* "8, 17, 22-24" -> Set of numbers; weekday words ("Sat", "sunday") -> Set of weekday indexes (Mon = 0) */
function parseDays(text, max) {
  const dates = new Set(), weekdays = new Set();
  String(text || '').toLowerCase().split(/[\s,;/&+]+|\band\b/).forEach(tok => {
    if (!tok) return;
    const r = tok.match(/^(\d{1,2})\s*[-–]\s*(\d{1,2})$/);
    if (r) { for (let d = Math.min(+r[1], +r[2]); d <= Math.max(+r[1], +r[2]); d++) if (d >= 1 && d <= max) dates.add(d); return; }
    const n = tok.match(/^(\d{1,2})(st|nd|rd|th)?$/);
    if (n) { if (+n[1] >= 1 && +n[1] <= max) dates.add(+n[1]); return; }
    const w = WEEKDAYS.findIndex(d => tok.startsWith(d));
    if (w >= 0) weekdays.add(w);
  });
  return { dates, weekdays };
}

export function calendarGrid({ month, open, off } = {}, p = 'nb') {
  const m = parseMonth(month) || { days: 28, lead: 0 };
  const o = parseDays(open, m.days), x = parseDays(off, m.days);
  const kind = [];
  for (let d = 1; d <= m.days; d++) {
    const wd = (m.lead + d - 1) % 7;
    kind[d] = o.dates.has(d) ? 'open' : (x.dates.has(d) || x.weekdays.has(wd)) ? 'off' : 'full';
  }
  const booked = kind.filter(k => k === 'full').length;
  const step = booked > 1 ? Math.min(0.06, 1.3 / (booked - 1)) : 0;
  let b = 0, oi = 0;
  const cells = [];
  for (let i = 0; i < m.lead; i++) cells.push(`<span class="${p}-d ${p}-blank"></span>`);
  for (let d = 1; d <= m.days; d++) {
    if (kind[d] === 'off') cells.push(`<span class="${p}-d ${p}-off">${d}</span>`);
    else if (kind[d] === 'open') cells.push(`<span class="${p}-d ${p}-open" data-anim="pop" data-at="${(2.1 + Math.min(oi++, 8) * 0.25).toFixed(2)}"><b>${d}</b></span>`);
    else cells.push(`<span class="${p}-d ${p}-full">${d}<i aria-hidden="true" data-anim="stamp" data-at="${(0.6 + b++ * step).toFixed(2)}"></i></span>`);
  }
  const rows = Math.ceil(cells.length / 7);
  while (cells.length < rows * 7) cells.push(`<span class="${p}-d ${p}-blank"></span>`);
  return { html: cells.join(''), rows, openCount: oi };
}
