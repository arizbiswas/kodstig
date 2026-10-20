// Kodlabbet: fri kod i C#, Python eller HTML/CSS. Koden sparas per språk på
// kontot. Tipsen fungerar utan AI och börjar om när koden ändras.
import { h, esc, on, codeEditor, announce } from '../dom.js';
import { setLab } from '../../state/model.js';
import { runCode, traceCode, previewFor } from '../../engine/runner.js';
import { getHints } from '../../engine/hints.js';

export const LAB_LANGS = [
  { id: 'python', name: 'Python', starter: '# Skriv din Python-kod här\nnamn = "Kodare"\nfor i in range(3):\n    print(f"Hej {namn}! Varv {i + 1}")\n' },
  { id: 'csharp', name: 'C#', starter: '// Skriv din C#-kod här\nstring namn = "Kodare";\nfor (int i = 0; i < 3; i++)\n{\n    Console.WriteLine($"Hej {namn}! Varv {i + 1}");\n}\n' },
  { id: 'web', name: 'HTML/CSS', starter: '<style>\n  body { font-family: system-ui, sans-serif; }\n  h1 { color: #2f7d4f; }\n  .kort { padding: 16px; border: 2px solid #2f7d4f; border-radius: 8px; }\n</style>\n<h1>Min sida</h1>\n<div class="kort">\n  <p>Ändra koden och se vad som händer.</p>\n</div>\n' },
];

const LIMITS = {
  python: 'Kodlabbets Python är en egen, förenklad tolk som körs i webbläsaren. Den klarar variabler, if, loopar, funktioner, listor, ordlistor, mängder, listbyggare, lambda, klasser med arv, try/except/raise, strängmetoder, f-strängar, input() och modulerna random och math. Andra moduler, with och filer finns inte. Slumptalen blir inte samma som i riktig Python. Program som kör för länge stoppas efter några sekunder.',
  csharp: 'Kodlabbets C# är en egen, förenklad tolk som körs i webbläsaren, inte en riktig .NET-kompilator. Den klarar variabler, if, switch, loopar, metoder, arrayer, List<T>, Dictionary<K,V>, egna klasser med arv och interface, undantag med try/catch, lambdas, vanliga LINQ-metoder, Console.ReadLine() och Random. Async, egna generiska typer och bibliotek utöver det vanligaste finns inte. Slumptalen blir inte samma som i riktig .NET. Program som kör för länge stoppas efter några sekunder.',
  web: 'HTML och CSS visas i en isolerad ram. JavaScript i en script-tagg körs också där, men sidan kan inte nå resten av Kodstig, ditt konto eller internet. Loopar som kör väldigt länge stoppas. Bilder från internet (https) kan visas.',
};

// Så kör man samma kod på sin egen dator. Allt är gratis och fungerar utan konto.
const HOME = {
  python: { file: 'program.py', type: 'text/x-python', steps: [
    'Installera Python från python.org (Windows och Mac) eller med pakethanteraren (Linux). Kryssa i "Add Python to PATH" på Windows.',
    'Installera Visual Studio Code från code.visualstudio.com och lägg till tillägget Python.',
    'Ladda ner din kod här nedanför, eller skapa en fil som slutar på .py och klistra in koden.',
    'Öppna en terminal i mappen och skriv: python program.py (på Mac och Linux ibland python3 program.py). Med input() skriver du svaren direkt i terminalen.',
  ] },
  csharp: { file: 'Program.cs', type: 'text/plain', steps: [
    'Installera .NET SDK från dotnet.microsoft.com (gratis för Windows, Mac och Linux).',
    'Installera Visual Studio Code från code.visualstudio.com och lägg till tillägget C# Dev Kit.',
    'Öppna en terminal och skriv: dotnet new console -o MittProgram, och sedan: cd MittProgram',
    'Byt ut innehållet i Program.cs mot din kod (ladda ner den här nedanför) och skriv: dotnet run. Med Console.ReadLine() skriver du svaren direkt i terminalen.',
  ] },
  web: { file: 'index.html', type: 'text/html', steps: [
    'Ladda ner din sida här nedanför. Filen heter index.html.',
    'Dubbelklicka på filen så öppnas den i webbläsaren. Mer behövs inte.',
    'För att ändra: öppna filen i Visual Studio Code (code.visualstudio.com), spara och uppdatera webbläsaren.',
    'Vill du lägga ut sidan på nätet finns gratistjänster som GitHub Pages. Tänk på att allt du lägger ut kan ses av alla.',
  ] },
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
          <button class="btn secondary" type="button" data-trace>Kör steg för steg</button>
          <button class="btn secondary" type="button" data-hint>Fastnat? Få en ledtråd</button>
          <button class="btn ghost" type="button" data-ask>Fråga Milo</button>
          <button class="btn ghost small push" type="button" data-restore>Återställ exemplet</button>
        </div>
        <details class="lab-input"><summary>Indata till input() och ReadLine()</summary>
          <label class="tiny muted" for="lab-stdin">En rad per gång programmet läser. Raderna används uppifrån och ner.</label>
          <textarea id="lab-stdin" class="stdin" rows="3" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea>
        </details>
        <details class="limits"><summary>Vad klarar Kodlabbet?</summary><p></p></details>
        <details class="take-home"><summary>Kör koden på din egen dator</summary><div class="take-home-body"></div></details>
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
  let trace = null; // { code, steps, i, result }

  const resultSlot = el.querySelector('.result-slot');
  const stdinEl = el.querySelector('#lab-stdin');
  const stdin = () => stdinEl.value;
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

  // Stegvis körning: visar raden som körs härnäst, variablerna och utskriften så långt.
  const showTrace = ({ focus = null } = {}) => {
    const { steps, i, result, code } = trace;
    const st = steps[i];
    const prev = steps[i - 1];
    const lines = code.replace(/\n$/, '').split('\n');
    const last = i === steps.length - 1;
    const prevVal = (name, k) => prev && prev.frames.find((f) => f.name === name)?.vars.find(([n]) => n === k)?.[1];
    const status = st.line ? `Steg ${i + 1} av ${steps.length}. Rad ${st.line} körs härnäst.`
      : `Steg ${i + 1} av ${steps.length}. ${result.error ? 'Programmet stoppades av ett fel.' : 'Programmet är klart.'}`;
    const out = (result.output || '').slice(0, st.out).replace(/\n$/, '');
    resultSlot.innerHTML = `<section class="tracer" aria-labelledby="tr-h">
      <div class="row between"><h2 id="tr-h" class="small-h">Steg för steg</h2><button class="btn ghost small" type="button" data-trace-close>Stäng</button></div>
      <p class="tracer-status" role="status">${esc(status)}</p>
      <div class="tracer-controls row gap wrap">
        <button class="btn ghost small" type="button" data-trace-go="0" ${i === 0 ? 'disabled' : ''} aria-label="Till början">⏮</button>
        <button class="btn secondary small" type="button" data-trace-go="${i - 1}" ${i === 0 ? 'disabled' : ''}>← Bakåt</button>
        <button class="btn primary small" type="button" data-trace-go="${i + 1}" ${last ? 'disabled' : ''}>Framåt →</button>
        <button class="btn ghost small" type="button" data-trace-go="${steps.length - 1}" ${last ? 'disabled' : ''} aria-label="Till slutet">⏭</button>
      </div>
      <input class="tracer-range" type="range" min="0" max="${steps.length - 1}" value="${i}" aria-label="Välj steg">
      <ol class="tracer-code" aria-label="Din kod">${lines.map((l, k) => `<li${st.line === k + 1 ? ' class="cur" aria-current="step"' : ''}><code>${esc(l) || ' '}</code></li>`).join('')}</ol>
      <div class="tracer-vars">${st.frames.map((f, fi) => `<table class="vars${fi ? ' waiting' : ''}"><caption>${esc(f.name)}${fi ? ' <span class="muted">väntar</span>' : ''}</caption>
        ${f.vars.length ? `<thead><tr><th scope="col">Variabel</th><th scope="col">Värde</th></tr></thead><tbody>${f.vars.map(([k, v]) => {
          const changed = !fi && prev && prevVal(f.name, k) !== v;
          return `<tr${changed ? ' class="changed"' : ''}><th scope="row"><code>${esc(k)}</code></th><td><code>${esc(v)}</code>${changed ? '<span class="sr-only"> (ändrad)</span>' : ''}</td></tr>`;
        }).join('')}</tbody>` : '<tbody><tr><td class="muted" colspan="2">Inga variabler än</td></tr></tbody>'}</table>`).join('')}</div>
      <div class="output"><span class="output-label">Utskrift hittills</span><pre>${out ? esc(out) : '<span class="muted">(inget än)</span>'}</pre></div>
      ${last && result.error ? `<div class="err" role="alert"><p><strong>${esc(result.error.kind)}${result.error.line ? ` på rad ${result.error.line}` : ''}:</strong> ${esc(result.error.message)}</p></div>` : ''}
      ${steps.length >= 500 ? '<p class="tiny muted">Programmet tog många steg, så bara de första 500 visas.</p>' : ''}
    </section>`;
    const cur = resultSlot.querySelector('.tracer-code .cur');
    if (cur) cur.scrollIntoView({ block: 'nearest' });
    if (focus) resultSlot.querySelector(focus)?.focus();
  };

  const startTrace = async () => {
    const code = editor.value;
    const token = ++runToken;
    const btn = el.querySelector('[data-trace]');
    btn.disabled = true;
    resultSlot.innerHTML = '<p class="muted" role="status">Förbereder…</p>';
    const result = await traceCode(lang, code, stdin());
    if (token !== runToken) return;
    btn.disabled = false;
    lastRun = { code, result, lang };
    if (!result.trace || !result.trace.length) { trace = null; showResult(); return; }
    trace = { code, steps: result.trace, i: 0, result };
    showTrace({ focus: '[data-trace-go]:not([disabled])' });
  };

  const showResult = () => {
    if (lang === 'web') {
      resultSlot.innerHTML = '<div class="preview tall"><span class="output-label">Förhandsvisning</span><iframe title="Förhandsvisning av din sida" sandbox="" referrerpolicy="no-referrer"></iframe></div>';
      const ifr = resultSlot.querySelector('iframe');
      const pv = previewFor(editor.value, true);
      ifr.setAttribute('sandbox', pv.sandbox);
      ifr.srcdoc = pv.srcdoc;
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
        if (trace) { trace = null; showResult(); }
        if (lang === 'web') { clearTimeout(previewTimer); previewTimer = setTimeout(showResult, 300); }
      },
    });
    el.querySelector('.editor-slot').replaceChildren(editor.el);
    el.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    el.querySelector('[data-run]').hidden = lang === 'web';
    el.querySelector('[data-trace]').hidden = lang === 'web';
    trace = null;
    el.querySelector('.limits p').textContent = LIMITS[lang];
    el.querySelector('.lab-input').hidden = lang === 'web';
    const home = HOME[lang];
    el.querySelector('.take-home-body').innerHTML = `<ol>${home.steps.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>
      <button class="btn secondary small" type="button" data-download>Ladda ner ${esc(home.file)}</button>`;
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
    const result = await runCode(lang, code, [], { input: stdin() });
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
    on(el, 'click', '[data-run]', () => { trace = null; run(); }),
    on(el, 'click', '[data-trace]', () => startTrace()),
    on(el, 'click', '[data-trace-go]', (e, b) => {
      if (!trace) return;
      trace.i = Math.max(0, Math.min(trace.steps.length - 1, Number(b.dataset.traceGo)));
      const sel = b.getAttribute('aria-label') ? `[aria-label="${b.getAttribute('aria-label')}"]` : (b.textContent.includes('Bakåt') ? '.tracer-controls .btn.secondary' : '.tracer-controls .btn.primary');
      showTrace({ focus: sel });
      // Fokus kan inte stanna på en avstängd knapp; flytta till den andra riktningen.
      if (document.activeElement === document.body || document.activeElement?.disabled) resultSlot.querySelector('[data-trace-go]:not([disabled])')?.focus();
    }),
    on(el, 'input', '.tracer-range', (e, r) => { if (trace) { trace.i = Number(r.value); showTrace({ focus: '.tracer-range' }); } }),
    on(el, 'keydown', '.tracer', (e) => {
      if (!trace || e.target.matches('input')) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const b = resultSlot.querySelector(e.key === 'ArrowRight' ? '.tracer-controls .btn.primary' : '.tracer-controls .btn.secondary');
        if (b && !b.disabled) b.click();
      }
    }),
    on(el, 'click', '[data-trace-close]', () => { trace = null; showResult(); el.querySelector('[data-trace]').focus(); }),
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
    on(el, 'click', '[data-download]', () => {
      const home = HOME[lang];
      const url = URL.createObjectURL(new Blob([editor.value], { type: `${home.type};charset=utf-8` }));
      const a = document.createElement('a');
      a.href = url;
      a.download = home.file;
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      announce(`${home.file} laddades ner.`);
    }),
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
