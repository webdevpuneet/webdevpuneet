const simpleToneSynthPad = {
  id: 'simple-tone-synth-pad',
  title: 'Simple Tone Synth Pad',
  lastmod: '2026-09-05',
  category: 'media',
  cdnUrls: [],
  html: `<div class="sp-card">
  <div class="sp-head">
    <span class="sp-eyebrow">Synth</span>
    <h2>Tone Pad</h2>
  </div>
  <div class="sp-grid" id="spGrid"></div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.sp-card{font-family:system-ui,-apple-system,sans-serif;background:#fff;color:#1e293b;border:1px solid #e2e8f0;border-radius:18px;padding:22px;max-width:440px;width:100%;margin:0 auto;box-shadow:0 12px 30px rgba(30,41,59,0.06)}
.sp-head{margin-bottom:16px}
.sp-eyebrow{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:4px}
.sp-head h2{font-size:19px;margin:0}
.sp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.sp-pad{aspect-ratio:1;border:none;border-radius:14px;cursor:pointer;font-size:12px;font-weight:800;color:#fff;display:flex;align-items:center;justify-content:center;transition:transform .08s;user-select:none;font-family:inherit}
.sp-pad:active,.sp-pad.sp-pressed{transform:scale(.9)}
.sp-pad.sp-pressed{filter:brightness(1.3)}`,

  js: `var NOTES = [
  { name: 'C4', freq: 261.63, color: '#6366f1' },
  { name: 'D4', freq: 293.66, color: '#8b5cf6' },
  { name: 'E4', freq: 329.63, color: '#a855f7' },
  { name: 'G4', freq: 392.0, color: '#ec4899' },
  { name: 'A4', freq: 440.0, color: '#f43f5e' },
  { name: 'C5', freq: 523.25, color: '#f97316' },
  { name: 'D5', freq: 587.33, color: '#eab308' },
  { name: 'E5', freq: 659.25, color: '#22c55e' },
  { name: 'G5', freq: 783.99, color: '#14b8a6' },
  { name: 'A5', freq: 880.0, color: '#0ea5e9' },
];

var grid = document.getElementById('spGrid');
var audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playNote(freq) {
  var ctx = getCtx();
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.value = freq;

  var now = ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.3, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.55);
}

NOTES.forEach(function (note) {
  var pad = document.createElement('button');
  pad.className = 'sp-pad';
  pad.style.background = note.color;
  pad.textContent = note.name;
  pad.setAttribute('aria-label', 'Play ' + note.name);

  function trigger() {
    playNote(note.freq);
    pad.classList.add('sp-pressed');
    setTimeout(function () {
      pad.classList.remove('sp-pressed');
    }, 140);
  }

  pad.addEventListener('mousedown', trigger);
  pad.addEventListener('touchstart', function (e) {
    e.preventDefault();
    trigger();
  }, { passive: false });

  grid.appendChild(pad);
});`,

  seo: {
    title: 'Simple Tone Synth Pad — Free HTML CSS JS Snippet',
    description: `A grid of colorful synth pads that play plucked musical notes on click using Web Audio oscillators and a percussive gain envelope. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Simple Tone Synth Pad — Playable Note Grid With Web Audio API',
      description: `This snippet turns a grid of colored buttons into a playable mini-instrument. Each pad is mapped to a note in a C major scale, and clicking or tapping it triggers a freshly synthesized, percussive tone via the Web Audio API — no samples, no audio files, just oscillators and a shaped volume envelope.

**A note per pad**

The NOTES array pairs ten notes across an octave and a bit (C4 through A5) with their exact frequencies in Hz and a distinct accent color. Each pad in the grid is generated from this array rather than hand-written in the markup, so adding, removing, or retuning notes only requires editing one array.

**Making a plucked sound out of a sustained oscillator**

An OscillatorNode by itself produces a constant tone for as long as it runs — it doesn't naturally sound "plucked." The percussive character comes entirely from the GainNode envelope in playNote(): gain jumps up almost instantly with an exponential ramp (a fast attack), then decays back down over half a second with a second exponential ramp (the decay), which is what makes a continuous tone read as a short, struck note rather than a held drone.

**A fresh oscillator per hit**

Every pad press calls playNote() again, which creates a brand new OscillatorNode and GainNode, starts them, and schedules the oscillator to stop shortly after the envelope finishes. This means multiple pads (or the same pad tapped repeatedly) can overlap and sound simultaneously, exactly like a real synth pad controller, since each note lives in its own independent node graph rather than sharing one oscillator.

**Visual feedback synced to the sound**

Each press toggles a .sp-pressed class that scales the pad down and brightens it briefly, giving immediate tactile visual confirmation that lines up with the short, percussive nature of the sound itself.`,
    },
    features: [
      'Ten-pad grid mapped to real musical note frequencies across an octave',
      'Fresh OscillatorNode + GainNode created per pad press for true polyphony',
      'Percussive envelope (fast attack, exponential decay) makes a sustained oscillator sound plucked',
      'Distinct accent color per pad for quick visual identification',
      'Touch and mouse support with touchstart handling for mobile play',
      'Brief scale-and-brighten press animation synced to each triggered note',
      'No external samples, audio files, or synth libraries required',
      'Data-driven pad generation from a single NOTES array',
    ],
    useCases: [
      { icon: '🎹', title: 'Browser mini instruments', desc: 'Embed a playable ten-pad note grid mapped to a C major scale, with each pad having a distinct accent colour for quick recognition.' },
      { icon: '📚', title: 'Web Audio envelope teaching', desc: 'Show how a fast attack and exponential decay turn a sustained oscillator into a plucked note.' },
      { icon: '👋', title: 'Music app onboarding and demos', desc: 'Offer an inviting, tactile interaction that needs no audio files, since each press creates a fresh `OscillatorNode` and `GainNode`.' },
      { icon: '🎮', title: 'Game sound effect prototyping', desc: 'Quickly audition short synthesised sounds for a game, with true polyphony so presses can overlap without cutting each other off.' },
    ],
    faqs: [
      { q: 'Can two pads play at the same time?', a: 'Yes. Each press creates an entirely new OscillatorNode and GainNode pair, so pressing multiple pads in quick succession, or even the same pad rapidly, produces overlapping, independent notes rather than cutting each other off.' },
      { q: 'How is the plucked sound created without any audio samples?', a: 'The GainNode envelope in playNote() ramps volume up almost instantly and then decays it exponentially over about half a second. That shape — fast attack, quick decay — is what makes a plain oscillator tone perceptually read as a short plucked note.' },
      { q: 'How do I change the notes or add more pads?', a: 'Edit the NOTES array — add, remove, or retune any {name, freq, color} entry, and the grid, click handlers, and pad rendering all update automatically since the pads are generated from that array.' },
    ],
  },
};

export default simpleToneSynthPad;
