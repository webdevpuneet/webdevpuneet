'use client';
import { useState, useMemo } from 'react';
import s from './styles.module.css';
import DevGeneratorsTopNav from '@/components/DevGeneratorsTopNav';

const BASES = [
  { base: 2,  key: 'bin', label: 'Binary',      prefix: '0b', chars: /^[01]+$/,           placeholder: '11111111' },
  { base: 8,  key: 'oct', label: 'Octal',        prefix: '0o', chars: /^[0-7]+$/,          placeholder: '377' },
  { base: 10, key: 'dec', label: 'Decimal',      prefix: '',   chars: /^[0-9]+$/,          placeholder: '255' },
  { base: 16, key: 'hex', label: 'Hexadecimal',  prefix: '0x', chars: /^[0-9a-fA-F]+$/,   placeholder: 'FF' },
];

const QUICK_REF = [0,1,2,4,8,10,15,16,32,64,128,255,256,512,1024,65535];

function parse(input, fromBase) {
  const s = input.trim().toUpperCase();
  if (!s) return null;
  const neg = s.startsWith('-');
  const abs = neg ? s.slice(1) : s;
  const base = BASES.find(b => b.base === fromBase);
  if (!base) return null;
  const test = fromBase === 16 ? /^[0-9A-F]+$/ : base.chars;
  if (!test.test(abs)) return null;
  const n = parseInt(abs, fromBase);
  if (!Number.isFinite(n)) return null;
  return neg ? -n : n;
}

export default function NumberBaseConverterTool() {
  const [input,    setInput]    = useState('255');
  const [fromBase, setFromBase] = useState(10);
  const [copied,   setCopied]   = useState(null);

  const decimal = useMemo(() => parse(input, fromBase), [input, fromBase]);
  const isValid  = decimal !== null;
  const hasInput = input.trim().length > 0;

  const results = useMemo(() => {
    if (decimal === null) return null;
    const neg = decimal < 0;
    const abs = Math.abs(decimal);
    const pre = neg ? '-' : '';
    const b   = abs.toString(2);
    const b8  = abs >= 0 && abs <= 255   ? abs.toString(2).padStart(8, '0')  : null;
    const b16 = abs >= 0 && abs <= 65535 ? abs.toString(2).padStart(16, '0') : null;
    return {
      bin: pre + b,
      oct: pre + abs.toString(8),
      dec: decimal.toString(),
      hex: pre + abs.toString(16).toUpperCase(),
      bin8:  neg ? null : b8,
      bin16: neg ? null : b16,
    };
  }, [decimal]);

  function switchBase(base) {
    if (decimal !== null) {
      const neg = decimal < 0;
      const abs = Math.abs(decimal);
      const str = (neg ? '-' : '') + abs.toString(base);
      setInput(base === 16 ? str.toUpperCase() : str);
    }
    setFromBase(base);
  }

  function copy(text) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(text);
    setTimeout(() => setCopied(null), 1400);
  }

  function group(str, size) {
    const neg = str.startsWith('-');
    const s   = neg ? str.slice(1) : str;
    const padded = s.padStart(Math.ceil(s.length / size) * size, '0');
    const chunks = padded.match(new RegExp(`.{1,${size}}`, 'g')) || [padded];
    return (neg ? '-' : '') + chunks.join(' ');
  }

  return (
    <div className={s.wrap}>
      <DevGeneratorsTopNav active="number-base-converter" />
      <div className={s.header}>
        <div className={s.logo}>
          <div className={s.logoIcon}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <text x="0" y="11" fontFamily="monospace" fontSize="11" fontWeight="800" fill="#7c3aed">01</text>
            </svg>
          </div>
          <span>Number Base <span className={s.accent}>Converter</span></span>
        </div>
        <span className={s.hint}>Binary · Octal · Decimal · Hex</span>
      </div>

      <div className={s.body}>

        {/* Input */}
        <div className={s.inputCard}>
          <div className={s.baseToggle}>
            {BASES.map(b => (
              <button key={b.base}
                className={fromBase === b.base ? `${s.baseBtn} ${s.baseBtnActive}` : s.baseBtn}
                onClick={() => switchBase(b.base)}>
                {b.label}
                <span className={s.baseSub}>base {b.base}</span>
              </button>
            ))}
          </div>
          <div className={`${s.mainInputWrap} ${hasInput && !isValid ? s.mainInputWrapError : ''}`}>
            <span className={s.mainPrefix}>{BASES.find(b => b.base === fromBase)?.prefix}</span>
            <input
              className={s.mainInput}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={BASES.find(b => b.base === fromBase)?.placeholder}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          {hasInput && !isValid && (
            <p className={s.errorMsg}>Not a valid {BASES.find(b => b.base === fromBase)?.label.toLowerCase()} number</p>
          )}
        </div>

        {/* Results */}
        {results && (
          <div className={s.resultsCard}>
            {BASES.map(({ base, key, label, prefix }) => (
              <div key={key} className={`${s.resultRow} ${fromBase === base ? s.resultRowInput : ''}`}>
                <div className={s.resultMeta}>
                  <span className={s.resultLabel}>{label}</span>
                  <span className={s.resultBase}>base {base}</span>
                </div>
                <div className={s.resultVal}>
                  {prefix && <span className={s.resultPrefix}>{prefix}</span>}
                  <span className={s.resultNum}>{results[key]}</span>
                </div>
                <button className={s.copyBtn} onClick={() => copy(results[key])}>
                  {copied === results[key] ? '✓' : 'Copy'}
                </button>
              </div>
            ))}

            {(results.bin8 || results.bin16) && (
              <>
                <div className={s.divider} />
                {results.bin8 && (
                  <div className={s.resultRow}>
                    <div className={s.resultMeta}><span className={s.resultLabel}>8-bit</span></div>
                    <div className={s.resultVal}>
                      <span className={s.resultNum} style={{ fontFamily: 'monospace', letterSpacing: '2px' }}>
                        {group(results.bin8, 4)}
                      </span>
                    </div>
                    <button className={s.copyBtn} onClick={() => copy(results.bin8)}>{copied === results.bin8 ? '✓' : 'Copy'}</button>
                  </div>
                )}
                {results.bin16 && (
                  <div className={s.resultRow}>
                    <div className={s.resultMeta}><span className={s.resultLabel}>16-bit</span></div>
                    <div className={s.resultVal}>
                      <span className={s.resultNum} style={{ fontFamily: 'monospace', letterSpacing: '1.5px', fontSize: '12px' }}>
                        {group(results.bin16, 4)}
                      </span>
                    </div>
                    <button className={s.copyBtn} onClick={() => copy(results.bin16)}>{copied === results.bin16 ? '✓' : 'Copy'}</button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Quick ref */}
        <div className={s.refCard}>
          <div className={s.refTitle}>Common Values</div>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead><tr><th>Dec</th><th>Hex</th><th>Oct</th><th>Binary</th></tr></thead>
              <tbody>
                {QUICK_REF.map(n => (
                  <tr key={n}
                    className={decimal === n ? s.rowHighlight : ''}
                    onClick={() => { setInput(n.toString(fromBase).toUpperCase()); }}>
                    <td>{n}</td>
                    <td>{n.toString(16).toUpperCase()}</td>
                    <td>{n.toString(8)}</td>
                    <td style={{ fontFamily: 'monospace' }}>{n.toString(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
