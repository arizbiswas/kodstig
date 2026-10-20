// Appens skal: sessioner (konto eller utan konto), routing, navigation,
// sparstatus, nivåfirande och Milo-panelen.
import { Store, safeStorage, storageCache } from './state/store.js';
import { localBackend, supabaseBackend } from './state/backends.js';
import { watchAuth, signOut, supabase } from './state/auth.js';
import { startActivity, deviceId } from './state/activity.js';
import { addActivity, hasProgress, merge, normalize, pref, setPref } from './state/model.js';
import { levelInfo } from './state/progression.js';
import { Milo } from './ai/milo.js';
import { h, esc, on, openDialog, toast, announce } from './ui/dom.js';
import { ICONS, MILO_SVG } from './ui/icons.js';
import { confetti, stopConfetti, stopLoop } from './ui/media.js';
import { applyTheme, currentTheme, setTheme } from './ui/theme.js';
import { MiloPanel } from './ui/milo-panel.js';
import { loginDialog } from './ui/login.js';
import * as welcome from './ui/views/welcome.js';
import * as learn from './ui/views/learn.js';
import * as lesson from './ui/views/lesson.js';
import * as lab from './ui/views/lab.js';
import * as glossary from './ui/views/glossary.js';
import * as progress from './ui/views/progress.js';
import * as settings from './ui/views/settings.js';
import * as review from './ui/views/review.js';

const local = safeStorage('localStorage');
const session = safeStorage('sessionStorage');

const NAV = [
  { path: '/lar', label: 'Lär dig', icon: 'book', view: learn },
  { path: '/labb', label: 'Kodlabbet', icon: 'code', view: lab },
  { path: '/ordlista', label: 'Ordlista', icon: 'glossary', view: glossary },
  { path: '/utveckling', label: 'Min utveckling', icon: 'rocket', view: progress },
];

const STATUS_TEXT = {
  saving: 'Sparar…',
  pending: 'Sparar…',
  offline: 'Offline – sparas när du är online igen',
  error: 'Kunde inte spara – försöker igen',
};

export class App {
  constructor(root) {
    this.root = root;
    this.store = null;
    this.user = null; // { id, email, name, guest }
    this.milo = null;
    this.view = null;
    this.stopActivity = null;
    this.sessionToken = 0;
    this.authUser = undefined;
  }

  async boot() {
    applyTheme(currentTheme());
    this.root.innerHTML = '<div class="boot" role="status">Laddar Kodstig…</div>';
    window.addEventListener('hashchange', () => this.route());
    window.addEventListener('pagehide', () => { if (this.store) this.store.flush(); });
    let first = true;
    await watchAuth(async (user) => {
      this.authUser = user;
      if (user) await this.startSession({ ...user, guest: false });
      else if (this.user && !this.user.guest) await this.endSession();
      else if (first && this.readMode() === 'guest') await this.startSession({ id: 'guest', email: '', name: '', guest: true });
      first = false;
      this.route();
    });
  }

  readMode() { try { return local && local.getItem('kodstig.mode'); } catch { return null; } }
  writeMode(m) { try { if (m) local.setItem('kodstig.mode', m); else local.removeItem('kodstig.mode'); } catch { /* ignore */ } }

  // ---------- Sessioner ----------
  async startSession(user) {
    if (this.user && this.user.id === user.id && this.user.guest === user.guest) return;
    if (this.user) await this.endSession({ keepMode: true });
    const token = ++this.sessionToken;
    let backend, cache = null;
    if (user.guest) {
      backend = localBackend(local);
    } else {
      backend = supabaseBackend(await supabase(), user.id);
      cache = storageCache(local, `kodstig.cache.${user.id}`);
    }
    const store = new Store({ backend, cache, uid: user.id });
    await store.init();
    if (token !== this.sessionToken) { store.dispose({ flush: false }); return; }
    this.store = store;
    this.user = user;
    this.writeMode(user.guest ? 'guest' : 'account');
    store.on((type) => this.onStore(type));
    this.lastLevel = levelInfo(store.state).level;
    const dev = deviceId(local);
    this.stopActivity = startActivity((day, secs) => this.store && this.store.update((p) => addActivity(p, dev, day, secs)));
    // I utvecklingsläge kan webbläsartesterna byta ut modellen mot en låtsasmotor.
    // Det finns inte i produktionsbygget.
    const fake = import.meta.env.DEV ? window.__KODSTIG_FAKE_MILO : null;
    this.milo = new Milo({
      storage: session,
      uid: user.id,
      engineFactory: fake ? fake.engineFactory : (opts) => import('./ai/webllm-engine.js').then((m) => m.createWebLLMEngine(opts)),
      ...(fake ? { support: fake.support } : {}),
    });
    if (!user.guest && !pref(store.state, 'name') && user.name) store.update((p) => setPref(p, 'name', user.name.split(' ')[0]));
    if (!user.guest) this.offerGuestImport();
  }

  async endSession({ keepMode = false } = {}) {
    this.sessionToken++;
    stopLoop();
    stopConfetti();
    if (this.panel) { this.panel.destroy(); this.panel = null; }
    if (this.view && this.view.destroy) { this.view.destroy(); this.view = null; }
    if (this.stopActivity) { this.stopActivity(); this.stopActivity = null; }
    if (this.milo) { await this.milo.shutdown({ forget: true }); this.milo = null; }
    const store = this.store;
    const user = this.user;
    this.store = null;
    this.user = null;
    if (store) {
      await store.dispose({ flush: true });
      // Delad dator: rensa den lokala kopian av kontot när inget väntar på att sparas.
      if (user && !user.guest && store.cache && !store.dirty) store.cache.clear();
    }
    if (!keepMode) this.writeMode(null);
  }

  async continueAsGuest() {
    await this.startSession({ id: 'guest', email: '', name: '', guest: true });
    this.navigate('/lar');
  }

  async logout() {
    const wasGuest = this.user && this.user.guest;
    await this.endSession();
    if (!wasGuest) { try { await signOut(); } catch { /* ignore */ } }
    this.navigate('/');
    toast(wasGuest ? 'Du har lämnat profilen utan konto. Framstegen finns kvar i den här webbläsaren.' : 'Du är utloggad.');
  }

  offerGuestImport() {
    const guest = localBackend(local);
    const data = guest.peek();
    if (!data || !hasProgress(normalize(data.doc))) return;
    const n = Object.keys(data.doc.completed || {}).length;
    const dlg = openDialog({
      title: 'Flytta framsteg till ditt konto?',
      body: `<p>Den här webbläsaren har framsteg som sparats utan konto (${n} ${n === 1 ? 'avklarad lektion' : 'avklarade lektioner'}).</p>
        <p>Vill du flytta dem till kontot <strong>${esc(this.user.email || this.user.name || '')}</strong>? Det görs en gång, och sedan tas den lokala profilen bort så att den inte följer med till andra konton.</p>
        <div class="row gap end"><button class="btn ghost" data-close>Inte nu</button><button class="btn primary" data-import autofocus>Flytta till kontot</button></div>`,
    });
    dlg.body.querySelector('[data-import]').addEventListener('click', () => {
      const fresh = guest.peek();
      if (fresh && this.store) {
        const doc = normalize(fresh.doc);
        this.store.update((p) => { const m = merge(p, { ...doc, epoch: p.epoch }); m.epoch = p.epoch; return m; });
        guest.clear();
        toast('Framstegen är flyttade till ditt konto.');
      }
      dlg.close();
    });
  }

  onStore(type) {
    if (type === 'status') this.renderStatus();
    if (type === 'change' || type === 'replaced') {
      this.renderSidebarStats();
      const info = levelInfo(this.store.state);
      if (info.level > (this.store.state.levelSeen || 1)) {
        const lvl = info.level;
        this.store.update((p) => { p.levelSeen = Math.max(p.levelSeen || 1, lvl); });
        const shown = confetti();
        toast(`Ny nivå: ${info.title}!`, 'success');
        announce(`Du nådde nivå ${lvl}, ${info.title}.`);
        if (!shown) document.body.classList.add('levelup-static');
      }
      if (type === 'replaced' && this.view && this.view.onReplaced) this.view.onReplaced();
    }
  }

  // ---------- Routing ----------
  navigate(path) {
    if (location.hash === `#${path}`) this.route(); else location.hash = path;
  }

  parse() {
    const raw = location.hash.replace(/^#/, '') || '/';
    const [path, query = ''] = raw.split('?');
    return { path, params: Object.fromEntries(new URLSearchParams(query)) };
  }

  route() {
    stopLoop();
    stopConfetti();
    const { path, params } = this.parse();
    if (this.view && this.view.destroy) this.view.destroy();
    this.view = null;
    if (!this.user) {
      if (path === '/prova') return this.renderBare(welcome.demo(this.ctx()));
      if (path !== '/' && !path.startsWith('/intro')) { history.replaceState(null, '', '#/'); }
      return this.renderBare(welcome.intro(this.ctx()));
    }
    if (path === '/' || path === '') { history.replaceState(null, '', '#/lar'); return this.route(); }
    if (path === '/prova') return this.renderBare(welcome.demo(this.ctx()));
    if (path === '/intro') return this.renderBare(welcome.intro(this.ctx()));
    let view;
    const m = path.match(/^\/lektion\/([\w-]+)$/);
    if (m) view = lesson.render(this.ctx(), m[1]);
    else if (path === '/installningar') view = settings.render(this.ctx());
    else if (path === '/repetition') view = review.render(this.ctx());
    else {
      const item = NAV.find((n) => n.path === path) || NAV[0];
      view = item.view.render(this.ctx(), params);
    }
    this.renderShell(view, path);
  }

  ctx() {
    return {
      app: this,
      store: this.store,
      user: this.user,
      milo: this.milo,
      navigate: (p) => this.navigate(p),
      openMilo: (opts) => this.openMilo(opts),
      login: () => loginDialog(this),
    };
  }

  renderBare(view) {
    if (this.panel) { this.panel.destroy(); this.panel = null; }
    this.shell = null;
    this.root.replaceChildren(view.el);
    this.view = view;
    const focus = view.el.querySelector('h1');
    if (focus) { focus.setAttribute('tabindex', '-1'); focus.focus({ preventScroll: true }); }
    window.scrollTo(0, 0);
  }

  renderShell(view, path) {
    if (!this.shell) {
      this.shell = h(`<div class="shell">
        <a class="skip" href="#main">Hoppa till innehållet</a>
        <aside class="sidebar" aria-label="Huvudmeny">
          <a class="brand" href="#/lar"><span class="brand-mark" aria-hidden="true">▙</span><span>Kodstig</span></a>
          <nav class="nav">
            ${NAV.map((n) => `<a class="nav-link" href="#${n.path}" data-path="${n.path}">${ICONS[n.icon]}<span>${n.label}</span></a>`).join('')}
          </nav>
          <button class="milo-launch" type="button" data-milo aria-expanded="false" aria-controls="milo-panel">
            <span class="milo-launch-avatar">${MILO_SVG}</span>
            <span class="milo-launch-text"><strong>Milo</strong><small>AI-studiekompis</small></span>
          </button>
          <div class="side-foot">
            <div class="side-stats" aria-live="off"></div>
            <a class="nav-link small" href="#/installningar" data-path="/installningar">${ICONS.gear}<span>Inställningar</span></a>
            <button class="theme-toggle" type="button" data-theme-toggle></button>
            <p class="save-status" role="status" aria-live="polite"></p>
          </div>
        </aside>
        <header class="topbar">
          <a class="brand" href="#/lar"><span class="brand-mark" aria-hidden="true">▙</span><span>Kodstig</span></a>
          <div class="topbar-actions">
            <button class="milo-mini" type="button" data-milo aria-label="Öppna Milo" aria-expanded="false" aria-controls="milo-panel">${MILO_SVG}</button>
            <a class="icon-btn" href="#/installningar" aria-label="Inställningar">${ICONS.gear}</a>
          </div>
        </header>
        <main id="main" class="main" tabindex="-1"></main>
        <nav class="bottom-nav" aria-label="Huvudmeny">
          ${NAV.map((n) => `<a class="bottom-link" href="#${n.path}" data-path="${n.path}">${ICONS[n.icon]}<span>${n.label}</span></a>`).join('')}
        </nav>
        <div class="milo-host"></div>
      </div>`);
      this.root.replaceChildren(this.shell);
      on(this.shell, 'click', '[data-milo]', () => this.toggleMilo());
      // Hoppa-länken får inte ändra hash-routen; den flyttar bara fokus.
      on(this.shell, 'click', '.skip', (e) => { e.preventDefault(); const m = this.shell.querySelector('#main'); m.focus(); m.scrollIntoView(); });
      on(this.shell, 'click', '[data-theme-toggle]', () => { setTheme(currentTheme() === 'minecraft' ? 'classic' : 'minecraft'); this.renderThemeToggle(); if (this.view && this.view.onTheme) this.view.onTheme(); });
      this.panel = new MiloPanel(this, this.shell.querySelector('.milo-host'));
    }
    const main = this.shell.querySelector('#main');
    main.replaceChildren(view.el);
    this.view = view;
    this.shell.querySelectorAll('[data-path]').forEach((a) => {
      const active = path === a.dataset.path || (a.dataset.path === '/lar' && path.startsWith('/lektion'));
      if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    this.renderSidebarStats();
    this.renderStatus();
    this.renderThemeToggle();
    const title = view.el.querySelector('h1');
    document.title = title ? `${title.textContent} – Kodstig` : 'Kodstig';
    if (!view.keepScroll) window.scrollTo(0, 0);
    if (title && !view.noFocus) { title.setAttribute('tabindex', '-1'); title.focus({ preventScroll: true }); }
  }

  renderSidebarStats() {
    if (!this.shell || !this.store) return;
    const info = levelInfo(this.store.state);
    const el = this.shell.querySelector('.side-stats');
    el.innerHTML = `<span class="lvl-badge">Nivå ${info.level}</span><span class="side-title">${esc(info.title)}</span><span class="side-xp">${info.xp} XP</span>`;
  }

  renderStatus() {
    if (!this.shell || !this.store) return;
    const el = this.shell.querySelector('.save-status');
    const s = this.store.status;
    const text = STATUS_TEXT[s] || '';
    el.textContent = this.user.guest && !text ? 'Sparas i den här webbläsaren' : text;
    el.dataset.state = s;
  }

  renderThemeToggle() {
    if (!this.shell) return;
    const t = currentTheme();
    const btn = this.shell.querySelector('[data-theme-toggle]');
    btn.innerHTML = `<span class="theme-dot" aria-hidden="true"></span><span>Tema: ${t === 'minecraft' ? 'Minecraft' : 'Klassisk'}</span>`;
    btn.setAttribute('aria-label', `Byt tema. Nu: ${t === 'minecraft' ? 'Minecraft' : 'Klassisk'}`);
  }

  toggleMilo(opts) { if (this.panel) this.panel.toggle(opts); }
  openMilo(opts) { if (this.panel) this.panel.open(opts); }
}
