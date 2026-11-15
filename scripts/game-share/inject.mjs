/* Appends (or refreshes) the shared "Share result" module in every game snippet's JS.
   Usage:  node scripts/game-share/inject.mjs            -> inject all games
           node scripts/game-share/inject.mjs --check    -> only report what would change
   Games = PATREON_GAME_IDS in src/lib/patreon-settings.js. pocket-artillery-game has its own custom share code and is skipped. */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const snipDir = path.join(root, 'src', 'components', 'UiSnippetsTool', 'snippets');
const check = process.argv.includes('--check');
const SKIP = new Set(['pocket-artillery-game']);
const START = '/* wdp-share:start */', END = '/* wdp-share:end */';

const settings = fs.readFileSync(path.join(root, 'src', 'lib', 'patreon-settings.js'), 'utf8');
const ids = [...settings.match(/PATREON_GAME_IDS\s*=\s*\[([\s\S]*?)\]/)[1].matchAll(/'([^']+)'/g)].map(m => m[1]);

let src = fs.readFileSync(path.join(root, 'scripts', 'game-share', 'share-module.src.js'), 'utf8');
src = src.replace(/^\s*\/\*[\s\S]*?\*\/\s*/, ''); // drop the header comment

const toTemplate = s => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const toStr = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wdp-share-'));
let done = 0, failed = [];
for (const id of ids) {
  if (SKIP.has(id)) continue;
  const file = path.join(snipDir, id + '.js');
  let text = fs.readFileSync(file, 'utf8');
  try {
    // title comes from the real module, so escapes are handled correctly
    const tmpFile = path.join(tmp, id + '.mjs');
    fs.writeFileSync(tmpFile, text);
    const mod = (await import(pathToFileURL(tmpFile).href)).default;
    const block = START + '\n' + toTemplate(
      src.replace('__TITLE__', toStr(mod.title)).replace('__URL__', 'https://webdevpuneet.com/ui-snippets/' + id + '/')
    ).trim() + '\n' + END;

    const s0 = text.indexOf('\n  js: `');
    if (s0 < 0) throw new Error('no js template');
    let i = s0 + '\n  js: `'.length, end = -1;
    while (i < text.length) {
      if (text[i] === '\\') { i += 2; continue; }
      if (text[i] === '`') { end = i; break; }
      i++;
    }
    if (end < 0) throw new Error('js template not closed');
    let body = text.slice(s0 + '\n  js: `'.length, end);
    const a = body.indexOf(START), b = body.indexOf(END);
    if (a >= 0 && b > a) body = body.slice(0, a).replace(/\s+$/, '') + body.slice(b + END.length);
    body = body.replace(/\s+$/, '') + '\n\n' + block;
    const out = text.slice(0, s0 + '\n  js: `'.length) + body + text.slice(end);
    if (!check) fs.writeFileSync(file, out);
    done++;
  } catch (e) { failed.push(id + ': ' + e.message); }
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log((check ? 'Would update ' : 'Updated ') + done + ' games' + (failed.length ? '; failed: ' + failed.length : ''));
failed.forEach(f => console.log('  ' + f));
