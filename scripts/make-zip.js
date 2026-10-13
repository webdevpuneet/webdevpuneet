import fs        from 'fs';
import path      from 'path';
import { execFileSync } from 'child_process';

// Windows' built-in bsdtar (tar.exe, Windows 10+) writes a real .zip with -a.
// PowerShell's Compress-Archive used to hang indefinitely on this ~14k-file tree.
// Entries are listed explicitly (cwd = out/) so the zip holds out/'s contents at
// its root — same layout as before, extracted in place on the server.
const TAR = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');

if (fs.existsSync('tools.zip')) fs.rmSync('tools.zip');
execFileSync(TAR, ['-a', '-c', '-f', path.resolve('tools.zip'), ...fs.readdirSync('out')], { cwd: 'out', stdio: 'inherit' });
console.log('✓ tools.zip created');
