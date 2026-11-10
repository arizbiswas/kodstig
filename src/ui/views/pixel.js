// Pixelvärlden i Kodlabbet: riktig Python eller C# som styr en hjälte, ritar
// pixelkonst eller ritar med turtle. Koden till vänster, världen till höger
// (under på mobilen). Raden som körs lyses upp medan figuren rör sig.
import { h, esc, on, codeEditor, announce, reveal } from '../dom.js';
import { setLab } from '../../state/model.js';
import { runPixelCode } from '../../engine/runner.js';
import { getHints } from '../../engine/hints.js';
import { shareUrl } from '../../state/share.js';
import { createStage } from '../pixel-stage.js';
import { SANDBOX, sandboxById } from '../../content/pixel-sandbox.js';

const LANGS = [{ id: 'python', name: 'Python' }, { id: 'csharp', name: 'C#' }];
const key = (lang, bana) => `pixel-${lang}-${bana}`;
const ss = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch { /* ignore */ } },
};

const API_HELP = {
  python: `<p><strong>Hjälten:</strong> <code>hjalte.move_right()</code>, <code>move_left()</code>, <code>move_up()</code>, <code>move_down()</code>, <code>hjalte.move(3)</code> (framåt), <code>turn_left()</code>, <code>say("hej")</code>, <code>pick()</code>, <code>drop()</code>, <code>open()</code>.</p>
    <p><strong>Frågor:</strong> <code>hjalte.can_move("up")</code>, <code>on_item()</code>, <code>at_goal()</code>, <code>hjalte.x</code>, <code>hjalte.y</code>, <code>hjalte.items</code>, <code>world.tile(x, y)</code>, <code>world.items_left()</code>.</p>
    <p><strong>Pixelkonst:</strong> <code>grid = Canvas(16, 16)</code>, <code>grid.set_pixel(x, y, "red")</code>, <code>grid.fill("white")</code>, <code>grid.draw(rader)</code>.</p>
    <p><strong>Turtle:</strong> <code>import turtle</code>, sedan <code>forward</code>, <code>left</code>, <code>right</code>, <code>goto</code>, <code>circle</code>, <code>penup</code>, <code>pendown</code>, <code>color</code>, <code>begin_fill</code> och <code>end_fill</code>, som i riktig Python.</p>`,
  csharp: `<p><strong>Hjälten:</strong> <code>Hjalte.MoveRight()</code>, <code>MoveLeft()</code>, <code>MoveUp()</code>, <code>MoveDown()</code>, <code>Hjalte.Move(3)</code> (framåt), <code>TurnLeft()</code>, <code>Say("hej")</code>, <code>Pick()</code>, <code>Drop()</code>, <code>Open()</code>.</p>
    <p><strong>Frågor:</strong> <code>Hjalte.CanMove(Dir.Up)</code>, <code>OnItem()</code>, <code>AtGoal()</code>, <code>Hjalte.X</code>, <code>Hjalte.Y</code>, <code>Hjalte.Items</code>, <code>World.Tile(x, y)</code>, <code>World.ItemsLeft()</code>.</p>
    <p><strong>Pixelkonst:</strong> <code>var g = new PixelGrid(16, 16);</code>, <code>g.SetPixel(x, y, Color.Red);</code>, <code>g.Fill(Color.White);</code>, <code>g.Draw(rader);</code>.</p>
    <p><strong>Turtle:</strong> <code>var t = new Turtle();</code>, sedan <code>Forward</code>, <code>Left</code>, <code>Right</code>, <code>GoTo</code>, <code>Circle</code>, <code>PenUp</code>, <code>PenDown</code>, <code>PenColor</code>, <code>BeginFill</code> och <code>EndFill</code>.</p>`,
};

export function render(ctx, params = {}) {
  const { store } = ctx;
  let lang = LANGS.some((l) => l.id === params.sprak) ? params.sprak : (ss.get('kodstig.pixel.lang') || 'python');
  if (!LANGS.some((l) => l.id === lang)) lang = 'python';
  let bana = sandboxById(params.bana || ss.get('kodstig.pixel.bana')).id;

  const el = h(`<section class="page lab pixel-lab" aria-labelledby="px-h">
    <header class="page-head"><h1 id="px-h">Kodlabbet</h1><p class="muted">Experimentera fritt. Inget här påverkar dina XP.</p></header>
    <div class="lang-tabs" role="group" aria-label="Välj språk">
      <a class="track-btn" href="#/labb?sprak=python">Python</a>
      <a class="track-btn" href="#/labb?sprak=csharp">C#</a>
      <a class="track-btn" href="#/labb?sprak=web">HTML/CSS</a>
      <a class="track-btn" href="#/pixelvarld" aria-current="page" aria-pressed="true">Pixelvärlden</a>
    </div>
    <div class="pixel-top row gap wrap">
      <div class="seg" role="group" aria-label="Språk i Pixelvärlden">
        ${LANGS.map((l) => `<button class="btn small" type="button" data-px-lang="${l.id}">${l.name}</button>`).join('')}
      </div>
      <label class="pixel-level"><span class="tiny muted">Bana</span>
        <select data-px-bana>${SANDBOX.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select>
      </label>
    </div>
    <p class="pixel-task"></p>
    <div class="lab-grid pixel-grid">
      <div class="lab-editor card">
        <div class="editor-slot"></div>
        <div class="row gap wrap lab-actions">
          <button class="btn primary" type="button" data-px-run>Kör</button>
          <button class="btn secondary" type="button" data-px-steprun>Steg för steg</button>
          <button class="btn secondary" type="button" data-px-hint>Fastnat? Få en ledtråd</button>
          <button class="btn ghost" type="button" data-px-ask>Fråga Milo</button>
          <button class="btn ghost small" type="button" data-px-share>Dela med länk</button>
          <button class="btn ghost small" type="button" data-px-download>Ladda ner koden</button>
          <button class="btn ghost small push" type="button" data-px-restore>Återställ exemplet</button>
        </div>
        <div class="share-slot" aria-live="polite"></div>
        <details class="limits"><summary>Vad kan hjälten göra?</summary><div class="px-api"></div></details>
      </div>
      <div class="lab-result card pixel-result">
        <div class="stage-slot"></div>
        <div class="px-output" hidden><span class="output-label">Utskrift</span><pre></pre></div>
        <div class="px-error" role="alert"></div>
        <div class="hint-slot" aria-live="polite"></div>
      </div>
    </div>
  </section>`);

  let editor = null, saveTimer = null, runToken = 0, lastRun = null, hint = null;
  const stage = createStage({ onLine: (line) => editor && editor.highlight(line) });
  el.querySelector('.stage-slot').append(stage.el);
  const out = el.querySelector('.px-output');
  const errBox = el.querySelector('.px-error');
  const hintSlot = el.querySelector('.hint-slot');
  const sb = () => sandboxById(bana);

  const saved = () => store.state.lab?.[key(lang, bana)]?.code;
  const persist = () => {
    clearTimeout(saveTimer);
    const code = editor.value, k = key(lang, bana);
    saveTimer = setTimeout(() => { saveTimer = null; store.update((p) => setLab(p, k, code)); }, 800);
  };
  const flush = () => { if (!saveTimer) return; clearTimeout(saveTimer); saveTimer = null; const c = editor.value, k = key(lang, bana); store.update((p) => setLab(p, k, c)); };

  const clearResult = () => { out.hidden = true; errBox.innerHTML = ''; hint = null; hintSlot.replaceChildren(); el.querySelector('.share-slot').replaceChildren(); };
  const mount = () => {
    const s = sb();
    editor = codeEditor({ value: saved() ?? s[lang], lang, label: `Kod i ${lang === 'csharp' ? 'C#' : 'Python'} för Pixelvärlden`, rows: 14, id: 'px-code', onInput: () => { persist(); editor.highlight(null); if (hint && hint.code !== editor.value) { hint = null; hintSlot.replaceChildren(); } } });
    el.querySelector('.editor-slot').replaceChildren(editor.el);
    el.querySelectorAll('[data-px-lang]').forEach((b) => { b.setAttribute('aria-pressed', String(b.dataset.pxLang === lang)); b.classList.toggle('primary', b.dataset.pxLang === lang); b.classList.toggle('secondary', b.dataset.pxLang !== lang); });
    el.querySelector('[data-px-bana]').value = bana;
    el.querySelector('.pixel-task').textContent = s.text;
    el.querySelector('.px-api').innerHTML = API_HELP[lang];
    stage.setLevel(s.level);
    lastRun = null;
    clearResult();
  };

  const run = async (mode) => {
    const code = editor.value;
    const token = ++runToken;
    clearResult();
    el.querySelectorAll('[data-px-run], [data-px-steprun]').forEach((b) => { b.disabled = true; });
    const res = await runPixelCode(lang, code, { level: sb().level });
    if (token !== runToken || !el.isConnected) return;
    el.querySelectorAll('[data-px-run], [data-px-steprun]').forEach((b) => { b.disabled = false; });
    lastRun = { code, res };
    const done = () => {
      if (res.output) { out.hidden = false; out.querySelector('pre').textContent = res.output.replace(/\n$/, ''); }
      if (res.error) errBox.innerHTML = `<div class="err"><p><strong>${esc(res.error.kind)}${res.error.line ? ` på rad ${res.error.line}` : ''}:</strong> ${esc(res.error.message)}</p></div>`;
      const goals = res.goals || [];
      if (goals.length && goals.every((x) => x.met) && !res.error) announce('Alla mål klara!');
    };
    if (res.error && !(res.events || []).length) { done(); stage.setLevel(sb().level); return; }
    stage.load(res, { mode, onDone: done });
    reveal(el.querySelector('.pixel-result'), undefined, { align: 'top' });
  };

  const renderHint = () => {
    if (!hint) { hintSlot.replaceChildren(); return; }
    const shown = hint.steps.slice(0, hint.step + 1);
    hintSlot.innerHTML = `<section class="hints" aria-labelledby="pxh-h"><h2 id="pxh-h" class="small-h">Ledtrådar <span class="muted">(${hint.step + 1} av ${hint.steps.length})</span></h2>
      <ol>${shown.map((s) => (typeof s === 'string' ? `<li>${esc(s)}</li>` : `<li>${esc(s.text)}<pre class="code-block small"><code>${esc(s.example)}</code></pre></li>`)).join('')}</ol>
      ${hint.step < hint.steps.length - 1 ? '<button class="btn secondary small" type="button" data-px-more>Visa nästa ledtråd</button>' : ''}</section>`;
  };

  ctx.app.codeSource = () => (editor && editor.value.trim() ? { code: editor.value, lang, from: 'Pixelvärlden' } : null);

  const cleanups = [
    on(el, 'click', '[data-px-lang]', (e, b) => {
      if (b.dataset.pxLang === lang) return;
      flush(); runToken++;
      lang = b.dataset.pxLang; ss.set('kodstig.pixel.lang', lang);
      mount();
    }),
    on(el, 'change', '[data-px-bana]', (e, s) => {
      flush(); runToken++;
      bana = s.value; ss.set('kodstig.pixel.bana', bana);
      history.replaceState(null, '', `#/pixelvarld?sprak=${lang}&bana=${bana}`);
      mount();
      announce(`Bana: ${sb().name}. ${sb().text}`);
    }),
    on(el, 'click', '[data-px-run]', () => run('play')),
    on(el, 'click', '[data-px-steprun]', () => run('step')),
    on(el, 'click', '[data-px-hint]', async () => {
      let res = lastRun && lastRun.code === editor.value ? lastRun.res : null;
      if (!res) { res = await runPixelCode(lang, editor.value, { level: sb().level }); lastRun = { code: editor.value, res }; }
      const goalsLeft = (res.goals || []).filter((x) => !x.met);
      let hs = getHints(lang, editor.value, res);
      if (!res.error && goalsLeft.length) {
        hs = { key: `goals:${goalsLeft.length}`, steps: [
          `Koden körde utan fel, men det här är inte klart än: ${goalsLeft.map((x) => x.text.toLowerCase()).join(', ')}.`,
          'Kör med Steg för steg och följ hjälten. Var tar den slut, och var borde den ha varit?',
          res.otherWorld ? `Koden ska fungera på flera kartor. Använd ${lang === 'csharp' ? 'Hjalte.AtGoal() eller Hjalte.CanMove(...)' : 'hjalte.at_goal() eller hjalte.can_move(...)'} i en loop i stället för att räkna rutor.` : 'Lägg till ett steg i taget och kör ofta.',
        ] };
      }
      if (hint && hint.key === hs.key && hint.code === editor.value) hint.step = Math.min(hint.step + 1, hint.steps.length - 1);
      else hint = { key: hs.key, code: editor.value, step: 0, steps: hs.steps };
      renderHint();
    }),
    on(el, 'click', '[data-px-more]', () => { if (hint) { hint.step = Math.min(hint.step + 1, hint.steps.length - 1); renderHint(); } }),
    on(el, 'click', '[data-px-ask]', () => ctx.openMilo()),
    on(el, 'click', '[data-px-restore]', () => {
      if (editor.value !== sb()[lang] && !confirm('Byta ut din kod mot exemplet för den här banan?')) return;
      editor.value = sb()[lang]; persist(); editor.highlight(null); clearResult(); stage.setLevel(sb().level);
    }),
    on(el, 'click', '[data-px-download]', () => {
      const file = lang === 'csharp' ? 'Program.cs' : 'pixelvarlden.py';
      const usesTurtle = lang === 'python' && /\bturtle\b/.test(editor.value) && !/\b(hjalte|world|Canvas)\b/.test(editor.value);
      const note = usesTurtle
        ? '# Turtle finns i riktig Python. Kör filen med: python pixelvarlden.py\n# Lägg till turtle.done() sist så att fönstret stannar kvar.\n\n'
        : lang === 'csharp'
          ? '// Hjalte, World, PixelGrid och Turtle finns bara i Kodstigs Pixelvärld,\n// så den här koden går inte att köra med dotnet utan ändringar.\n\n'
          : '# hjalte, world och Canvas finns bara i Kodstigs Pixelvärld,\n# så den här koden går inte att köra med python utan ändringar.\n\n';
      const url = URL.createObjectURL(new Blob([note + editor.value], { type: 'text/plain;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url; a.download = file; document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      announce(`${file} laddades ner.`);
    }),
    on(el, 'click', '[data-px-share]', async () => {
      const slot = el.querySelector('.share-slot');
      try {
        const url = await shareUrl(lang, editor.value, undefined, { varld: '1', bana });
        slot.innerHTML = `<section class="share-box card" aria-label="Dela koden">
          <p class="tiny"><strong>Allt i koden syns för den som får länken.</strong> Skriv inte ditt namn, din adress, telefonnummer eller lösenord i koden. Koden ligger bara i själva länken och sparas inte hos Kodstig. Pixelvärlden finns bara i Kodstig, så länken öppnas här.</p>
          <label class="sr-only" for="px-share-url">Länk till koden</label>
          <div class="row gap"><input id="px-share-url" class="share-url" readonly value="${esc(url)}"><button class="btn secondary small" type="button" data-px-copy>Kopiera</button></div>
          <p class="tiny muted share-msg" role="status"></p></section>`;
        const input = slot.querySelector('input');
        input.focus(); input.select();
      } catch (e) {
        slot.innerHTML = `<p class="notice bad" role="alert">${esc(e.message)}</p>`;
      }
    }),
    on(el, 'click', '[data-px-copy]', async () => {
      const input = el.querySelector('#px-share-url');
      const msg = el.querySelector('.share-msg');
      try { await navigator.clipboard.writeText(input.value); msg.textContent = 'Länken är kopierad.'; } catch { input.select(); msg.textContent = 'Markera länken och kopiera den.'; }
    }),
  ];

  mount();
  return {
    el,
    destroy() { flush(); runToken++; stage.destroy(); cleanups.forEach((f) => f()); if (ctx.app.codeSource) ctx.app.codeSource = null; },
  };
}
