'use client';

/* The workspace's activity heatmap: one square per day for the last 6 months, a column per week (Sunday at the top), shaded by how
   many things were saved that day. Counts come from this browser's save log (lib/activity-log) and, for days before the log
   existed, from when each saved design was created and last edited; a day shows the larger of the two. */

import { useMemo, useRef, useState } from 'react';
import { dayKey } from '@/lib/activity-log';
import st from './styles.module.css';

const WEEKS = 26; // about the last 6 months
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const level = n => (n <= 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : 4);
const plural = (n, one) => `${n.toLocaleString()} ${one}${n === 1 ? '' : 's'}`;

/**
 * @param items  saved things, each with `updated` and (optionally) `created` ISO dates
 * @param log    { 'YYYY-MM-DD': saves } from readActivity()
 */
export default function ActivityHeatmap({ items, log }) {
  const boxRef = useRef(null);
  const [tip, setTip] = useState(null); // { text, x, y } for the hovered day, in the card's own coordinates
  const data = useMemo(() => {
    // Days from the saved designs themselves: the day each was made and the day it was last edited
    const derived = {};
    for (const i of items) {
      const days = new Set([i.updated, i.created].filter(Boolean).map(iso => { const t = new Date(iso); return Number.isNaN(t.getTime()) ? '' : dayKey(t); }).filter(Boolean));
      days.forEach(k => { derived[k] = (derived[k] || 0) + 1; });
    }
    const count = k => Math.max(log[k] || 0, derived[k] || 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(start.getDate() - today.getDay() - (WEEKS - 1) * 7); // a Sunday, so every column is one week
    const weeks = [];
    const months = [];
    let total = 0;
    let active = 0;
    for (let w = 0; w < WEEKS; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const day = new Date(start);
        day.setDate(start.getDate() + w * 7 + d);
        if (day > today) { col.push(null); continue; }
        const k = dayKey(day);
        const n = count(k);
        total += n;
        if (n) active++;
        col.push({ k, n, label: `${plural(n, 'save')} on ${day.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}` });
        if (d === 0 && (w === 0 || day.getDate() <= 7)) months.push({ w, name: MONTHS[day.getMonth()] });
      }
      weeks.push(col);
    }
    // Current streak: days in a row with a save, up to today (or up to yesterday, if nothing is saved yet today)
    let streak = 0;
    const cur = new Date(today);
    if (!count(dayKey(cur))) cur.setDate(cur.getDate() - 1);
    while (count(dayKey(cur))) { streak++; cur.setDate(cur.getDate() - 1); }
    return { weeks, months, total, active, streak };
  }, [items, log]);

  // One listener for the whole grid: the hovered square's label, shown in a bubble just above it
  const showTip = e => {
    const cell = e.target.closest?.('[data-tip]');
    const box = boxRef.current;
    if (!cell || !box) { setTip(null); return; }
    const c = cell.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    setTip({ text: cell.dataset.tip, x: c.left - b.left + c.width / 2, y: c.top - b.top });
  };

  return (
    <div ref={boxRef} className={st.heat}>
      <div className={st.heatHead}>
        <div>
          <p className={st.heatTitle}>Activity overview</p>
          <p className={st.heatStats}>
          {plural(data.total, 'save')} in the last 6 months · {plural(data.active, 'active day')}{data.streak > 1 ? ` · ${data.streak}-day streak` : ''}
        </p>
        </div>
        <div className={st.heatLegend} aria-hidden="true">
        Less {[0, 1, 2, 3, 4].map(l => <span key={l} className={st.heatCell} data-l={l} />)} More
        </div>
      </div>
      {/* Full width: the weeks share the card's width, and the day names are the grid's first column */}
      <div className={st.heatBody}>
        <div className={st.heatMonths} aria-hidden="true">
          {data.months.map(m => <span key={m.w} style={{ gridColumn: m.w + 2 }}>{m.name}</span>)}
        </div>
        <div className={st.heatGrid} onMouseOver={showTip} onMouseLeave={() => setTip(null)} role="img" aria-label={`Activity: ${plural(data.total, 'save')} on ${plural(data.active, 'day')} in the last 6 months`}>
            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((n, d) => <span key={`d${d}`} className={st.heatDay} aria-hidden="true">{n}</span>)}
            {data.weeks.flatMap((col, w) => col.map((c, d) => (c
              ? <span key={c.k} className={st.heatCell} data-l={level(c.n)} data-tip={c.label} />
              : <span key={`f${w}-${d}`} className={st.heatCellEmpty} />)))}
        </div>
      </div>
      {tip && <span className={st.heatTip} style={{ left: tip.x, top: tip.y }} role="tooltip">{tip.text}</span>}
    </div>
  );
}
