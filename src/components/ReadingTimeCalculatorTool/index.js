'use client';
import { useState, useMemo } from 'react';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function analyzeText(text) {
  if (!text.trim()) return null;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = Math.max(1, text.split(/[.!?]+/).filter(s => s.trim().length > 2).length);
  const paragraphs = Math.max(1, text.split(/\n{2,}/).filter(p => p.trim()).length);
  const totalSyllables = words.reduce((acc, w) => acc + countSyllables(w), 0);
  const avgWordLen = words.reduce((acc, w) => acc + w.replace(/[^a-z]/gi,'').length, 0) / wordCount;
  const avgSentLen = wordCount / sentences;
  const flesch = Math.max(0, Math.min(100, 206.835 - 1.015 * avgSentLen - 84.6 * (totalSyllables / wordCount)));
  const fkGrade = Math.max(0, 0.39 * avgSentLen + 11.8 * (totalSyllables / wordCount) - 15.59);
  function readTime(wpm) {
    const totalSec = Math.round((wordCount / wpm) * 60);
    const min = Math.floor(totalSec / 60), sec = totalSec % 60;
    if (min === 0) return `${sec}s`;
    if (sec === 0) return `${min} min`;
    return `${min} min ${sec}s`;
  }
  function fleschLabel(score) {
    if (score >= 90) return { text: 'Very Easy', color: '#10b981' };
    if (score >= 80) return { text: 'Easy', color: '#34d399' };
    if (score >= 70) return { text: 'Fairly Easy', color: '#6ee7b7' };
    if (score >= 60) return { text: 'Standard', color: '#f59e0b' };
    if (score >= 50) return { text: 'Fairly Difficult', color: '#fb923c' };
    if (score >= 30) return { text: 'Difficult', color: '#f87171' };
    return { text: 'Very Difficult', color: '#ef4444' };
  }
  const fl = fleschLabel(flesch);
  return {
    wordCount, sentences, paragraphs,
    totalSyllables: Math.round(totalSyllables),
    avgWordLen: avgWordLen.toFixed(1),
    avgSentLen: avgSentLen.toFixed(1),
    readSlow: readTime(150), readAvg: readTime(238), readFast: readTime(350),
    flesch: Math.round(flesch), fleschLabel: fl.text, fleschColor: fl.color,
    fkGrade: fkGrade.toFixed(1),
  };
}

export default function ReadingTimeCalculatorTool() {
  const [text, setText] = useState('');
  const stats = useMemo(() => analyzeText(text), [text]);
  return (
    <div className={s.wrap}>
      <TextToolsTopNav active="reading-time-calculator" />
      <div className={s.header}>
        <div className={s.titleRow}>
          <img src="/icons/reading-time-calculator.svg" alt="" width={28} height={28} className={s.logoIcon} />
          <div>
            <div className={s.title}>Reading Time <span className={s.accent}>Calculator</span></div>
            <div className={s.sub}>Paste text to estimate read time and check readability</div>
          </div>
        </div>
      </div>
      <div className={s.body}>
        <div className={s.inputPanel}>
          <textarea className={s.textarea} value={text} onChange={e => setText(e.target.value)} placeholder="Paste your article, blog post, or any text here..." spellCheck={false} />
          {text && <div className={s.wordBar}><span>{stats?.wordCount?.toLocaleString()} words</span><span>{stats?.sentences} sentences</span><span>{stats?.paragraphs} paragraphs</span></div>}
        </div>
        {stats ? (
          <div className={s.results}>
            <div className={s.readTimes}>
              {[{label:'Slow reader',speed:'150 wpm',val:stats.readSlow},{label:'Average reader',speed:'238 wpm',val:stats.readAvg,hi:true},{label:'Fast reader',speed:'350 wpm',val:stats.readFast}].map(({label,speed,val,hi}) => (
                <div key={label} className={`${s.timeCard} ${hi ? s.timeCardHi : ''}`}>
                  <div className={s.timeVal}>{val}</div>
                  <div className={s.timeLabel}>{label}</div>
                  <div className={s.timeSpeed}>{speed}</div>
                </div>
              ))}
            </div>
            <div className={s.scoresGrid}>
              <div className={s.scoreCard}>
                <div className={s.scoreNum} style={{color:stats.fleschColor}}>{stats.flesch}</div>
                <div className={s.scoreLabel}>Flesch Reading Ease</div>
                <div className={s.scoreTag} style={{color:stats.fleschColor,borderColor:stats.fleschColor+'44',background:stats.fleschColor+'11'}}>{stats.fleschLabel}</div>
                <div className={s.scoreNote}>0–100 (higher = easier to read)</div>
              </div>
              <div className={s.scoreCard}>
                <div className={s.scoreNum}>{stats.fkGrade}</div>
                <div className={s.scoreLabel}>Grade Level</div>
                <div className={s.scoreNote}>Flesch-Kincaid US school grade</div>
              </div>
            </div>
            <div className={s.statsGrid}>
              {[['Words',stats.wordCount.toLocaleString()],['Sentences',stats.sentences],['Paragraphs',stats.paragraphs],['Syllables',stats.totalSyllables.toLocaleString()],['Avg sentence',`${stats.avgSentLen} words`],['Avg word',`${stats.avgWordLen} chars`]].map(([label,val]) => (
                <div key={label} className={s.stat}><div className={s.statVal}>{val}</div><div className={s.statLabel}>{label}</div></div>
              ))}
            </div>
            <div className={s.fleschBar}>
              <div className={s.fleschTrack}><div className={s.fleschFill} style={{width:`${stats.flesch}%`,background:stats.fleschColor}} /></div>
              <div className={s.fleschTicks}><span>Very Hard (0)</span><span>Standard (60)</span><span>Very Easy (100)</span></div>
            </div>
          </div>
        ) : (
          <div className={s.empty}>Paste any text on the left to see reading time and readability stats.</div>
        )}
      </div>
    </div>
  );
}
