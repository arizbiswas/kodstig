// Huvudtrådens del av spelen: en bildruta i taget, ungefär 30 gånger per sekund.
// En vakthund avslutar workern om en bildruta tar mer än 1,5 sekunder.
export const FRAME_MS = 33;
export const WATCHDOG_MS = 1500;
const START_MS = 5000;

export function createGameRunner({ onFrame, onError, onOutput = () => {}, onStop = () => {} }) {
  let worker = null, seq = 0, running = false, timer = 0, keys = {}, last = 0;
  const pending = new Map();

  const kill = () => {
    if (worker) worker.terminate();
    worker = null;
    for (const [, p] of pending) { clearTimeout(p.dog); p.resolve(null); }
    pending.clear();
  };
  const ensure = () => {
    if (worker) return worker;
    worker = new Worker(new URL('./game-worker.js', import.meta.url), { type: 'module' });
    worker.onmessage = (e) => {
      const p = pending.get(e.data.id);
      if (!p) return;
      clearTimeout(p.dog);
      pending.delete(e.data.id);
      p.resolve(e.data.res);
    };
    worker.onerror = () => { kill(); fail({ kind: 'Internt fel', message: 'Spelmotorn kunde inte starta. Ladda om sidan och försök igen.', line: null }); };
    return worker;
  };
  const ask = (msg, ms) => new Promise((resolve) => {
    const id = ++seq;
    const dog = setTimeout(() => {
      pending.delete(id);
      kill();
      resolve({ timeout: true });
    }, ms);
    pending.set(id, { resolve, dog });
    ensure().postMessage({ id, ...msg });
  });
  function fail(error) {
    running = false;
    clearTimeout(timer);
    onError(error);
    onStop();
  }
  const handle = (res, what) => {
    if (!res) return false;
    if (res.timeout) {
      fail({ kind: 'Tidsgräns', message: `${what} tog mer än ${WATCHDOG_MS / 1000} sekunder och spelet stoppades. Har du en loop som aldrig slutar? Varje bildruta ska bara göra en liten bit.`, line: null, hint: 'infinite-loop' });
      return false;
    }
    if (res.output) onOutput(res.output);
    if (res.ops) onFrame(res.ops);
    if (res.error) { fail(res.error); return false; }
    return !res.stopped;
  };
  async function tick() {
    if (!running) return;
    const now = performance.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const res = await ask({ type: 'frame', keys: { ...keys }, dt }, WATCHDOG_MS);
    if (!running) return;
    if (!handle(res, 'En bildruta')) return;
    const spent = performance.now() - now;
    timer = setTimeout(tick, Math.max(0, FRAME_MS - spent));
  }

  return {
    async start(lang, code) {
      this.stop();
      running = true;
      keys = {};
      const res = await ask({ type: 'start', lang, code }, START_MS);
      if (!running) return;
      if (!handle(res, 'Starten')) return;
      last = performance.now();
      timer = setTimeout(tick, FRAME_MS);
    },
    stop() {
      const was = running;
      running = false;
      clearTimeout(timer);
      if (worker) { for (const [, p] of pending) { clearTimeout(p.dog); p.resolve(null); } pending.clear(); worker.postMessage({ id: ++seq, type: 'stop' }); }
      if (was) onStop();
    },
    setKey(k, down) { if (down) keys[k] = true; else delete keys[k]; },
    clearKeys() { keys = {}; },
    get running() { return running; },
    destroy() { running = false; clearTimeout(timer); kill(); },
  };
}
