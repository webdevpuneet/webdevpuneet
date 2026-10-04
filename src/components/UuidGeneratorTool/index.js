'use client';

import { useState, useCallback, useEffect } from 'react';
import styles from './styles.module.css';
import DevGeneratorsTopNav from '@/components/DevGeneratorsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── ID generators ───────────────────────────────────────────────────────── */

function genUuidV4() {
  return crypto.randomUUID();
}

function genUuidV7() {
  const now = BigInt(Date.now());
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[0] = Number((now >> 40n) & 0xffn);
  bytes[1] = Number((now >> 32n) & 0xffn);
  bytes[2] = Number((now >> 24n) & 0xffn);
  bytes[3] = Number((now >> 16n) & 0xffn);
  bytes[4] = Number((now >> 8n) & 0xffn);
  bytes[5] = Number(now & 0xffn);
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
}

function genUuidV1() {
  const OFFSET = 122192928000000000n;
  const t = BigInt(Date.now()) * 10000n + OFFSET;
  const tLow   = t & 0xffffffffn;
  const tMid   = (t >> 32n) & 0xffffn;
  const tHiVer = ((t >> 48n) & 0x0fffn) | 0x1000n;
  const clockSeq = (BigInt(Math.floor(Math.random() * 0x3fff)) | 0x8000n);
  const nodeBytes = new Uint8Array(6);
  crypto.getRandomValues(nodeBytes);
  const node = Array.from(nodeBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return [
    tLow.toString(16).padStart(8, '0'),
    tMid.toString(16).padStart(4, '0'),
    tHiVer.toString(16).padStart(4, '0'),
    clockSeq.toString(16).padStart(4, '0'),
    node,
  ].join('-');
}

const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function genUlid() {
  let t = Date.now();
  let tsStr = '';
  for (let i = 9; i >= 0; i--) { tsStr = CROCKFORD[t % 32] + tsStr; t = Math.floor(t / 32); }
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  let bits = 0n;
  for (const b of bytes) bits = (bits << 8n) | BigInt(b);
  let randStr = '';
  for (let i = 0; i < 16; i++) { randStr = CROCKFORD[Number(bits & 31n)] + randStr; bits >>= 5n; }
  return tsStr + randStr;
}

const NANO_PRESETS = [
  { label: 'Default (URL-safe)', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_' },
  { label: 'Alphanumeric', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' },
  { label: 'Lowercase+digits', value: 'abcdefghijklmnopqrstuvwxyz0123456789' },
  { label: 'Uppercase+digits', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' },
  { label: 'Hex', value: '0123456789abcdef' },
  { label: 'Numbers only', value: '0123456789' },
];

function genNanoid(alphabet, size) {
  const alpha = alphabet.length > 0 ? alphabet : NANO_PRESETS[0].value;
  const len = Math.min(Math.max(parseInt(size) || 21, 1), 255);
  if (alpha.length === 1) return alpha.repeat(len);
  const mask = Math.pow(2, Math.ceil(Math.log2(alpha.length))) - 1;
  const buf = new Uint8Array(len * 3);
  crypto.getRandomValues(buf);
  let result = '';
  let i = 0;
  while (result.length < len) {
    if (i >= buf.length) { crypto.getRandomValues(buf); i = 0; }
    const idx = buf[i++] & mask;
    if (idx < alpha.length) result += alpha[idx];
  }
  return result;
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

const TYPES = [
  { id: 'v4',     label: 'UUID v4',  badge: 'Random'     },
  { id: 'v7',     label: 'UUID v7',  badge: 'Sortable'   },
  { id: 'v1',     label: 'UUID v1',  badge: 'Time-based' },
  { id: 'ulid',   label: 'ULID',     badge: 'Sortable'   },
  { id: 'nanoid', label: 'NanoID',   badge: 'Custom'     },
];

function generate(type, count, opts) {
  const results = [];
  for (let i = 0; i < count; i++) {
    let id = '';
    if (type === 'v4')     id = genUuidV4();
    else if (type === 'v7') id = genUuidV7();
    else if (type === 'v1') id = genUuidV1();
    else if (type === 'ulid') id = genUlid();
    else if (type === 'nanoid') id = genNanoid(opts.nanoAlpha, opts.nanoSize);
    if (type !== 'nanoid' && type !== 'ulid') {
      if (opts.uppercase) id = id.toUpperCase();
      if (opts.noHyphens) id = id.replace(/-/g, '');
    } else if (type === 'ulid') {
      if (!opts.uppercase) id = id.toLowerCase();
    }
    results.push(id);
  }
  return results;
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function UuidGeneratorTool() {
  const [type, setType]           = useState('v4');
  const [count, setCount]         = useState(10);
  const [countInput, setCountInput] = useState('10');
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [nanoSize, setNanoSize]   = useState('21');
  const [nanoAlpha, setNanoAlpha] = useState(NANO_PRESETS[0].value);
  const [ids, setIds]             = useState([]);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    setIds(generate('v4', 10, { uppercase: false, noHyphens: false }));
  }, []);

  const opts = { uppercase, noHyphens, nanoSize, nanoAlpha };

  const handleGenerate = useCallback(() => {
    const n = Math.min(Math.max(parseInt(countInput) || 1, 1), 1000);
    setCount(n);
    setIds(generate(type, n, opts));
    setCopiedIdx(null);
    setCopiedAll(false);
  }, [type, countInput, opts]);

  const handleTypeChange = useCallback((t) => {
    setType(t);
    const n = Math.min(Math.max(parseInt(countInput) || 1, 1), 1000);
    setIds(generate(t, n, opts));
    setCopiedIdx(null);
    setCopiedAll(false);
  }, [countInput, opts]);

  const copyOne = useCallback((id, idx) => {
    navigator.clipboard?.writeText(id).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(i => i === idx ? null : i), 1500);
    });
  }, []);

  const copyAll = useCallback(() => {
    navigator.clipboard?.writeText(ids.join('\n')).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    });
  }, [ids]);

  const download = useCallback(() => {
    const blob = new Blob([ids.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${type}-ids.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [ids, type]);

  const setQuickCount = (n) => {
    setCountInput(String(n));
    setCount(n);
    setIds(generate(type, n, opts));
    setCopiedIdx(null);
    setCopiedAll(false);
  };

  const isUuid = type === 'v4' || type === 'v7' || type === 'v1';

  return (
    <div className={styles.wrap}>
      <DevGeneratorsTopNav active="uuid-generator" />
      <PlaygroundTopAd />

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}><span className={styles.accent}>#</span></div>
          <span>ID Generator</span>
        </div>

        {/* Type tabs */}
        <div className={styles.typeTabs}>
          {TYPES.map(t => (
            <button
              key={t.id}
              className={`${styles.typeTab} ${type === t.id ? styles.typeTabActive : ''}`}
              onClick={() => handleTypeChange(t.id)}
            >
              {t.label}
              <span className={styles.tabBadge}>{t.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Options bar ── */}
      <div className={styles.optionsBar}>
        {/* Count */}
        <div className={styles.countGroup}>
          <span className={styles.optLabel}>Count</span>
          <div className={styles.quickCounts}>
            {[1, 5, 10, 50, 100].map(n => (
              <button
                key={n}
                className={`${styles.quickBtn} ${count === n && String(n) === countInput ? styles.quickBtnActive : ''}`}
                onClick={() => setQuickCount(n)}
              >{n}</button>
            ))}
          </div>
          <input
            className={styles.countInput}
            type="number"
            min={1}
            max={1000}
            value={countInput}
            onChange={e => setCountInput(e.target.value)}
            onBlur={() => {
              const n = Math.min(Math.max(parseInt(countInput) || 1, 1), 1000);
              setCountInput(String(n));
            }}
          />
        </div>

        {/* UUID-specific options */}
        {isUuid && (
          <div className={styles.optGroup}>
            <button
              className={`${styles.optToggle} ${uppercase ? styles.optToggleOn : ''}`}
              onClick={() => setUppercase(v => !v)}
            >Uppercase</button>
            <button
              className={`${styles.optToggle} ${noHyphens ? styles.optToggleOn : ''}`}
              onClick={() => setNoHyphens(v => !v)}
            >No hyphens</button>
          </div>
        )}

        {/* ULID options */}
        {type === 'ulid' && (
          <div className={styles.optGroup}>
            <button
              className={`${styles.optToggle} ${!uppercase ? styles.optToggleOn : ''}`}
              onClick={() => setUppercase(v => !v)}
            >{uppercase ? 'Uppercase' : 'Lowercase'}</button>
          </div>
        )}

        {/* NanoID options */}
        {type === 'nanoid' && (
          <div className={styles.nanoOpts}>
            <div className={styles.nanoLenGroup}>
              <span className={styles.optLabel}>Length</span>
              <input
                className={styles.nanoLenInput}
                type="number"
                min={1}
                max={255}
                value={nanoSize}
                onChange={e => setNanoSize(e.target.value)}
              />
            </div>
            <div className={styles.nanoAlphaGroup}>
              <span className={styles.optLabel}>Alphabet</span>
              <select
                className={styles.nanoSelect}
                onChange={e => setNanoAlpha(e.target.value)}
                value={NANO_PRESETS.find(p => p.value === nanoAlpha)?.value ?? ''}
              >
                {NANO_PRESETS.map(p => (
                  <option key={p.label} value={p.value}>{p.label}</option>
                ))}
                <option value="">Custom…</option>
              </select>
              <input
                className={styles.nanoAlphaInput}
                value={nanoAlpha}
                onChange={e => setNanoAlpha(e.target.value)}
                placeholder="Custom alphabet…"
                spellCheck={false}
              />
            </div>
          </div>
        )}

        <button className={styles.generateBtn} onClick={handleGenerate}>
          Generate
        </button>
      </div>

      {/* ── ID list ── */}
      <div className={styles.listWrap}>
        {ids.length === 0 ? (
          <div className={styles.empty}>Click Generate to create IDs</div>
        ) : (
          <div className={styles.idList}>
            {ids.map((id, i) => (
              <div key={i} className={styles.idRow}>
                <span className={styles.idIdx}>{String(i + 1).padStart(String(ids.length).length, '0')}</span>
                <span className={styles.idVal}>{id}</span>
                <button
                  className={`${styles.copyBtn} ${copiedIdx === i ? styles.copyBtnOk : ''}`}
                  onClick={() => copyOne(id, i)}
                >
                  {copiedIdx === i ? '✓' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className={styles.footer}>
        <span className={styles.footerStat}>{ids.length} ID{ids.length !== 1 ? 's' : ''}</span>
        {ids.length > 0 && type !== 'nanoid' && (
          <span className={styles.footerStat}>{ids[0]?.length} chars each</span>
        )}
        <div className={styles.footerActions}>
          <button
            className={`${styles.footerBtn} ${copiedAll ? styles.footerBtnOk : ''}`}
            onClick={copyAll}
            disabled={ids.length === 0}
          >
            {copiedAll ? '✓ Copied' : 'Copy All'}
          </button>
          <button className={styles.footerBtn} onClick={download} disabled={ids.length === 0}>
            Download
          </button>
          <button className={styles.footerBtnGhost} onClick={() => { setIds([]); setCopiedIdx(null); }}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
