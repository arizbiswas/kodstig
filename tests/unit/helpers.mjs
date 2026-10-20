// Delade testhjälpare.
export function memoryStorage() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: (k) => { m.delete(k); },
    get size() { return m.size; },
  };
}
// Timers som körs direkt när vi ber om det, så testerna blir deterministiska.
export function manualTimers() {
  let id = 0; const q = new Map();
  return {
    setTimeout(fn, ms) { q.set(++id, fn); return id; },
    clearTimeout(i) { q.delete(i); },
    async runAll() { for (let n = 0; n < 50 && q.size; n++) { const fns = [...q.values()]; q.clear(); for (const f of fns) await f(); } },
  };
}
