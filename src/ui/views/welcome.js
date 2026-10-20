// Introduktionen för nya besökare och prova-på-demon (utan konto och utan XP).
import { h, esc, on } from '../dom.js';
import { MILO_SVG } from '../icons.js';
import { STATS, TRACKS } from '../../content/index.js';
import { runPython } from '../../engine/python.js';
import { squash } from '../../engine/grade.js';
import { playCorrect } from '../media.js';

export function intro(ctx) {
  const el = h(`<div class="welcome">
    <header class="welcome-top">
      <span class="brand"><span class="brand-mark" aria-hidden="true">▙</span><span>Kodstig</span></span>
      <button class="btn ghost" data-login type="button">Logga in</button>
    </header>
    <main class="welcome-main" id="main">
      <section class="hero">
        <div class="hero-text">
          <h1>Din första kodrad.<br><span>Början på något mer.</span></h1>
          <p class="lead">Lär dig C#, Python och HTML/CSS med korta lektioner. Ingen förkunskap behövs.</p>
          <div class="row gap wrap">
            <a class="btn primary big" href="#/prova">Prova ett första steg</a>
            <button class="btn secondary big" data-login type="button">Logga in</button>
          </div>
          ${ctx.user ? '<p class="tiny"><a href="#/lar">Tillbaka till din lärstig</a></p>' : ''}
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="hero-milo">${MILO_SVG}</div>
          <pre class="hero-code"><code>steg = 1
print(steg + 2)</code></pre>
        </div>
      </section>
      <section class="method" aria-labelledby="method-h">
        <h2 id="method-h">Så fungerar det</h2>
        <ol class="method-steps">
          <li><span class="step-n">1</span><h3>Läs</h3><p>En kort förklaring och ett tydligt exempel. Ett begrepp i taget.</p></li>
          <li><span class="step-n">2</span><h3>Testa</h3><p>Prova själv direkt. Fel är en del av lärandet, och du får försöka igen.</p></li>
          <li><span class="step-n">3</span><h3>Bygg vidare</h3><p>Kombinera det du kan till små program och egna projekt.</p></li>
        </ol>
      </section>
      <details class="more">
        <summary>Vad finns i Kodstig?</summary>
        <p>${STATS.lessons} lektioner, ${STATS.exercises} övningar och ${STATS.projects} miniprojekt i tre spår:</p>
        <ul>${TRACKS.map((t) => `<li><strong>${esc(t.name)}</strong>: ${t.chapters.length} kapitel, från ${esc(t.chapters[0].title.toLowerCase())} till ${esc(t.chapters[5].title.toLowerCase())}.</li>`).join('')}</ul>
        <p>Du får XP för avklarade lektioner, en lugn lärstig att följa, ett kodlabb för egna experiment och Milo, en liten AI-studiekompis.</p>
      </details>
    </main>
  </div>`);
  const off = on(el, 'click', '[data-login]', () => ctx.login());
  return { el, destroy: off };
}

export function demo(ctx) {
  const el = h(`<div class="welcome demo">
    <header class="welcome-top">
      <a class="brand" href="#/"><span class="brand-mark" aria-hidden="true">▙</span><span>Kodstig</span></a>
      <a class="btn ghost" href="#/">Tillbaka till introduktionen</a>
    </header>
    <main class="welcome-main narrow" id="main">
      <h1>Ditt första steg</h1>
      <p class="muted">Ungefär en minut. Inget konto behövs, och inget sparas.</p>
      <div class="steps-bar" aria-hidden="true"><span></span><span></span><span></span></div>
      <p class="sr-only" aria-live="polite" data-step-label></p>
      <section class="card demo-card" data-stage></section>
    </main>
  </div>`);
  const stage = el.querySelector('[data-stage]');
  const label = el.querySelector('[data-step-label]');
  const bars = [...el.querySelectorAll('.steps-bar span')];
  let step = 0;

  const show = (n) => {
    step = n;
    bars.forEach((b, i) => b.classList.toggle('on', i <= n));
    label.textContent = n < 3 ? `Steg ${n + 1} av 3` : 'Klart';
    stage.innerHTML = STAGES[n]();
    const f = stage.querySelector('[data-focus]') || stage.querySelector('h2');
    if (f) { if (f.tagName === 'H2') f.setAttribute('tabindex', '-1'); f.focus(); }
  };

  const STAGES = [
    () => `<h2>En variabel är en låda med ett namn</h2>
      <p>När du skriver <code>steg = 1</code> skapar du en låda som heter <strong>steg</strong> och lägger talet <strong>1</strong> i den.</p>
      <pre class="code-block"><code>steg = 1</code></pre>
      <div class="var-box" aria-hidden="true"><span class="var-name">steg</span><span class="var-val">1</span></div>
      <p>Senare kan programmet titta i lådan och använda värdet.</p>
      <div class="row end"><button class="btn primary" data-next data-focus>Nästa</button></div>`,
    () => `<h2>Vad skriver programmet ut?</h2>
      <pre class="code-block"><code>steg = 1
print(steg + 2)</code></pre>
      <fieldset class="choices"><legend class="sr-only">Välj ett svar</legend>
        ${['3', 'steg + 2', '12'].map((o, i) => `<label class="choice"><input type="radio" name="d2" value="${i}" ${i === 0 ? 'data-focus' : ''}><span>${esc(o)}</span></label>`).join('')}
      </fieldset>
      <div class="feedback" role="status" aria-live="polite"></div>
      <div class="row end"><button class="btn primary" data-check2>Kontrollera</button></div>`,
    () => `<h2>Skriv din första kodrad</h2>
      <p>Funktionen <code>print</code> skriver ut text. Fyll i det som saknas.</p>
      <div class="fill-code code-block"><input class="blank" aria-label="Lucka: det som saknas före parentesen" autocomplete="off" autocapitalize="off" spellcheck="false" data-focus size="6"><code>("Hej, kodare!")</code></div>
      <div class="output" aria-live="polite" hidden><span class="output-label">Utskrift</span><pre></pre></div>
      <div class="feedback" role="status" aria-live="polite"></div>
      <div class="row end"><button class="btn primary" data-check3>Kör koden</button></div>`,
    () => `<h2>Snyggt! Det där var din första kod.</h2>
      <p>Du har skapat en variabel, förutsett vad ett program gör och skrivit en egen kodrad. Precis så fungerar Kodstig: läs, testa, bygg vidare.</p>
      <div class="stack">
        <button class="btn primary big" data-login data-focus>Skapa konto eller logga in</button>
        <button class="btn secondary" data-guest>Fortsätt utan konto</button>
        <a class="btn ghost" href="#/">Tillbaka till introduktionen</a>
      </div>
      <p class="tiny muted">Den här demon gav inga XP och sparades inte. Ditt konto börjar från början.</p>`,
  ];

  const cleanups = [
    on(el, 'click', '[data-next]', () => show(step + 1)),
    on(el, 'click', '[data-login]', () => ctx.login()),
    on(el, 'click', '[data-guest]', () => ctx.app.continueAsGuest()),
    on(el, 'click', '[data-check2]', () => {
      const fb = stage.querySelector('.feedback');
      const sel = stage.querySelector('input[name="d2"]:checked');
      if (!sel) { fb.className = 'feedback info'; fb.textContent = 'Välj ett av svaren först.'; return; }
      if (sel.value === '0') {
        fb.className = 'feedback good';
        fb.innerHTML = '<strong>Rätt!</strong> steg innehåller 1, och 1 + 2 är 3. Python räknar ut värdet innan det skrivs ut.';
        playCorrect();
        const btn = stage.querySelector('[data-check2]');
        btn.outerHTML = '<button class="btn primary" data-next>Nästa</button>';
        stage.querySelector('[data-next]').focus();
      } else {
        fb.className = 'feedback bad';
        fb.innerHTML = sel.value === '1'
          ? '<strong>Inte riktigt.</strong> Utan citattecken är steg + 2 en uträkning, inte text. Vad finns i lådan steg? Prova igen.'
          : '<strong>Inte riktigt.</strong> Det är ett tal, inte text, så 1 och 2 sätts inte bara ihop. Prova igen.';
      }
    }),
    on(el, 'click', '[data-check3]', () => {
      const inp = stage.querySelector('.blank');
      const fb = stage.querySelector('.feedback');
      const out = stage.querySelector('.output');
      const val = squash(inp.value);
      const r = runPython(`${inp.value.trim()}("Hej, kodare!")`);
      if (val === 'print') {
        out.hidden = false;
        out.querySelector('pre').textContent = r.output.trimEnd();
        fb.className = 'feedback good';
        fb.innerHTML = '<strong>Där är den!</strong> print skickar texten till skärmen. Citattecknen visar bara var texten börjar och slutar.';
        playCorrect();
        const btn = stage.querySelector('[data-check3]');
        btn.outerHTML = '<button class="btn primary" data-next>Avsluta</button>';
        stage.querySelector('[data-next]').focus();
      } else {
        out.hidden = true;
        fb.className = 'feedback bad';
        if (!val) fb.innerHTML = 'Skriv namnet på funktionen som skriver ut text.';
        else if (val.toLowerCase() === 'print') fb.innerHTML = '<strong>Nästan!</strong> Python skiljer på stora och små bokstäver. Skriv <code>print</code> med små bokstäver.';
        else fb.innerHTML = `<strong>Inte riktigt.</strong> ${r.error ? esc(r.error.message) : ''} Ledtråd: ordet börjar på p och betyder ”skriv ut” på engelska.`;
      }
    }),
    on(el, 'keydown', '.blank', (e) => { if (e.key === 'Enter') { e.preventDefault(); stage.querySelector('[data-check3]')?.click(); } }),
  ];
  show(0);
  return { el, destroy: () => cleanups.forEach((f) => f()) };
}
