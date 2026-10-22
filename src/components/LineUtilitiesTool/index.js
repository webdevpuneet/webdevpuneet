'use client';
import { useState, useMemo } from 'react';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

const SAMPLE = `banana
apple
cherry
apple
date
banana
cherry

fig
elderberry`;

export default function LineUtilitiesTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [lastOp, setLastOp] = useState('');
  const [chain, setChain] = useState([]);
  const [customMode, setCustomMode] = useState('keep');
  const [customValue, setCustomValue] = useState('');
  const [customRegex, setCustomRegex] = useState(false);

  const stats = useMemo(() => {
    const lines = input.split('\n');
    const nonBlank = lines.filter(l => l.trim() !== '');
    const unique = new Set(nonBlank.map(l => l.trim()));
    return { total: lines.length, nonBlank: nonBlank.length, unique: unique.size, chars: input.length };
  }, [input]);

  const outStats = useMemo(() => {
    if (!output) return null;
    const lines = output.split('\n');
    return { total: lines.length, chars: output.length };
  }, [output]);

  function run(label, fn) {
    setOutput(fn(input));
    setLastOp(label);
  }

  function runChain(nextChain = chain) {
    if (!nextChain.length) return;
    const result = nextChain.reduce((text, step) => step.fn(text), input);
    setOutput(result);
    setLastOp(`Chain (${nextChain.length})`);
  }

  function addToChain(op) {
    const next = [...chain, op];
    setChain(next);
    runChain(next);
  }

  function removeFromChain(idx) {
    const next = chain.filter((_, i) => i !== idx);
    setChain(next);
    if (next.length) runChain(next);
    else {
      setOutput('');
      setLastOp('');
    }
  }

  function clearChain() {
    setChain([]);
    setOutput('');
    setLastOp('');
  }

  function makeMatcher(value, useRegex) {
    if (!useRegex) {
      const needle = value.toLowerCase();
      return line => line.toLowerCase().includes(needle);
    }
    try {
      const re = new RegExp(value);
      return line => re.test(line);
    } catch {
      return () => false;
    }
  }

  function buildCustomOp() {
    const value = customValue;
    const labels = {
      keep: 'Keep containing',
      remove: 'Remove containing',
      prefix: 'Prefix lines',
      suffix: 'Suffix lines',
      join: 'Join with separator',
      split: 'Split by separator',
    };
    const label = `${labels[customMode]} "${value}"`;
    const fn = text => {
      const lines = text.split('\n');
      if (customMode === 'keep') {
        const match = makeMatcher(value, customRegex);
        return lines.filter(match).join('\n');
      }
      if (customMode === 'remove') {
        const match = makeMatcher(value, customRegex);
        return lines.filter(line => !match(line)).join('\n');
      }
      if (customMode === 'prefix') return lines.map(line => `${value}${line}`).join('\n');
      if (customMode === 'suffix') return lines.map(line => `${line}${value}`).join('\n');
      if (customMode === 'join') return lines.filter(line => line.trim()).join(value);
      if (customMode === 'split') return text.split(value).map(part => part.trim()).join('\n');
      return text;
    };
    return { label, fn };
  }

  function runCustom() {
    if (!customValue && !['prefix', 'suffix'].includes(customMode)) return;
    const op = buildCustomOp();
    run(op.label, op.fn);
  }

  function addCustomToChain() {
    if (!customValue && !['prefix', 'suffix'].includes(customMode)) return;
    addToChain(buildCustomOp());
  }

  function swap() {
    setInput(output);
    setOutput('');
    setLastOp('');
  }

  function copy() {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function lineNumbers(text) {
    const count = Math.max(1, text.split('\n').length);
    return Array.from({ length: count }, (_, i) => i + 1).join('\n');
  }

  function syncGutterScroll(e) {
    const gutter = e.currentTarget.previousElementSibling;
    if (gutter) gutter.scrollTop = e.currentTarget.scrollTop;
  }

  const ops = [
    {
      group: 'Sort',
      items: [
        { label: 'Sort A-Z', fn: t => t.split('\n').sort((a, b) => a.localeCompare(b)).join('\n') },
        { label: 'Sort Z-A', fn: t => t.split('\n').sort((a, b) => b.localeCompare(a)).join('\n') },
        { label: 'Shortest first', fn: t => t.split('\n').sort((a, b) => a.length - b.length).join('\n') },
        { label: 'Longest first', fn: t => t.split('\n').sort((a, b) => b.length - a.length).join('\n') },
        { label: 'Sort numeric', fn: t => t.split('\n').sort((a, b) => parseFloat(a) - parseFloat(b)).join('\n') },
        { label: 'Shuffle', fn: t => t.split('\n').sort(() => Math.random() - 0.5).join('\n') },
        { label: 'Reverse', fn: t => t.split('\n').reverse().join('\n') },
      ],
    },
    {
      group: 'Filter',
      items: [
        { label: 'Remove duplicates', fn: t => [...new Set(t.split('\n'))].join('\n') },
        { label: 'Remove blank lines', fn: t => t.split('\n').filter(l => l.trim() !== '').join('\n') },
        {
          label: 'Deduplicate case-insensitive',
          fn: t => {
            const seen = new Set();
            return t.split('\n').filter(l => {
              const k = l.trim().toLowerCase();
              if (seen.has(k)) return false;
              seen.add(k);
              return true;
            }).join('\n');
          },
        },
      ],
    },
    {
      group: 'Transform',
      items: [
        { label: 'Trim whitespace', fn: t => t.split('\n').map(l => l.trim()).join('\n') },
        { label: 'Lowercase', fn: t => t.split('\n').map(l => l.toLowerCase()).join('\n') },
        { label: 'Uppercase', fn: t => t.split('\n').map(l => l.toUpperCase()).join('\n') },
        { label: 'Number lines', fn: t => t.split('\n').map((l, i) => `${i + 1}. ${l}`).join('\n') },
        { label: 'Add quotes', fn: t => t.split('\n').map(l => `"${l.replace(/"/g, '\\"')}"`).join('\n') },
        { label: 'Comma-separated', fn: t => t.split('\n').filter(l => l.trim()).join(', ') },
      ],
    },
  ];

  return (
    <div className={s.wrap}>
      <TextToolsTopNav active="line-utilities" />
      <div className={s.header}>
        <div className={s.logo}>
          <div className={s.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M2 8h8M2 12h10" stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span>Line <span className={s.accent}>Utilities</span></span>
        </div>
        <span className={s.hint}>Sort · Deduplicate · Transform</span>
      </div>

      <div className={s.body}>
        <div className={s.opsCard}>
          {ops.map(({ group, items }) => (
            <div key={group} className={s.opGroup}>
              <div className={s.opGroupLabel}>{group}</div>
              <div className={s.opBtns}>
                {items.map(op => (
                  <div key={op.label} className={s.opControl}>
                    <button
                      className={lastOp === op.label ? `${s.opBtn} ${s.opBtnActive}` : s.opBtn}
                      onClick={() => run(op.label, op.fn)}
                    >
                      {op.label}
                    </button>
                    <button className={s.chainAddBtn} onClick={() => addToChain(op)} title={`Add "${op.label}" to chain`}>
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={s.chainBar}>
          <span className={s.chainLabel}>Chain</span>
          {chain.length ? (
            <>
              <div className={s.chainSteps}>
                {chain.map((step, idx) => (
                  <button key={`${step.label}-${idx}`} className={s.chainStep} onClick={() => removeFromChain(idx)} title="Remove this step">
                    <span>{idx + 1}</span>
                    {step.label}
                    <b>x</b>
                  </button>
                ))}
              </div>
              <button className={s.chainRunBtn} onClick={() => runChain()}>Run chain</button>
              <button className={s.chainClearBtn} onClick={clearChain}>Clear</button>
            </>
          ) : (
            <span className={s.chainEmpty}>Use + beside any operation to build a multi-step cleanup pipeline.</span>
          )}
        </div>

        <div className={s.customCard}>
          <div className={s.customHead}>
            <span className={s.chainLabel}>Custom</span>
            <span className={s.customHint}>Filter, wrap, split, or join lines with your own value.</span>
          </div>
          <div className={s.customControls}>
            <select className={s.customSelect} value={customMode} onChange={e => setCustomMode(e.target.value)}>
              <option value="keep">Keep lines containing</option>
              <option value="remove">Remove lines containing</option>
              <option value="prefix">Prefix each line</option>
              <option value="suffix">Suffix each line</option>
              <option value="join">Join with separator</option>
              <option value="split">Split by separator</option>
            </select>
            <input
              className={s.customInput}
              value={customValue}
              onChange={e => setCustomValue(e.target.value)}
              placeholder="Value, separator, or regex..."
            />
            {(customMode === 'keep' || customMode === 'remove') && (
              <label className={s.customCheck}>
                <input type="checkbox" checked={customRegex} onChange={e => setCustomRegex(e.target.checked)} />
                Regex
              </label>
            )}
            <button className={s.chainRunBtn} onClick={runCustom}>Run</button>
            <button className={s.chainClearBtn} onClick={addCustomToChain}>Add to chain</button>
          </div>
        </div>

        <div className={s.editorsGrid}>
          <div className={s.editorPanel}>
            <div className={s.editorHeader}>
              <span className={s.editorLabel}>Input</span>
              <span className={s.editorMeta}>{stats.total} lines · {stats.nonBlank} non-blank · {stats.unique} unique</span>
              <button className={s.clearBtn} onClick={() => { setInput(''); setOutput(''); }}>Clear</button>
            </div>
            <div className={s.editorBody}>
              <pre className={s.lineNumbers} aria-hidden="true">{lineNumbers(input)}</pre>
              <textarea
                className={s.textarea}
                value={input}
                onChange={e => setInput(e.target.value)}
                onScroll={syncGutterScroll}
                placeholder="Paste your lines here..."
                spellCheck={false}
              />
            </div>
          </div>

          <div className={s.actionsCol}>
            {output && <button className={s.swapBtn} onClick={swap} title="Use output as input">⇄</button>}
          </div>

          <div className={s.editorPanel}>
            <div className={s.editorHeader}>
              <span className={s.editorLabel}>{lastOp || 'Output'}</span>
              {outStats && <span className={s.editorMeta}>{outStats.total} lines · {outStats.chars} chars</span>}
              {output && <button className={s.copyBtn} onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>}
            </div>
            <div className={s.editorBody}>
              <pre className={s.lineNumbers} aria-hidden="true">{lineNumbers(output)}</pre>
              <textarea
                className={`${s.textarea} ${s.textareaOut}`}
                value={output}
                readOnly
                onScroll={syncGutterScroll}
                placeholder="Select an operation above to process your lines..."
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
