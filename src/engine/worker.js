// Kör elevkod i en egen Web Worker: ingen åtkomst till sidans DOM, kontodata
// eller lagring. Huvudtråden avbryter workern om den tar för lång tid.
import { runPython } from './python.js';
import { runCSharp } from './csharp.js';

self.onmessage = (e) => {
  const { id, lang, code, calls, trace, input, seed } = e.data || {};
  let res;
  try {
    res = (lang === 'csharp' ? runCSharp : runPython)(String(code || ''), { calls: calls || [], trace: !!trace, input, seed });
  } catch (err) {
    res = { output: '', error: { kind: 'Internt fel', message: String(err && err.message || err), line: null, hint: 'internal', phase: 'runtime' }, calls: [] };
  }
  self.postMessage({ id, res });
};
