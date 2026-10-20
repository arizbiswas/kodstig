// Milo, AI-studiekompisen. Logiken här är oberoende av själva modellen så att
// den kan testas med en låtsasmotor. Den riktiga motorn (WebLLM) laddas först
// när användaren uttryckligen väljer "Starta Milo".

export const MILO_SYSTEM = `Du är Milo, en liten AI-studiekompis i Kodstig med en vänlig panda som avatar. Svara på naturlig svenska om användaren inte vill annat. Var varm, konkret och respektfull. Lyssna på exakt det användaren skriver och följ upp tidigare delar av samtalet. Upprepa inte samma peppfraser. Hjälp vid överväldigande och självtvivel genom att bekräfta kort och erbjuda ett mycket litet, rimligt nästa steg. Ställ högst en relevant följdfråga när det behövs. Ibland räcker ett lyssnande svar. Skriv normalt 2–5 meningar. Undvik föreläsningar, press, skuldbeläggning och överdrivna löften. Var tydlig med att du är en AI. Låtsas inte vara människa, ha egna känslor eller kunna ställa diagnoser. Ge en ledtråd före en hel kodlösning. Påstå inte att du har kört kod eller sett framsteg som du inte har tillgång till.

Sammanhang: Kodstig lär ut C#, Python och HTML/CSS till nybörjare. Du ser bara det användaren skriver här och kod som användaren själv valt att bifoga.`;

export const MODEL_F16 = 'Qwen3-1.7B-q4f16_1-MLC';
export const MODEL_F32 = 'Qwen3-1.7B-q4f32_1-MLC';
export const CONTEXT_TOKENS = 4096;
export const RESPONSE_TOKENS = 360;
export const MAX_INPUT_CHARS = 1200;
export const MAX_CODE_CHARS = 2400;
export const SLOW_MS = 20000;
export const TIMEOUT_MS = 120000;

// Grov uppskattning: svensk text ger ungefär 3 tecken per token.
export const estimateTokens = (s) => Math.ceil(String(s || '').length / 3) + 4;

export function stripThinking(text) {
  return String(text || '')
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .replace(/<think>[\s\S]*$/, '')
    .replace(/^\s+/, '');
}

export function userContent(text, code, lang) {
  if (!code) return text;
  const fence = lang === 'web' ? 'html' : lang === 'csharp' ? 'csharp' : 'python';
  return `${text}\n\nKod jag valde att bifoga från Kodlabbet:\n\`\`\`${fence}\n${code}\n\`\`\``;
}

/** Bygger meddelandelistan och kortar historiken så att den ryms i modellens fönster. */
export function buildMessages(history, system = MILO_SYSTEM) {
  const budget = CONTEXT_TOKENS - RESPONSE_TOKENS - 200;
  const msgs = history.filter((m) => m.role === 'user' || (m.role === 'assistant' && m.content));
  const out = [];
  let used = estimateTokens(system);
  for (let i = msgs.length - 1; i >= 0; i--) {
    const t = estimateTokens(msgs[i].content);
    if (used + t > budget) break;
    used += t;
    out.unshift({ role: msgs[i].role, content: msgs[i].content });
  }
  while (out.length && out[0].role !== 'user') out.shift();
  return [{ role: 'system', content: system }, ...out];
}

export function friendlyError(err) {
  const m = String(err && (err.message || err) || '');
  if (/webgpu|navigator\.gpu|adapter/i.test(m)) return 'Den här webbläsaren eller enheten kan inte köra Milo, eftersom WebGPU saknas. Lektioner och kodtips fungerar som vanligt.';
  if (/out of memory|oom|device (was )?lost|allocation|maxBufferSize|memory/i.test(m)) return 'Enheten verkar ha för lite grafikminne för Milo. Stäng andra flikar och prova igen, eller använd en annan enhet.';
  if (/quota|storage/i.test(m)) return 'Webbläsaren har inte plats att spara modellen. Frigör lagringsutrymme och prova igen.';
  if (/fetch|network|load failed|net::/i.test(m)) return 'Nätverksfel när modellen hämtades. Kontrollera anslutningen och prova igen.';
  return `Milo kunde inte svara: ${m || 'okänt fel'}.`;
}

/**
 * Kontrollerar WebGPU och väljer modellvariant.
 * Returnerar { ok, model?, reason? }.
 */
export async function checkSupport(nav = globalThis.navigator) {
  if (!nav || !nav.gpu) return { ok: false, reason: 'Din webbläsare saknar WebGPU. Prova en aktuell version av Chrome eller Edge på en dator.' };
  let adapter;
  try { adapter = await nav.gpu.requestAdapter(); } catch { adapter = null; }
  if (!adapter) return { ok: false, reason: 'Webbläsaren hittade inget grafikkort som kan användas med WebGPU.' };
  const f16 = adapter.features && adapter.features.has && adapter.features.has('shader-f16');
  const lowMem = nav.deviceMemory && nav.deviceMemory < 4;
  return { ok: true, model: f16 ? MODEL_F16 : MODEL_F32, warning: lowMem ? 'Enheten verkar ha lite minne, så det kan gå långsamt eller misslyckas.' : null };
}

export class Milo {
  /**
   * @param {object} o
   * @param {Storage|null} o.storage   sessionStorage (flikens session)
   * @param {string} o.uid             kontot samtalet hör till
   * @param {Function} o.engineFactory ({model, onProgress, signal}) => Promise<engine>
   * @param {Function} [o.support]     () => Promise<{ok, model, reason}>
   */
  constructor({ storage, uid, engineFactory, support = checkSupport, now = () => Date.now(), timers = globalThis }) {
    this.storage = storage;
    this.uid = uid;
    this.engineFactory = engineFactory;
    this.support = support;
    this.now = now;
    this.timers = timers;
    this.engine = null;
    this.status = 'off'; // off | checking | unsupported | loading | ready | busy | error
    this.progress = null;
    this.error = null;
    this.loadToken = 0;
    this.genToken = 0;
    this.abort = null;
    this.listeners = new Set();
    this.messages = this.restore();
  }

  get key() { return `kodstig.milo.${this.uid}`; }
  restore() {
    try { const raw = this.storage && this.storage.getItem(this.key); return raw ? JSON.parse(raw) : []; } catch { return []; }
  }
  persist() {
    try { this.storage && this.storage.setItem(this.key, JSON.stringify(this.messages.slice(-40))); } catch { /* ignore */ }
  }
  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit() { for (const fn of this.listeners) { try { fn(this); } catch (e) { console.error(e); } } }
  set(patch) { Object.assign(this, patch); this.emit(); }

  async start() {
    if (['loading', 'ready', 'busy', 'checking'].includes(this.status)) return;
    const token = ++this.loadToken;
    this.set({ status: 'checking', error: null, progress: null });
    const sup = await this.support();
    if (token !== this.loadToken) return;
    if (!sup.ok) { this.set({ status: 'unsupported', error: sup.reason }); return; }
    this.abort = typeof AbortController !== 'undefined' ? new AbortController() : null;
    this.set({ status: 'loading', progress: { ratio: 0, text: 'Förbereder…' }, warning: sup.warning || null });
    try {
      const engine = await this.engineFactory({
        model: sup.model,
        signal: this.abort && this.abort.signal,
        onProgress: (p) => { if (token === this.loadToken) this.set({ progress: { ratio: p.progress ?? 0, text: p.text || '' } }); },
      });
      if (token !== this.loadToken) { try { await engine.unload(); } catch { /* ignore */ } return; }
      this.engine = engine;
      this.set({ status: 'ready', progress: null });
    } catch (e) {
      if (token !== this.loadToken) return;
      this.set({ status: 'error', error: friendlyError(e), progress: null });
    }
  }

  cancelStart() {
    this.loadToken++;
    if (this.abort) this.abort.abort();
    this.set({ status: 'off', progress: null });
  }

  validate(text) {
    const t = String(text || '').trim();
    if (!t) return 'Skriv något först.';
    if (t.length > MAX_INPUT_CHARS) return `Meddelandet är för långt för Milos lilla minne. Korta ner det till högst ${MAX_INPUT_CHARS} tecken.`;
    return null;
  }

  async send(text, { code = null, lang = null } = {}) {
    const problem = this.validate(text);
    if (problem) return { error: problem };
    if (this.status !== 'ready' || !this.engine) return { error: 'Starta Milo först.' };
    let attached = code ? String(code) : null;
    if (attached && attached.length > MAX_CODE_CHARS) attached = attached.slice(0, MAX_CODE_CHARS) + '\n… (resten av koden togs inte med)';
    const user = { role: 'user', content: userContent(text.trim(), attached, lang), shown: text.trim(), code: attached ? true : undefined };
    this.messages.push(user);
    const reply = { role: 'assistant', content: '', pending: true };
    this.messages.push(reply);
    this.persist();
    const gen = ++this.genToken;
    this.set({ status: 'busy', slow: false });
    const slowTimer = this.timers.setTimeout(() => { if (gen === this.genToken) this.set({ slow: true }); }, SLOW_MS);
    const hardTimer = this.timers.setTimeout(() => { if (gen === this.genToken) this.stop('timeout'); }, TIMEOUT_MS);
    let raw = '';
    try {
      const stream = await this.engine.chat(buildMessages(this.messages.slice(0, -1)), { max_tokens: RESPONSE_TOKENS });
      for await (const delta of stream) {
        if (gen !== this.genToken) break;
        raw += delta;
        reply.content = stripThinking(raw);
        this.emit();
      }
      if (gen !== this.genToken) return { stale: true };
      reply.pending = false;
      if (!reply.content.trim()) { reply.role = 'error'; reply.content = 'Milo gav inget svar. Prova att formulera om dig.'; }
    } catch (e) {
      if (gen !== this.genToken) return { stale: true };
      reply.role = 'error';
      reply.pending = false;
      reply.content = friendlyError(e);
    } finally {
      this.timers.clearTimeout(slowTimer);
      this.timers.clearTimeout(hardTimer);
    }
    this.persist();
    this.set({ status: this.engine ? 'ready' : 'off', slow: false });
    return { ok: reply.role === 'assistant' };
  }

  stop(reason = 'user') {
    if (this.status !== 'busy') return;
    this.genToken++;
    try { this.engine && this.engine.interrupt(); } catch { /* ignore */ }
    const last = this.messages[this.messages.length - 1];
    if (last && last.pending) {
      last.pending = false;
      if (reason === 'timeout') { last.role = 'error'; last.content = 'Svaret tog för lång tid och avbröts. Prova en kortare fråga.'; }
      else if (!last.content) { last.role = 'note'; last.content = 'Svaret avbröts.'; }
      else last.content += ' …(avbrutet)';
    }
    this.persist();
    this.set({ status: this.engine ? 'ready' : 'off', slow: false });
  }

  clear() {
    if (this.status === 'busy') { try { this.engine && this.engine.interrupt(); } catch { /* ignore */ } }
    this.genToken++;
    this.messages = [];
    this.persist();
    this.set({ status: this.engine ? 'ready' : this.status === 'busy' ? 'off' : this.status, slow: false });
  }

  /** Vid utloggning: avbryt allt, släpp modellen och glöm samtalet. */
  async shutdown({ forget = true } = {}) {
    this.genToken++;
    this.loadToken++;
    if (this.abort) this.abort.abort();
    const engine = this.engine;
    this.engine = null;
    if (forget) {
      this.messages = [];
      try { this.storage && this.storage.removeItem(this.key); } catch { /* ignore */ }
    }
    this.set({ status: 'off', progress: null });
    this.listeners.clear();
    if (engine) { try { engine.interrupt(); } catch { /* ignore */ } try { await engine.unload(); } catch { /* ignore */ } }
  }
}
