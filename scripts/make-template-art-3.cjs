// Artwork for the podcast, product store, school and church website templates: scenes drawn as
// SVG and rendered with sharp (no text in any image), like scripts/make-template-art-2.cjs.
//   node scripts/make-template-art-3.cjs
const sharp = require('sharp');
const OUT = 'public/images/section-templates/';
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
const lin = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const rad = (id, inner, outer, op = 1) => `<radialGradient id="${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${inner}" stop-opacity="${op}"/><stop offset="1" stop-color="${outer}" stop-opacity="0"/></radialGradient>`;
const W = 1920, H = 1080;

// 1. Podcast: a studio microphone on a boom arm, sound waves, warm glow
const podcast = svg(W, H, `<defs>${lin('bg', [[0, '#1c1033'], [1, '#0b0716']])}${rad('g', '#f97316', '#f97316', 0.55)}${lin('m', [[0, '#e5e7eb'], [1, '#6b7280']], 1, 0)}</defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1300" cy="470" r="520" fill="url(#g)"/>
  ${[0, 1, 2, 3, 4].map(i => `<path d="M${1560 + i * 60} ${300 - i * 30} q${70 + i * 10} ${170 + i * 30} 0 ${340 + i * 60}" fill="none" stroke="#fb923c" stroke-opacity="${0.75 - i * 0.13}" stroke-width="10" stroke-linecap="round"/><path d="M${1040 - i * 60} ${300 - i * 30} q-${70 + i * 10} ${170 + i * 30} 0 ${340 + i * 60}" fill="none" stroke="#fb923c" stroke-opacity="${0.75 - i * 0.13}" stroke-width="10" stroke-linecap="round"/>`).join('')}
  <rect x="1180" y="230" width="240" height="420" rx="120" fill="url(#m)"/>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="1200" y="${290 + i * 34}" width="200" height="6" rx="3" fill="#374151" opacity=".55"/>`).join('')}
  <rect x="1160" y="600" width="280" height="40" rx="20" fill="#9ca3af"/>
  <path d="M1300 640 v120" stroke="#4b5563" stroke-width="26"/>
  <path d="M1300 760 L900 900 L520 860" fill="none" stroke="#374151" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="900" cy="900" r="26" fill="#4b5563"/><circle cx="520" cy="860" r="40" fill="#1f2937"/>
  <rect x="0" y="960" width="${W}" height="120" fill="#120a22"/>
  ${[[300, 980], [420, 1000], [1700, 990]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#fdba74" opacity=".7"/>`).join('')}`);

// 2. Product store: a pair of headphones on a round pedestal, soft studio light
const product = svg(1600, 1200, `<defs>${lin('bg', [[0, '#e0f2fe'], [1, '#f0f9ff']])}${rad('s', '#0f172a', '#0f172a', 0.25)}${lin('p', [[0, '#ffffff'], [1, '#cbd5e1']])}${lin('h', [[0, '#1e293b'], [1, '#0f172a']], 1, 1)}</defs>
  <rect width="1600" height="1200" fill="url(#bg)"/>
  <circle cx="800" cy="520" r="420" fill="#bae6fd" opacity=".55"/>
  <ellipse cx="800" cy="1010" rx="420" ry="50" fill="url(#s)"/>
  <rect x="440" y="820" width="720" height="180" rx="16" fill="url(#p)"/><ellipse cx="800" cy="820" rx="360" ry="46" fill="#f8fafc"/>
  <path d="M520 640 C520 330 1080 330 1080 640" fill="none" stroke="url(#h)" stroke-width="54" stroke-linecap="round"/>
  <path d="M540 610 C540 380 1060 380 1060 610" fill="none" stroke="#38bdf8" stroke-width="10" opacity=".7"/>
  <rect x="440" y="590" width="170" height="250" rx="70" fill="url(#h)"/><rect x="990" y="590" width="170" height="250" rx="70" fill="url(#h)"/>
  <rect x="470" y="625" width="110" height="180" rx="50" fill="#38bdf8"/><rect x="1020" y="625" width="110" height="180" rx="50" fill="#38bdf8"/>
  <ellipse cx="510" cy="680" rx="18" ry="40" fill="#fff" opacity=".35"/><ellipse cx="1060" cy="680" rx="18" ry="40" fill="#fff" opacity=".35"/>`);

// 3. School: a red-brick school with a clock, trees and a path, bright morning
const school = svg(W, H, `<defs>${lin('sky', [[0, '#7dd3fc'], [1, '#e0f2fe']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="1620" cy="190" r="90" fill="#fde68a"/>
  ${[[260, 160], [620, 110], [1240, 150]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="120" ry="34" fill="#fff" opacity=".9"/><ellipse cx="${x + 70}" cy="${y - 20}" rx="80" ry="34" fill="#fff" opacity=".9"/>`).join('')}
  <path d="M0 780 C500 740 1400 760 1920 730 V1080 H0Z" fill="#86efac"/>
  <rect x="520" y="420" width="880" height="400" fill="#b45309"/>
  ${Array.from({ length: 14 }, (_, r) => `<path d="M520 ${440 + r * 28} H1400" stroke="#92400e" stroke-width="2" opacity=".5"/>`).join('')}
  <path d="M480 430 L960 230 L1440 430Z" fill="#7c2d12"/>
  <rect x="880" y="160" width="160" height="200" fill="#c2410c"/><path d="M860 170 L960 90 L1060 170Z" fill="#7c2d12"/>
  <circle cx="960" cy="250" r="50" fill="#fff7ed"/><path d="M960 250 V215 M960 250 L985 262" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  ${[0, 1, 2, 3, 4, 5].map(i => (i === 2 || i === 3 ? '' : `<rect x="${580 + i * 135}" y="480" width="90" height="110" rx="6" fill="#e0f2fe"/><rect x="${580 + i * 135}" y="640" width="90" height="110" rx="6" fill="#e0f2fe"/><path d="M${625 + i * 135} 480 v110 M${625 + i * 135} 640 v110" stroke="#b45309" stroke-width="6"/>`)).join('')}
  <rect x="880" y="600" width="160" height="220" rx="80 80 0 0" fill="#1e3a8a"/><rect x="880" y="660" width="160" height="160" fill="#1e3a8a"/>
  <path d="M960 600 v220" stroke="#93c5fd" stroke-width="4"/>
  <path d="M900 820 L760 1080 H1160 L1020 820Z" fill="#e7e5e4"/>
  ${[[260, 640], [380, 690], [1560, 650], [1700, 700]].map(([x, y]) => `<rect x="${x - 10}" y="${y}" width="20" height="130" fill="#78350f"/><circle cx="${x}" cy="${y - 30}" r="80" fill="#16a34a"/><circle cx="${x - 40}" cy="${y}" r="56" fill="#22c55e"/>`).join('')}
  <rect x="1300" y="300" width="8" height="140" fill="#475569"/><path d="M1308 300 h70 v40 h-70z" fill="#ef4444"/>`);

// 4. Church: a white chapel with a steeple and a glowing round window at dusk
const church = svg(W, H, `<defs>${lin('sky', [[0, '#312e81'], [0.6, '#c084fc'], [1, '#fcd9b6']])}${rad('w', '#fde68a', '#fde68a', 0.8)}</defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 233) % W}" cy="${(i * 71) % 300}" r="${1 + (i % 3)}" fill="#fff" opacity=".7"/>`).join('')}
  <path d="M0 800 C600 760 1300 790 1920 760 V1080 H0Z" fill="#3f6212"/>
  <path d="M0 880 C700 850 1300 870 1920 850 V1080 H0Z" fill="#365314"/>
  <rect x="700" y="480" width="520" height="380" fill="#f5f5f4"/>
  <path d="M660 490 L960 300 L1260 490Z" fill="#a8a29e"/>
  <rect x="890" y="200" width="140" height="300" fill="#fafaf9"/><path d="M870 210 L960 40 L1050 210Z" fill="#a8a29e"/>
  <path d="M960 50 v-40 M940 0 h40" stroke="#fafaf9" stroke-width="8" stroke-linecap="round" transform="translate(0 0)"/>
  <circle cx="960" cy="290" r="120" fill="url(#w)"/><circle cx="960" cy="290" r="38" fill="#fde68a"/>
  ${[0, 45, 90, 135].map(a => `<path d="M960 290 l${Math.cos(a * Math.PI / 180) * 38} ${Math.sin(a * Math.PI / 180) * 38} M960 290 l${-Math.cos(a * Math.PI / 180) * 38} ${-Math.sin(a * Math.PI / 180) * 38}" stroke="#b45309" stroke-width="4"/>`).join('')}
  ${[0, 1, 3, 4].map(i => `<rect x="${745 + i * 95}" y="560" width="50" height="120" rx="25" fill="#fcd34d" opacity=".9"/>`).join('')}
  <rect x="910" y="700" width="100" height="160" rx="50" fill="#78350f"/><rect x="910" y="760" width="100" height="100" fill="#78350f"/>
  <path d="M920 860 L860 1080 H1060 L1000 860Z" fill="#d6d3d1" opacity=".8"/>
  ${[[420, 740], [520, 780], [1420, 760], [1530, 730]].map(([x, y]) => `<path d="M${x} ${y - 200} L${x - 70} ${y} H${x + 70}Z" fill="#14532d"/><rect x="${x - 8}" y="${y}" width="16" height="40" fill="#422006"/>`).join('')}`);

const jobs = [['tpl-podcast.jpg', podcast], ['tpl-product.jpg', product], ['tpl-school.jpg', school], ['tpl-church.jpg', church]];
(async () => {
  for (const [name, s] of jobs) {
    await sharp(Buffer.from(s)).jpeg({ quality: 82, mozjpeg: true }).toFile(OUT + name);
    console.log('✓', name);
  }
})();
