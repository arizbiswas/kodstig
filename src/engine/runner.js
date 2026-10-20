// Huvudtrådens API för att köra kod. Varje körning har en tidsgräns; om den
// passeras avslutas workern helt och en ny skapas vid nästa körning.
import { runWebChecks } from './html-check.js';

let worker = null;
let seq = 0;
const pending = new Map();
const TIMEOUT_MS = 5000;

function failAll(error) {
  for (const [, p] of pending) { clearTimeout(p.timer); p.resolve({ output: '', error, calls: [] }); }
  pending.clear();
}

function ensureWorker() {
  if (worker) return worker;
  worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
  worker.onmessage = (e) => {
    const p = pending.get(e.data.id);
    if (!p) return;
    clearTimeout(p.timer);
    pending.delete(e.data.id);
    p.resolve(e.data.res);
  };
  worker.onerror = () => {
    worker && worker.terminate();
    worker = null;
    failAll({ kind: 'Internt fel', message: 'Kodmotorn kunde inte starta. Ladda om sidan och försök igen.', line: null, hint: 'internal', phase: 'runtime' });
  };
  return worker;
}

export function runCode(lang, code, calls = []) {
  return new Promise((resolve) => {
    let w;
    try { w = ensureWorker(); } catch {
      // Om Web Workers saknas körs tolken i sidan (den är fortfarande utan eval).
      import(lang === 'csharp' ? './csharp.js' : './python.js').then((m) => resolve((m.runCSharp || m.runPython)(code, { calls })));
      return;
    }
    const id = ++seq;
    const timer = setTimeout(() => {
      pending.delete(id);
      if (worker) { worker.terminate(); worker = null; }
      failAll({ kind: 'Tidsgräns', message: 'Koden tog för lång tid och stoppades.', line: null, hint: 'infinite-loop', phase: 'runtime' });
      resolve({ output: '', error: { kind: 'Tidsgräns', message: 'Koden tog för lång tid och stoppades. Kanske en loop som aldrig slutar?', line: null, hint: 'infinite-loop', phase: 'runtime' }, calls: [] });
    }, TIMEOUT_MS);
    pending.set(id, { resolve, timer });
    w.postMessage({ id, lang, code, calls });
  });
}

export function checkWeb(ex, html) {
  return runWebChecks(ex, html, (s) => new DOMParser().parseFromString(s, 'text/html'));
}

// Förhandsvisning: sandbox utan allow-scripts och allow-same-origin, plus CSP.
export function previewSrcdoc(html) {
  return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src https: data:; font-src https: data:"><style>html{background:#fff;color:#1f1d2b}body{font-family:system-ui,sans-serif;margin:12px}</style>${html}`;
}
