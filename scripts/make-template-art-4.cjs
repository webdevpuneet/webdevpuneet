// Artwork for the Music website template (Velvet Static): a stage scene, five album covers, a band
// photo, a studio and a crowd, drawn as SVG and rendered with sharp (no text in any image), plus three
// short demo audio loops for the Audio Player section. Like scripts/make-template-art-3.cjs.
//   node scripts/make-template-art-4.cjs
const sharp = require('sharp');
const fs = require('fs');
const OUT = 'public/images/section-templates/';
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
const lin = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const rad = (id, inner, outer, op = 1) => `<radialGradient id="${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${inner}" stop-opacity="${op}"/><stop offset="1" stop-color="${outer}" stop-opacity="0"/></radialGradient>`;
const W = 1920, H = 1080;
// deterministic pseudo-random so reruns give the same images
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

const crowd = (y0, count, w, color, hands = true) => Array.from({ length: count }, (_, i) => {
  const x = (i + 0.5) * (w / count) + (rnd() - 0.5) * 30, r = 38 + rnd() * 22, y = y0 + rnd() * 50;
  const arm = hands && rnd() > 0.55 ? `<path d="M${x + r * 0.5} ${y} l${14 + rnd() * 18} ${-70 - rnd() * 50}" stroke="${color}" stroke-width="16" stroke-linecap="round"/>` : '';
  return `${arm}<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/><rect x="${x - r * 1.5}" y="${y + r * 0.7}" width="${r * 3}" height="400" rx="${r}" fill="${color}"/>`;
}).join('');

// 1. Hero: a stage with light beams and a singer at the microphone, cyan and magenta
const stage = svg(W, H, `<defs>${lin('bg', [[0, '#0a1020'], [1, '#05060c']])}${lin('b1', [[0, '#22d3ee'], [1, '#22d3ee']])}${rad('g', '#22d3ee', '#22d3ee', 0.55)}${rad('g2', '#e879f9', '#e879f9', 0.5)}
  ${[0, 1, 2, 3, 4].map(i => `<linearGradient id="beam${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${i % 2 ? '#e879f9' : '#22d3ee'}" stop-opacity=".55"/><stop offset="1" stop-color="${i % 2 ? '#e879f9' : '#22d3ee'}" stop-opacity="0"/></linearGradient>`).join('')}</defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1360" cy="420" r="560" fill="url(#g)"/><circle cx="1620" cy="300" r="420" fill="url(#g2)"/>
  ${[[1000, 120], [1240, 60], [1480, 40], [1720, 90], [1900, 160]].map(([x, y], i) => `<path d="M${x} -20 L${x - 260 + i * 60} ${H - 120} L${x + 200 + i * 20} ${H - 120}Z" fill="url(#beam${i})"/>`).join('')}
  ${[[1000, 0], [1240, 0], [1480, 0], [1720, 0]].map(([x]) => `<circle cx="${x}" cy="20" r="26" fill="#e0f2fe"/>`).join('')}
  <rect x="0" y="${H - 190}" width="${W}" height="190" fill="#05060c"/>
  <rect x="0" y="${H - 190}" width="${W}" height="8" fill="#22d3ee" opacity=".6"/>
  <g fill="#05060c"><circle cx="1380" cy="470" r="62"/><path d="M1318 540 q62 -26 124 0 l42 250 h-208z"/><rect x="1342" y="760" width="38" height="170"/><rect x="1392" y="760" width="38" height="170"/>
  <path d="M1436 566 L1528 480" stroke="#05060c" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M1324 566 L1290 700" stroke="#05060c" stroke-width="30" fill="none" stroke-linecap="round"/></g>
  <rect x="1534" y="440" width="8" height="500" fill="#334155"/><circle cx="1538" cy="440" r="16" fill="#94a3b8"/>
  <g fill="#0b1224">${crowd(H - 150, 14, W, '#070913')}</g>`);

// 2. Covers
const cover1 = svg(1000, 1000, `<defs>${lin('s', [[0, '#1b0b3a'], [0.55, '#7c1d6f'], [1, '#fb7185']])}${rad('g', '#fdba74', '#fb7185', 0.8)}${lin('w', [[0, '#0b0620'], [1, '#2a0f4a']])}</defs>
  <rect width="1000" height="1000" fill="url(#s)"/><circle cx="500" cy="520" r="330" fill="url(#g)"/><circle cx="500" cy="540" r="190" fill="#fda4af"/>
  <rect y="560" width="1000" height="440" fill="url(#w)"/>
  ${Array.from({ length: 14 }, (_, i) => `<rect x="${500 - 170 + i * 8}" y="${580 + i * 28}" width="${340 - i * 16}" height="${6 + i * 0.6}" rx="4" fill="#fda4af" opacity="${0.8 - i * 0.05}"/>`).join('')}`);
const cover2 = svg(1000, 1000, `<defs>${rad('g', '#22d3ee', '#22d3ee', 0.9)}</defs><rect width="1000" height="1000" fill="#04060d"/>
  <circle cx="500" cy="500" r="430" fill="url(#g)" opacity=".35"/>
  ${[360, 290, 220, 150].map((r, i) => `<circle cx="500" cy="500" r="${r}" fill="none" stroke="#22d3ee" stroke-width="${12 - i * 2}" opacity="${0.9 - i * 0.18}"/>`).join('')}
  <circle cx="500" cy="500" r="80" fill="#e0f7ff"/>`);
const cover3 = svg(1000, 1000, `<defs>${lin('b', [[0, '#1e1b4b'], [1, '#4c1d95']])}</defs><rect width="1000" height="1000" fill="url(#b)"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M-20 ${560 + i * 50} C 200 ${380 + i * 30}, 420 ${760 - i * 20}, 640 ${560 + i * 30} S 940 ${420 + i * 40}, 1020 ${520 + i * 50} V1020 H-20Z" fill="${i % 2 ? '#f97316' : '#a78bfa'}" opacity="${0.18 + i * 0.07}"/>`).join('')}
  <circle cx="760" cy="250" r="90" fill="#fb923c" opacity=".9"/>`);
const cover4 = svg(1000, 1000, `<defs>${lin('b', [[0, '#0b1a4a'], [1, '#0a0f2c']])}</defs><rect width="1000" height="1000" fill="url(#b)"/>
  ${Array.from({ length: 144 }, (_, i) => { const c = i % 12, r = Math.floor(i / 12); const d = Math.hypot(c - 5.5, r - 5.5); return `<circle cx="${110 + c * 71}" cy="${110 + r * 71}" r="${Math.max(3, 30 - d * 4.2)}" fill="#fbbf24" opacity="${Math.max(0.25, 1 - d * 0.1)}"/>`; }).join('')}`);
seed = 21;
const cover5 = svg(1000, 1000, `<defs>${lin('b', [[0, '#12062b'], [1, '#05030c']])}</defs><rect width="1000" height="1000" fill="url(#b)"/>
  ${[180, 400, 620, 840].map((x, i) => `<linearGradient id="c${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${i % 2 ? '#e879f9' : '#22d3ee'}" stop-opacity=".7"/><stop offset="1" stop-color="${i % 2 ? '#e879f9' : '#22d3ee'}" stop-opacity="0"/></linearGradient><path d="M${x} 0 L${x - 130} 760 H${x + 130}Z" fill="url(#c${i})"/>`).join('')}
  <g fill="#05030c">${crowd(780, 7, 1000, '#05030c')}</g>`);

// 3. Band: four silhouettes on a lit backdrop
seed = 33;
const band = svg(1200, 900, `<defs>${lin('bg', [[0, '#2a1650'], [1, '#0b0a1c']])}${rad('g', '#22d3ee', '#22d3ee', 0.5)}</defs>
  <rect width="1200" height="900" fill="url(#bg)"/><circle cx="600" cy="360" r="420" fill="url(#g)"/>
  ${[[230, 60], [480, 90], [730, 80], [980, 55]].map(([x, s]) => `<g fill="#07060f"><circle cx="${x}" cy="${380 - s}" r="${52}"/><path d="M${x - 78} ${450 - s} q78 -34 156 0 l30 ${470 + s}h-216z"/></g>`).join('')}
  <rect y="820" width="1200" height="80" fill="#05040b"/>`);

// 4. Studio: a mixing desk with glowing faders, monitors and a hanging lamp
const studio = svg(1200, 900, `<defs>${lin('bg', [[0, '#101a33'], [1, '#070b16']])}${rad('l', '#fde68a', '#fde68a', 0.7)}</defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <circle cx="900" cy="150" r="260" fill="url(#l)"/><path d="M900 0 V90" stroke="#475569" stroke-width="6"/><path d="M850 90 h100 l30 50 h-160z" fill="#1f2937"/><circle cx="900" cy="150" r="16" fill="#fde68a"/>
  <rect x="120" y="170" width="260" height="360" rx="22" fill="#0c1220"/><circle cx="250" cy="260" r="56" fill="#111a2e"/><circle cx="250" cy="420" r="90" fill="#111a2e"/><circle cx="250" cy="420" r="52" fill="#1b2742"/>
  <rect x="820" y="230" width="260" height="360" rx="22" fill="#0c1220"/><circle cx="950" cy="320" r="56" fill="#111a2e"/><circle cx="950" cy="480" r="90" fill="#111a2e"/><circle cx="950" cy="480" r="52" fill="#1b2742"/>
  <path d="M60 640 L1140 640 L1190 900 H10Z" fill="#0d1424"/><path d="M90 660 H1110 L1150 760 H50Z" fill="#162036"/>
  ${Array.from({ length: 16 }, (_, i) => { const x = 140 + i * 62, h = 30 + ((i * 37) % 60); return `<rect x="${x}" y="680" width="10" height="64" rx="5" fill="#0a0f1c"/><rect x="${x - 7}" y="${700 + ((i * 29) % 36)}" width="24" height="14" rx="4" fill="${i % 3 === 0 ? '#22d3ee' : '#94a3b8'}"/><circle cx="${x + 5}" cy="${668}" r="4" fill="${i % 4 === 0 ? '#e879f9' : '#22d3ee'}" opacity=".9"/>`; }).join('')}
  <rect x="450" y="330" width="300" height="190" rx="12" fill="#06101c" stroke="#22d3ee" stroke-opacity=".4" stroke-width="3"/>
  ${Array.from({ length: 22 }, (_, i) => `<rect x="${470 + i * 13}" y="${500 - (20 + ((i * 53) % 120))}" width="8" height="${20 + ((i * 53) % 120)}" rx="2" fill="#22d3ee" opacity=".8"/>`).join('')}`);

// 5. Crowd: hands up in front of coloured lights
seed = 5;
const crowdPic = svg(1200, 900, `<defs>${lin('bg', [[0, '#1b0f3d'], [1, '#07060f']])}${rad('g', '#e879f9', '#e879f9', 0.55)}${rad('g2', '#22d3ee', '#22d3ee', 0.45)}</defs>
  <rect width="1200" height="900" fill="url(#bg)"/><circle cx="300" cy="260" r="360" fill="url(#g)"/><circle cx="920" cy="240" r="330" fill="url(#g2)"/>
  ${[160, 420, 700, 960].map((x, i) => `<linearGradient id="k${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><path d="M${x} -10 L${x - 150} 620 H${x + 150}Z" fill="url(#k${i})" opacity=".5"/>`).join('')}
  <g fill="#05040b">${crowd(560, 9, 1200, '#05040b')}</g>`);

const jobs = [
  ['tpl-music.jpg', stage], ['mus-cover-1.jpg', cover1], ['mus-cover-2.jpg', cover2], ['mus-cover-3.jpg', cover3], ['mus-cover-4.jpg', cover4], ['mus-cover-5.jpg', cover5],
  ['mus-band.jpg', band], ['mus-studio.jpg', studio], ['mus-crowd.jpg', crowdPic],
];

// Demo audio: three 8-second loops (a chord pad, a bass line and a soft beat), 11.025 kHz mono 16-bit WAV
function wav(name, chords, bpm) {
  const sr = 11025, secs = 8, n = sr * secs, data = Buffer.alloc(n * 2);
  const beat = 60 / bpm;
  for (let i = 0; i < n; i++) {
    const t = i / sr, chord = chords[Math.floor(t / (secs / chords.length)) % chords.length];
    let v = 0;
    chord.forEach(f => { v += Math.sin(2 * Math.PI * f * t) * 0.12 + Math.sin(2 * Math.PI * f * 2.005 * t) * 0.03; });
    const bt = t % beat; const bass = Math.sin(2 * Math.PI * chord[0] / 2 * t) * 0.3 * Math.exp(-bt * 4);
    const kick = Math.sin(2 * Math.PI * (60 - 40 * Math.min(1, bt * 8)) * bt) * Math.exp(-bt * 14) * 0.5;
    const hat = (Math.random() * 2 - 1) * 0.06 * Math.exp(-((t + beat / 2) % beat) * 40);
    const env = Math.min(1, t * 4, (secs - t) * 4);
    v = (v + bass + kick + hat) * env;
    data.writeInt16LE(Math.max(-1, Math.min(1, v)) * 30000, i * 2);
  }
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVEfmt ', 8); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(sr, 24); h.writeUInt32LE(sr * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
  fs.mkdirSync('public/audio', { recursive: true });
  fs.writeFileSync('public/audio/' + name, Buffer.concat([h, data]));
}

(async () => {
  for (const [name, s] of jobs) {
    await sharp(Buffer.from(s)).jpeg({ quality: 86, mozjpeg: true }).toFile(OUT + name);
    console.log('✓', name);
  }
  const A = 220, C = 261.63, D = 293.66, E = 329.63, F = 174.61, G = 196, B = 246.94;
  wav('demo-1.wav', [[A, C * 1, E], [F, A, C * 1], [C, E, G], [G, B, D * 1]], 104);
  wav('demo-2.wav', [[D, F * 1.26, A], [G, B, D * 1], [A, C * 1, E], [D, F * 1.26, A]], 118);
  wav('demo-3.wav', [[E, G * 1, B], [C, E, G], [D, F * 1.26, A], [E, G * 1, B]], 96);
  console.log('✓ public/audio/demo-1..3.wav');
})();
