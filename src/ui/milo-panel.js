// Milos chattpanel. På dator ligger den bredvid vänsterspalten, på mobil som
// ett blad ovanför bottenmenyn. Den stör aldrig huvudnavigationen.
import { esc, h, on } from './dom.js';
import { MILO_SVG } from './icons.js';
import { MAX_INPUT_CHARS } from '../ai/milo.js';

function formatReply(text) {
  return String(text).split(/```[a-zA-Z#]*\n?/).map((part, i) => (i % 2 === 1
    ? `<pre class="code-block small"><code>${esc(part.replace(/\n$/, ''))}</code></pre>`
    : part.split(/\n{2,}/).map((p) => (p.trim() ? `<p>${esc(p).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n/g, '<br>')}</p>` : '')).join(''))).join('');
}

export class MiloPanel {
  constructor(app, host) {
    this.app = app;
    this.host = host;
    this.isOpen = false;
    this.el = h(`<section id="milo-panel" class="milo-panel" role="dialog" aria-modal="false" aria-labelledby="milo-title" hidden>
      <header class="mp-head">
        <span class="milo-avatar">${MILO_SVG}</span>
        <div class="milo-titles"><h2 id="milo-title">Milo</h2><p>AI-studiekompis</p></div>
        <div class="milo-actions">
          <button class="btn tiny ghost" data-clear type="button">Rensa</button>
          <button class="icon-btn" data-close type="button" aria-label="Stäng Milo">✕</button>
        </div>
      </header>
      <div class="mp-body"></div>
    </section>`);
    host.append(this.el);
    this.body = this.el.querySelector(".mp-body");
    this.cleanups = [
      on(this.el, 'click', '[data-close]', () => this.close()),
      on(this.el, 'click', '[data-clear]', () => { this.milo && this.milo.clear(); this.render(); }),
      on(this.el, 'click', '[data-start]', () => this.milo && this.milo.start()),
      on(this.el, 'click', '[data-cancel]', () => this.milo && this.milo.cancelStart()),
      on(this.el, 'click', '[data-stop]', () => this.milo && this.milo.stop()),
      on(this.el, 'submit', 'form', (e) => { e.preventDefault(); this.send(); }),
    ];
    this.onKey = (e) => { if (e.key === 'Escape' && this.isOpen && this.el.contains(document.activeElement)) { e.preventDefault(); this.close(); } };
    document.addEventListener('keydown', this.onKey);
    this.attach();
  }

  get milo() { return this.app.milo; }

  attach() {
    if (this.unsub) this.unsub();
    this.unsub = this.milo ? this.milo.on(() => this.render()) : null;
  }

  toggle(opts) { if (this.isOpen) this.close(); else this.open(opts); }

  open(opts = {}) {
    this.attach();
    this.opts = opts;
    this.isOpen = true;
    this.el.hidden = false;
    document.body.classList.add('milo-open');
    this.app.shell.querySelectorAll('[data-milo]').forEach((b) => b.setAttribute('aria-expanded', 'true'));
    this.render();
    const target = this.el.querySelector('textarea, [data-start], [data-cancel], [data-close]');
    if (target) target.focus();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.el.hidden = true;
    document.body.classList.remove('milo-open');
    const launchers = [...this.app.shell.querySelectorAll('[data-milo]')];
    launchers.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    const visible = launchers.find((b) => b.offsetParent !== null);
    if (visible) visible.focus();
  }

  codeSource() {
    const src = this.app.codeSource && this.app.codeSource();
    return src && ((src.code && src.code.trim()) || src.context) ? src : null;
  }

  send() {
    const ta = this.el.querySelector('textarea');
    const cb = this.el.querySelector('#milo-attach');
    if (!ta || !this.milo) return;
    const src = cb && cb.checked ? this.codeSource() : null;
    const err = this.milo.validate(ta.value);
    const msg = this.el.querySelector('.milo-form-msg');
    if (err) { msg.textContent = err; return; }
    msg.textContent = '';
    const text = ta.value;
    ta.value = '';
    if (cb) cb.checked = false;
    this.milo.send(text, src ? { code: src.code, lang: src.lang, context: src.context } : {});
  }

  render() {
    if (!this.isOpen) return;
    const focusInside = this.el.contains(document.activeElement);
    this.renderBody();
    // Om knappen med fokus ersattes ska fokus stanna i panelen.
    if (focusInside && !this.el.contains(document.activeElement)) {
      const t = this.body.querySelector('textarea, button, summary') || this.el.querySelector('[data-close]');
      if (t) t.focus({ preventScroll: true });
    }
  }

  renderBody() {
    const m = this.milo;
    if (!m) { this.body.innerHTML = '<p>Logga in eller fortsätt utan konto för att använda Milo.</p>'; return; }
    const s = m.status;
    this.el.querySelector('[data-clear]').hidden = !(s === 'ready' || s === 'busy') || !m.messages.length;
    if (s === 'off') {
      this.body.innerHTML = `<div class="milo-intro">
        <p>Hej! Jag är Milo, en liten AI som kan hjälpa dig att hitta nästa steg när något känns rörigt.</p>
        <details class="info"><summary>Innan du startar</summary>
          <ul>
            <li>Första gången hämtas en språkmodell på ungefär <strong>1 GB</strong>. Efter det kan webbläsaren återanvända den.</li>
            <li>Det kräver en webbläsare och enhet med <strong>WebGPU</strong>, till exempel Chrome eller Edge på en dator.</li>
            <li>Samtalet bearbetas lokalt på din enhet och sparas bara i den här fliken. Det rensas när du loggar ut.</li>
            <li>Milo är en liten modell och kan ha fel. Lektioner och kodtips fungerar även utan Milo.</li>
          </ul>
        </details>
        <button class="btn primary wide" data-start type="button">Starta Milo</button>
      </div>`;
      return;
    }
    if (s === 'checking') { this.body.innerHTML = '<p role="status">Kontrollerar om enheten kan köra Milo…</p>'; return; }
    if (s === 'unsupported' || s === 'error') {
      this.body.innerHTML = `<div class="milo-intro"><p class="notice ${s === 'error' ? 'bad' : ''}" role="alert">${esc(m.error)}</p>
        <p class="muted">Kodtipsen i Kodlabbet (”Fastnat? Få en ledtråd”) fungerar ändå.</p>
        ${s === 'error' ? '<button class="btn secondary wide" data-start type="button">Försök igen</button>' : ''}</div>`;
      return;
    }
    if (s === 'loading') {
      const r = Math.round((m.progress?.ratio || 0) * 100);
      this.body.innerHTML = `<div class="milo-intro" role="status" aria-live="polite">
        <p>Startar Milo… ${r}%</p>
        <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${r}" aria-label="Hämtar modellen"><span style="width:${r}%"></span></div>
        <p class="tiny muted">${esc(m.progress?.text || '')}</p>
        ${m.warning ? `<p class="tiny">${esc(m.warning)}</p>` : ''}
        <button class="btn ghost wide" data-cancel type="button">Avbryt</button>
      </div>`;
      return;
    }
    // ready / busy
    const prevTa = this.el.querySelector('textarea');
    const draft = prevTa ? prevTa.value : '';
    const hadFocus = prevTa && document.activeElement === prevTa;
    const src = this.codeSource();
    const msgs = m.messages.map((x) => {
      if (x.role === 'user') return `<li class="msg user"><div class="bubble">${esc(x.shown || x.content)}${x.code ? '<span class="tag">Bifogat</span>' : ''}</div></li>`;
      if (x.role === 'error') return `<li class="msg error"><div class="bubble" role="alert">${esc(x.content)}</div></li>`;
      if (x.role === 'note') return `<li class="msg note"><div class="bubble">${esc(x.content)}</div></li>`;
      return `<li class="msg bot"><div class="bubble">${x.content ? formatReply(x.content) : '<span class="typing" aria-label="Milo skriver"><i></i><i></i><i></i></span>'}</div></li>`;
    }).join('');
    this.body.innerHTML = `<ol class="msgs" aria-live="polite" aria-relevant="additions text">${msgs || '<li class="msg note"><div class="bubble">Vad tänker du på just nu? Det går bra att skriva att något känns svårt.</div></li>'}</ol>
      ${s === 'busy' && m.slow ? '<p class="tiny muted" role="status">Milo tänker fortfarande. Du kan stoppa svaret när du vill.</p>' : ''}
      <form class="composer">
        <label class="sr-only" for="milo-input">Skriv till Milo</label>
        <textarea id="milo-input" rows="2" maxlength="${MAX_INPUT_CHARS + 200}" placeholder="Skriv till Milo…"></textarea>
        ${src ? `<label class="check"><input type="checkbox" id="milo-attach"> ${src.context ? 'Ta med uppgiften, mitt svar och senaste kontrollen' : 'Ta med koden från Kodlabbet'}</label>` : ''}
        <p class="milo-form-msg tiny" role="status"></p>
        <div class="row gap end">
          ${s === 'busy' ? '<button class="btn secondary" data-stop type="button">Stoppa</button>' : ''}
          <button class="btn primary" type="submit" ${s === 'busy' ? 'disabled' : ''}>Skicka</button>
        </div>
        <p class="tiny muted">Milo är en AI och kan ha fel.</p>
      </form>`;
    const ta = this.el.querySelector('textarea');
    ta.value = draft;
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); } });
    if (hadFocus || s === 'ready') ta.focus({ preventScroll: true });
    const list = this.el.querySelector('.msgs');
    list.scrollTop = list.scrollHeight;
  }

  destroy() {
    this.close();
    this.cleanups.forEach((f) => f());
    document.removeEventListener('keydown', this.onKey);
    if (this.unsub) this.unsub();
    this.el.remove();
  }
}
