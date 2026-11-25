/* ─────────────────────────────────────────────────────────────
   Frame recorder — plays pre-rendered frames into MediaRecorder at an exact
   frame rate (MP4 where the browser can record it, Chrome/Edge; else WebM).
   Same two-pass approach as the social post video export
   (components/SocialPostTemplates/render.js): render every frame first,
   then record, so slow frames never make the video stutter.
───────────────────────────────────────────────────────────── */

const VIDEO_TYPES = ['video/mp4;codecs=avc1.42E01E', 'video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'];

export function videoSupport() {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined' || !HTMLCanvasElement.prototype.captureStream) return null;
  const type = VIDEO_TYPES.find(tp => MediaRecorder.isTypeSupported(tp));
  return type ? { type, ext: type.startsWith('video/mp4') ? 'mp4' : 'webm' } : null;
}

/**
 * frames: image Blobs (JPEG/PNG), all w × h.
 * loops: how many times to play the frame list (a seamless loop can be repeated).
 * Returns { blob, ext }.
 */
export async function recordFrames(frames, { w, h, fps = 30, loops = 1, onProgress, signal, bitrate = 10_000_000 }) {
  const support = videoSupport();
  if (!support) throw new Error('This browser can’t record video. Try Chrome or Edge.');
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const bitmaps = new Map();
  const bitmapOf = async b => {
    if (!bitmaps.has(b)) bitmaps.set(b, await createImageBitmap(b));
    return bitmaps.get(b);
  };
  ctx.drawImage(await bitmapOf(frames[0]), 0, 0);
  // captureStream(0) + requestFrame(): every drawn frame is pushed explicitly (an off-screen
  // canvas may never repaint, which froze the video on its first frame with captureStream(fps)).
  const stream = canvas.captureStream(0);
  const track = stream.getVideoTracks()[0];
  const push = () => { if (track?.requestFrame) track.requestFrame(); };
  push();
  const rec = new MediaRecorder(stream, { mimeType: support.type, videoBitsPerSecond: bitrate });
  const chunks = [];
  rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  const stopped = new Promise(res => { rec.onstop = res; });
  rec.start();
  const t0 = performance.now();
  const total = frames.length * loops;
  try {
    for (let n = 0; n < total; n++) {
      if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError');
      ctx.drawImage(await bitmapOf(frames[n % frames.length]), 0, 0);
      push();
      onProgress?.({ phase: 'record', done: n + 1, total });
      const wait = t0 + ((n + 1) * 1000) / fps - performance.now();
      if (wait > 0) await new Promise(r => setTimeout(r, wait));
    }
  } catch (e) {
    rec.stop();
    stream.getTracks().forEach(tr => tr.stop());
    bitmaps.forEach(b => b.close?.());
    throw e;
  }
  rec.stop();
  await stopped;
  stream.getTracks().forEach(tr => tr.stop());
  bitmaps.forEach(b => b.close?.());
  return { blob: new Blob(chunks, { type: support.type.split(';')[0] }), ext: support.ext };
}
