// Uploads demos/website-templates to the webdevpuneet.com server (WinSCP + .vscode/sftp.json, the
// same connection scripts/deploy.js uses), to <remotePath>demos/website-templates/.
// It only adds and updates files (no -delete), and skips files whose size is unchanged.
//   node scripts/upload-demos.mjs --preview     list what would be uploaded, transfer nothing
//   node scripts/upload-demos.mjs               upload
// Make the demos first with: node scripts/export-website-demos.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const WINSCP = 'C:\\Program Files (x86)\\WinSCP\\WinSCP.com';
const preview = process.argv.includes('--preview');
const local = path.resolve('demos/website-templates');
if (!fs.existsSync(local)) { console.error('✗ demos/website-templates not found. Run scripts/export-website-demos.mjs first.'); process.exit(1); }

const cfg = JSON.parse(fs.readFileSync('.vscode/sftp.json', 'utf8'));
const base = cfg.remotePath === '/' ? '/' : cfg.remotePath.replace(/\/$/, '') + '/';
const remote = `${base}demos/website-templates`;
const esc = s => s.replace(/"/g, '""');

const script = [
  `open ftp://${cfg.host}:${cfg.port || 21}/ -username="${esc(cfg.username)}" -password="${esc(cfg.password)}"`,
  'option batch continue', // mkdir fails when the folder already exists
  'option confirm off',
  `mkdir "${remote.replace(/\/website-templates$/, '')}"`,
  `mkdir "${remote}"`,
  'option batch abort',
  `synchronize remote ${preview ? '-preview ' : ''}-criteria=size "${esc(local)}" "${esc(remote)}"`,
  'close',
  'exit',
].join('\n');

const file = path.join(os.tmpdir(), `winscp-demos-${Date.now()}.txt`);
fs.writeFileSync(file, script, 'utf8');
try {
  console.log(`${preview ? 'Previewing' : 'Uploading'} ${local} → ${cfg.host}${remote}`);
  execFileSync(WINSCP, [`/script=${file}`], { stdio: 'inherit' });
  console.log(preview ? '✓ Preview done (nothing was transferred)' : `✓ Uploaded. Demos are at https://webdevpuneet.com/demos/website-templates/<id>/one-page/ and /multi-page/`);
} finally {
  fs.rmSync(file, { force: true }); // it holds the password
}
