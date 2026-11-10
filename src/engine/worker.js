// Kör elevkod i en egen Web Worker: ingen åtkomst till sidans DOM, kontodata
// eller lagring. Huvudtråden avbryter workern om den tar för lång tid.
import { runPython } from './python.js';
import { runCSharp } from './csharp.js';
import { runPixel } from './pixel/run.js';
import { simulate, keySchedule } from './pixel/game.js';
import { pythonSession } from './python.js';
import { csharpSession } from './csharp.js';

const sessions = { python: pythonSession, csharp: csharpSession };

const runners = { python: runPython, csharp: runCSharp };

self.onmessage = (e) => {
  const { id, lang, code, calls, trace, input, seed, pixel } = e.data || {};
  let res;
  try {
    if (pixel && pixel.game) res = simulate(lang, String(code || ''), { frames: pixel.game.frames, keys: keySchedule(pixel.game.keys), vars: pixel.game.vars || [] }, sessions);
    else if (pixel) res = runPixel(lang, String(code || ''), { level: pixel.level || null, input, seed, runners });
    else res = (lang === 'csharp' ? runCSharp : runPython)(String(code || ''), { calls: calls || [], trace: !!trace, input, seed });
  } catch (err) {
    res = { output: '', error: { kind: 'Internt fel', message: String(err && err.message || err), line: null, hint: 'internal', phase: 'runtime' }, calls: [] };
  }
  self.postMessage({ id, res });
};
