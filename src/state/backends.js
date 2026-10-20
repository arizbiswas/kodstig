// Lagringsbackends för Store.
//  - localBackend: profil utan konto, bara i den här webbläsaren.
//  - supabaseBackend: kontoprofil i Supabase. Ägaren avgörs av servern (auth.uid()).

export function localBackend(storage, key = 'kodstig.guest.v1') {
  const read = () => {
    try { const raw = storage && storage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; }
  };
  const write = (v) => { if (!storage) throw Object.assign(new Error('Lagring blockerad'), { offline: false }); storage.setItem(key, JSON.stringify(v)); };
  return {
    kind: 'local',
    async load() { return read(); },
    async save(doc, rev, epoch) {
      const cur = read();
      if (cur && (cur.rev !== rev || cur.epoch !== epoch)) return { ok: false, current: cur };
      if (!cur && rev !== 0) return { ok: false, current: null };
      const next = { doc: { ...doc, epoch }, rev: rev + 1, epoch };
      write(next);
      return { ok: true, rev: next.rev };
    },
    async reset(doc) {
      const cur = read();
      const epoch = (cur ? cur.epoch : 0) + 1;
      const next = { doc: { ...doc, epoch }, rev: (cur ? cur.rev : 0) + 1, epoch };
      write(next);
      return next;
    },
    subscribe(cb) {
      if (typeof window === 'undefined') return () => {};
      const h = (e) => { if (e.key === key) cb(); };
      window.addEventListener('storage', h);
      return () => window.removeEventListener('storage', h);
    },
    clear() { try { storage && storage.removeItem(key); } catch { /* ignore */ } },
    peek: read,
  };
}

export function supabaseBackend(sb, uid) {
  const chan = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(`kodstig-sync-${uid}`) : null;
  const rpc = async (name, args) => {
    let res;
    try {
      res = await sb.rpc(name, args);
    } catch (e) {
      throw Object.assign(new Error('Nätverksfel'), { offline: true, cause: e });
    }
    if (res.error) {
      const offline = !res.status || res.status === 0 || /fetch|network/i.test(res.error.message || '');
      throw Object.assign(new Error(res.error.message), { offline, code: res.error.code });
    }
    return res.data;
  };
  return {
    kind: 'supabase',
    async load() { return rpc('kodstig_load'); },
    async save(doc, rev, epoch) { return rpc('kodstig_save', { p_doc: doc, p_rev: rev, p_epoch: epoch }); },
    async reset(doc) { return rpc('kodstig_reset', { p_doc: doc }); },
    notify() { try { chan && chan.postMessage('saved'); } catch { /* ignore */ } },
    subscribe(cb) {
      const onMsg = () => cb();
      const onVis = () => { if (document.visibilityState === 'visible') cb(); };
      const onOnline = () => cb();
      if (chan) chan.addEventListener('message', onMsg);
      document.addEventListener('visibilitychange', onVis);
      window.addEventListener('online', onOnline);
      return () => {
        if (chan) { chan.removeEventListener('message', onMsg); chan.close(); }
        document.removeEventListener('visibilitychange', onVis);
        window.removeEventListener('online', onOnline);
      };
    },
  };
}
