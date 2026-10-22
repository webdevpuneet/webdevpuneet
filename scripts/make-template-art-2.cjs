// Artwork for the wedding, hotel, salon and law firm website templates: scenes drawn as SVG
// and rendered with sharp (no text in any image), like scripts/make-template-art.cjs.
//   node scripts/make-template-art-2.cjs
const sharp = require('sharp');
const OUT = 'public/images/section-templates/';
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
const lin = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const rad = (id, inner, outer, op = 1) => `<radialGradient id="${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${inner}" stop-opacity="${op}"/><stop offset="1" stop-color="${outer}" stop-opacity="0"/></radialGradient>`;
const flower = (x, y, r, c) => [0, 72, 144, 216, 288].map(a => `<circle cx="${x + Math.cos(a * Math.PI / 180) * r * 0.55}" cy="${y + Math.sin(a * Math.PI / 180) * r * 0.55}" r="${r * 0.5}" fill="${c}"/>`).join('') + `<circle cx="${x}" cy="${y}" r="${r * 0.32}" fill="#fde68a"/>`;
const leaf = (x, y, a, c) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="9" fill="${c}" transform="rotate(${a} ${x} ${y})"/>`;

// 1. Wedding: a floral arch on a hill at golden hour
const W = 1920, H = 1080;
const archFlowers = [];
for (let i = 0; i <= 26; i++) {
  const t = Math.PI * (i / 26);
  const x = 960 - Math.cos(t) * 330, y = 760 - Math.sin(t) * 420;
  archFlowers.push(leaf(x - 18, y + 10, i * 13, '#6b8f5e'), flower(x, y, 26 + (i % 3) * 6, ['#f9a8d4', '#fbcfe8', '#fff7ed'][i % 3]));
}
const wedding = svg(W, H, `<defs>${lin('sky', [[0, '#fbcfa8'], [0.55, '#f9b4a7'], [1, '#f6e3c8']])}${rad('sun', '#fff7e0', '#fff7e0', 0.9)}</defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="1460" cy="420" r="300" fill="url(#sun)"/><circle cx="1460" cy="420" r="90" fill="#fff4dc"/>
  <path d="M0 720 C360 640 720 700 1080 660 S1700 620 1920 680 V1080 H0Z" fill="#c9b79c"/>
  <path d="M0 800 C420 740 860 790 1240 760 S1760 740 1920 770 V1080 H0Z" fill="#a8b88f"/>
  <path d="M0 880 C480 840 980 870 1400 850 S1820 840 1920 860 V1080 H0Z" fill="#8aa47a"/>
  <rect x="620" y="330" width="14" height="560" fill="#7c6a55"/><rect x="1286" y="330" width="14" height="560" fill="#7c6a55"/>
  <path d="M630 760 A330 420 0 0 1 1290 760" fill="none" stroke="#7c6a55" stroke-width="12"/>
  ${archFlowers.join('')}
  ${[[700, 900], [760, 930], [1180, 920], [1240, 900]].map(([x, y]) => flower(x, y, 34, '#fbcfe8')).join('')}
  <rect x="860" y="880" width="200" height="16" rx="8" fill="#efe4d2"/>`);

// 2. Wedding dinner: a long table with candles (story image)
const dinner = svg(1200, 900, `<defs>${lin('w', [[0, '#3b2a2a'], [1, '#1f1717']])}${rad('c', '#ffd8a0', '#ffd8a0', 0.6)}</defs>
  <rect width="1200" height="900" fill="url(#w)"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${i * 170 - 40} 0 q30 60 0 120 q-30 60 0 120" stroke="#fde68a" stroke-opacity=".25" stroke-width="3" fill="none"/><circle cx="${i * 170 - 40}" cy="${60 + (i % 3) * 40}" r="7" fill="#fff3c4"/>`).join('')}
  <path d="M60 560 L1140 560 L1080 700 L120 700Z" fill="#f5efe6"/>
  <rect x="120" y="700" width="960" height="30" fill="#e7dccb"/>
  ${[0, 1, 2, 3, 4, 5, 6].map(i => `<ellipse cx="${210 + i * 130}" cy="620" rx="44" ry="16" fill="#fff"/><ellipse cx="${210 + i * 130}" cy="618" rx="28" ry="9" fill="#efe7da"/>`).join('')}
  ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${275 + i * 130}" cy="520" r="90" fill="url(#c)"/><rect x="${269 + i * 130}" y="500" width="12" height="70" fill="#fff8ec"/><ellipse cx="${275 + i * 130}" cy="494" rx="6" ry="12" fill="#ffd27a"/>`).join('')}
  ${[0, 1, 2, 3, 4].map(i => flower(340 + i * 130, 575, 18, '#f9a8d4')).join('')}`);

// 3. Wedding party: string lights over a dance floor
const party = svg(1200, 900, `<defs>${lin('n', [[0, '#1e1b4b'], [1, '#312e81']])}</defs>
  <rect width="1200" height="900" fill="url(#n)"/>
  ${[0, 1, 2, 3].map(r => `<path d="M-20 ${120 + r * 90} Q600 ${260 + r * 90} 1220 ${120 + r * 90}" stroke="#a5b4fc" stroke-opacity=".35" stroke-width="2" fill="none"/>` + Array.from({ length: 18 }, (_, i) => { const t = i / 17, x = -20 + t * 1240, y = (1 - t) * (1 - t) * (120 + r * 90) + 2 * (1 - t) * t * (260 + r * 90) + t * t * (120 + r * 90); return `<circle cx="${x}" cy="${y + 8}" r="16" fill="#fde68a" opacity=".25"/><circle cx="${x}" cy="${y + 8}" r="6" fill="#fff7cc"/>`; }).join('')).join('')}
  <path d="M0 620 L1200 620 L1200 900 L0 900Z" fill="#1b1838"/>
  ${Array.from({ length: 7 }, (_, i) => `<path d="M${i * 200} 620 L${i * 200 + 100} 900" stroke="#4338ca" stroke-opacity=".5" stroke-width="2"/>`).join('')}
  <circle cx="600" cy="760" r="240" fill="#f9a8d4" opacity=".08"/>`);

// 4. Hotel: a boutique hotel at dusk with a pool
const hotel = svg(W, H, `<defs>${lin('s', [[0, '#1e3a5f'], [0.6, '#c2858a'], [1, '#f2c79b']])}${lin('p', [[0, '#5eead4'], [1, '#0f766e']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#s)"/>
  <circle cx="420" cy="360" r="60" fill="#fde7c6" opacity=".9"/>
  <rect x="560" y="300" width="900" height="460" fill="#efe6da"/>
  <rect x="540" y="280" width="940" height="34" fill="#3f3a36"/>
  ${[0, 1, 2].map(r => [0, 1, 2, 3, 4, 5].map(c => `<rect x="${610 + c * 140}" y="${340 + r * 130}" width="90" height="90" rx="4" fill="${(r + c) % 3 ? '#fbbf24' : '#7c6f64'}" opacity="${(r + c) % 3 ? 0.85 : 0.6}"/>`).join('')).join('')}
  ${[0, 1, 2, 3, 4, 5].map(c => `<rect x="${600 + c * 140}" y="${420 + 0}" width="110" height="10" fill="#3f3a36"/>`).join('')}
  <path d="M0 760 H1920 V1080 H0Z" fill="#d6c7b2"/>
  <path d="M420 820 H1500 L1560 1000 H360Z" fill="url(#p)"/>
  ${[0, 1, 2, 3, 4].map(i => `<path d="M${520 + i * 200} 880 q60 -14 120 0" stroke="#ccfbf1" stroke-width="5" fill="none" opacity=".6"/>`).join('')}
  ${[[200, 520], [1680, 500], [1800, 560]].map(([x, y]) => `<rect x="${x}" y="${y}" width="16" height="${780 - y}" rx="6" fill="#5b4636"/>` + [0, 50, 100, 150, 200, 250, 300].map(a => `<ellipse cx="${x + 8}" cy="${y}" rx="110" ry="24" fill="#2f5d47" transform="rotate(${a} ${x + 8} ${y})"/>`).join('')).join('')}`);

// 5. Hotel rooms (gallery cards, 900×1100): four interiors with different palettes
const room = (wall, floor, bed, accent, win) => svg(900, 1100, `<defs>${lin('win', win)}</defs>
  <rect width="900" height="1100" fill="${wall}"/>
  <rect x="120" y="150" width="420" height="460" rx="10" fill="url(#win)"/>
  <rect x="120" y="150" width="420" height="460" rx="10" fill="none" stroke="${accent}" stroke-width="14"/>
  <rect x="323" y="150" width="14" height="460" fill="${accent}"/>
  <rect x="0" y="820" width="900" height="280" fill="${floor}"/>
  <rect x="140" y="560" width="660" height="70" rx="20" fill="${accent}"/>
  <rect x="120" y="690" width="700" height="160" rx="26" fill="${bed}"/>
  <rect x="170" y="640" width="200" height="80" rx="30" fill="#ffffff"/><rect x="400" y="640" width="200" height="80" rx="30" fill="#ffffff"/>
  <rect x="120" y="740" width="700" height="40" fill="${accent}" opacity=".35"/>
  <rect x="680" y="440" width="12" height="260" fill="${accent}"/><path d="M640 440 h92 l-20 -70 h-52z" fill="#fde68a"/>
  <circle cx="686" cy="470" r="90" fill="#fde68a" opacity=".18"/>
  <rect x="60" y="760" width="90" height="140" rx="12" fill="${accent}" opacity=".8"/><circle cx="105" cy="740" r="54" fill="#4d7c5a"/>`);
const rooms = [
  room('#efe6dc', '#b89b7a', '#f8f4ee', '#7a5a43', [[0, '#9ec5e8'], [1, '#f3d9b8']]),
  room('#dfe9e1', '#8fa58e', '#fbfaf6', '#355e4a', [[0, '#bfe3c8'], [1, '#f6efc9']]),
  room('#1f2430', '#4b4f5c', '#e7e3dd', '#c8a46b', [[0, '#1e3a5f'], [1, '#c2858a']]),
  room('#f4e3e3', '#c79a9a', '#ffffff', '#9f5f6b', [[0, '#fde2e4'], [1, '#fff1e6']]),
];

// 6. Salon: arched mirrors, a styling chair and plants
const salon = svg(W, H, `<defs>${lin('w', [[0, '#f6e7e3'], [1, '#ecd2cc']])}${lin('m', [[0, '#fdf4f2'], [1, '#e7cfd4']], 1, 1)}</defs>
  <rect width="${W}" height="${H}" fill="url(#w)"/>
  ${[0, 1, 2].map(i => `<path d="M${430 + i * 400} 760 V340 a150 150 0 0 1 300 0 V760Z" fill="url(#m)" stroke="#c9a86a" stroke-width="12"/>`).join('')}
  <rect x="0" y="760" width="${W}" height="320" fill="#d9b9b1"/>
  <rect x="300" y="740" width="1320" height="30" rx="6" fill="#c9a86a"/>
  ${[0, 1, 2].map(i => `<path d="M${520 + i * 400} 980 h120 l-10 -110 h-100z" fill="#8a5a5a"/><rect x="${505 + i * 400}" y="820" width="150" height="70" rx="26" fill="#a06464"/><rect x="${520 + i * 400}" y="720" width="120" height="120" rx="40" fill="#b87878"/><rect x="${576 + i * 400}" y="980" width="8" height="60" fill="#3f3a36"/><rect x="${540 + i * 400}" y="1036" width="80" height="10" rx="5" fill="#3f3a36"/>`).join('')}
  ${[[200, 700], [1720, 700]].map(([x, y]) => `<path d="M${x - 40} ${y + 60} h80 l-10 90 h-60z" fill="#e7e1d8"/>` + [-60, -30, 0, 30, 60].map(a => leaf(x, y + 20 - Math.abs(a), a - 90, '#557a5e').replace('rx="22" ry="9"', 'rx="60" ry="16"')).join('')).join('')}
  ${[[560, 200], [960, 180], [1360, 200]].map(([x, y]) => `<rect x="${x - 2}" y="0" width="4" height="${y}" fill="#c9a86a"/><circle cx="${x}" cy="${y + 18}" r="22" fill="#fde68a"/><circle cx="${x}" cy="${y + 18}" r="70" fill="#fde68a" opacity=".2"/>`).join('')}`);

// 7. Law firm: a stone building with columns at dusk
const law = svg(W, H, `<defs>${lin('s', [[0, '#0f172a'], [0.7, '#334155'], [1, '#64748b']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#s)"/>
  ${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 197) % W}" cy="${(i * 89) % 380}" r="${1 + (i % 3)}" fill="#e2e8f0" opacity=".6"/>`).join('')}
  <path d="M520 360 L960 170 L1400 360Z" fill="#cbd5e1"/><path d="M600 340 L960 200 L1320 340Z" fill="#94a3b8"/>
  <rect x="500" y="360" width="920" height="46" fill="#e2e8f0"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${560 + i * 150}" y="406" width="70" height="420" fill="#e2e8f0"/><rect x="${552 + i * 150}" y="406" width="86" height="22" fill="#f1f5f9"/><rect x="${552 + i * 150}" y="804" width="86" height="22" fill="#f1f5f9"/>${[0, 1, 2].map(k => `<rect x="${574 + i * 150 + k * 16}" y="430" width="6" height="370" fill="#cbd5e1"/>`).join('')}`).join('')}
  ${[0, 1, 2, 3, 4].map(i => `<rect x="${640 + i * 150}" y="520" width="60" height="200" fill="#fbbf24" opacity="${i === 2 ? 0.9 : 0.35}"/>`).join('')}
  <rect x="460" y="826" width="1000" height="40" fill="#cbd5e1"/><rect x="420" y="866" width="1080" height="40" fill="#94a3b8"/><rect x="380" y="906" width="1160" height="40" fill="#64748b"/>
  <rect x="0" y="946" width="${W}" height="134" fill="#1e293b"/>`);

const jobs = [
  ['tpl-wedding.jpg', wedding], ['wed-dinner.jpg', dinner], ['wed-party.jpg', party],
  ['tpl-hotel.jpg', hotel], ['room-1.jpg', rooms[0]], ['room-2.jpg', rooms[1]], ['room-3.jpg', rooms[2]], ['room-4.jpg', rooms[3]],
  ['tpl-salon.jpg', salon], ['tpl-law.jpg', law],
];
(async () => {
  for (const [name, s] of jobs) {
    await sharp(Buffer.from(s)).jpeg({ quality: 82, mozjpeg: true }).toFile(OUT + name);
    console.log('✓', name);
  }
})();
