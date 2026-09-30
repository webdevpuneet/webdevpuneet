import fs from 'fs';
import os from 'os';
import path from 'path';
import { execSync, execFileSync } from 'child_process';

// Disabled until the new webdevpuneet.com server details are provided. To enable:
// create .vscode/sftp.json for the NEW server (never copy the fwdtools one) and
// flip DEPLOY_ENABLED to true.
const DEPLOY_ENABLED = false;
if (!DEPLOY_ENABLED) {
  console.log('Deploy is disabled for webdevpuneet.com (see DEPLOY_ENABLED in scripts/deploy.js).');
  process.exit(0);
}

const WINSCP = 'C:\\Program Files (x86)\\WinSCP\\WinSCP.com';

const cfg = JSON.parse(fs.readFileSync('.vscode/sftp.json', 'utf8'));
const remotePath = cfg.remotePath === '/' ? '/' : cfg.remotePath.replace(/\/$/, '') + '/';

// Use -username/-password switches (not embedded in the URL) to avoid special
// characters in the password breaking WinSCP's URL parser.
const esc = s => s.replace(/"/g, '""');
const tmp = f => path.join(os.tmpdir(), f);

/** Run one WinSCP session made of the given commands. */
function winscp(commands, label) {
  const script = [
    `open ftp://${cfg.host}:${cfg.port || 21}/ -username="${esc(cfg.username)}" -password="${esc(cfg.password)}"`,
    ...commands,
    'close',
    'exit',
  ].join('\n');
  const scriptPath = tmp(`winscp-${label}-${Date.now()}.txt`);
  fs.writeFileSync(scriptPath, script, 'utf8');
  try {
    execFileSync(WINSCP, [`/script=${scriptPath}`], { stdio: 'inherit' });
  } finally {
    fs.rmSync(scriptPath, { force: true });
  }
}

/* ── 1. Build ─────────────────────────────────────────────────────────────── */
// npm is npm.cmd on Windows, so it needs a shell — hence execSync, not execFileSync.
console.log('→ Building...');
execSync('npm run build', { stdio: 'inherit' });

/* ── 2. Zip ───────────────────────────────────────────────────────────────── */
console.log('→ Zipping...');
execSync('npm run make-zip', { stdio: 'inherit' });

if (!fs.existsSync('tools.zip')) {
  console.error('✗ tools.zip not found after make-zip');
  process.exit(1);
}

/* ── 3. Upload the zip ────────────────────────────────────── */
// The deploy deliberately stops after the upload: tools.zip is extracted by hand
// on the server. The previous PHP-extractor step reported success while actually
// overwriting only existing files and creating no new directories, which left the
// site serving a half-updated tree — extracting manually keeps that verifiable.
const sizeMb = (fs.statSync('tools.zip').size / 1024 / 1024).toFixed(1);
console.log(`→ Uploading tools.zip (${sizeMb} MB) to ${cfg.host}${remotePath}...`);

winscp([
  `put -transfer=binary "${esc(path.resolve('tools.zip'))}" "${esc(remotePath)}tools.zip"`,
], 'upload');

console.log('✓ Uploaded');
console.log(`
Next step (manual): extract ${remotePath}tools.zip on the server, overwriting existing files, then delete the zip.`);
