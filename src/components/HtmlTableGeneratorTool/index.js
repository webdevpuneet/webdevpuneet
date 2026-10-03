'use client';
import { useState, useMemo } from 'react';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

const ALIGNS = ['left','center','right'];

function makeGrid(rows, cols) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => r === 0 ? `Header ${c + 1}` : '')
  );
}

function toHtml(grid, aligns, opts) {
  const { tailwind, caption, headerRow, headerCol } = opts;
  const tw = tailwind;
  const tableClass = tw ? ' class="w-full border-collapse border border-gray-300"' : '';
  const theadClass = tw ? ' class="bg-gray-50"' : '';
  const trHoverClass = tw ? ' class="hover:bg-gray-50"' : '';
  const thClass = (align) => tw ? ` class="border border-gray-300 px-4 py-2 text-${align} font-semibold"` : (align !== 'left' ? ` style="text-align:${align}"` : '');
  const tdClass = (align) => tw ? ` class="border border-gray-300 px-4 py-2 text-${align}"` : (align !== 'left' ? ` style="text-align:${align}"` : '');

  const lines = [`<table${tableClass}>`];
  if (caption) lines.push(`  <caption>${caption}</caption>`);

  if (headerRow) {
    lines.push(`  <thead${theadClass}>`);
    lines.push('    <tr>');
    grid[0].forEach((cell, c) => {
      const align = aligns[c] || 'left';
      lines.push(`      <th scope="col"${thClass(align)}>${cell}</th>`);
    });
    lines.push('    </tr>');
    lines.push('  </thead>');
  }

  lines.push('  <tbody>');
  const dataRows = headerRow ? grid.slice(1) : grid;
  dataRows.forEach(row => {
    lines.push(`    <tr${trHoverClass}>`);
    row.forEach((cell, c) => {
      const align = aligns[c] || 'left';
      if (headerCol && c === 0) {
        lines.push(`      <th scope="row"${thClass(align)}>${cell}</th>`);
      } else {
        lines.push(`      <td${tdClass(align)}>${cell}</td>`);
      }
    });
    lines.push('    </tr>');
  });
  lines.push('  </tbody>');
  lines.push('</table>');
  return lines.join('\n');
}

export default function HtmlTableGeneratorTool() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(3);
  const [grid, setGrid] = useState(() => makeGrid(4, 3));
  const [aligns, setAligns] = useState(() => Array(3).fill('left'));
  const [headerRow, setHeaderRow] = useState(true);
  const [headerCol, setHeaderCol] = useState(false);
  const [tailwind, setTailwind] = useState(false);
  const [caption, setCaption] = useState('');
  const [copied, setCopied] = useState(false);

  function resize(nr, nc) {
    setGrid(prev => Array.from({ length: nr }, (_, r) => Array.from({ length: nc }, (_, c) => prev[r]?.[c] ?? (r===0?`Header ${c+1}`:''))) );
    setAligns(prev => Array.from({ length: nc }, (_, c) => prev[c] || 'left'));
    setRows(nr); setCols(nc);
  }
  function setCell(r, c, v) { setGrid(prev => prev.map((row, ri) => ri===r ? row.map((cell,ci) => ci===c ? v : cell) : row)); }
  function cycleAlign(c) { setAligns(prev => prev.map((a,i) => i===c ? ALIGNS[(ALIGNS.indexOf(a)+1)%3] : a)); }
  function addRow() { resize(rows+1, cols); }
  function addCol() { resize(rows, cols+1); }
  function removeRow(r) { if (rows <= 2) return; setGrid(prev => prev.filter((_,i) => i!==r)); setRows(r => r-1); }
  function removeCol(c) { if (cols <= 1) return; setGrid(prev => prev.map(row => row.filter((_,i)=>i!==c))); setAligns(prev => prev.filter((_,i)=>i!==c)); setCols(c=>c-1); }

  const output = useMemo(() => toHtml(grid, aligns, { tailwind, caption, headerRow, headerCol }), [grid, aligns, tailwind, caption, headerRow, headerCol]);

  function copy() { navigator.clipboard.writeText(output).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false),1400); }

  return (
    <div className={s.wrap}>
      <TextToolsTopNav active="html-table-generator" />
      <div className={s.toolbar}>
        <div className={s.titleRow}>
          <img src="/icons/html-table-generator.svg" alt="" width={26} height={26} className={s.logoIcon} />
          <span className={s.title}>HTML Table <span className={s.accent}>Generator</span></span>
        </div>
        <div className={s.actions}>
          <button className={s.btn} onClick={addRow}>+ Row</button>
          <button className={s.btn} onClick={addCol}>+ Col</button>
          <button className={`${s.btn} ${tailwind?s.btnActive:''}`} onClick={()=>setTailwind(v=>!v)}>Tailwind</button>
          <button className={s.btn} onClick={copy}>{copied?'Copied!':'Copy HTML'}</button>
        </div>
      </div>
      <div className={s.opts}>
        <label className={s.check}><input type="checkbox" checked={headerRow} onChange={e=>setHeaderRow(e.target.checked)} /><span>First row is header</span></label>
        <label className={s.check}><input type="checkbox" checked={headerCol} onChange={e=>setHeaderCol(e.target.checked)} /><span>First column is header</span></label>
        <input className={s.captionInput} value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Optional table caption..." />
      </div>
      <div className={s.body}>
        <div className={s.tableWrap}>
          <table className={s.editorTable}>
            <thead>
              <tr>
                <th className={s.controlCell} />
                {Array.from({length:cols},(_,c) => (
                  <th key={c} className={s.colHead}>
                    <button className={s.alignBtn} onClick={()=>cycleAlign(c)} title={aligns[c]}>{aligns[c][0].toUpperCase()}</button>
                    {cols>1 && <button className={s.delBtn} onClick={()=>removeCol(c)}>×</button>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((row, r) => (
                <tr key={r} className={r===0&&headerRow?s.headRow:''}>
                  <td className={s.controlCell}>{rows>2&&r>0&&<button className={s.delBtn} onClick={()=>removeRow(r)}>×</button>}</td>
                  {row.map((cell, c) => (
                    <td key={c} className={s.cell}>
                      <input className={s.cellInput} value={cell} onChange={e=>setCell(r,c,e.target.value)} style={{textAlign:aligns[c]}} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <pre className={s.output}>{output}</pre>
      </div>
    </div>
  );
}
