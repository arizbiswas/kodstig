// Räknar aktiv övningstid: bara när fliken syns och användaren nyligen har
// interagerat. En bortglömd flik räknas inte.
import { today } from './progression.js';

const IDLE_MS = 60000;
const TICK_MS = 5000;
const FLUSH_MS = 30000;

export function deviceId(storage) {
  try {
    let id = storage.getItem('kodstig.device');
    if (!id) { id = Math.random().toString(36).slice(2, 10); storage.setItem('kodstig.device', id); }
    return id;
  } catch { return 'okand'; }
}

export function startActivity(onFlush) {
  let last = Date.now();
  let pending = 0;
  const bump = () => { last = Date.now(); };
  const events = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'input'];
  events.forEach((e) => window.addEventListener(e, bump, { passive: true, capture: true }));
  const tick = setInterval(() => {
    if (document.visibilityState === 'visible' && Date.now() - last < IDLE_MS) pending += TICK_MS / 1000;
  }, TICK_MS);
  const flush = () => { if (pending > 0) { const s = pending; pending = 0; onFlush(today(), s); } };
  const flusher = setInterval(flush, FLUSH_MS);
  const onHide = () => { if (document.visibilityState === 'hidden') flush(); };
  document.addEventListener('visibilitychange', onHide);
  return () => {
    flush();
    clearInterval(tick); clearInterval(flusher);
    events.forEach((e) => window.removeEventListener(e, bump, { capture: true }));
    document.removeEventListener('visibilitychange', onHide);
  };
}
