'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

const COMMON_USES = {
  0.5: 'xs spacing', 0.75: 'small text', 0.875: 'body sm', 1: 'body text',
  1.125: 'body md', 1.25: 'h5 / lead', 1.5: 'h4', 1.75: 'h3',
  2: 'h2', 2.5: 'h1 sm', 3: 'display sm', 4: 'display lg',
};
const FULL_REMS  = [0.125,0.25,0.375,0.5,0.625,0.75,0.875,1,1.125,1.25,1.375,1.5,1.625,1.75,1.875,2,2.25,2.5,2.75,3,3.5,4,4.5,5,6,7,8];
const COMMON_REMS = [0.5,0.75,0.875,1,1.125,1.25,1.5,1.75,2,2.5,3,4];

function fmt(n) { return parseFloat(n.toFixed(4)).toString(); }

export default function RemPxConverterTool() {
  const [base, setBase]               = useState(16);
  const [remVal, setRemVal]           = useState('1');
  const [pxVal, setPxVal]             = useState('16');
  const [lastChanged, setLastChanged] = useState('rem');
  const [showFull, setShowFull]       = useState(false);
  const [toast, setToast]             = useState({ show: false, msg: '' });
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ show: false, msg: '' }), 1800);
  }, []);

  const fromRem = useCallback((rem, b) => fmt(parseFloat((parseFloat(rem || 0) * b).toFixed(4))), []);
  const fromPx  = useCallback((px,  b) => fmt(parseFloat((parseFloat(px  || 0) / b).toFixed(4))), []);

  useEffect(() => {
    if (lastChanged === 'rem') setPxVal(fromRem(remVal, base));
    else setRemVal(fromPx(pxVal, base));
  }, [base]); // eslint-disable-line

  const handleRem = (v) => { setRemVal(v); setLastChanged('rem'); setPxVal(fromRem(v, base)); };
  const handlePx  = (v) => { setPxVal(v);  setLastChanged('px');  setRemVal(fromPx(v, base)); };

  const handleSwap = () => {
    const r = remVal, p = pxVal;
    setRemVal(p); setPxVal(r); setLastChanged('rem');
    showToast('Values swapped');
  };

  const currentRem = parseFloat(remVal) || 0;
  const currentPx  = parseFloat(pxVal)  || 0;
  const clampedPx  = Math.max(6, Math.min(currentPx, 96));
  const rulerPct   = Math.min((currentPx / 160) * 100, 100);
  const rems = showFull ? FULL_REMS : COMMON_REMS;

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="rem-px-converter" />

      {/* ── Top header bar ── */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>Rp</div>
          REM<span>↔ PX</span>
        </div>
      </header>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Left: converter inputs */}
        <div className={styles.inputPanel}>

          {/* Base font size */}
          <div className={styles.baseSection}>
            <div className={styles.baseSectionHead}>
              <span className={styles.panelLabel}>Base font size</span>
              <div className={styles.baseValueRow}>
                <span className={styles.baseVal}>{base}</span>
                <span className={styles.baseUnit}>px</span>
              </div>
            </div>
            <input type="range" min="8" max="50" value={base} step="1"
              className={styles.headerSlider}
              onChange={e => setBase(parseInt(e.target.value))} />
            <div className={styles.baseTicks}>
              <span>8</span><span>16</span><span>24</span><span>32</span><span>50</span>
            </div>
            <div className={styles.presets}>
              {[{val:16,label:'16px (default)'},{val:10,label:'10px'},{val:18,label:'18px'}].map(p => (
                <button key={p.val}
                  className={`${styles.presetBtn} ${base === p.val ? styles.presetActive : ''}`}
                  onClick={() => setBase(p.val)}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.panelHead}>
            <span className={styles.panelLabel}>Convert</span>
            <button className={styles.swapBtn} onClick={handleSwap}>⇄ Swap</button>
          </div>
          <div className={styles.fields}>
            <div className={styles.fieldGroup}>
              <label className={`${styles.fieldLabel} ${styles.remLabel}`}>
                <span className={`${styles.dot} ${styles.dotRem}`} /> REM
              </label>
              <input type="number" value={remVal} min="0" step="0.125" placeholder="0"
                className={`${styles.numInput} ${styles.numInputRem}`}
                onChange={e => handleRem(e.target.value)} />
              <span className={styles.fieldHint}>relative to base</span>
            </div>

            <div className={styles.swapDivider}>
              <div className={styles.swapLine} />
              <span className={styles.swapEq}>×{base}</span>
              <div className={styles.swapLine} />
            </div>

            <div className={styles.fieldGroup}>
              <label className={`${styles.fieldLabel} ${styles.pxLabel}`}>
                <span className={`${styles.dot} ${styles.dotPx}`} /> PX
              </label>
              <input type="number" value={pxVal} min="0" step="1" placeholder="0"
                className={`${styles.numInput} ${styles.numInputPx}`}
                onChange={e => handlePx(e.target.value)} />
              <span className={styles.fieldHint}>pixel unit</span>
            </div>

            <div className={styles.formula}>
              {fmt(currentRem)} rem × {base}px = <span className={styles.formulaEq}>{fmt(currentPx)} px</span>
            </div>
          </div>
        </div>

        {/* Right: preview + reference table */}
        <div className={styles.tablePanel}>

          {/* Live preview */}
          <div className={styles.preview}>
            <div className={styles.previewHead}>
              <span className={styles.panelLabel}>Preview</span>
              <span className={styles.previewMeta}>{fmt(currentRem)}rem = {fmt(currentPx)}px</span>
            </div>
            <div className={styles.previewStage}>
              <span style={{ fontSize: clampedPx + 'px', fontFamily: 'var(--font-mono)', color: 'var(--text)', lineHeight: 1.3 }}>
                This is a sample text
              </span>
              <div className={styles.rulerWrap}>
                <span className={styles.rulerLbl}>0</span>
                <div className={styles.rulerTrack}>
                  <div className={styles.rulerFill} style={{ width: rulerPct + '%' }} />
                </div>
                <span className={styles.rulerVal}>{fmt(currentPx)}px</span>
              </div>
            </div>
          </div>

          <div className={styles.panelHead}>
            <span className={styles.panelLabel}>Reference Table</span>
            <div className={styles.toggleGroup}>
              <button className={`${styles.toggle} ${!showFull ? styles.toggleActive : ''}`}
                onClick={() => setShowFull(false)}>Common</button>
              <button className={`${styles.toggle} ${showFull ? styles.toggleActive : ''}`}
                onClick={() => setShowFull(true)}>Full</button>
            </div>
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th className={styles.thRem}>REM</th>
                  <th className={styles.thPx}>PX</th>
                  <th className={styles.thUse}>Use</th>
                </tr>
              </thead>
              <tbody>
                {rems.map(r => {
                  const px = parseFloat((r * base).toFixed(4));
                  const hi = fmt(r) === fmt(currentRem);
                  return (
                    <tr key={r} className={hi ? styles.highlighted : ''}
                      onClick={() => { handleRem(String(r)); showToast(`${fmt(r)}rem = ${fmt(px)}px`); }}>
                      <td>{fmt(r)} rem</td>
                      <td>{fmt(px)} px</td>
                      <td className={styles.tdUse}>{COMMON_USES[r] || ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`${styles.toast} ${toast.show ? styles.toastShow : ''}`}>{toast.msg}</div>
    </div>
  );
}
