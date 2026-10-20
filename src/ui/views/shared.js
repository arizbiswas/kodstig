// En delad länk: visar koden, kör den isolerat och låter den inloggade öppna den
// i Kodlabbet. Koden kommer från länken, aldrig från en server.
import { h, esc, on, announce } from '../dom.js';
import { readShared, SHARE_LANGS } from '../../state/share.js';
import { setLab } from '../../state/model.js';
import { runCode, previewFor } from '../../engine/runner.js';

export function render(ctx, params = {}, { bare = false } = {}) {
  const el = h(`<section class="page narrow shared" aria-labelledby="sh-h">
    ${bare ? '<header class="welcome-top"><a class="brand" href="#/"><span class="brand-mark" aria-hidden="true">▙</span><span>Kodstig</span></a></header>' : ''}
    <h1 id="sh-h">Delad kod</h1>
    <div class="shared-stage"><p class="muted" role="status">Packar upp länken…</p></div>
  </section>`);
  const stage = el.querySelector('.shared-stage');
  let shared = null;
  let alive = true;

  readShared(params).then((res) => {
    if (!alive) return;
    if (res.error) { stage.innerHTML = `<p class="notice bad" role="alert">${esc(res.error)}</p><p><a class="btn secondary" href="#/">Till Kodstig</a></p>`; return; }
    shared = res;
    const isWeb = res.lang === 'web';
    stage.innerHTML = `<p class="muted">Någon har delat ${esc(SHARE_LANGS[res.lang])}-kod med dig. Koden fanns bara i länken och körs avskilt, så den kommer inte åt ditt konto.</p>
      <pre class="code-block"><code>${esc(res.code)}</code></pre>
      ${isWeb ? '<div class="preview tall"><span class="output-label">Så här ser sidan ut</span><iframe title="Den delade sidan" referrerpolicy="no-referrer"></iframe></div>'
        : `<details class="lab-input"><summary>Indata till input() och ReadLine()</summary><label class="tiny muted" for="sh-stdin">En rad per läsning.</label><textarea id="sh-stdin" class="stdin" rows="2" spellcheck="false"></textarea></details>
          <div class="row gap"><button class="btn primary" type="button" data-sh-run>Kör koden</button></div>
          <div class="output" hidden><span class="output-label">Utskrift</span><pre></pre></div>`}
      <div class="row gap wrap shared-actions">
        ${ctx.user ? '<button class="btn secondary" type="button" data-sh-open>Öppna i Kodlabbet</button>' : '<a class="btn secondary" href="#/">Prova Kodstig</a>'}
      </div>`;
    if (isWeb) {
      const ifr = stage.querySelector('iframe');
      const pv = previewFor(res.code, true);
      ifr.setAttribute('sandbox', pv.sandbox);
      ifr.srcdoc = pv.srcdoc;
    }
  });

  const cleanups = [
    on(el, 'click', '[data-sh-run]', async (e, b) => {
      b.disabled = true;
      const r = await runCode(shared.lang, shared.code, [], { input: el.querySelector('#sh-stdin').value });
      if (!alive) return;
      b.disabled = false;
      const out = el.querySelector('.output');
      out.hidden = false;
      out.querySelector('pre').textContent = (r.output || '').replace(/\n$/, '') + (r.error ? `${r.output ? '\n' : ''}${r.error.kind}${r.error.line ? ` (rad ${r.error.line})` : ''}: ${r.error.message}` : '') || '(ingen utskrift)';
      announce(r.error ? 'Koden gav ett fel.' : 'Koden kördes.');
    }),
    on(el, 'click', '[data-sh-open]', () => {
      const mine = ctx.store.state.lab?.[shared.lang]?.code;
      if (mine && mine.trim() && mine !== shared.code && !confirm(`Ersätta din egen kod i Kodlabbet (${SHARE_LANGS[shared.lang]}) med den delade koden?`)) return;
      ctx.store.update((p) => setLab(p, shared.lang, shared.code));
      ctx.navigate(`/labb?sprak=${shared.lang}`);
    }),
  ];

  return { el, destroy() { alive = false; cleanups.forEach((f) => f()); } };
}
