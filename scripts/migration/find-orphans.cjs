// One-off migration helper: walks the import graph from src/app + scripts and
// lists src/components/* dirs and src/lib/* files that nothing reaches.
// Usage: node scripts/migration/find-orphans.cjs [--delete]
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const src = path.join(root, 'src');
const EXTS = ['', '.js', '.jsx', '.mjs', '.cjs', '.json', '/index.js', '/index.jsx'];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(m?js|jsx|cjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

function resolve(from, spec) {
  let base;
  if (spec.startsWith('@/')) base = path.join(src, spec.slice(2));
  else if (spec.startsWith('.')) base = path.resolve(path.dirname(from), spec);
  else return null;
  for (const ext of EXTS) {
    const p = base + ext;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return path.normalize(p);
  }
  return null;
}

const entries = [
  ...walk(path.join(src, 'app')),
  ...walk(path.join(root, 'scripts')).filter(f => !f.includes(`${path.sep}migration${path.sep}`)),
];
const seen = new Set();
const stack = [...entries];
const re = /(?:import|export)[^'"`]*?from\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)|require\(\s*['"]([^'"]+)['"]\s*\)|^\s*import\s*['"]([^'"]+)['"]/gm;
while (stack.length) {
  const f = stack.pop();
  if (seen.has(f)) continue;
  seen.add(f);
  if (!/\.(m?js|jsx|cjs)$/.test(f)) continue;
  const code = fs.readFileSync(f, 'utf8');
  for (const m of code.matchAll(re)) {
    const r = resolve(f, m[1] || m[2] || m[3] || m[4]);
    if (r && !seen.has(r)) stack.push(r);
  }
}

const compDir = path.join(src, 'components');
const orphanComps = fs.readdirSync(compDir).filter(name => {
  const p = path.join(compDir, name);
  if (fs.statSync(p).isDirectory()) return !walk(p).some(f => seen.has(f));
  return /\.(m?js|jsx)$/.test(name) && !seen.has(p);
});
const orphanLib = fs.readdirSync(path.join(src, 'lib')).filter(n => !seen.has(path.join(src, 'lib', n)));

console.log(JSON.stringify({ orphanComponents: orphanComps, orphanLib }, null, 2));
if (process.argv.includes('--delete')) {
  for (const n of orphanComps) fs.rmSync(path.join(compDir, n), { recursive: true, force: true });
  for (const n of orphanLib) fs.rmSync(path.join(src, 'lib', n), { force: true });
  console.log(`Deleted ${orphanComps.length} components, ${orphanLib.length} lib files`);
}
