// Artwork for the website templates (Website Builder starters): industry hero backgrounds
// and UI screens, drawn as SVG and rendered with sharp. No text in any image.
//   node scripts/make-template-art.cjs
const sharp = require('sharp');
const OUT = 'public/images/section-templates/';
const bar = (x, y, w, h, c, r = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`;
const W = 1920, H = 1080;
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

// 1. Restaurant: a warm table seen from above, plates, glasses and candle glow
const plate = (cx, cy, r, food) => `<circle cx="${cx}" cy="${cy}" r="${r + 18}" fill="#1c120c" opacity=".35"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f5efe6"/><circle cx="${cx}" cy="${cy}" r="${r * 0.72}" fill="#ebe2d4"/>${food}`;
const restaurant = svg(W, H, `
  <defs><radialGradient id="glow" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#7c3f1d"/><stop offset="1" stop-color="#2a150a"/></radialGradient>
  <radialGradient id="candle" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd8a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffd8a0" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<rect x="0" y="${i * 120}" width="${W}" height="2" fill="#000" opacity=".12"/>`).join('')}
  ${plate(560, 420, 170, `<circle cx="530" cy="400" r="58" fill="#c2410c"/><circle cx="600" cy="450" r="44" fill="#65a30d"/><circle cx="580" cy="380" r="24" fill="#fde68a"/>`)}
  ${plate(1360, 640, 160, `<path d="M1290 640 q70 -90 140 0 q-70 60 -140 0z" fill="#b45309"/><circle cx="1330" cy="690" r="30" fill="#16a34a"/><circle cx="1395" cy="600" r="18" fill="#dc2626"/>`)}
  ${plate(1080, 230, 110, `<circle cx="1080" cy="230" r="55" fill="#f59e0b"/><circle cx="1080" cy="230" r="22" fill="#fef3c7"/>`)}
  <circle cx="860" cy="760" r="70" fill="#fef3c7" opacity=".18"/><circle cx="860" cy="760" r="52" fill="#7f1d1d" opacity=".75"/>
  <circle cx="1640" cy="300" r="62" fill="#e0f2fe" opacity=".16"/><circle cx="1640" cy="300" r="44" fill="#e0f2fe" opacity=".22"/>
  <rect x="300" y="300" width="14" height="260" rx="7" fill="#d6d3d1" opacity=".8"/><rect x="790" y="300" width="14" height="260" rx="7" fill="#d6d3d1" opacity=".8"/>
  <circle cx="1000" cy="520" r="260" fill="url(#candle)"/><circle cx="1000" cy="520" r="26" fill="#fef9c3"/><circle cx="1000" cy="520" r="12" fill="#fff"/>`);

// 2. Real estate: a modern house at dusk
const realestate = svg(W, H, `
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e293b"/><stop offset=".6" stop-color="#7c6f9b"/><stop offset="1" stop-color="#f4b39b"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="1500" cy="300" r="70" fill="#fde2c8" opacity=".85"/>
  <path d="M0 820 C400 760 800 800 1200 770 S1700 760 1920 790 V1080 H0Z" fill="#1f2a24"/>
  <rect x="520" y="470" width="880" height="340" fill="#e7e5e4"/><rect x="520" y="430" width="560" height="60" fill="#292524"/><rect x="1060" y="350" width="400" height="140" fill="#e7e5e4"/><rect x="1040" y="330" width="440" height="34" fill="#292524"/>
  <rect x="580" y="540" width="420" height="220" fill="#fbbf24" opacity=".85"/><rect x="580" y="540" width="420" height="220" fill="none" stroke="#292524" stroke-width="10"/><rect x="785" y="540" width="10" height="220" fill="#292524"/>
  <rect x="1110" y="400" width="300" height="80" fill="#fcd34d" opacity=".8"/><rect x="1120" y="560" width="220" height="250" fill="#57534e"/>
  <rect x="380" y="810" width="1160" height="22" fill="#a8a29e"/>
  ${[260, 340, 1620, 1700].map((x, i) => `<rect x="${x}" y="${640 + (i % 2) * 30}" width="14" height="${170 - (i % 2) * 30}" fill="#3f3f2f"/><circle cx="${x + 7}" cy="${620 + (i % 2) * 30}" r="${70 - (i % 2) * 15}" fill="#2f4f3a"/>`).join('')}`);

// 3. Fitness: bold diagonal energy with a dumbbell
const fitness = svg(W, H, `
  <rect width="${W}" height="${H}" fill="#0a0a0a"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${-400 + i * 420} ${H} L${200 + i * 420} 0 L${330 + i * 420} 0 L${-270 + i * 420} ${H}Z" fill="${i % 2 ? '#a3e635' : '#1a2e05'}" opacity="${i % 2 ? 0.16 : 0.5}"/>`).join('')}
  <g transform="rotate(-18 1260 560)"><rect x="1000" y="540" width="520" height="40" rx="20" fill="#d4d4d4"/>
  <rect x="930" y="430" width="90" height="260" rx="22" fill="#a3e635"/><rect x="860" y="470" width="80" height="180" rx="20" fill="#65a30d"/>
  <rect x="1500" y="430" width="90" height="260" rx="22" fill="#a3e635"/><rect x="1580" y="470" width="80" height="180" rx="20" fill="#65a30d"/></g>
  <circle cx="380" cy="300" r="180" fill="#a3e635" opacity=".08"/>`);

// 4. Event: stage, spotlights and a crowd
const event = svg(W, H, `
  <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#0f0a1f"/></linearGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0abfc" stop-opacity=".55"/><stop offset="1" stop-color="#f0abfc" stop-opacity="0"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${[[360, -10], [760, 6], [1160, -6], [1560, 10]].map(([x, a]) => `<path d="M${x} 0 L${x - 220 + a * 10} 760 L${x + 220 + a * 10} 760Z" fill="url(#beam)"/>`).join('')}
  <rect x="300" y="620" width="1320" height="40" fill="#312e81"/><rect x="300" y="660" width="1320" height="120" fill="#1e1b4b"/>
  <rect x="740" y="380" width="440" height="240" rx="12" fill="#6366f1" opacity=".55"/><rect x="760" y="400" width="400" height="200" rx="8" fill="#a5b4fc" opacity=".35"/>
  ${Array.from({ length: 30 }, (_, i) => { const x = 40 + i * 64 + (i % 3) * 8, h = 90 + (i % 4) * 22; return `<circle cx="${x}" cy="${H - h - 30}" r="26" fill="#0b0720"/><rect x="${x - 34}" y="${H - h}" width="68" height="${h + 10}" rx="30" fill="#0b0720"/>`; }).join('')}`);

// 5. Nature: green hills at sunrise (nonprofits, wellness, coaching)
const nature = svg(W, H, `
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#fdba74"/></linearGradient>
  <radialGradient id="sun" cx=".7" cy=".42" r=".2"><stop offset="0" stop-color="#fff7ed"/><stop offset="1" stop-color="#fff7ed" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/><rect width="${W}" height="${H}" fill="url(#sun)"/>
  <path d="M0 640 C300 520 600 600 900 540 S1500 500 1920 580 V1080 H0Z" fill="#86efac" opacity=".7"/>
  <path d="M0 760 C400 660 760 760 1100 690 S1700 650 1920 720 V1080 H0Z" fill="#22c55e" opacity=".8"/>
  <path d="M0 880 C360 820 820 900 1200 840 S1700 820 1920 860 V1080 H0Z" fill="#15803d"/>
  ${[[420, 700], [500, 720], [1380, 660], [1460, 690]].map(([x, y]) => `<rect x="${x - 6}" y="${y}" width="12" height="70" fill="#14532d"/><circle cx="${x}" cy="${y - 20}" r="46" fill="#166534"/>`).join('')}`);

// 6. Online course: a lesson player with a lesson list (1200×820)
const course = svg(1200, 820, `
  <rect width="1200" height="820" rx="24" fill="#ffffff"/>
  <rect width="1200" height="56" rx="24" fill="#f1f5f9"/><rect y="32" width="1200" height="24" fill="#f1f5f9"/>
  <circle cx="34" cy="28" r="8" fill="#f87171"/><circle cx="60" cy="28" r="8" fill="#fbbf24"/><circle cx="86" cy="28" r="8" fill="#34d399"/>
  <rect x="40" y="90" width="760" height="430" rx="18" fill="#0f172a"/><circle cx="420" cy="305" r="48" fill="#ffffff" opacity=".9"/><path d="M405 280 L445 305 L405 330Z" fill="#0f172a"/>
  ${bar(70, 480, 700, 8, '#334155', 4)}${bar(70, 480, 280, 8, '#f97316', 4)}
  ${bar(40, 550, 420, 24, '#0f172a')}${bar(40, 590, 600, 14, '#cbd5e1')}${bar(40, 616, 520, 14, '#cbd5e1')}
  ${bar(40, 670, 160, 44, '#f97316', 12)}${bar(216, 670, 140, 44, '#e2e8f0', 12)}
  <rect x="830" y="90" width="330" height="690" rx="18" fill="#f8fafc" stroke="#e2e8f0"/>${bar(856, 116, 160, 18, '#334155')}
  ${Array.from({ length: 7 }, (_, i) => `<rect x="850" y="${156 + i * 86}" width="290" height="72" rx="12" fill="${i === 2 ? '#fff7ed' : '#ffffff'}" stroke="${i === 2 ? '#fdba74' : '#e2e8f0'}"/><circle cx="884" cy="${192 + i * 86}" r="16" fill="${i < 2 ? '#22c55e' : i === 2 ? '#f97316' : '#e2e8f0'}"/>${bar(912, 178 + i * 86, 170, 12, '#334155')}${bar(912, 200 + i * 86, 110, 10, '#cbd5e1')}`).join('')}`);

// 7. Booking: a calendar with time slots (1200×900), for clinics and local services
const booking = svg(1200, 900, `
  <rect width="1200" height="900" rx="24" fill="#ffffff"/>
  <rect width="1200" height="56" rx="24" fill="#f1f5f9"/><rect y="32" width="1200" height="24" fill="#f1f5f9"/>
  <circle cx="34" cy="28" r="8" fill="#f87171"/><circle cx="60" cy="28" r="8" fill="#fbbf24"/><circle cx="86" cy="28" r="8" fill="#34d399"/>
  ${bar(60, 96, 240, 26, '#0f172a')}${bar(60, 136, 340, 14, '#cbd5e1')}
  <rect x="60" y="180" width="560" height="640" rx="18" fill="#f8fafc" stroke="#e2e8f0"/>${bar(90, 210, 180, 18, '#334155')}
  ${Array.from({ length: 35 }, (_, i) => { const c = i % 7, r = Math.floor(i / 7); const on = i === 17; const off = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34].includes(i); return `<rect x="${90 + c * 72}" y="${260 + r * 108}" width="60" height="88" rx="14" fill="${on ? '#0ea5e9' : off ? '#f1f5f9' : '#ffffff'}" stroke="${on ? '#0ea5e9' : '#e2e8f0'}"/>${bar(105 + c * 72, 285 + r * 108, 30, 12, on ? '#ffffff' : off ? '#cbd5e1' : '#334155')}`; }).join('')}
  <rect x="660" y="180" width="480" height="640" rx="18" fill="#f8fafc" stroke="#e2e8f0"/>${bar(690, 210, 200, 18, '#334155')}
  ${Array.from({ length: 6 }, (_, i) => `<rect x="690" y="${260 + i * 84}" width="420" height="64" rx="14" fill="${i === 2 ? '#e0f2fe' : '#ffffff'}" stroke="${i === 2 ? '#0ea5e9' : '#e2e8f0'}"/>${bar(716, 284 + i * 84, 120, 16, i === 2 ? '#0369a1' : '#334155')}${bar(990, 280 + i * 84, 96, 24, i === 2 ? '#0ea5e9' : '#e2e8f0', 12)}`).join('')}
  ${bar(690, 768, 420, 40, '#0ea5e9', 14)}`);

(async () => {
  const jobs = [['tpl-restaurant.jpg', restaurant], ['tpl-realestate.jpg', realestate], ['tpl-fitness.jpg', fitness], ['tpl-event.jpg', event], ['tpl-nature.jpg', nature], ['tpl-course.png', course], ['tpl-booking.png', booking]];
  for (const [name, s] of jobs) {
    const img = sharp(Buffer.from(s));
    await (name.endsWith('.png') ? img.png({ compressionLevel: 9 }) : img.jpeg({ quality: 80, mozjpeg: true })).toFile(OUT + name);
  }
  const tiles = await Promise.all(jobs.map(([n]) => sharp(OUT + n).resize(320, 190, { fit: 'cover' }).toBuffer()));
  await sharp({ create: { width: 4 * 330 + 10, height: 2 * 200 + 10, channels: 3, background: '#94a3b8' } })
    .composite(tiles.map((b, i) => ({ input: b, left: 10 + (i % 4) * 330, top: 10 + Math.floor(i / 4) * 200 }))).png()
    .toFile(process.env.SHEET || 'template-art-sheet.png');
  console.log(`${jobs.length} images written`);
})();
