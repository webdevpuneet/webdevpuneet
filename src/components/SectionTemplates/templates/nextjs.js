/* Website → Next.js project (App Router), for the Website Builder's "Download Next.js site".

   Built from the static-site files (siteFiles in site.js, after the caller has copied images
   into assets/), so every page is exactly what the HTML export produces:
     app/layout.jsx           fonts, GSAP and the site script (next/script), shared by all pages
     app/globals.css          styles.css
     app/page.jsx             the home page; app/<slug>/page.jsx for the others
     public/site.js           script.js (menus, sliders, FAQ, pricing switch, animations)
     public/assets/…          images (the caller writes them)
     public/favicon.*, sitemap.xml, robots.txt, llms.txt
   Each page is a server component that renders its HTML with dangerouslySetInnerHTML. That
   keeps the markup byte-for-byte (no HTML-to-JSX rewriting that text with { } or SVG
   attributes could break) and the HTML is in the server response, so SEO is unchanged.
   Links between pages are plain <a href="/about/"> (a full page load), so site.js runs on
   every page as it does in the static export. next.config.mjs uses output: 'export', so
   `npm run build` writes a static out/ folder for any host; remove it to deploy on a server.

   Plain JS (no React, no DOM), so it runs in Node tests and in the browser. */
import { pageFile, isHomePage, cleanBaseUrl, siteExtraFiles, faviconFiles } from './site.js';

export const NEXT_DEPENDENCIES = { next: '15.3.3', react: '19.1.0', 'react-dom': '19.1.0' };

/** A page's route path: '' for home, 'about/' otherwise (trailingSlash: true) */
export const nextPath = (site, p) => (isHomePage(site, p) ? '' : `${p.slug}/`);

const between = (s, a, b) => { const i = s.indexOf(a); if (i < 0) return ''; const j = s.indexOf(b, i + a.length); return j < 0 ? '' : s.slice(i + a.length, j); };
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1] || '';
const unesc = v => v.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const js = v => JSON.stringify(v);

/**
 * @param site   the site (site.js)
 * @param files  [{ path, content }] from siteFiles(), images already pointing at assets/…
 * @returns [{ path, content, base64? }] relative to the project folder
 */
export function siteNextFiles(site, files) {
  const byPath = Object.fromEntries(files.map(f => [f.path, f.content]));
  const routeOf = Object.fromEntries(site.pages.map(p => [pageFile(site, p), `/${nextPath(site, p)}`]));
  // Links to other pages (about.html#team → /about/#team), and images from the site root
  const fixLinks = html => html
    .replace(/\bhref="([\w-]+\.html)(#[\w-]*)?"/g, (m, file, hash = '') => (routeOf[file] ? `href="${routeOf[file]}${hash}"` : m))
    .replace(/(["'(\s,])assets\//g, '$1/assets/');

  const first = byPath[pageFile(site, site.pages[0])] || '';
  const head = between(first, '<head>', '</head>');
  const fontLinks = [...head.matchAll(/<link[^>]+fonts\.googleapis\.com\/css[^>]*>/g)].map(m => unesc(attr(m[0], 'href')));
  const scripts = [...first.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
  const cdn = scripts.filter(u => /^https:\/\//.test(u));
  const hasScript = !!byPath['script.js'];
  const base = cleanBaseUrl(site.url);
  const fav = faviconFiles(site)[0];

  const out = [];
  out.push({ path: 'package.json', content: `${JSON.stringify({ name: String(site.name || 'website').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'website', version: '1.0.0', private: true, scripts: { dev: 'next dev', build: 'next build', start: 'next start' }, dependencies: NEXT_DEPENDENCIES }, null, 2)}\n` });
  out.push({ path: 'next.config.mjs', content: `// Static export: \`npm run build\` writes out/ for any static host (Netlify, GitHub Pages, Cloudflare Pages…).
// Remove \`output\` to run it on a Node server or Vercel with server features.
/** @type {import('next').NextConfig} */
const nextConfig = { output: 'export', trailingSlash: true, images: { unoptimized: true } };
export default nextConfig;
` });
  out.push({ path: '.gitignore', content: 'node_modules\n.next\nout\n' });
  out.push({ path: 'jsconfig.json', content: `${JSON.stringify({ compilerOptions: { baseUrl: '.' } }, null, 2)}\n` });
  out.push({ path: 'app/globals.css', content: fixLinks(byPath['styles.css'] || '') });

  const icon = fav ? (fav.path.endsWith('.png') ? `\n  icons: { icon: '/favicon.png', apple: '/favicon.png' },` : `\n  icons: { icon: '/favicon.svg' },`) : '';
  out.push({ path: 'app/layout.jsx', content: `import Script from 'next/script';
import './globals.css';

export const metadata = {${base ? `\n  metadataBase: new URL(${js(base)}),` : ''}
  title: ${js(site.name || 'Website')},${icon}
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
${fontLinks.length ? `        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
${fontLinks.map(u => `        <link rel="stylesheet" href=${js(u)} />`).join('\n')}
` : ''}      </head>
      <body>
        {children}
${cdn.map(u => `        <Script src=${js(u)} strategy="beforeInteractive" />`).join('\n')}${hasScript ? `\n        <Script src="/site.js" strategy="afterInteractive" />` : ''}
      </body>
    </html>
  );
}
` });

  for (const p of site.pages) {
    const doc = byPath[pageFile(site, p)] || '';
    const h = between(doc, '<head>', '</head>');
    const title = unesc((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || p.name);
    const description = unesc(attr((h.match(/<meta name="description"[^>]*>/) || [''])[0], 'content'));
    const ld = (h.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || []).join('\n');
    const bi = doc.indexOf('<body');
    let body = bi < 0 ? '' : doc.slice(doc.indexOf('>', bi) + 1, doc.lastIndexOf('</body>'));
    body = body.replace(/\s*<script src="[^"]*"><\/script>/g, '').trim();
    const html = fixLinks(`${ld}${ld ? '\n' : ''}${body}`);
    const route = nextPath(site, p);
    out.push({ path: `app/${route}page.jsx`, content: `// ${p.name}${isHomePage(site, p) ? ' (home page)' : ''}: the page's HTML, exactly as the Website Builder exports it.
// Edit the HTML below, or turn parts of it into React components as your site grows.

export const metadata = {
  title: { absolute: ${js(title)} },${description ? `\n  description: ${js(description)},` : ''}${base ? `\n  alternates: { canonical: ${js(`/${route}`)} },` : ''}
};

const html = ${js(html)};

export default function Page() {
  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />;
}
` });
  }

  if (hasScript) out.push({ path: 'public/site.js', content: byPath['script.js'] });
  if (fav) out.push({ ...fav, path: `public/${fav.path}` });
  for (const f of siteExtraFiles(site, { pathOf: nextPath })) out.push({ ...f, path: `public/${f.path}` });

  out.push({ path: 'README.md', content: `# ${site.name || 'Website'}

A Next.js (App Router) project made with the free Website Builder: https://webdevpuneet.com/website-builder/

## Run it

\`\`\`bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
\`\`\`

## What's inside

| Path | What |
| --- | --- |
${site.pages.map(p => `| \`app/${nextPath(site, p)}page.jsx\` | ${p.name}${isHomePage(site, p) ? ' (home page)' : ''}: \`/${nextPath(site, p)}\` |`).join('\n')}
| \`app/layout.jsx\` | Fonts, GSAP and \`site.js\`, shared by every page |
| \`app/globals.css\` | Every page's CSS. Colours, fonts and sizes are CSS variables at the top (\`--st-brand\` …) |
${hasScript ? '| `public/site.js` | Menus, sliders, FAQ, pricing switch and animations |\n' : ''}| \`public/assets/\` | Images |
| \`public/llms.txt\` | The pages and their descriptions, for AI assistants |
${base ? '| `public/sitemap.xml`, `public/robots.txt` | For search engines |\n' : ''}
Each page renders its HTML from a server component, so it is in the page source for search engines. Links between pages are plain \`<a>\` tags, so \`site.js\` runs on every page load.
${base ? '' : '\nTip: set the site address in the builder’s Pages tab and export again to get canonical links, sitemap.xml and robots.txt.\n'}` });
  return out;
}
