// Sets the Patreon supporter passcode: writes its hash into src/lib/patreon-settings.js.
//   node scripts/set-patreon-passcode.mjs your-new-passcode
// Then deploy, and post the new passcode in the supporter post on Patreon. The old passcode stops working with the new build.
// The passcode is not case-sensitive and is never stored, only its hash. (Same salt as src/lib/premium.js.)
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const code = process.argv.slice(2).join(' ').trim();
if (!code) {
  console.error('Usage: node scripts/set-patreon-passcode.mjs your-new-passcode');
  process.exit(1);
}
if (code.length < 8) { console.error('✗ Use at least 8 characters, so it cannot be guessed.'); process.exit(1); }

const hash = createHash('sha256').update(`webdevpuneet-premium:${code.toLowerCase()}`).digest('hex');
const file = path.resolve('src/lib/patreon-settings.js');
const src = await readFile(file, 'utf8');
const re = /(export const PASSCODE_SHA256 = ')[0-9a-f]{64}(';)/;
if (!re.test(src)) { console.error('✗ PASSCODE_SHA256 not found in src/lib/patreon-settings.js'); process.exit(1); }
await writeFile(file, src.replace(re, `$1${hash}$2`));
console.log(`✓ New passcode "${code}" set (hash ${hash.slice(0, 12)}…).`);
console.log('  Next: deploy, then post the passcode in the supporter post on Patreon.');
