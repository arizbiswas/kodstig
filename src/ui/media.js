// Ljud, firande-GIF och konfetti. Allt här är dekor: om en fil saknas eller
// webbläsaren blockerar uppspelning fortsätter appen som vanligt.
import { reducedMotion } from './dom.js';

const BASE = import.meta.env.BASE_URL || '/';
export const MEDIA = {
  correct: `${BASE}audio/rizz-sound-effect.mp3`,
  loop: `${BASE}audio/level-complete-loop.wav`,
  gif: `${BASE}media/level-complete.gif`,
  poster: `${BASE}media/level-complete-poster.jpg`,
  milo: `${BASE}companions/milo.svg`,
};
export const LOOP_SECONDS = 4;

let ctx = null;
function audioCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

// Reservljud (en kort ton) om ljudfilen saknas, så att rätt svar ändå hörs.
function chime() {
  const c = audioCtx();
  if (!c) return;
  const t = c.currentTime;
  const o = c.createOscillator(), g = c.createGain();
  o.type = 'triangle';
  o.frequency.setValueAtTime(660, t);
  o.frequency.exponentialRampToValueAtTime(990, t + 0.12);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
  o.connect(g).connect(c.destination);
  o.start(t); o.stop(t + 0.4);
}

const fileState = {};
async function exists(url) {
  if (fileState[url] !== undefined) return fileState[url];
  try { const r = await fetch(url, { method: 'HEAD' }); fileState[url] = r.ok && !/text\/html/.test(r.headers.get('content-type') || ''); }
  catch { fileState[url] = false; }
  return fileState[url];
}
export const mediaAvailable = exists;

let correctAudio = null;
export async function playCorrect() {
  try {
    if (!(await exists(MEDIA.correct))) { chime(); return 'fallback'; }
    if (!correctAudio) correctAudio = new Audio(MEDIA.correct);
    correctAudio.currentTime = 0;
    correctAudio.volume = 0.7;
    await correctAudio.play();
    return 'file';
  } catch (e) {
    if (e && e.name === 'NotAllowedError') return 'blocked';
    chime();
    return 'fallback';
  }
}

// Firandeslingan: bara de första fyra sekunderna, och aldrig två samtidigt.
let loopBuffer = null;
let active = null;
export const loopState = { playing: false };

export async function startLoop() {
  stopLoop();
  const token = {};
  active = token;
  const c = audioCtx();
  if (!c) return 'unsupported';
  try {
    if (!loopBuffer) {
      if (!(await exists(MEDIA.loop))) return 'missing';
      const res = await fetch(MEDIA.loop);
      const buf = await res.arrayBuffer();
      loopBuffer = await c.decodeAudioData(buf);
    }
    if (active !== token) return 'cancelled';
    if (c.state === 'suspended') { try { await c.resume(); } catch { /* blockerat */ } }
    if (c.state !== 'running') return 'blocked';
    if (active !== token) return 'cancelled';
    const src = c.createBufferSource();
    const gain = c.createGain();
    gain.gain.value = 0.55;
    src.buffer = loopBuffer;
    src.loop = true;
    src.loopStart = 0;
    src.loopEnd = Math.min(LOOP_SECONDS, loopBuffer.duration);
    src.connect(gain).connect(c.destination);
    src.start(0, 0);
    token.src = src;
    loopState.playing = true;
    return 'playing';
  } catch {
    return 'error';
  }
}

export function stopLoop() {
  if (active && active.src) { try { active.src.stop(); active.src.disconnect(); } catch { /* ignore */ } }
  active = null;
  loopState.playing = false;
}

export function playSample() { return playCorrect(); }

// Konfetti vid ny nivå: kort, liten och klickbar igenom.
let confettiCanvas = null;
export function confetti() {
  stopConfetti();
  if (reducedMotion()) return false;
  const cv = document.createElement('canvas');
  cv.className = 'confetti';
  cv.setAttribute('aria-hidden', 'true');
  document.body.append(cv);
  confettiCanvas = cv;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = window.innerWidth, H = window.innerHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  const g = cv.getContext('2d');
  if (!g) { cv.remove(); return false; }
  g.scale(dpr, dpr);
  const colors = ['#8b6fd6', '#5fae7b', '#f2c94c', '#f28b82', '#6fb3e0'];
  const parts = Array.from({ length: 70 }, () => ({
    x: W / 2 + (Math.random() - 0.5) * 120, y: H * 0.35,
    vx: (Math.random() - 0.5) * 9, vy: -Math.random() * 9 - 3,
    s: 5 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
    c: colors[Math.floor(Math.random() * colors.length)],
  }));
  const start = performance.now();
  const DURATION = 1600;
  const frame = (t) => {
    if (confettiCanvas !== cv) return;
    const p = (t - start) / DURATION;
    g.clearRect(0, 0, W, H);
    g.globalAlpha = Math.max(0, 1 - p * p);
    for (const q of parts) {
      q.vy += 0.28; q.x += q.vx; q.y += q.vy; q.r += q.vr;
      g.save(); g.translate(q.x, q.y); g.rotate(q.r); g.fillStyle = q.c; g.fillRect(-q.s / 2, -q.s / 3, q.s, q.s * 0.6); g.restore();
    }
    if (p < 1) requestAnimationFrame(frame); else stopConfetti();
  };
  requestAnimationFrame(frame);
  return true;
}
export function stopConfetti() {
  if (confettiCanvas) { confettiCanvas.remove(); confettiCanvas = null; }
}
