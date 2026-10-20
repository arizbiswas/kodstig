// Kodlabbet: fri kod i C#, Python eller HTML/CSS. Koden sparas per språk på
// kontot. Tipsen fungerar utan AI och börjar om när koden ändras.
import { h, esc, on, codeEditor, announce } from '../dom.js';
import { setLab } from '../../state/model.js';
import { runCode, previewSrcdoc } from '../../engine/runner.js';
import { getHints } from '../../engine/hints.js';

export const LAB_LANGS = [
  { id: 'python', name: 'Python', starter: '# Skriv din Python-kod här\nnamn = "Kodare"\nfor i in range(3):\n    print(f"Hej {namn}! Varv {i + 1}")\n' },
  { id: 'csharp', name: 'C#', starter: '// Skriv din C#-kod här\nstring namn = "Kodare";\nfor (int i = 0; i < 3; i++)\n{\n    Console.WriteLine($"Hej {namn}! Varv {i + 1}");\n}\n' },
  { id: 'web', name: 'HTML/CSS', starter: '<style>\n  body { font-family: system-ui, sans-serif; }\n  h1 { color: #2f7d4f; }\n  .kort { padding: 16px; border: 2px solid #2f7d4f; border-radius: 8px; }\n</style>\n<h1>Min sida</h1>\n<div class="kort">\n  <p>Ändra koden och se vad som händer.</p>\n</div>\n' },
];

const LIMITS = {
  python: 'Kodlabbets Python är en egen, förenklad tolk som körs i webbläsaren. Den klarar variabler, if, loopar, funktioner, listor, ordlistor, mängder, listbyggare, lambda, klasser med arv, try/except/raise, strängmetoder och f-strängar. Moduler (import), with, filer och input() finns inte. Program som kör för länge stoppas efter några sekunder.',
  csharp: 'Kodlabbets C# är en egen, förenklad tolk som körs i webbläsaren, inte en riktig .NET-kompilator. Den klarar variabler, if, loopar, metoder, arrayer, List<T>, strängar och Console.WriteLine. Egna klasser, LINQ, Console.ReadLine och bibliotek utöver det vanligaste finns inte. Program som kör för länge stoppas efter några sekunder.',
  web: 'HTML och CSS visas i en isolerad ram. JavaScript körs inte där, och sidan kan inte nå resten av Kodstig eller ditt konto. Bilder från internet (https) kan visas.',
};

export function render(ctx, params = {}) {
  const { store } = ctx;
  const saved = (id) => store.state.lab?.[id]?.code;
  let lang = LAB_LANGS.some((l) => l.id === params.sprak) ? params.sprak : (sessionStorageGet('kodstig.lab.lang') || 'python');
  if (!LAB_LANGS.some((l) => l.id === lang)) lang = 'python';

  const el = h(`<section class="page lab" aria-labelledby="lab-h">
    <header class="page-head"><h1 id="lab-h">Kodlabbet</h1><p class="muted">Experimentera fritt. Inget här påverkar dina XP.</p></header>
    <div class="lang-tabs" role="group" aria-label="Välj språk">
      ${LAB_LANGS.map((l) => `<button class="track-btn" type="button" data-lang="${l.id}">${esc(l.name)}</button>`).join('')}
    </div>
    <div class="lab-grid">
      <div class="lab-editor card">
        <div class="editor-slot"></div>
        <div class="row gap wrap lab-actions">
          <button class="btn primary" type="button" data-run>Kör</button>
          <button class="btn secondary" type="button" data-hint>Fastnat? Få en ledtråd</button>
          <button class="btn ghost" type="button" data-ask>Fråga Milo</button>
          <button class="btn ghost small push" type="button" data-restore>Återställ exemplet</button>
        </div>
        <details class="limits"><summary>Vad klarar Kodlabbet?</summary><p></p></details>
      </div>
      <div class="lab-result card">
        <div class="result-slot"></div>
        <div class="hint-slot" aria-live="polite"></div>
      </div>
    </div>
  </section>`);

  let editor = null;
  let lastRun = null; // { code, result }
  let hint = null; // { key, code, step, steps }
  let saveTimer = null;
  let previewTimer = null;
  let runToken = 0;

  const resultSlot = el.querySelector('.result-slot');
  const hintSlot = el.querySelector('.hint-slot');

  const persist = () => {
    clearTimeout(saveTimer);
    const code = editor.value;
    const l = lang;
    saveTimer = setTimeout(() => { saveTimer = null; store.update((p) => setLab(p, l, code)); }, 800);
  };
  const flushSave = () => {
    if (!saveTimer) return;
    clearTimeout(saveTimer);
    saveTimer = null;
    const code = editor.value;
    store.update((p) => setLab(p, lang, code));
  };

  const renderHint = () => {
    if (!hint) { hintSlot.replaceChildren(); return; }
    const shown = hint.steps.slice(0, hint.step + 1);
    hintSlot.innerHTML = `<section class="hints" aria-labelledby="hints-h">
      <h2 id="hints-h" class="small-h">Ledtrådar <span class="muted">(${hint.step + 1} av ${hint.steps.length})</span></h2>
      <ol>${shown.map((s) => (typeof s === 'string' ? `<li>${esc(s)}</li>` : `<li>${esc(s.text)}<pre class="code-block small"><code>${esc(s.example)}</code></pre></li>`)).join('')}</ol>
      <div class="row gap">${hint.step < hint.steps.length - 1 ? '<button class="btn secondary small" type="button" data-hint-more>Visa nästa ledtråd</button>' : '<p class="tiny muted">Det var sista ledtråden. Ändra koden och kör igen, så får du nya tips.</p>'}
      <button class="btn ghost small" type="button" data-hint-close>Dölj</button></div>
    </section>`;
  };

  const showResult = () => {
    if (lang === 'web') {
      resultSlot.innerHTML = '<div class="preview tall"><span class="output-label">Förhandsvisning</span><iframe title="Förhandsvisning av din sida" sandbox="" referrerpolicy="no-referrer"></iframe></div>';
      resultSlot.querySelector('iframe').srcdoc = previewSrcdoc(editor.value);
      return;
    }
    if (!lastRun) {
      resultSlot.innerHTML = '<div class="output"><span class="output-label">Utskrift</span><pre class="muted">Tryck på Kör för att se vad programmet skriver ut.</pre></div>';
      return;
    }
    const r = lastRun.result;
    resultSlot.innerHTML = `<div class="output"><span class="output-label">Utskrift</span><pre></pre></div>
      ${r.error ? `<div class="err" role="alert"><p><strong>${esc(r.error.kind)}${r.error.line ? ` på rad ${r.error.line}` : ''}:</strong> ${esc(r.error.message)}</p></div>` : ''}`;
    resultSlot.querySelector('pre').textContent = r.output ? r.output.replace(/\n$/, '') : (r.error ? '(ingen utskrift)' : '(programmet skrev inte ut något)');
  };

  const mountEditor = () => {
    const l = LAB_LANGS.find((x) => x.id === lang);
    const value = saved(lang) ?? l.starter;
    editor = codeEditor({
      value, lang, label: `Kod i ${l.name}`, rows: 16, id: 'lab-code',
      onInput: () => {
        persist();
        // Tipsen gäller koden de skapades för; när koden ändras börjar de om.
        if (hint && hint.code !== editor.value) { hint = null; renderHint(); }
        if (lang === 'web') { clearTimeout(previewTimer); previewTimer = setTimeout(showResult, 300); }
      },
    });
    el.querySelector('.editor-slot').replaceChildren(editor.el);
    el.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    el.querySelector('[data-run]').hidden = lang === 'web';
    el.querySelector('.limits p').textContent = LIMITS[lang];
    lastRun = null;
    hint = null;
    renderHint();
    showResult();
  };

  const run = async () => {
    if (lang === 'web') { showResult(); return; }
    const code = editor.value;
    const token = ++runToken;
    const btn = el.querySelector('[data-run]');
    btn.disabled = true;
    resultSlot.innerHTML = '<p class="muted" role="status">Kör…</p>';
    const result = await runCode(lang, code, []);
    if (token !== runToken) return;
    btn.disabled = false;
    lastRun = { code, result, lang };
    showResult();
    announce(result.error ? `Fel: ${result.error.message}` : 'Koden kördes.');
  };

  ctx.app.codeSource = () => (editor && editor.value.trim() ? { code: editor.value, lang, from: 'labb' } : null);

  const cleanups = [
    on(el, 'click', '[data-lang]', (e, b) => {
      if (b.dataset.lang === lang) return;
      flushSave();
      runToken++;
      lang = b.dataset.lang;
      sessionStorageSet('kodstig.lab.lang', lang);
      mountEditor();
    }),
    on(el, 'click', '[data-run]', () => run()),
    on(el, 'keydown', 'textarea', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run(); } }),
    on(el, 'click', '[data-hint]', () => {
      const code = editor.value;
      const result = lang === 'web' ? null : (lastRun && lastRun.code === code && lastRun.lang === lang ? lastRun.result : null);
      const hs = getHints(lang, code, result);
      if (hint && hint.code === code && hint.key === hs.key) hint.step = Math.min(hint.step + 1, hint.steps.length - 1);
      else hint = { key: hs.key, code, step: 0, steps: hs.steps };
      renderHint();
      hintSlot.querySelector('h2')?.scrollIntoView({ block: 'nearest' });
    }),
    on(el, 'click', '[data-hint-more]', () => {
      hint.step = Math.min(hint.step + 1, hint.steps.length - 1);
      renderHint();
      const items = hintSlot.querySelectorAll('li');
      const last = items[items.length - 1];
      if (last) { last.setAttribute('tabindex', '-1'); last.focus(); }
    }),
    on(el, 'click', '[data-hint-close]', () => { hint = null; renderHint(); el.querySelector('[data-hint]').focus(); }),
    on(el, 'click', '[data-ask]', () => ctx.openMilo()),
    on(el, 'click', '[data-restore]', () => {
      const l = LAB_LANGS.find((x) => x.id === lang);
      if (editor.value !== l.starter && !confirm('Ersätta din kod med exemplet? Din nuvarande kod i det här språket försvinner.')) return;
      editor.value = l.starter;
      editor.textarea.dispatchEvent(new Event('input'));
    }),
  ];

  mountEditor();

  return {
    el,
    onReplaced() { saveTimer = null; mountEditor(); },
    destroy() {
      flushSave();
      clearTimeout(previewTimer);
      runToken++;
      cleanups.forEach((f) => f());
      ctx.app.codeSource = null;
    },
  };
}

function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch { return null; } }
function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch { /* ignore */ } }
