const shakeToUndo = {
  id: 'shake-to-undo',
  title: 'Shake to Undo',
  lastmod: '2026-08-23',
  category: 'buttons',
  cdnUrls: [],
  html: `<section class="stu-wrap">
  <span class="stu-tag">devicemotion api · shake gesture</span>
  <h1>Note deleted</h1>
  <p id="stuStatus">Shake your phone to undo, or use the button below \\u2014 both trigger the exact same undo.</p>

  <div class="stu-stage">
    <div class="stu-motion-meter" id="stuMeter"><div class="stu-motion-fill" id="stuFill"></div></div>
    <p class="stu-meter-label" id="stuMeterLabel">Motion energy</p>
  </div>

  <div class="stu-actions">
    <button class="stu-btn primary" id="stuBtn">Shake (or click here) to undo</button>
    <button class="stu-btn" id="stuPermBtn" hidden>Enable motion access</button>
  </div>
  <p class="stu-note">On iOS Safari, motion sensors require a permission prompt triggered by a tap \\u2014 the "Enable motion access" button appears automatically when that is needed. If DeviceMotion is unsupported, unavailable, or denied, the button is the full undo path, not a lesser fallback.</p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#111a30,#050810 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.stu-wrap{width:100%;max-width:520px;text-align:center}
.stu-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7dd3fc;background:rgba(125,211,252,.1);border:1px solid rgba(125,211,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.stu-wrap h1{font-size:clamp(24px,5.5vw,32px);font-weight:800;letter-spacing:-.02em}
.stu-wrap p{font-size:13.5px;color:#a6b0cc;margin-top:8px;line-height:1.6}

.stu-stage{margin:22px 0;padding:18px;border-radius:14px;border:1px solid rgba(125,211,252,.18);background:#0a0e1a}
.stu-motion-meter{height:10px;border-radius:99px;background:#141c30;overflow:hidden}
.stu-motion-fill{height:100%;width:0%;background:linear-gradient(90deg,#38bdf8,#818cf8);transition:width .08s linear}
.stu-meter-label{font-size:10.5px;color:#5c6785;margin-top:8px;text-transform:uppercase;letter-spacing:.08em}

.stu-actions{display:flex;flex-direction:column;gap:10px;align-items:center}
.stu-btn{padding:13px 24px;border-radius:11px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#e8e2f5;font:700 13.5px system-ui;cursor:pointer;width:100%;max-width:340px}
.stu-btn:hover{background:rgba(255,255,255,.11)}
.stu-btn.primary{background:linear-gradient(135deg,#38bdf8,#818cf8);border-color:transparent;color:#04101f}
.stu-btn.flash{animation:stuFlash .5s ease}
@keyframes stuFlash{0%{transform:scale(1)}30%{transform:scale(1.05)}100%{transform:scale(1)}}
.stu-note{font-size:11px;color:#657095;max-width:460px;margin:14px auto 0;line-height:1.6}`,

  js: `var statusEl = document.getElementById('stuStatus');
var btn = document.getElementById('stuBtn');
var permBtn = document.getElementById('stuPermBtn');
var meterFill = document.getElementById('stuFill');
var meterLabel = document.getElementById('stuMeterLabel');

var undone = false;

function doUndo(source) {
  if (undone) return;
  undone = true;
  btn.classList.add('flash');
  statusEl.textContent = 'Undone (via ' + source + '). Delete something else to try again.';
  setTimeout(function () { btn.classList.remove('flash'); }, 500);
  setTimeout(function () { undone = false; }, 900); // allow repeat demos
}

btn.addEventListener('click', function () { doUndo('tap'); });

// --- Real DeviceMotion shake detection, with an honest, fully-functional
// fallback when the API is missing, blocked, or never granted permission.
// The tap button above is not a "consolation prize" \\u2014 it is wired to the
// exact same doUndo() function the real shake gesture calls.
var SHAKE_THRESHOLD = 14; // m/s^2 delta between consecutive readings
var last = null;
var lastShakeTime = 0;

function onMotion(e) {
  var acc = e.accelerationIncludingGravity;
  if (!acc || acc.x === null) return;

  if (last) {
    var delta = Math.abs(acc.x - last.x) + Math.abs(acc.y - last.y) + Math.abs(acc.z - last.z);
    var pct = Math.min(100, (delta / (SHAKE_THRESHOLD * 2)) * 100);
    meterFill.style.width = pct + '%';

    var now = Date.now();
    if (delta > SHAKE_THRESHOLD && now - lastShakeTime > 1000) {
      lastShakeTime = now;
      doUndo('shake');
    }
  }
  last = { x: acc.x, y: acc.y, z: acc.z };
}

function startListening() {
  window.addEventListener('devicemotion', onMotion);
  statusEl.textContent = 'Motion sensor active \\u2014 shake your phone, or tap the button.';
}

function fallbackNoMotion(reason) {
  meterLabel.textContent = 'Motion energy (unavailable on this device)';
  statusEl.textContent = reason + ' \\u2014 the tap button below is the full undo path here, not a degraded option.';
}

// Feature-detect first: DeviceMotionEvent may not exist at all (desktop
// browsers, many laptops) \\u2014 that is not an error, just an unsupported API.
if (typeof DeviceMotionEvent === 'undefined') {
  fallbackNoMotion('This browser/device has no DeviceMotion support');
} else if (typeof DeviceMotionEvent.requestPermission === 'function') {
  // iOS 13+ Safari gates motion sensors behind an explicit user-gesture
  // permission prompt \\u2014 it cannot be requested on page load, only from a
  // real tap, so a visible button is shown until that tap happens.
  permBtn.hidden = false;
  statusEl.textContent = 'Tap "Enable motion access" to allow real shake detection on this device.';
  permBtn.addEventListener('click', function () {
    DeviceMotionEvent.requestPermission().then(function (result) {
      permBtn.hidden = true;
      if (result === 'granted') {
        startListening();
      } else {
        fallbackNoMotion('Motion permission was not granted');
      }
    }).catch(function () {
      permBtn.hidden = true;
      fallbackNoMotion('Motion permission request failed');
    });
  });
} else {
  // Non-iOS browsers that support DeviceMotionEvent generally do not require
  // an explicit permission prompt \\u2014 listen immediately.
  startListening();
}`,

  seo: {
    title: 'Shake to Undo — Free DeviceMotion API Shake Gesture Snippet',
    description: `A real DeviceMotion-powered shake-to-undo gesture on supporting mobile devices, with an honestly equal tap-button fallback for desktop or unsupported browsers. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Shake to Undo — Real Motion Sensing With an Honest Fallback',
      description: `Shake-to-undo is the classic mobile gesture — popularized by iOS's system-wide "shake to undo" — where physically shaking the device reverses the last action. This snippet wires up the real \`devicemotion\` event and a genuine acceleration-delta shake detector, following the same honesty pattern as [canvas audio frequency bars](/ui-snippets/canvas-audio-bars/): feature-detect the real API, use it when available, and fail into a fallback that is fully functional rather than a degraded placeholder.

**Real acceleration-delta shake detection**

Every \`devicemotion\` event carries \`accelerationIncludingGravity\`, an \`{x, y, z}\` reading in m/s². A single reading can't detect a shake — shaking means the *change* between consecutive readings is large. The handler computes \`delta = |x - lastX| + |y - lastY| + |z - lastZ|\` between the current and previous reading, and only counts it as a shake when \`delta\` exceeds \`SHAKE_THRESHOLD\` — genuine motion-derived detection, not a timer or a fake trigger. A 1-second cooldown (\`lastShakeTime\`) stops one violent shake from firing the undo repeatedly.

**Why three different code paths exist**

DeviceMotion has three distinct real-world states this snippet handles explicitly: (1) the API doesn't exist at all — most desktop browsers — detected with \`typeof DeviceMotionEvent === 'undefined'\`; (2) it exists but iOS 13+ gates it behind \`DeviceMotionEvent.requestPermission()\`, which can only be called from a real user gesture like a tap, never on page load; (3) it exists and needs no explicit permission (most Android browsers), so listening can start immediately. Each path is feature-detected rather than assumed, and each fails toward the same visible, working fallback.

**The fallback is not a lesser path**

The tap button calls the exact same \`doUndo(source)\` function the real shake gesture calls — it isn't a "sorry, no shake for you" message, it's the complete undo interaction, just triggered by a tap instead of an accelerometer reading. This matters because DeviceMotion is denied constantly in practice: desktop has no sensor, many browsers block it by default for privacy, and users often decline the iOS permission prompt. A demo (or a real feature) that goes dead in those cases looks broken; one where the fallback *is* the feature does not.

**A live motion meter for feedback**

Rather than a shake being invisible until it fires, \`meterFill\`'s width is driven by the same \`delta\` value every event, scaled against the threshold — so on a supporting device you can see motion energy building toward the shake threshold in real time, turning an otherwise invisible sensor reading into visible feedback.

**Customizing it**

Tune \`SHAKE_THRESHOLD\` and the cooldown window for stricter or looser detection, swap \`doUndo\` for your real undo logic, or pair this with a [notification permission prompt](/ui-snippets/notification-permission-prompt/) pattern for other gated-permission APIs.`,
    },
    howToUse: { type: 'steps', items: [
      { title: `Paste HTML, CSS, and JS`, text: `A status line explains what to do based on your device.` },
      { title: `On a supporting phone`, text: `Grant motion access if prompted, then physically shake it.` },
      { title: `Watch the motion meter`, text: `It fills with real accelerometer delta as you move the device.` },
      { title: `On desktop or unsupported devices`, text: `The status explains why, and the tap button is the full path.` },
      { title: `Tap the undo button anytime`, text: `It runs the identical doUndo() the real shake gesture calls.` },
      { title: `Tune the sensitivity`, text: `Change SHAKE_THRESHOLD and the cooldown window.` },
    ] },
    features: [
      { title: `Real acceleration deltas`, text: `Shake detection compares consecutive readings, not a timer.` },
      { title: `Three feature-detected paths`, text: `No API, iOS permission-gated, or ungated.` },
      { title: `iOS permission handling`, text: `requestPermission() called from a real tap gesture.` },
      { title: `Equal-weight fallback`, text: `The tap button runs the exact same undo function.` },
      { title: `Live motion meter`, text: `Visualizes accelerometer delta in real time.` },
      { title: `Shake cooldown`, text: `A 1s window stops one shake firing repeatedly.` },
      { title: `Named status messages`, text: `Explains exactly which path is active and why.` },
      { title: `No dependency`, text: `Pure DeviceMotion API, no motion library.` },
    ],
    useCases: [
      { title: 'Note and email apps', text: 'Undo a delete or send with a physical shake, comparing consecutive acceleration readings from the real `devicemotion` event.' },
      { title: 'Form and draft recovery', text: 'Revert an accidental clear by shaking, with an equal-weight tap button running the exact same undo function.' },
      { title: 'Mobile game shortcuts', text: 'Use shake gestures for resets, re-rolls or power-ups, handling the three paths of unsupported, iOS permission-gated and ungated devices.' },
      { title: 'Accessible undo', text: 'Always pair the gesture with a tappable control, since not everyone can shake a device reliably or at all.' },
      { title: 'Permission-gated API learning', text: 'Study how iOS requires `requestPermission()` to be called from a real tap, as a reference for any permission-gated sensor API in a progressive web app.' },
    ],
    faqs: [
      { q: `How is a real shake distinguished from normal device movement?`, a: `Every devicemotion event provides an x/y/z acceleration reading. The handler computes the absolute difference between the current and previous reading on each axis and sums them into a single delta value. Only when that delta exceeds SHAKE_THRESHOLD does it count as a shake — a single still or slowly-moving reading never triggers it, since a shake is specifically a large change between consecutive samples, not a large single reading.` },
      { q: `Why does the button need a permission prompt on iPhone but not Android?`, a: `iOS 13 and later gate DeviceMotionEvent behind an explicit permission check exposed as DeviceMotionEvent.requestPermission(), which the browser only allows to be called from inside a real user gesture like a tap — never automatically on page load. The snippet checks whether that method exists and, if so, shows a visible "Enable motion access" button rather than trying (and failing) to request it silently. Most Android browsers expose devicemotion without any such gate.` },
      { q: `What happens if DeviceMotion is unsupported or permission is denied?`, a: `The code checks typeof DeviceMotionEvent === 'undefined' first for browsers with no motion API at all, and handles a denied or failed permission request as a separate case. Both routes call the same fallbackNoMotion() function, which updates the status text to explain why and leaves the tap button as the complete, fully working undo path — not a disabled or lesser option.` },
      { q: `Why is the fallback button not just a backup — why call it equal?`, a: `Both the shake gesture and the button call the identical doUndo(source) function with only the source label differing. There is no separate, reduced code path for "no motion available" — the same undo logic runs either way, so a user on desktop or with motion denied gets exactly the same outcome as a user who successfully shakes their phone.` },
      { q: `How do I use this shake-to-undo pattern in React, Vue, or Angular?`, a: `Do the feature detection and event wiring inside a mount effect, storing the last acceleration reading and last-shake timestamp in refs (not state, since they update on every motion event). Call your real undo action from inside doUndo, and remove the devicemotion listener in the effect's cleanup function so it doesn't keep firing after unmount.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out DeviceMotion's platform quirks by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why shake detection needs to compare the delta between consecutive accelerationIncludingGravity readings rather than checking a single reading's magnitude, and why DeviceMotionEvent.requestPermission on iOS can only be called from inside a real tap handler rather than automatically on page load. The same assistant can help you optimize it — for instance asking whether SHAKE_THRESHOLD and the shake cooldown window should adapt based on a short calibration period reading the device's resting motion noise floor, rather than using one fixed constant for every device. It's also useful for extending the pattern: ask it to add a directional shake requirement (e.g. only trigger on left-right shakes, not up-down), persist whether the user previously granted motion permission so the prompt isn't re-shown every session, or apply the same feature-detect-then-honest-fallback structure to DeviceOrientation for a tilt-based interaction. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "shake to undo" interaction in plain HTML, CSS, and JavaScript using the real DeviceMotion API, with a fully-functional fallback for unsupported or permission-denied cases — follow a feature-detect-then-honest-fallback pattern, not a fake or decorative shake animation.

Requirements:
- A single undo function that performs the actual undo action, callable from more than one trigger source, with a short cooldown so it cannot fire twice within under a second of itself.
- A visible tap/click button that calls this exact same undo function directly — it must not be a separate, lesser, or differently-worded fallback path; it is the same action as the real gesture, just triggered by a tap.
- Real shake detection: listen for the devicemotion event, read event.accelerationIncludingGravity on each event, and compute the sum of absolute differences between the current reading's x/y/z and the previous reading's x/y/z. Only treat it as a shake, calling the undo function, when that computed delta exceeds a configurable threshold — a single acceleration reading alone must never be enough, since a shake is specifically a large change between consecutive samples.
- Explicit feature detection with three distinct handled cases: (1) DeviceMotionEvent does not exist at all (most desktop browsers) — detect via typeof DeviceMotionEvent === 'undefined' and go straight to the fallback messaging; (2) DeviceMotionEvent exists and exposes a requestPermission static method (iOS 13+ Safari) — in this case do NOT call requestPermission automatically; instead show a visible button that calls it only when tapped (since the browser requires the call to originate from a real user gesture), and start listening for devicemotion only if the promise resolves to 'granted', falling back honestly if denied or if the request itself throws; (3) DeviceMotionEvent exists with no permission gate (most non-iOS browsers) — begin listening immediately.
- A status text element that always explains, in plain language, which of the above states is currently active (no support / awaiting permission tap / permission denied / live and listening), so the user understands why they are or are not seeing real shake detection.
- A live visual meter (e.g. a fill bar) driven by the actual computed motion delta on every devicemotion event, so accelerometer activity is visible even before it crosses the shake threshold.`,
    },
  },
};

export default shakeToUndo;
