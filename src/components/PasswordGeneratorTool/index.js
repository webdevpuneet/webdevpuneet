'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styles from './styles.module.css';
import DevGeneratorsTopNav from '@/components/DevGeneratorsTopNav';

/* ─── Word list for passphrases (256 words = 8 bits/word) ───────────────── */
const WORDS = [
  'able','acid','aged','also','area','army','away','back','ball','band',
  'bank','base','bath','bear','beat','best','bird','blow','blue','body',
  'bomb','bond','bone','book','boot','born','bowl','burn','calm','card',
  'care','cash','cast','cave','cell','chat','chip','city','clay','club',
  'coal','coat','code','cold','cook','cool','core','corn','cost','crew',
  'crop','cure','dark','data','date','dawn','dead','deal','dear','debt',
  'deep','deny','desk','diet','disk','door','dose','draw','drop','drug',
  'drum','dusk','dust','duty','earn','ease','east','edge','epic','even',
  'evil','face','fact','fail','fair','fall','fame','farm','fast','fate',
  'feed','feel','fell','file','fill','film','find','fine','fire','firm',
  'fish','fist','flag','flat','flip','flow','fold','fond','food','ford',
  'form','fort','four','free','fuel','full','fund','fury','gain','game',
  'gang','gear','gift','girl','give','glad','glow','glue','goal','gold',
  'gone','good','grab','grid','grim','grip','grow','gulf','hack','half',
  'hall','hand','hang','hard','harm','hate','head','heal','heap','heat',
  'help','hero','high','hill','hint','hold','hole','home','hope','horn',
  'huge','hull','hunt','hurt','inch','iron','item','join','joke','jump',
  'jury','keen','kept','kick','kind','king','knee','know','lack','land',
  'lane','last','late','lead','lean','left','lift','like','link','list',
  'live','load','loan','lock','long','look','lord','lose','loss','loud',
  'love','luck','lung','made','mail','main','make','mark','mask','mass',
  'mate','meal','mean','meet','melt','mild','mill','mind','mine','miss',
  'mode','more','most','move','much','must','myth','name','navy','near',
  'need','news','next','nice','node','none','norm','nose','note','oath',
  'odds','open','oral','oval','pace','pack','page','pain','pair','palm',
  'park','part','pass','past','path','peak','pest','pick','pile','pine',
  'pipe','plan','play','plot','poem','pole','pool','port','pose','post',
  'pour','prey','pull','pump','pure','push','race','rack','rail','rain',
  'rate','read','real','rear','rely','rent','rest','rice','rich','ride',
  'ring','risk','road','rock','role','roof','room','root','rope','rose',
  'rule','rush','safe','sail','salt','same','sand','save','scan','seal',
  'seat','seed','seek','self','sell','send','shed','ship','shop','shot',
  'show','side','sign','sink','site','size','skin','slip','slow','snap',
  'snow','soft','soil','sole','some','song','sort','soul','soup','sour',
  'span','spin','spot','star','stay','stem','step','stop','suit','swim',
  'tail','tall','tank','tape','task','team','tear','tell','term','tide',
  'time','tire','toil','told','toll','tomb','tone','town','trap','tree',
  'trim','trip','true','tube','tune','turn','twin','type','unit','upon',
  'used','vain','vary','vast','view','vine','vote','wade','wait','wake',
  'walk','wall','want','ward','warm','wash','wave','weak','wear','week',
  'well','went','west','wide','wild','will','wind','wine','wing','wire',
  'wish','wolf','word','work','worm','wrap','yard','year','zero','zone',
];

/* ─── Constants ──────────────────────────────────────────────────────────── */
const CHARS_LOWER   = 'abcdefghijklmnopqrstuvwxyz';
const CHARS_LOWER_X = 'abcdefghjkmnpqrstuvwxyz';     // exclude ambiguous
const CHARS_UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHARS_UPPER_X = 'ABCDEFGHJKMNPQRSTUVWXYZ';
const CHARS_NUM     = '0123456789';
const CHARS_NUM_X   = '23456789';
const CHARS_SYM_DEF = '!@#$%^&*()-_=+[]{}|;:,.<>?';

const CONSONANTS = 'bcdfghjklmnpqrstvwxyz';
const VOWELS     = 'aeiou';

const SEPARATORS = [
  { id: '-',   label: 'Hyphen (-)' },
  { id: '.',   label: 'Dot (.)' },
  { id: '_',   label: 'Underscore (_)' },
  { id: ' ',   label: 'Space ( )' },
  { id: '',    label: 'None' },
];

const MODES = [
  { id: 'password',   label: 'Password'   },
  { id: 'passphrase', label: 'Passphrase' },
  { id: 'pin',        label: 'PIN'        },
  { id: 'memorable',  label: 'Memorable'  },
];

const STRENGTH_LEVELS = [
  { label: 'Very Weak', color: '#ef4444', min: 0   },
  { label: 'Weak',      color: '#f97316', min: 36  },
  { label: 'Fair',      color: '#eab308', min: 52  },
  { label: 'Strong',    color: '#84cc16', min: 68  },
  { label: 'Very Strong', color: '#22c55e', min: 90 },
];

/* ─── Crypto random helpers ──────────────────────────────────────────────── */
function randInt(max) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function randFrom(str) {
  return str[randInt(str.length)];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Generation functions ───────────────────────────────────────────────── */
function generatePassword({ length, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols }) {
  let charset = '';
  if (lowercase) charset += excludeAmbig ? CHARS_LOWER_X : CHARS_LOWER;
  if (uppercase) charset += excludeAmbig ? CHARS_UPPER_X : CHARS_UPPER;
  if (numbers)   charset += excludeAmbig ? CHARS_NUM_X   : CHARS_NUM;
  if (symbols)   charset += customSymbols || CHARS_SYM_DEF;
  if (!charset)  return '';

  // Guarantee at least one char from each enabled set
  const required = [];
  if (lowercase) required.push(randFrom(excludeAmbig ? CHARS_LOWER_X : CHARS_LOWER));
  if (uppercase) required.push(randFrom(excludeAmbig ? CHARS_UPPER_X : CHARS_UPPER));
  if (numbers)   required.push(randFrom(excludeAmbig ? CHARS_NUM_X   : CHARS_NUM));
  if (symbols)   required.push(randFrom(customSymbols || CHARS_SYM_DEF));

  const rest = Array.from({ length: length - required.length }, () => randFrom(charset));
  return shuffle([...required, ...rest]).join('');
}

function generatePassphrase({ wordCount, separator, capitalizeWords, includeNumber, includeSymbol }) {
  const words = Array.from({ length: wordCount }, () => {
    const w = WORDS[randInt(WORDS.length)];
    return capitalizeWords ? w[0].toUpperCase() + w.slice(1) : w;
  });
  let phrase = words.join(separator);
  if (includeNumber) phrase += separator + randInt(100);
  if (includeSymbol) phrase += (CHARS_SYM_DEF[randInt(CHARS_SYM_DEF.length)]);
  return phrase;
}

function generatePIN(length) {
  return Array.from({ length }, () => randInt(10)).join('');
}

function generateMemorable({ length, capitalize, includeNum }) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += (i % 2 === 0) ? randFrom(CONSONANTS) : randFrom(VOWELS);
  }
  if (capitalize) {
    result = result[0].toUpperCase() + result.slice(1);
    // capitalize a random consonant position
    const idx = 2 + randInt(Math.floor(length / 2)) * 2;
    if (idx < result.length) result = result.slice(0, idx) + result[idx].toUpperCase() + result.slice(idx + 1);
  }
  if (includeNum) result += randInt(100);
  return result;
}

/* ─── Strength calculation ───────────────────────────────────────────────── */
function calcCharsetSize({ uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols }) {
  let size = 0;
  if (lowercase) size += excludeAmbig ? CHARS_LOWER_X.length : 26;
  if (uppercase) size += excludeAmbig ? CHARS_UPPER_X.length : 26;
  if (numbers)   size += excludeAmbig ? CHARS_NUM_X.length   : 10;
  if (symbols)   size += (customSymbols || CHARS_SYM_DEF).length;
  return size;
}

function calcEntropy(password, charsetSize) {
  if (!password || charsetSize < 2) return 0;
  return Math.floor(password.length * Math.log2(charsetSize));
}

function calcEntropyPassphrase(wordCount) {
  return Math.floor(wordCount * Math.log2(WORDS.length));
}

function formatCrackTime(bits) {
  if (bits <= 0) return 'instantly';
  const combinations = Math.pow(2, bits);
  const guessesPerSec = 1e10; // fast GPU
  const avgSeconds = combinations / (guessesPerSec * 2);

  if (avgSeconds < 0.001) return 'instantly';
  if (avgSeconds < 1)     return 'less than a second';
  if (avgSeconds < 60)    return `${Math.floor(avgSeconds)} seconds`;
  if (avgSeconds < 3600)  return `${Math.floor(avgSeconds / 60)} minutes`;
  if (avgSeconds < 86400) return `${Math.floor(avgSeconds / 3600)} hours`;
  if (avgSeconds < 2.628e6) return `${Math.floor(avgSeconds / 86400)} days`;
  if (avgSeconds < 3.154e7) return `${Math.floor(avgSeconds / 2.628e6)} months`;
  if (avgSeconds < 3.154e9) return `${Math.floor(avgSeconds / 3.154e7).toLocaleString()} years`;
  if (avgSeconds < 3.154e12) return `${Math.floor(avgSeconds / 3.154e9).toLocaleString()} centuries`;
  return 'millions of years';
}

function getStrength(bits) {
  let level = STRENGTH_LEVELS[0];
  for (const s of STRENGTH_LEVELS) {
    if (bits >= s.min) level = s;
  }
  const idx = STRENGTH_LEVELS.indexOf(level);
  return { ...level, idx, pct: Math.min(100, (bits / 120) * 100) };
}

const STORAGE_KEY = 'wdp-password-generator-v1';

const DEFAULTS = {
  mode: 'password',
  pwLength: 16, uppercase: true, lowercase: true, numbers: true,
  symbols: true, excludeAmbig: false, customSymbols: CHARS_SYM_DEF,
  wordCount: 4, separator: '-', capitalizeWords: true, ppNumber: false, ppSymbol: false,
  pinLength: 6,
  memLength: 10, memCapitalize: true, memNumber: true,
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function PasswordGeneratorTool() {
  const hydrated  = useRef(false);
  const saveTimer = useRef(null);

  const [mode, setMode]       = useState(DEFAULTS.mode);
  const [revealed, setRevealed] = useState(true);
  const [password, setPassword] = useState('');
  const [history, setHistory]   = useState([]);
  const [copied, setCopied]     = useState(false);
  const [copiedHistIdx, setCopiedHistIdx] = useState(null);
  const [saveState, setSaveState] = useState('idle');

  // Password mode
  const [pwLength,    setPwLength]    = useState(DEFAULTS.pwLength);
  const [uppercase,   setUppercase]   = useState(DEFAULTS.uppercase);
  const [lowercase,   setLowercase]   = useState(DEFAULTS.lowercase);
  const [numbers,     setNumbers]     = useState(DEFAULTS.numbers);
  const [symbols,     setSymbols]     = useState(DEFAULTS.symbols);
  const [excludeAmbig, setExcludeAmbig] = useState(DEFAULTS.excludeAmbig);
  const [customSymbols, setCustomSymbols] = useState(DEFAULTS.customSymbols);

  // Passphrase mode
  const [wordCount,      setWordCount]      = useState(DEFAULTS.wordCount);
  const [separator,      setSeparator]      = useState(DEFAULTS.separator);
  const [capitalizeWords, setCapitalizeWords] = useState(DEFAULTS.capitalizeWords);
  const [ppNumber,       setPpNumber]       = useState(DEFAULTS.ppNumber);
  const [ppSymbol,       setPpSymbol]       = useState(DEFAULTS.ppSymbol);

  // PIN mode
  const [pinLength, setPinLength] = useState(DEFAULTS.pinLength);

  // Memorable mode
  const [memLength,     setMemLength]     = useState(DEFAULTS.memLength);
  const [memCapitalize, setMemCapitalize] = useState(DEFAULTS.memCapitalize);
  const [memNumber,     setMemNumber]     = useState(DEFAULTS.memNumber);

  /* ── Restore from localStorage ──────────────────────────────────────────── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.mode)            setMode(s.mode);
        if (s.pwLength)        setPwLength(s.pwLength);
        if (s.uppercase       != null) setUppercase(s.uppercase);
        if (s.lowercase       != null) setLowercase(s.lowercase);
        if (s.numbers         != null) setNumbers(s.numbers);
        if (s.symbols         != null) setSymbols(s.symbols);
        if (s.excludeAmbig    != null) setExcludeAmbig(s.excludeAmbig);
        if (s.customSymbols)   setCustomSymbols(s.customSymbols);
        if (s.wordCount)       setWordCount(s.wordCount);
        if (s.separator       != null) setSeparator(s.separator);
        if (s.capitalizeWords != null) setCapitalizeWords(s.capitalizeWords);
        if (s.ppNumber        != null) setPpNumber(s.ppNumber);
        if (s.ppSymbol        != null) setPpSymbol(s.ppSymbol);
        if (s.pinLength)       setPinLength(s.pinLength);
        if (s.memLength)       setMemLength(s.memLength);
        if (s.memCapitalize   != null) setMemCapitalize(s.memCapitalize);
        if (s.memNumber       != null) setMemNumber(s.memNumber);
      }
    } catch {}
    hydrated.current = true;
  }, []);

  /* ── Debounced save ──────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!hydrated.current) return;
    clearTimeout(saveTimer.current);
    setSaveState('saving');
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          mode, pwLength, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols,
          wordCount, separator, capitalizeWords, ppNumber, ppSymbol,
          pinLength, memLength, memCapitalize, memNumber,
        }));
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 1500);
      } catch {}
    }, 600);
    return () => clearTimeout(saveTimer.current);
  }, [mode, pwLength, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols, wordCount, separator, capitalizeWords, ppNumber, ppSymbol, pinLength, memLength, memCapitalize, memNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Reset ───────────────────────────────────────────────────────────────── */
  const handleReset = useCallback(() => {
    setMode(DEFAULTS.mode);
    setPwLength(DEFAULTS.pwLength);
    setUppercase(DEFAULTS.uppercase);
    setLowercase(DEFAULTS.lowercase);
    setNumbers(DEFAULTS.numbers);
    setSymbols(DEFAULTS.symbols);
    setExcludeAmbig(DEFAULTS.excludeAmbig);
    setCustomSymbols(DEFAULTS.customSymbols);
    setWordCount(DEFAULTS.wordCount);
    setSeparator(DEFAULTS.separator);
    setCapitalizeWords(DEFAULTS.capitalizeWords);
    setPpNumber(DEFAULTS.ppNumber);
    setPpSymbol(DEFAULTS.ppSymbol);
    setPinLength(DEFAULTS.pinLength);
    setMemLength(DEFAULTS.memLength);
    setMemCapitalize(DEFAULTS.memCapitalize);
    setMemNumber(DEFAULTS.memNumber);
    setHistory([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setSaveState('idle');
  }, []);

  // Bulk
  const [showBulk,      setShowBulk]      = useState(false);
  const [bulkCount,     setBulkCount]     = useState(5);
  const [bulkPasswords, setBulkPasswords] = useState([]);
  const [copiedBulkIdx, setCopiedBulkIdx] = useState(null);

  /* ── Generate ──────────────────────────────────────────────────────────── */
  const generate = useCallback((addToHistory = false) => {
    let pw = '';
    if (mode === 'password') {
      pw = generatePassword({ length: pwLength, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols });
    } else if (mode === 'passphrase') {
      pw = generatePassphrase({ wordCount, separator, capitalizeWords, includeNumber: ppNumber, includeSymbol: ppSymbol });
    } else if (mode === 'pin') {
      pw = generatePIN(pinLength);
    } else if (mode === 'memorable') {
      pw = generateMemorable({ length: memLength, capitalize: memCapitalize, includeNum: memNumber });
    }
    if (addToHistory && password) {
      setHistory(prev => [password, ...prev].slice(0, 10));
    }
    setPassword(pw);
  }, [mode, pwLength, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols,
      wordCount, separator, capitalizeWords, ppNumber, ppSymbol,
      pinLength, memLength, memCapitalize, memNumber, password]);

  // Auto-generate on option changes
  useEffect(() => {
    let pw = '';
    if (mode === 'password') {
      pw = generatePassword({ length: pwLength, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols });
    } else if (mode === 'passphrase') {
      pw = generatePassphrase({ wordCount, separator, capitalizeWords, includeNumber: ppNumber, includeSymbol: ppSymbol });
    } else if (mode === 'pin') {
      pw = generatePIN(pinLength);
    } else if (mode === 'memorable') {
      pw = generateMemorable({ length: memLength, capitalize: memCapitalize, includeNum: memNumber });
    }
    setPassword(pw);
  }, [mode, pwLength, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols,
      wordCount, separator, capitalizeWords, ppNumber, ppSymbol,
      pinLength, memLength, memCapitalize, memNumber]);

  /* ── Bulk generate ─────────────────────────────────────────────────────── */
  const generateBulk = useCallback(() => {
    const list = Array.from({ length: bulkCount }, () => {
      if (mode === 'password')   return generatePassword({ length: pwLength, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols });
      if (mode === 'passphrase') return generatePassphrase({ wordCount, separator, capitalizeWords, includeNumber: ppNumber, includeSymbol: ppSymbol });
      if (mode === 'pin')        return generatePIN(pinLength);
      return generateMemorable({ length: memLength, capitalize: memCapitalize, includeNum: memNumber });
    });
    setBulkPasswords(list);
  }, [mode, pwLength, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols,
      wordCount, separator, capitalizeWords, ppNumber, ppSymbol,
      pinLength, memLength, memCapitalize, memNumber, bulkCount]);

  /* ── Entropy & strength ────────────────────────────────────────────────── */
  const { bits, strength } = useMemo(() => {
    let b = 0;
    if (mode === 'password') {
      const cs = calcCharsetSize({ uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols });
      b = calcEntropy(password, cs);
    } else if (mode === 'passphrase') {
      b = calcEntropyPassphrase(wordCount) + (ppNumber ? 7 : 0) + (ppSymbol ? 5 : 0);
    } else if (mode === 'pin') {
      b = Math.floor(pinLength * Math.log2(10));
    } else if (mode === 'memorable') {
      const cs = CONSONANTS.length / 2 + VOWELS.length / 2; // ~12 avg
      b = calcEntropy(password.replace(/\d/g, ''), 11) + (memNumber ? 7 : 0);
    }
    return { bits: b, strength: getStrength(b) };
  }, [mode, password, uppercase, lowercase, numbers, symbols, excludeAmbig, customSymbols,
      wordCount, ppNumber, ppSymbol, pinLength, memLength, memCapitalize, memNumber]);

  /* ── Copy ──────────────────────────────────────────────────────────────── */
  const copyPassword = useCallback(() => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setHistory(prev => [password, ...prev.filter(p => p !== password)].slice(0, 10));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [password]);

  const copyBulk = useCallback((pw, idx) => {
    navigator.clipboard.writeText(pw).then(() => {
      setCopiedBulkIdx(idx);
      setTimeout(() => setCopiedBulkIdx(null), 1500);
    });
  }, []);

  const copyHistItem = useCallback((pw, idx) => {
    navigator.clipboard.writeText(pw).then(() => {
      setCopiedHistIdx(idx);
      setTimeout(() => setCopiedHistIdx(null), 1500);
    });
  }, []);

  const copyAllBulk = useCallback(() => {
    navigator.clipboard.writeText(bulkPasswords.join('\n'));
  }, [bulkPasswords]);

  /* ── Toggle helpers ────────────────────────────────────────────────────── */
  const toggleOption = (val, setVal, others) => {
    if (val && others.filter(Boolean).length === 0) return; // keep at least one
    setVal(!val);
  };

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className={styles.wrap}>
      <DevGeneratorsTopNav active="password-generator" />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="6" width="14" height="9" rx="2" stroke="#818cf8" strokeWidth="1.5" fill="none"/>
              <path d="M4 6V4.5a4 4 0 018 0V6" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <circle cx="8" cy="10.5" r="1.5" fill="#818cf8"/>
              <line x1="8" y1="12" x2="8" y2="13.5" stroke="#818cf8" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          Password Generator
        </div>
        <div className={styles.headerActions}>
          <span className={`${styles.saveIndicator} ${saveState === 'saving' ? styles.saveIndicatorSaving : saveState === 'saved' ? styles.saveIndicatorSaved : ''}`}>
            <span className={styles.saveDot} />
            {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved' : 'Auto-saved'}
          </span>
          <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className={styles.body}>

        {/* ── Left pane: Controls ──────────────────────────────────────── */}
        <aside className={styles.leftPane}>

          {/* Mode selector */}
          <div className={styles.modeList}>
            {MODES.map(m => (
              <button key={m.id}
                className={`${styles.modeItem} ${mode === m.id ? styles.modeItemActive : ''}`}
                onClick={() => setMode(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          {mode === 'password' && (
            <>
              <div className={styles.section}>
                <div className={styles.sectionLabel}>Length — {pwLength}</div>
                <input type="range" min={4} max={128} value={pwLength} className={styles.slider}
                  onChange={e => setPwLength(Number(e.target.value))} />
                <div className={styles.lengthHints}>
                  {[8, 12, 16, 24, 32, 64].map(n => (
                    <button key={n} className={`${styles.lengthHint} ${pwLength === n ? styles.lengthHintActive : ''}`}
                      onClick={() => setPwLength(n)}>{n}</button>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionLabel}>Characters</div>
                <div className={styles.checkList}>
                  {[
                    { label: 'Uppercase (A–Z)',  val: uppercase,  set: () => toggleOption(uppercase, setUppercase, [lowercase, numbers, symbols]) },
                    { label: 'Lowercase (a–z)',  val: lowercase,  set: () => toggleOption(lowercase, setLowercase, [uppercase, numbers, symbols]) },
                    { label: 'Numbers (0–9)',     val: numbers,    set: () => toggleOption(numbers,   setNumbers,   [uppercase, lowercase, symbols]) },
                    { label: 'Symbols (!@#…)',    val: symbols,    set: () => toggleOption(symbols,   setSymbols,   [uppercase, lowercase, numbers]) },
                  ].map(({ label, val, set }) => (
                    <label key={label} className={styles.checkRow}>
                      <input type="checkbox" checked={val} onChange={set} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionLabel}>Options</div>
                <label className={styles.checkRow}>
                  <input type="checkbox" checked={excludeAmbig} onChange={e => setExcludeAmbig(e.target.checked)} />
                  <span>Exclude ambiguous (0/O, 1/l/I)</span>
                </label>
              </div>

              {symbols && (
                <div className={styles.section}>
                  <div className={styles.sectionLabel}>Symbol set</div>
                  <input className={styles.symbolInput} value={customSymbols}
                    onChange={e => setCustomSymbols(e.target.value)}
                    placeholder="!@#$%^&*…" />
                  <button className={styles.resetBtn} onClick={() => setCustomSymbols(CHARS_SYM_DEF)}>
                    Reset to default
                  </button>
                </div>
              )}
            </>
          )}

          {mode === 'passphrase' && (
            <>
              <div className={styles.section}>
                <div className={styles.sectionLabel}>Words — {wordCount}</div>
                <input type="range" min={3} max={8} value={wordCount} className={styles.slider}
                  onChange={e => setWordCount(Number(e.target.value))} />
              </div>
              <div className={styles.section}>
                <div className={styles.sectionLabel}>Separator</div>
                <div className={styles.sepBtns}>
                  {SEPARATORS.map(s => (
                    <button key={s.id}
                      className={`${styles.sepBtn} ${separator === s.id ? styles.sepBtnActive : ''}`}
                      onClick={() => setSeparator(s.id)}>{s.label}</button>
                  ))}
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.sectionLabel}>Options</div>
                <div className={styles.checkList}>
                  <label className={styles.checkRow}>
                    <input type="checkbox" checked={capitalizeWords} onChange={e => setCapitalizeWords(e.target.checked)} />
                    <span>Capitalize words</span>
                  </label>
                  <label className={styles.checkRow}>
                    <input type="checkbox" checked={ppNumber} onChange={e => setPpNumber(e.target.checked)} />
                    <span>Append number</span>
                  </label>
                  <label className={styles.checkRow}>
                    <input type="checkbox" checked={ppSymbol} onChange={e => setPpSymbol(e.target.checked)} />
                    <span>Append symbol</span>
                  </label>
                </div>
              </div>
            </>
          )}

          {mode === 'pin' && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>PIN Length — {pinLength}</div>
              <input type="range" min={4} max={12} value={pinLength} className={styles.slider}
                onChange={e => setPinLength(Number(e.target.value))} />
              <div className={styles.lengthHints}>
                {[4, 6, 8, 10, 12].map(n => (
                  <button key={n} className={`${styles.lengthHint} ${pinLength === n ? styles.lengthHintActive : ''}`}
                    onClick={() => setPinLength(n)}>{n}</button>
                ))}
              </div>
            </div>
          )}

          {mode === 'memorable' && (
            <>
              <div className={styles.section}>
                <div className={styles.sectionLabel}>Length — {memLength}</div>
                <input type="range" min={6} max={20} value={memLength} className={styles.slider}
                  onChange={e => setMemLength(Number(e.target.value))} />
              </div>
              <div className={styles.section}>
                <div className={styles.sectionLabel}>Options</div>
                <div className={styles.checkList}>
                  <label className={styles.checkRow}>
                    <input type="checkbox" checked={memCapitalize} onChange={e => setMemCapitalize(e.target.checked)} />
                    <span>Mixed capitals</span>
                  </label>
                  <label className={styles.checkRow}>
                    <input type="checkbox" checked={memNumber} onChange={e => setMemNumber(e.target.checked)} />
                    <span>Append number</span>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Bulk section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Bulk Generate</span>
              <button className={styles.toggleSection} onClick={() => setShowBulk(p => !p)}>
                {showBulk ? '▲' : '▼'}
              </button>
            </div>
            {showBulk && (
              <div className={styles.bulkControls}>
                <div className={styles.bulkRow}>
                  <span className={styles.bulkLabel}>Count</span>
                  <div className={styles.bulkCountBtns}>
                    {[5, 10, 20, 50].map(n => (
                      <button key={n}
                        className={`${styles.bulkCountBtn} ${bulkCount === n ? styles.bulkCountBtnActive : ''}`}
                        onClick={() => setBulkCount(n)}>{n}</button>
                    ))}
                  </div>
                </div>
                <button className={styles.generateBulkBtn} onClick={generateBulk}>
                  Generate {bulkCount} passwords
                </button>
                {bulkPasswords.length > 0 && (
                  <div className={styles.bulkList}>
                    <div className={styles.bulkListHeader}>
                      <span className={styles.bulkListLabel}>{bulkPasswords.length} passwords</span>
                      <button className={styles.copyAllBtn} onClick={copyAllBulk}>Copy all</button>
                    </div>
                    {bulkPasswords.map((pw, i) => (
                      <div key={i} className={styles.bulkItem}>
                        <span className={styles.bulkPw}>{pw}</span>
                        <button className={`${styles.bulkCopyBtn} ${copiedBulkIdx === i ? styles.bulkCopiedBtn : ''}`}
                          onClick={() => copyBulk(pw, i)}>
                          {copiedBulkIdx === i ? '✓' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </aside>

        {/* ── Right pane: Output ────────────────────────────────────────── */}
        <div className={styles.rightPane}>

          {/* Password output */}
          <div className={styles.outputCard}>
            <div className={styles.outputTop}>
              <span className={styles.outputLabel}>{MODES.find(m => m.id === mode)?.label}</span>
              <div className={styles.outputActions}>
                <button className={styles.iconBtn} title={revealed ? 'Hide' : 'Reveal'} onClick={() => setRevealed(p => !p)}>
                  {revealed
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  }
                </button>
                <button className={styles.iconBtn} title="Regenerate" onClick={() => generate(true)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.passwordDisplay} onClick={copyPassword} title="Click to copy">
              {revealed
                ? <span className={styles.passwordText}>{password}</span>
                : <span className={styles.passwordDots}>{'●'.repeat(Math.min(password.length, 32))}</span>
              }
            </div>

            <div className={styles.outputBottom}>
              <span className={styles.charCount}>{password.length} characters</span>
              <button
                className={`${styles.copyBtn} ${copied ? styles.copyBtnOk : ''}`}
                onClick={copyPassword}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {copied
                    ? <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    : <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>
                  }
                </svg>
                {copied ? 'Copied!' : 'Copy password'}
              </button>
            </div>
          </div>

          {/* Strength meter */}
          <div className={styles.strengthCard}>
            <div className={styles.strengthHeader}>
              <span className={styles.strengthLabel} style={{ color: strength.color }}>{strength.label}</span>
              <span className={styles.entropyBadge}>{bits} bits entropy</span>
            </div>
            <div className={styles.strengthBar}>
              {STRENGTH_LEVELS.map((s, i) => (
                <div key={s.label}
                  className={styles.strengthSeg}
                  style={{ background: i <= strength.idx ? strength.color : undefined }}
                />
              ))}
            </div>
            <div className={styles.crackTime}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>
                Cracks in <strong style={{ color: strength.color }}>{formatCrackTime(bits)}</strong>
                <span className={styles.crackNote}> at 10 billion guesses/sec</span>
              </span>
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className={styles.historyCard}>
              <div className={styles.historyHeader}>
                <span className={styles.sectionLabel}>Recent passwords</span>
                <button className={styles.clearHistBtn} onClick={() => setHistory([])}>Clear</button>
              </div>
              <div className={styles.historyList}>
                {history.map((pw, i) => (
                  <div key={i} className={styles.historyItem}>
                    <span className={styles.historyPw}>{pw}</span>
                    <button
                      className={`${styles.histCopyBtn} ${copiedHistIdx === i ? styles.histCopiedBtn : ''}`}
                      onClick={() => copyHistItem(pw, i)}
                    >
                      {copiedHistIdx === i ? '✓' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
