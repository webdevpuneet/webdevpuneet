'use client';
import { useState, useMemo, useCallback } from 'react';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

const ALIGNS = ['left','center','right'];
const ALIGN_ICONS = { left: '⬅', center: '↔', right: '➡' };

function makeGrid(rows, cols) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => r === 0 ? `Column ${c + 1}` : '')
  );
}

function toMarkdown(grid, aligns) {
  const cols = grid[0]?.length || 0;
  const rows = grid.map(row => '| ' + row.map(c => c || ' ').join(' | ') + ' |');
  const divider = '| ' + aligns.slice(0, cols).map(a => a === 'center' ? ':---:' : a === 'right' ? '---:' : ':---').join(' | ') + ' |';
  return [rows[0], divider, ...rows.slice(1)].join('\n');
}

function toHtml(grid, aligns) {
  const cols = grid[0]?.length || 0;
  const alignAttr = (a) => a !== 'left' ? ` style="text-align:${a}"` : '';
  const thead = '  <thead>\n    <tr>\n' + (grid[0] || []).map((c,i) => `      <th${alignAttr(aligns[i] || 'left')}>${c || ''}</th>`).join('\n') + '\n    </tr>\n  </thead>';
  const tbody = '  <tbody>\n' + grid.slice(1).map(row => '    <tr>\n' + row.map((c,i) => `      <td${alignAttr(aligns[i] || 'left')}>${c || ''}</td>`).join('\n') + '\n    </tr>').join('\n') + '\n  </tbody>';
  return `<table>\n${thead}\n${tbody}\n</table>`;
}

function toCsv(grid) {
  return grid.map(row => row.map(c => c.includes(',') ? `"${c}"` : c).join(',')).join('\n');
}

export default function MarkdownTableGeneratorTool() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(3);
  const [grid, setGrid] = useState(() => makeGrid(4, 3));
  const [aligns, setAligns] = useState(() => Array(3).fill('left'));
  const [tab, setTab] = useState('markdown');
  const [copied, setCopied] = useState(false);

  function resize(newRows, newCols) {
    setGrid(prev => {
      const g = Array.from({ length: newRows }, (_, r) =>
        Array.from({ length: newCols }, (_, c) => (prev[r]?.[c] ?? (r===0 ? `Column ${c+1}` : '')))
      );
      return g;
    });
    setAligns(prev => Array.from({ length: newCols }, (_, c) => prev[c] || 'left'));
    setRows(newRows);
    setCols(newCols);
  }

  function setCell(r, c, val) {
    setGrid(prev => prev.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? val : cell) : row));
  }

  function cycleAlign(c) {
    setAligns(prev => prev.map((a, i) => i === c ? ALIGNS[(ALIGNS.indexOf(a) + 1) % 3] : a));
  }

  function addRow() { resize(rows + 1, cols); }
  function removeRow(r) { setGrid(prev => prev.filter((_, i) => i !== r)); setRows(r => r - 1); }
  function addCol() { resize(rows, cols + 1); }
  function removeCol(c) {
    setGrid(prev => prev.map(row => row.filter((_, i) => i !== c)));
    setAligns(prev => prev.filter((_, i) => i !== c));
    setCols(c => c - 1);
  }

  const output = useMemo(() => {
    if (tab === 'markdown') return toMarkdown(grid, aligns);
    if (tab === 'html') return toHtml(grid, aligns);
    return toCsv(grid);
  }, [grid, aligns, tab]);

  function copy() {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={s.wrap}>
      <TextToolsTopNav active="markdown-table-generator" />
      <div className={s.toolbar}>
        <div className={s.titleRow}>
          <img src="/icons/markdown-table-generator.svg" alt="" width={26} height={26} className={s.logoIcon} />
          <span className={s.title}>Markdown Table <span className={s.accent}>Generator</span></span>
        </div>
        <div className={s.actions}>
          <button className={s.btn} onClick={addRow}>+ Row</button>
          <button className={s.btn} onClick={addCol}>+ Col</button>
          <button className={s.btn} onClick={copy}>{copied ? 'Copied!' : `Copy ${tab.toUpperCase()}`}</button>
        </div>
      </div>

      <div className={s.body}>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.controlCell} />
                {Array.from({ length: cols }, (_, c) => (
                  <th key={c} className={s.colHeader}>
                    <div className={s.colHeaderInner}>
                      <button className={s.alignBtn} onClick={() => cycleAlign(c)} title="Cycle alignment">{ALIGN_ICONS[aligns[c]]}</button>
                      <span className={s.alignLabel}>{aligns[c]}</span>
                      {cols > 1 && <button className={s.delBtn} onClick={() => removeCol(c)}>×</button>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((row, r) => (
                <tr key={r} className={r === 0 ? s.headerRow : ''}>
                  <td className={s.controlCell}>
                    {rows > 2 && r > 0 && <button className={s.delBtn} onClick={() => removeRow(r)}>×</button>}
                    {r === 0 && <span className={s.rowLabel}>H</span>}
                  </td>
                  {row.map((cell, c) => (
                    <td key={c} className={s.cell}>
                      <input
                        className={s.cellInput}
                        value={cell}
                        onChange={e => setCell(r, c, e.target.value)}
                        style={{ textAlign: aligns[c] }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={s.outputSection}>
          <div className={s.outputTabs}>
            {['markdown','html','csv'].map(t => (
              <button key={t} className={`${s.outputTab} ${tab===t?s.outputTabActive:''}`} onClick={() => setTab(t)}>{t.toUpperCase()}</button>
            ))}
          </div>
          <pre className={s.output}>{output}</pre>
        </div>
      </div>
    </div>
  );
}
