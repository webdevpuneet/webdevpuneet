'use client';

import { useMemo, useState } from 'react';
import s from './styles.module.css';
import DevConvertersTopNav from '@/components/DevConvertersTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
const SAMPLE = `// Paste JavaScript or upload multiple .js files
function calculateTotal(items, taxRate) {
  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const tax = subtotal * taxRate;
  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
}

console.log(calculateTotal([
  { price: 1200, quantity: 2 },
  { price: 499, quantity: 1 },
], 0.18));`;

const RESERVED = new Set([
  'break','case','catch','class','const','continue','debugger','default','delete','do','else','export','extends','finally',
  'for','function','if','import','in','instanceof','let','new','return','super','switch','this','throw','try','typeof','var',
  'void','while','with','yield','await','async','of','true','false','null','undefined','console','window','document','Math',
  'JSON','Array','Object','String','Number','Boolean','Date','RegExp','Promise','Set','Map','WeakSet','WeakMap','Error',
]);

function byteSize(text) {
  return new Blob([text]).size;
}

function stripComments(code, keepLicense) {
  let out = '';
  let state = 'code';
  for (let i = 0; i < code.length; i += 1) {
    const c = code[i];
    const n = code[i + 1];
    const p = code[i - 1];

    if (state === 'code') {
      if (c === '"' || c === "'" || c === '`') {
        state = c;
        out += c;
      } else if (c === '/' && n === '/') {
        const end = code.indexOf('\n', i + 2);
        const comment = code.slice(i, end === -1 ? code.length : end);
        if (keepLicense && /^\/\/[!@]/.test(comment)) out += comment;
        if (end !== -1) out += '\n';
        i = end === -1 ? code.length : end;
      } else if (c === '/' && n === '*') {
        const end = code.indexOf('*/', i + 2);
        const comment = code.slice(i, end === -1 ? code.length : end + 2);
        if (keepLicense && /^\/\*[!@]/.test(comment)) out += comment;
        i = end === -1 ? code.length : end + 1;
      } else {
        out += c;
      }
    } else {
      out += c;
      if (c === '\\') {
        out += n || '';
        i += 1;
      } else if (state === '`' && c === '$' && n === '{') {
        out += n;
        i += 1;
      } else if (c === state && p !== '\\') {
        state = 'code';
      }
    }
  }
  return out;
}

function collapseWhitespace(code) {
  let out = '';
  let state = 'code';
  let pendingSpace = false;
  const needsSpace = (a, b) => /[\w$]/.test(a || '') && /[\w$]/.test(b || '');

  for (let i = 0; i < code.length; i += 1) {
    const c = code[i];
    const n = code[i + 1];
    const last = out[out.length - 1] || '';

    if (state === 'code') {
      if (c === '"' || c === "'" || c === '`') {
        if (pendingSpace && needsSpace(last, c)) out += ' ';
        pendingSpace = false;
        state = c;
        out += c;
      } else if (/\s/.test(c)) {
        pendingSpace = true;
      } else if ('{}[]();,:+-*/%<>=!&|?~^'.includes(c)) {
        pendingSpace = false;
        out = out.replace(/[ \t]+$/g, '');
        out += c;
      } else {
        if (pendingSpace && needsSpace(last, c)) out += ' ';
        pendingSpace = false;
        out += c;
      }
    } else {
      out += c;
      if (c === '\\') {
        out += n || '';
        i += 1;
      } else if (c === state) {
        state = 'code';
      }
    }
  }
  return out.trim();
}

function mangleIdentifiers(code) {
  const names = Array.from(new Set((code.match(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)/g) || [])
    .map(match => match.replace(/\b(?:const|let|var)\s+/, ''))
    .filter(name => name.length > 2 && !RESERVED.has(name))));
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = code;
  names.slice(0, alphabet.length).forEach((name, index) => {
    const next = alphabet[index];
    result = result.replace(new RegExp(`\\b${name}\\b`, 'g'), next);
  });
  return result;
}

function beautifyJs(code) {
  let depth = 0;
  return code
    .replace(/([{};])/g, '$1\n')
    .replace(/\n+/g, '\n')
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('}')) depth = Math.max(0, depth - 1);
      const out = '  '.repeat(depth) + trimmed;
      if (trimmed.endsWith('{')) depth += 1;
      return out;
    })
    .join('\n')
    .trim();
}

function processJavaScript(code, opts) {
  let output = code;
  if (opts.removeComments) output = stripComments(output, opts.keepLicense);
  if (opts.wrapIife) output = `(function(){\n${output}\n})();`;
  if (opts.useStrict && !/^\s*['"]use strict['"]/.test(output)) output = `'use strict';\n${output}`;
  output = collapseWhitespace(output);
  if (opts.removeSemicolons) output = output.replace(/;(?=[}\n]|$)/g, '');
  if (opts.mangle) output = mangleIdentifiers(output);
  return output;
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: 'text/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function JavascriptMinifierTool() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [files, setFiles] = useState([]);
  const [removeComments, setRemoveComments] = useState(true);
  const [keepLicense, setKeepLicense] = useState(true);
  const [removeSemicolons, setRemoveSemicolons] = useState(false);
  const [mangle, setMangle] = useState(false);
  const [wrapIife, setWrapIife] = useState(false);
  const [useStrict, setUseStrict] = useState(false);
  const [separator, setSeparator] = useState('\\n;\\n');
  const [copied, setCopied] = useState(false);

  const combinedInput = useMemo(() => {
    const parts = files.length ? files.map(file => file.content) : [input];
    return parts.join(separator.replace(/\\n/g, '\n'));
  }, [files, input, separator]);

  const editorInput = files.length ? combinedInput : input;

  const stats = useMemo(() => {
    const before = byteSize(combinedInput);
    const after = output ? byteSize(output) : 0;
    const saved = before && after ? Math.max(0, before - after) : 0;
    return { before, after, saved, pct: before ? saved / before * 100 : 0 };
  }, [combinedInput, output]);

  async function uploadFiles(event) {
    const selected = Array.from(event.target.files || []);
    const loaded = await Promise.all(selected.map(async file => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
      name: file.name,
      content: await file.text(),
      size: file.size,
    })));
    setFiles(current => [...current, ...loaded]);
    if (loaded.length) {
      setInput('');
      setOutput('');
      setCopied(false);
    }
    event.target.value = '';
  }

  function runMinify() {
    setOutput(processJavaScript(combinedInput, { removeComments, keepLicense, removeSemicolons, mangle, wrapIife, useStrict }));
    setCopied(false);
  }

  function clearFiles() {
    setFiles([]);
    setInput('');
    setOutput('');
    setCopied(false);
  }

  function removeFile(id) {
    setFiles(current => current.filter(file => file.id !== id));
    setOutput('');
    setCopied(false);
  }

  function moveFile(id, direction) {
    setFiles(current => {
      const index = current.findIndex(file => file.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
    setOutput('');
    setCopied(false);
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className={s.wrap}>
      <DevConvertersTopNav active="javascript-minifier" />
      <PlaygroundTopAd />
      <div className={s.header}>
        <div className={s.logo}>
          <span className={s.logoIcon}>JS</span>
          <span>JavaScript <span className={s.accent}>Minifier</span></span>
        </div>
        <div className={s.headerRight}>
          <span className={s.hint}>Concatenate, minify, uglify, compress</span>
          <button className={s.ghostBtn} onClick={() => setInput(SAMPLE)}>Sample</button>
          <button className={s.ghostBtn} onClick={clearFiles}>Clear</button>
          <button className={s.ghostBtn} onClick={() => setOutput(beautifyJs(output || combinedInput))}>{output ? 'Beautify output' : 'Beautify input'}</button>
          <button className={s.ghostBtn} onClick={copyOutput} disabled={!output}>{copied ? 'Copied' : 'Copy'}</button>
          <button className={s.ghostBtn} onClick={() => downloadText(output, 'script.min.js')} disabled={!output}>Download</button>
          <button className={s.primaryBtn} onClick={runMinify}>Compress JS</button>
        </div>
      </div>

      <div className={s.body}>
        <aside className={s.sidebar}>
          <section className={s.panel}>
            <h2>Compression Options</h2>
            <label className={s.check}><input type="checkbox" checked={removeComments} onChange={e => setRemoveComments(e.target.checked)} /> Remove comments</label>
            <label className={s.check}><input type="checkbox" checked={keepLicense} onChange={e => setKeepLicense(e.target.checked)} /> Keep license comments</label>
            <label className={s.check}><input type="checkbox" checked={removeSemicolons} onChange={e => setRemoveSemicolons(e.target.checked)} /> Remove optional semicolons</label>
            <label className={s.check}><input type="checkbox" checked={mangle} onChange={e => setMangle(e.target.checked)} /> Uglify local variable names</label>
            <label className={s.check}><input type="checkbox" checked={wrapIife} onChange={e => setWrapIife(e.target.checked)} /> Wrap in IIFE</label>
            <label className={s.check}><input type="checkbox" checked={useStrict} onChange={e => setUseStrict(e.target.checked)} /> Add use strict</label>
            <label className={s.field}>
              <span>File separator</span>
              <input value={separator} onChange={e => setSeparator(e.target.value)} />
            </label>
          </section>

          <section className={s.panel}>
            <h2>Stats</h2>
            <div className={s.stats}>
              <div><span>Input</span><strong>{stats.before.toLocaleString()} B</strong></div>
              <div><span>Output</span><strong>{stats.after.toLocaleString()} B</strong></div>
              <div><span>Saved</span><strong>{stats.saved.toLocaleString()} B</strong></div>
              <div><span>Reduction</span><strong>{stats.pct.toFixed(1)}%</strong></div>
            </div>
          </section>

          {!!files.length && (
            <section className={s.panel}>
              <div className={s.panelHead}>
                <h2>File Order</h2>
                <span>{files.length} selected</span>
              </div>
              <div className={s.fileList}>
                {files.map((file, index) => (
                  <div className={s.fileItem} key={file.id}>
                    <div className={s.fileMeta}>
                      <strong>{index + 1}. {file.name}</strong>
                      <span>{file.size.toLocaleString()} B</span>
                    </div>
                    <div className={s.fileActions}>
                      <button type="button" onClick={() => moveFile(file.id, -1)} disabled={index === 0} title="Move up">↑</button>
                      <button type="button" onClick={() => moveFile(file.id, 1)} disabled={index === files.length - 1} title="Move down">↓</button>
                      <button type="button" onClick={() => removeFile(file.id)} title="Remove file">×</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className={s.panel}>
            <h2>JavaScript Files</h2>
            <p className={s.helpText}>Upload one or more files, then reorder them before compressing. Files are concatenated from top to bottom.</p>
            <label className={s.uploadBtnWide}>
              {files.length ? 'Add more JS files' : 'Upload JS files'}
              <input type="file" accept=".js,.mjs,.cjs,text/javascript" multiple onChange={uploadFiles} />
            </label>
          </section>
        </aside>

        <main className={s.workspace}>
          <section className={s.editorPanel}>
            <div className={s.editorHead}><h2>Input JavaScript</h2><span>{stats.before.toLocaleString()} bytes</span></div>
            <textarea className={s.editor} value={editorInput} onChange={e => { setInput(e.target.value); setFiles([]); setOutput(''); }} spellCheck="false" />
          </section>
          <section className={s.editorPanel}>
            <div className={s.editorHead}><h2>Compressed Output</h2><span>{output ? `${stats.after.toLocaleString()} bytes` : 'waiting'}</span></div>
            <textarea className={s.editor} value={output} onChange={e => setOutput(e.target.value)} spellCheck="false" placeholder="Click Compress JS to generate minified output." />
          </section>
        </main>
      </div>
    </div>
  );
}
