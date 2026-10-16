'use client';

import { useMemo } from 'react';
import s from './styles.module.css';
import { FONTS, plainText, rgba } from './engine';
import { formatOf } from './utils';

const attr = v => String(v || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const domainOf = site => (site || 'yoursite.com').trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'yoursite.com';

// "Build *beautiful* images" -> [{ text, hi }] per word, for the JSX output
function titleWords(title) {
  const out = [];
  let hi = false;
  String(title || '').split(/(\*)/).forEach(part => {
    if (part === '*') { hi = !hi; return; }
    part.split(/\s+/).filter(Boolean).forEach(w => out.push({ text: w, hi }));
  });
  return out;
}

function metaTags(opts, size, fileName) {
  const domain = domainOf(opts.site);
  const title = plainText(opts.title);
  const desc = plainText(opts.description);
  const img = `https://${domain}/images/${fileName}`;
  const lines = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="https://${attr(domain)}/" />`,
    `<meta property="og:title" content="${attr(title)}" />`,
    desc && `<meta property="og:description" content="${attr(desc)}" />`,
    opts.site && `<meta property="og:site_name" content="${attr(opts.site.trim())}" />`,
    `<meta property="og:image" content="${attr(img)}" />`,
    `<meta property="og:image:width" content="${size.w}" />`,
    `<meta property="og:image:height" content="${size.h}" />`,
    `<meta property="og:image:type" content="${formatOf(opts.format).mime}" />`,
    `<meta property="og:image:alt" content="${attr(title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(title)}" />`,
    desc && `<meta name="twitter:description" content="${attr(desc)}" />`,
    `<meta name="twitter:image" content="${attr(img)}" />`,
  ];
  return lines.filter(Boolean).join('\n');
}

function nextCode(opts, size) {
  const font = id => FONTS.find(f => f.id === id) || FONTS[0];
  const hf = font(opts.headingFont), bf = font(opts.bodyFont);
  const centered = ['centered', 'framed'].includes(opts.template);
  const desc = plainText(opts.description);
  const eyebrow = plainText(opts.eyebrow).trim();
  const site = (opts.site || '').trim();

  const background = opts.bgStyle === 'gradient'
    ? `backgroundImage: 'linear-gradient(${opts.gradAngle}deg, ${opts.bg1}, ${opts.bg2})',`
    : opts.bgStyle === 'mesh'
      ? `backgroundColor: '${opts.bg1}',\n          backgroundImage: 'radial-gradient(circle at 12% 15%, ${rgba(opts.bg2, 0.95)} 0%, transparent 60%), radial-gradient(circle at 90% 25%, ${rgba(opts.accentColor, 0.7)} 0%, transparent 50%), radial-gradient(circle at 65% 100%, ${rgba(opts.bg2, 0.75)} 0%, transparent 55%)',`
      : `backgroundColor: '${opts.bg1}',`;

  const fonts = [];
  if (hf.family) fonts.push(`{ name: 'Heading', data: await loadGoogleFont('${hf.family}', ${hf.weights.includes(800) ? 800 : hf.weights[hf.weights.length - 1]}, text), weight: ${hf.weights.includes(800) ? 800 : hf.weights[hf.weights.length - 1]}, style: 'normal' }`);
  if (bf.family) fonts.push(`{ name: 'Body', data: await loadGoogleFont('${bf.family}', 400, text), weight: 400, style: 'normal' }`);
  const usesFonts = fonts.length > 0;

  return `// app/opengraph-image.tsx — Next.js App Router (next/og)
// Starter generated from your design: text, colours, fonts and background.
// Template decorations (bars, panels, cards) and uploaded images are not included.
import { ImageResponse } from 'next/og';

export const alt = ${JSON.stringify(plainText(opts.title))};
export const size = { width: ${size.w}, height: ${size.h} };
export const contentType = 'image/png';
${usesFonts ? `
// Loads one Google Font weight, subset to the characters actually used
async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = \`https://fonts.googleapis.com/css2?family=\${family.replace(/ /g, '+')}:wght@\${weight}&text=\${encodeURIComponent(text)}\`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\\((.+)\\) format\\('(opentype|truetype)'\\)/);
  if (!resource) throw new Error(\`Failed to load \${family}\`);
  return (await fetch(resource[1])).arrayBuffer();
}
` : ''}
const eyebrow = ${JSON.stringify(eyebrow)};
const title = ${JSON.stringify(titleWords(opts.title))};
const description = ${JSON.stringify(desc)};
const site = ${JSON.stringify(site)};

export default async function Image() {
${usesFonts ? `  const text = [eyebrow.toUpperCase(), ...title.map(w => w.text), description, site].join(' ');\n` : ''}  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: '${centered ? 'center' : 'flex-start'}',
          padding: '80px 80px 136px',
          ${background}
          color: '${opts.textColor}',${hf.family ? `\n          fontFamily: 'Heading',` : ''}
        }}
      >
        {eyebrow && (
          <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '${opts.accentColor}', marginBottom: 26${bf.family ? `, fontFamily: 'Body'` : ''} }}>
            {eyebrow}
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: '${centered ? 'center' : 'flex-start'}', fontSize: ${opts.titleSize}, fontWeight: 800, lineHeight: 1.14 }}>
          {title.map((w, i) => (
            <span key={i} style={{ marginRight: '0.25em', color: w.hi ? '${opts.accentColor}' : undefined }}>{w.text}</span>
          ))}
        </div>
        {description && (
          <div style={{ marginTop: 30, fontSize: 32, lineHeight: 1.45, color: '${rgba(opts.textColor, 0.78)}', textAlign: '${centered ? 'center' : 'left'}'${bf.family ? `, fontFamily: 'Body'` : ''} }}>
            {description}
          </div>
        )}
        {site && (
          <div style={{ position: 'absolute', bottom: 56, ${centered ? `left: 0, right: 0, display: 'flex', justifyContent: 'center'` : 'left: 80'}, fontSize: 26, fontWeight: 600, color: '${opts.accentColor}'${bf.family ? `, fontFamily: 'Body'` : ''} }}>
            {site}
          </div>
        )}
      </div>
    ),
    {
      ...size,${usesFonts ? `\n      fonts: [\n        ${fonts.join(',\n        ')},\n      ],` : ''}
    }
  );
}
`;
}

export default function CodePanel({ opts, size, fileName, onToast }) {
  const tags = useMemo(() => metaTags(opts, size, fileName), [opts, size, fileName]);
  const tsx = useMemo(() => nextCode(opts, size), [opts, size]);
  const copy = async (text, what) => {
    try { await navigator.clipboard.writeText(text); onToast(`${what} copied`); }
    catch { onToast('Copy failed: select the text and copy it manually'); }
  };

  return (
    <div className={s.panelPane}>
      <h3 className={s.paneTitle}>Meta tags</h3>
      <p className={s.paneText}>
        Paste into your page&rsquo;s <code>&lt;head&gt;</code>. Upload the image first and change the
        <code>og:image</code> URL if you host it somewhere other than <code>/images/</code>.
      </p>
      <div className={s.codeBlock}>
        <button type="button" className={s.codeCopy} onClick={() => copy(tags, 'Meta tags')}>Copy</button>
        <pre><code>{tags}</code></pre>
      </div>

      <h3 className={s.paneTitle}>Next.js <code>opengraph-image.tsx</code></h3>
      <p className={s.paneText}>
        Generates the image at build or request time with <code>next/og</code>, so every page can get its own.
        This starter uses your text, colours, fonts and background in a {['centered', 'framed'].includes(opts.template) ? 'centred' : 'left-aligned'} layout.
        Template decorations and uploaded images aren&rsquo;t included, so for a pixel-exact match, download the PNG instead.
      </p>
      <div className={s.codeBlock}>
        <button type="button" className={s.codeCopy} onClick={() => copy(tsx, 'Next.js code')}>Copy</button>
        <pre><code>{tsx}</code></pre>
      </div>
    </div>
  );
}
