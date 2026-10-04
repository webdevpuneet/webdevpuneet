'use client';

import { useState, useCallback, useEffect } from 'react';
import s from './styles.module.css';
import TextToolsTopNav from '@/components/TextToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
/* ── Lorem Ipsum corpus ─────────────────────────────────────────────────────── */
const WORDS = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit',
  'sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore',
  'magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation',
  'ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis',
  'aute','irure','in','reprehenderit','voluptate','velit','esse','cillum',
  'eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat',
  'non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim',
  'id','est','laborum','pellentesque','habitant','morbi','tristique','senectus',
  'netus','malesuada','fames','ac','turpis','egestas','maecenas','pharetra',
  'convallis','posuere','blandit','aliquam','etiam','erat','velit','scelerisque',
  'purus','semper','eget','duis','at','tellus','at','urna','condimentum',
  'mattis','pellentesque','neque','volutpat','lacus','laoreet','non','curabitur',
  'gravida','arcu','cursus','vitae','congue','mauris','rhoncus','aenean',
  'vel','elit','scelerisque','mauris','pellentesque','pulvinar','lectus',
  'quam','id','leo','facilisi','nullam','vehicula','ipsum','porta',
  'lobortis','feugiat','vivamus','tortor','pretium','viverra','suspendisse',
  'potenti','cras','semper','auctor','neque','vitae','tempus','quam',
  'fringilla','urna','porttitor','rhoncus','dolor','purus','non','enim',
  'praesent','elementum','facilisis','leo','vel','fringilla','est',
  'ullamcorper','dignissim','cras','tincidunt','lobortis','feugiat',
  'varius','vel','pharetra','vel','turpis','nunc','eget','lorem','dolor',
  'sodales','ut','etiam','sit','amet','nisl','purus','in','mollis',
  'nunc','sed','id','semper','risus','in','hendrerit','gravida','rutrum',
  'quisque','non','tellus','orci','ac','auctor','augue','mauris','augue',
  'neque','gravida','in','fermentum','et','sollicitudin','ac','orci',
  'phasellus','egestas','tellus','rutrum','tellus','pellentesque','eu',
  'tincidunt','tortor','aliquam','nulla','facilisi','cras','fermentum',
  'odio','eu','feugiat','pretium','nibh','ipsum','consequat','nisl',
  'vel','pretium','lectus','quam','id','leo','in','vitae','turpis',
  'massa','sed','elementum','tempus','egestas','sed','sed','risus',
  'pretium','quam','vulputate','dignissim','suspendisse','in','est',
  'ante','in','nibh','mauris','cursus','mattis','molestie','a',
  'iaculis','at','erat','pellentesque','adipiscing','commodo','elit',
];

const CLASSIC_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

/* ── Helpers ─────────────────────────────────────────────────────────────────── */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function makeSentence(wordCount) {
  const words = [];
  for (let i = 0; i < wordCount; i++) words.push(randomWord());
  return capitalize(words.join(' ')) + '.';
}

function makeParagraph(opts) {
  const sentenceCount = rand(opts.minSentences, opts.maxSentences);
  const sentences = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(makeSentence(rand(opts.minWords, opts.maxWords)));
  }
  return sentences.join(' ');
}

function generateText(opts) {
  const { type, count, startWithLorem, minSentences, maxSentences, minWords, maxWords } = opts;
  const blocks = [];

  if (type === 'words') {
    const wordList = [];
    for (let i = 0; i < count; i++) wordList.push(randomWord());
    let result = wordList.join(' ');
    if (startWithLorem && count >= 5) {
      const rest = wordList.slice(5).join(' ');
      result = 'Lorem ipsum dolor sit amet' + (rest ? ' ' + rest : '');
    }
    return capitalize(result) + '.';
  }

  if (type === 'sentences') {
    for (let i = 0; i < count; i++) {
      blocks.push(makeSentence(rand(minWords, maxWords)));
    }
    if (startWithLorem) blocks[0] = CLASSIC_START;
    return blocks.join(' ');
  }

  /* paragraphs */
  for (let i = 0; i < count; i++) {
    blocks.push(makeParagraph({ minSentences, maxSentences, minWords, maxWords }));
  }
  if (startWithLorem) blocks[0] = CLASSIC_START + ' ' + makeParagraph({ minSentences: 2, maxSentences: 4, minWords, maxWords });
  return blocks.join('\n\n');
}

/* ── Component ───────────────────────────────────────────────────────────────── */
export default function LoremIpsumGenerator() {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(5);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [html, setHtml] = useState(false);
  const [minSentences, setMinSentences] = useState(3);
  const [maxSentences, setMaxSentences] = useState(6);
  const [minWords, setMinWords] = useState(8);
  const [maxWords, setMaxWords] = useState(18);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const applyGenerate = useCallback((opts) => {
    const text = generateText(opts);
    if (opts.html && opts.type === 'paragraphs') {
      setOutput(text.split('\n\n').map(p => `<p>${p}</p>`).join('\n'));
    } else if (opts.html && opts.type === 'sentences') {
      setOutput(`<p>${text}</p>`);
    } else {
      setOutput(text);
    }
    setGenerated(true);
    setCopied(false);
  }, []);

  useEffect(() => {
    applyGenerate({ type, count, startWithLorem, html, minSentences, maxSentences, minWords, maxWords });
  }, [type, count, startWithLorem, html, minSentences, maxSentences, minWords, maxWords, applyGenerate]);

  const generate = useCallback(() => {
    applyGenerate({ type, count, startWithLorem, html, minSentences, maxSentences, minWords, maxWords });
  }, [type, count, startWithLorem, html, minSentences, maxSentences, minWords, maxWords, applyGenerate]);


  const copy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const countLabel = type === 'paragraphs' ? 'Paragraphs' : type === 'sentences' ? 'Sentences' : 'Words';

  return (
    <div className={s.wrap}>
      <TextToolsTopNav active="lorem-ipsum-generator" />
      <PlaygroundTopAd />
      {/* Header */}
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>¶</span>
          Lorem Ipsum Generator
        </div>
      </div>

      {/* Controls */}
      <div className={s.controls}>
        {/* Type */}
        <div className={s.group}>
          <label className={s.label}>Generate</label>
          <div className={s.segmented}>
            {['paragraphs','sentences','words'].map(t => (
              <button
                key={t}
                className={`${s.seg} ${type === t ? s.segActive : ''}`}
                onClick={() => setType(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className={s.group}>
          <label className={s.label}>{countLabel}</label>
          <div className={s.countRow}>
            <input
              type="range"
              className={s.slider}
              min={1}
              max={type === 'words' ? 500 : type === 'sentences' ? 50 : 20}
              value={count}
              onChange={e => setCount(Number(e.target.value))}
            />
            <input
              type="number"
              className={s.numInput}
              min={1}
              max={type === 'words' ? 500 : type === 'sentences' ? 50 : 20}
              value={count}
              onChange={e => setCount(Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>

        {/* Advanced — only for paragraphs/sentences */}
        {type !== 'words' && (
          <div className={s.group}>
            <label className={s.label}>Sentences per paragraph</label>
            <div className={s.rangeRow}>
              <span className={s.rangeLabel}>Min</span>
              <input type="number" className={s.numInput} min={1} max={20} value={minSentences}
                onChange={e => setMinSentences(Math.max(1, Number(e.target.value)))} />
              <span className={s.rangeLabel}>Max</span>
              <input type="number" className={s.numInput} min={1} max={20} value={maxSentences}
                onChange={e => setMaxSentences(Math.max(1, Number(e.target.value)))} />
            </div>
          </div>
        )}

        <div className={s.group}>
          <label className={s.label}>Words per sentence</label>
          <div className={s.rangeRow}>
            <span className={s.rangeLabel}>Min</span>
            <input type="number" className={s.numInput} min={2} max={40} value={minWords}
              onChange={e => setMinWords(Math.max(2, Number(e.target.value)))} />
            <span className={s.rangeLabel}>Max</span>
            <input type="number" className={s.numInput} min={2} max={40} value={maxWords}
              onChange={e => setMaxWords(Math.max(2, Number(e.target.value)))} />
          </div>
        </div>

        {/* Toggles */}
        <div className={s.toggleRow}>
          <label className={s.toggleLabel}>
            <span className={s.toggleLabelText}>Start with "Lorem ipsum…"</span>
            <button
              role="switch"
              aria-checked={startWithLorem}
              className={`${s.toggle} ${startWithLorem ? s.toggleOn : ''}`}
              onClick={() => setStartWithLorem(v => !v)}
            />
          </label>
          <label className={s.toggleLabel}>
            <span className={s.toggleLabelText}>Wrap in HTML &lt;p&gt; tags</span>
            <button
              role="switch"
              aria-checked={html}
              className={`${s.toggle} ${html ? s.toggleOn : ''}`}
              onClick={() => setHtml(v => !v)}
            />
          </label>
        </div>

        {/* Generate btn */}
        <button className={s.generateBtn} onClick={generate}>
          🎲 Click to generate random text
        </button>
      </div>

      {/* Output */}
      <div className={s.outputWrap}>
        <div className={s.outputHeader}>
          <span className={s.outputTitle}>
            {generated ? `Generated ${type}` : 'Output'}
          </span>
          <button className={`${s.copyBtn} ${copied ? s.copyBtnDone : ''}`} onClick={copy} disabled={!output}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <textarea
          className={s.textarea}
          readOnly
          value={output}
          placeholder="Click Generate to create lorem ipsum text…"
        />
      </div>
    </div>
  );
}
