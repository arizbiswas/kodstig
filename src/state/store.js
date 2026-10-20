// Store: håller en profil i minnet, sparar till ett backend med optimistisk
// låsning och återförsök, och slår ihop ändringar från andra flikar/enheter.
import { clone, merge, normalize, resetProfile, emptyProfile } from './model.js';

const BACKOFF = [1000, 2000, 5000, 10000, 30000];

// JSON med sorterade nycklar, så att lika profiler alltid jämförs lika.
export function stable(v) {
  if (Array.isArray(v)) return `[${v.map(stable).join(',')}]`;
  if (v && typeof v === 'object') return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`;
  return JSON.stringify(v);
}

export class Store {
  /**
   * @param {object} o
   * @param {object} o.backend  { load, save, reset, subscribe? }
   * @param {object} [o.cache]  { get, set, clear } – lokal kopia för omladdning och nätverksavbrott
   * @param {string} o.uid
   */
  constructor({ backend, cache = null, uid, saveDelay = 600, timers = globalThis }) {
    this.backend = backend;
    this.cache = cache;
    this.uid = uid;
    this.saveDelay = saveDelay;
    this.timers = timers;
    this.state = emptyProfile();
    this.rev = 0;
    this.epoch = 0;
    this.dirty = false;
    this.version = 0;
    this.status = 'idle';
    this.retries = 0;
    this.flushing = null;
    this.timer = null;
    this.disposed = false;
    this.listeners = new Set();
    this.unsub = null;
  }

  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit(type) { for (const fn of this.listeners) { try { fn(type, this); } catch (e) { console.error(e); } } }
  setStatus(s) { if (this.status !== s) { this.status = s; this.emit('status'); } }

  async init() {
    const cached = this.cache && this.cache.get();
    if (cached && cached.doc) {
      this.state = normalize(cached.doc);
      this.rev = cached.rev || 0;
      this.epoch = cached.epoch || 0;
      this.dirty = !!cached.pending;
    }
    try {
      const remote = await this.backend.load();
      this.absorb(remote);
      this.setStatus(this.dirty ? 'pending' : 'saved');
    } catch (e) {
      this.setStatus('offline');
      this.scheduleRetry();
    }
    if (this.backend.subscribe) this.unsub = this.backend.subscribe(() => this.pull());
    if (this.dirty) this.schedule(0);
    this.emit('change');
    return this;
  }

  /** Tar in en version från servern. */
  absorb(remote) {
    if (!remote) {
      // Ingen rad på servern än (nytt konto) – skapa den vid nästa sparning.
      if (this.rev !== 0) { this.rev = 0; this.epoch = 0; this.state.epoch = 0; }
      this.dirty = true;
      return 'none';
    }
    const doc = normalize(remote.doc);
    if (remote.epoch > this.epoch) {
      // Nollställd någon annanstans: lokala ändringar från före nollställningen kastas.
      this.state = doc;
      this.state.epoch = remote.epoch;
      this.epoch = remote.epoch;
      this.rev = remote.rev;
      this.dirty = false;
      this.version++;
      this.writeCache();
      this.emit('replaced');
      return 'replaced';
    }
    if (remote.epoch < this.epoch) return 'ignored';
    const merged = merge(this.state, doc);
    merged.epoch = this.epoch;
    const changedLocal = stable(merged) !== stable(this.state);
    const needsPush = stable(merged) !== stable({ ...doc, epoch: this.epoch });
    this.state = merged;
    this.rev = remote.rev;
    if (needsPush) this.dirty = true;
    else if (!this.flushing) this.dirty = false;
    if (changedLocal) { this.version++; this.emit('change'); }
    this.writeCache();
    return 'merged';
  }

  async pull() {
    if (this.disposed) return;
    try {
      const remote = await this.backend.load();
      if (this.disposed) return;
      this.absorb(remote);
      if (this.dirty) this.schedule(0);
    } catch { /* tyst: nästa sparning försöker igen */ }
  }

  /** Ändrar profilen. `fn` får en klon och returnerar den (eller muterar den). */
  update(fn) {
    if (this.disposed) return undefined;
    const draft = clone(this.state);
    const res = fn(draft);
    this.state = res && typeof res === 'object' && res.completed ? res : draft;
    this.state.epoch = this.epoch;
    this.version++;
    this.dirty = true;
    this.writeCache();
    this.setStatus('pending');
    this.emit('change');
    this.schedule(this.saveDelay);
    return this.state;
  }

  schedule(ms) {
    if (this.disposed) return;
    if (this.timer) this.timers.clearTimeout(this.timer);
    this.timer = this.timers.setTimeout(() => { this.timer = null; this.flush(); }, ms);
  }
  scheduleRetry() {
    const ms = BACKOFF[Math.min(this.retries, BACKOFF.length - 1)];
    this.retries++;
    this.schedule(ms);
  }

  async flush() {
    if (this.disposed) return;
    if (this.flushing) { await this.flushing; if (this.dirty) return this.flush(); return; }
    if (!this.dirty) return;
    this.flushing = this._flushOnce();
    try { await this.flushing; } finally { this.flushing = null; }
    if (this.dirty && this.status !== 'offline' && this.status !== 'error') return this.flush();
  }

  async _flushOnce() {
    this.setStatus('saving');
    const sentVersion = this.version;
    const doc = clone(this.state);
    let res;
    try {
      res = await this.backend.save(doc, this.rev, this.epoch);
    } catch (e) {
      if (this.disposed) return;
      this.setStatus(e && e.offline === false ? 'error' : 'offline');
      this.writeCache();
      this.scheduleRetry();
      return;
    }
    if (this.disposed) return;
    this.retries = 0;
    if (res.ok) {
      this.rev = res.rev;
      if (this.version === sentVersion) this.dirty = false;
      this.writeCache();
      this.setStatus(this.dirty ? 'pending' : 'saved');
      if (this.backend.notify) this.backend.notify();
      return;
    }
    // Konflikt: någon annan har sparat eller nollställt.
    const outcome = this.absorb(res.current);
    if (outcome === 'replaced') { this.setStatus('saved'); return; }
    if (outcome === 'none') this.dirty = true;
    this.setStatus('pending');
  }

  async reset() {
    const doc = resetProfile(this.state);
    const res = await this.backend.reset(doc);
    this.state = normalize(res.doc);
    this.epoch = res.epoch;
    this.state.epoch = res.epoch;
    this.rev = res.rev;
    this.dirty = false;
    this.version++;
    this.writeCache();
    this.setStatus('saved');
    if (this.backend.notify) this.backend.notify();
    this.emit('replaced');
    this.emit('change');
  }

  writeCache() {
    if (!this.cache) return;
    this.cache.set({ doc: this.state, rev: this.rev, epoch: this.epoch, pending: this.dirty });
  }

  /** Sparar det som väntar och kopplar ur. */
  async dispose({ flush = true } = {}) {
    if (flush && this.dirty) { try { await Promise.race([this.flush(), new Promise((r) => this.timers.setTimeout(r, 4000))]); } catch { /* ignore */ } }
    this.disposed = true;
    if (this.timer) this.timers.clearTimeout(this.timer);
    if (this.unsub) this.unsub();
    this.listeners.clear();
  }
}

// ---------- Hjälpare för webbläsarlagring ----------
export function safeStorage(kind = 'localStorage') {
  try {
    const s = globalThis[kind];
    const k = '__kodstig_test__';
    s.setItem(k, '1'); s.removeItem(k);
    return s;
  } catch { return null; }
}

export function storageCache(storage, key) {
  return {
    get() { try { const raw = storage && storage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; } },
    set(v) { try { storage && storage.setItem(key, JSON.stringify(v)); } catch { /* full eller blockerad */ } },
    clear() { try { storage && storage.removeItem(key); } catch { /* ignore */ } },
  };
}
