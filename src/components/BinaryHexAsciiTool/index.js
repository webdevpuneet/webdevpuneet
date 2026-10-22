'use client';
import { useState, useCallback } from 'react';
import s from './styles.module.css';
import DevEncodersTopNav from '@/components/DevEncodersTopNav';

function isValidBinary(v) { return /^[01\s]+$/.test(v.trim()); }
function isValidHex(v) { return /^[0-9a-fA-F\s]+$/.test(v.trim()); }
function isValidDecimal(v) { return /^\d+$/.test(v.trim()); }
function isValidOctal(v) { return /^[0-7]+$/.test(v.trim()); }

function numTo(n) {
  if (isNaN(n) || n === null) return { bin: '', hex: '', dec: '', oct: '', ascii: '' };
  const v = Math.floor(Math.abs(n));
  return {
    bin: v.toString(2),
    hex: v.toString(16).toUpperCase(),
    dec: v.toString(10),
    oct: v.toString(8),
    ascii: v >= 32 && v <= 126 ? String.fromCharCode(v) : v <= 31 ? `Ctrl-${String.fromCharCode(v + 64)}` : '',
  };
}

function textToBytes(text) {
  return Array.from(text).map(ch => {
    const code = ch.charCodeAt(0);
    return { char: ch, dec: code, hex: code.toString(16).toUpperCase().padStart(2,'0'), bin: code.toString(2).padStart(8,'0'), oct: code.toString(8) };
  });
}

function useCopy() {
  const [copied, setCopied] = useState('');
  const copy = useCallback((text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 1200);
  }, []);
  return { copied, copy };
}

export default function BinaryHexAsciiTool() {
  const [mode, setMode] = useState('single');
  const [bin, setBin] = useState('');
  const [hex, setHex] = useState('');
  const [dec, setDec] = useState('');
  const [oct, setOct] = useState('');
  const [textInput, setTextInput] = useState('');
  const { copied, copy } = useCopy();

  function fromBin(v) {
    const clean = v.replace(/\s/g, '');
    if (!clean) return reset();
    if (!isValidBinary(clean)) return;
    const n = parseInt(clean, 2);
    const r = numTo(n);
    setBin(r.bin); setHex(r.hex); setDec(r.dec); setOct(r.oct);
  }
  function fromHex(v) {
    const clean = v.replace(/\s/g, '');
    if (!clean) return reset();
    if (!isValidHex(clean)) return;
    const n = parseInt(clean, 16);
    const r = numTo(n);
    setBin(r.bin); setHex(r.hex); setDec(r.dec); setOct(r.oct);
  }
  function fromDec(v) {
    if (!v) return reset();
    if (!isValidDecimal(v)) return;
    const n = parseInt(v, 10);
    const r = numTo(n);
    setBin(r.bin); setHex(r.hex); setDec(r.dec); setOct(r.oct);
  }
  function fromOct(v) {
    if (!v) return reset();
    if (!isValidOctal(v)) return;
    const n = parseInt(v, 8);
    const r = numTo(n);
    setBin(r.bin); setHex(r.hex); setDec(r.dec); setOct(r.oct);
  }
  function reset() { setBin(''); setHex(''); setDec(''); setOct(''); }

  const bytes = textToBytes(textInput);
  const ASCII_PRINTABLE = Array.from({length: 95}, (_, i) => i + 32);

  const fields = [
    { label: 'Binary', val: bin, set: v => { setBin(v); fromBin(v); }, placeholder: '01001000' },
    { label: 'Hexadecimal', val: hex, set: v => { setHex(v); fromHex(v); }, placeholder: '48' },
    { label: 'Decimal', val: dec, set: v => { setDec(v); fromDec(v); }, placeholder: '72' },
    { label: 'Octal', val: oct, set: v => { setOct(v); fromOct(v); }, placeholder: '110' },
  ];

  const asciiChar = dec && numTo(parseInt(dec,10)).ascii;

  return (
    <div className={s.wrap}>
      <DevEncodersTopNav active="binary-hex-ascii" />
      <div className={s.header}>
        <div className={s.titleRow}>
          <img src="/icons/binary-hex-ascii.svg" alt="" width={28} height={28} className={s.logoIcon} />
          <span className={s.title}>Binary / Hex / <span className={s.accent}>ASCII</span></span>
        </div>
        <div className={s.modeTabs}>
          <button className={`${s.tab} ${mode==='single'?s.tabActive:''}`} onClick={() => setMode('single')}>Single value</button>
          <button className={`${s.tab} ${mode==='text'?s.tabActive:''}`} onClick={() => setMode('text')}>Text to bytes</button>
          <button className={`${s.tab} ${mode==='table'?s.tabActive:''}`} onClick={() => setMode('table')}>ASCII table</button>
        </div>
      </div>

      {mode === 'single' && (
        <div className={s.singleMode}>
          <div className={s.fields}>
            {fields.map(({label, val, set, placeholder}) => (
              <div key={label} className={s.field}>
                <div className={s.fieldLabel}>{label}</div>
                <div className={s.fieldRow}>
                  <input className={s.input} value={val} onChange={e => set(e.target.value)} placeholder={placeholder} spellCheck={false} />
                  <button className={`${s.copyBtn} ${copied===label?s.copyBtnDone:''}`} onClick={() => copy(val, label)}>
                    {copied===label ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {asciiChar && (
            <div className={s.asciiDisplay}>
              <span className={s.asciiChar}>{asciiChar}</span>
              <span className={s.asciiNote}>ASCII character</span>
            </div>
          )}
          <p className={s.hint}>Enter a value in any field — all others update instantly.</p>
        </div>
      )}

      {mode === 'text' && (
        <div className={s.textMode}>
          <label className={s.field}>
            <div className={s.fieldLabel}>Enter text</div>
            <input className={s.input} value={textInput} onChange={e => setTextInput(e.target.value)} placeholder="Hello" />
          </label>
          {bytes.length > 0 && (
            <div className={s.byteTable}>
              <div className={s.byteHeader}><span>Char</span><span>Dec</span><span>Hex</span><span>Binary</span><span>Oct</span></div>
              {bytes.map((b, i) => (
                <div key={i} className={s.byteRow}>
                  <span className={s.byteChar}>{b.char === ' ' ? '(sp)' : b.char}</span>
                  <span>{b.dec}</span>
                  <span>{b.hex}</span>
                  <span className={s.mono}>{b.bin}</span>
                  <span>{b.oct}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {mode === 'table' && (
        <div className={s.tableMode}>
          <div className={s.asciiTable}>
            <div className={s.asciiTableHeader}><span>Char</span><span>Dec</span><span>Hex</span><span>Binary</span></div>
            {ASCII_PRINTABLE.map(code => (
              <div key={code} className={s.asciiRow} onClick={() => { const r = numTo(code); setBin(r.bin); setHex(r.hex); setDec(r.dec); setOct(r.oct); setMode('single'); }}>
                <span className={s.asciiChar2}>{String.fromCharCode(code)}</span>
                <span>{code}</span>
                <span>{code.toString(16).toUpperCase()}</span>
                <span className={s.mono}>{code.toString(2).padStart(8,'0')}</span>
              </div>
            ))}
          </div>
          <p className={s.hint}>Click any row to load it in the single-value converter.</p>
        </div>
      )}
    </div>
  );
}
