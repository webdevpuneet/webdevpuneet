'use client';

import { useMemo, useState } from 'react';
import s from '../SeoGeneratorTools.module.css';
import SeoMetaToolsTopNav from '@/components/SeoMetaToolsTopNav';

const PRESETS = {
  balanced: {
    csp: "default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self';",
    permissions: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
  strict: {
    csp: "default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
    permissions: 'accelerometer=(), autoplay=(), camera=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()',
  },
};

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function SecurityHeadersGeneratorTool() {
  const [hsts, setHsts] = useState(true);
  const [frame, setFrame] = useState('DENY');
  const [referrer, setReferrer] = useState('strict-origin-when-cross-origin');
  const [permissions, setPermissions] = useState('camera=(), microphone=(), geolocation=()');
  const [csp, setCsp] = useState("default-src 'self'; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline';");
  const [format, setFormat] = useState('apache');
  const [reportOnly, setReportOnly] = useState(false);
  const [copied, setCopied] = useState(false);

  const headers = useMemo(() => {
    const cspHeader = reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';
    const list = [
      ['X-Content-Type-Options', 'nosniff'],
      ['X-Frame-Options', frame],
      ['Referrer-Policy', referrer],
      ['Permissions-Policy', permissions],
      [cspHeader, csp],
    ];
    if (hsts) list.unshift(['Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload']);
    return list;
  }, [hsts, frame, referrer, permissions, csp, reportOnly]);

  const output = useMemo(() => {
    if (format === 'nginx') return headers.map(([key, value]) => `add_header ${key} "${value}" always;`).join('\n');
    if (format === 'next') return `async headers() {\n  return [{\n    source: '/(.*)',\n    headers: [\n${headers.map(([key, value]) => `      { key: '${key}', value: '${value.replace(/'/g, "\\'")}' },`).join('\n')}\n    ],\n  }];\n}`;
    return headers.map(([key, value]) => `Header always set ${key} "${value}"`).join('\n');
  }, [headers, format]);

  const hasUnsafeInline = csp.includes("'unsafe-inline'");
  const hasObjectNone = csp.includes("object-src 'none'");
  const hasFrameAncestors = csp.includes('frame-ancestors');

  function applyPreset(key) {
    setCsp(PRESETS[key].csp);
    setPermissions(PRESETS[key].permissions);
  }

  function copyOutput() {
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className={s.wrap} style={{ '--accent': '#ef4444' }}>
      <SeoMetaToolsTopNav active="security-headers-generator" />
      <div className={s.header}>
        <div className={s.logo}><span className={s.logoIcon}>S</span><span>Security Headers <span className={s.accent}>Generator</span></span></div>
        <span className={s.hint}>Apache, Nginx, Next.js</span>
      </div>
      <div className={s.body}>
        <section className={s.panel}>
          <div className={s.grid}>
            <label className={s.field}><span>Output format</span><select value={format} onChange={event => setFormat(event.target.value)}><option value="apache">Apache .htaccess</option><option value="nginx">Nginx</option><option value="next">Next.js</option></select></label>
            <label className={s.field}><span>X-Frame-Options</span><select value={frame} onChange={event => setFrame(event.target.value)}><option>DENY</option><option>SAMEORIGIN</option></select></label>
            <label className={s.field}><span>Referrer-Policy</span><input value={referrer} onChange={event => setReferrer(event.target.value)} /></label>
            <label className={s.check}><input type="checkbox" checked={hsts} onChange={event => setHsts(event.target.checked)} />Include HSTS</label>
            <label className={s.check}><input type="checkbox" checked={reportOnly} onChange={event => setReportOnly(event.target.checked)} />CSP report-only</label>
            <label className={s.field}><span>Permissions-Policy</span><textarea value={permissions} onChange={event => setPermissions(event.target.value)} /></label>
            <label className={s.field}><span>Content-Security-Policy</span><textarea value={csp} onChange={event => setCsp(event.target.value)} /></label>
          </div>
          <div className={s.actions} style={{ marginTop: 12 }}>
            <button onClick={() => applyPreset('balanced')}>Balanced preset</button>
            <button onClick={() => applyPreset('strict')}>Strict preset</button>
          </div>
        </section>
        <div className={s.stats}>
          <span className={s.pill}><strong>{headers.length}</strong> headers</span>
          <span className={s.pill}><strong>{hasUnsafeInline ? 'yes' : 'no'}</strong> unsafe-inline</span>
          <span className={s.pill}><strong>{hasObjectNone ? 'yes' : 'no'}</strong> object-src none</span>
          <span className={s.pill}><strong>{hasFrameAncestors ? 'yes' : 'no'}</strong> frame-ancestors</span>
        </div>
        <div className={s.notice}>Start with report-only CSP on production sites, review browser console violations, then switch to enforcing mode after third-party scripts and assets are accounted for.</div>
        <section className={s.outputPanel}>
          <div className={s.outputHeader}><span>Header config</span><div className={s.outputActions}><button onClick={copyOutput}>{copied ? 'Copied' : 'Copy'}</button><button onClick={() => downloadFile(`security-headers-${format}.txt`, output)}>Download</button></div></div>
          <textarea value={output} readOnly spellCheck={false} />
        </section>
      </div>
    </div>
  );
}
