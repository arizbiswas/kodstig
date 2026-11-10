// Kör ett spel i en egen Web Worker. Programmet lever kvar mellan bildrutorna,
// och huvudtråden ber om en bildruta i taget. Hänger sig en bildruta avslutar
// huvudtråden hela workern (se game-runner.js).
import { pythonSession } from './python.js';
import { csharpSession } from './csharp.js';
import { startGame, frame } from './pixel/game.js';

const sessions = { python: pythonSession, csharp: csharpSession };
let game = null;

self.onmessage = (e) => {
  const { id, type, lang, code, keys, dt } = e.data || {};
  let res;
  try {
    if (type === 'start') {
      const r = startGame(lang, String(code || ''), sessions);
      game = r.error ? null : r.game;
      res = { ops: r.ops || [], output: r.output || '', error: r.error || null };
    } else if (type === 'frame') {
      if (!game) res = { ops: [], output: '', error: null, stopped: true };
      else {
        res = frame(game, keys || {}, typeof dt === 'number' ? dt : 1 / 30);
        if (res.error) game = null;
      }
    } else if (type === 'stop') {
      game = null;
      res = { ok: true };
    }
  } catch (err) {
    game = null;
    res = { ops: [], output: '', error: { kind: 'Internt fel', message: String(err && err.message || err), line: null, hint: 'internal', phase: 'runtime' } };
  }
  self.postMessage({ id, res });
};
