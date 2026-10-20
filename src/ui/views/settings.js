// Inställningar: namn, dagsmål, ljud, tema, konto och nollställning.
import { h, esc, on, openDialog, toast, announce } from '../dom.js';
import { pref, setPref } from '../../state/model.js';
import { currentTheme, setTheme } from '../theme.js';
import { playSample, startLoop, stopLoop } from '../media.js';

const CONFIRM_WORD = 'NOLLSTÄLL';

export function render(ctx) {
  const { store, user, app } = ctx;
  const p = store.state;
  const el = h(`<section class="page settings narrow" aria-labelledby="set-h">
    <header class="page-head"><h1 id="set-h">Inställningar</h1></header>

    <form class="card stack" data-name-form>
      <h2>Profil</h2>
      <label for="set-name">Vad vill du att Kodstig och Milo ska kalla dig?</label>
      <div class="row gap"><input id="set-name" maxlength="40" autocomplete="given-name" value="${esc(pref(p, 'name'))}"><button class="btn secondary" type="submit">Spara</button></div>
    </form>

    <section class="card stack">
      <h2>Dagsmål</h2>
      <fieldset class="goal-pick"><legend>Hur många minuter vill du öva per dag?</legend>
        ${[5, 10, 15].map((g) => `<label class="chip-radio"><input type="radio" name="set-goal" value="${g}" ${g === pref(p, 'goal') ? 'checked' : ''}><span>${g} min</span></label>`).join('')}
      </fieldset>
    </section>

    <section class="card stack">
      <h2>Ljud</h2>
      <label class="switch"><input type="checkbox" data-sound ${pref(p, 'sound') ? 'checked' : ''}><span>Ljud vid rätt svar och firande</span></label>
      <div class="row gap wrap">
        <button class="btn ghost small" type="button" data-preview-correct>Lyssna: rätt svar</button>
        <button class="btn ghost small" type="button" data-preview-loop aria-pressed="false">Lyssna: firande</button>
      </div>
    </section>

    <section class="card stack">
      <h2>Tema</h2>
      <fieldset class="theme-pick"><legend class="sr-only">Välj tema</legend>
        <label class="theme-opt"><input type="radio" name="theme" value="minecraft" ${currentTheme() === 'minecraft' ? 'checked' : ''}><span class="swatch mc" aria-hidden="true"></span><span><strong>Minecraft</strong><small>Block, pixelrubriker och en liten värld</small></span></label>
        <label class="theme-opt"><input type="radio" name="theme" value="classic" ${currentTheme() === 'classic' ? 'checked' : ''}><span class="swatch cl" aria-hidden="true"></span><span><strong>Klassisk</strong><small>Lugn och ren</small></span></label>
      </fieldset>
    </section>

    <section class="card stack">
      <h2>Konto</h2>
      ${user.guest
        ? `<p>Du övar <strong>utan konto</strong>. Framstegen sparas bara i den här webbläsaren.</p>
           <div class="row gap wrap"><button class="btn primary" type="button" data-login>Skapa konto eller logga in</button><button class="btn ghost" type="button" data-logout>Lämna profilen</button></div>`
        : `<p>Inloggad som <strong>${esc(user.email || user.name || 'ditt konto')}</strong>. Framstegen sparas på kontot.</p>
           <div class="row gap"><button class="btn secondary" type="button" data-logout>Logga ut</button></div>`}
    </section>

    <section class="card stack danger-zone">
      <h2>Börja om</h2>
      <p>Tar bort alla avklarade lektioner, XP, bonusar, utkast och kod i Kodlabbet${user.guest ? ' i den här webbläsaren' : ' på kontot, på alla enheter'}. Namn, dagsmål och ljud behålls.</p>
      <div><button class="btn danger" type="button" data-reset>Nollställ framsteg…</button></div>
    </section>
  </section>`);

  let loopOn = false;
  const setLoopBtn = (on_) => {
    loopOn = on_;
    const b = el.querySelector('[data-preview-loop]');
    b.setAttribute('aria-pressed', String(on_));
    b.textContent = on_ ? 'Stoppa firandet' : 'Lyssna: firande';
  };

  const offs = [
    on(el, 'submit', '[data-name-form]', (e) => {
      e.preventDefault();
      const v = el.querySelector('#set-name').value.trim().slice(0, 40);
      store.update((x) => setPref(x, 'name', v));
      toast('Namnet är sparat.');
    }),
    on(el, 'change', 'input[name="set-goal"]', (e, i) => { store.update((x) => setPref(x, 'goal', Number(i.value))); announce(`Dagsmål ${i.value} minuter.`); }),
    on(el, 'change', '[data-sound]', (e, i) => {
      store.update((x) => setPref(x, 'sound', i.checked));
      window.dispatchEvent(new Event('kodstig:sound'));
      if (!i.checked) { stopLoop(); setLoopBtn(false); }
    }),
    on(el, 'click', '[data-preview-correct]', () => playSample()),
    on(el, 'click', '[data-preview-loop]', async () => {
      if (loopOn) { stopLoop(); setLoopBtn(false); return; }
      setLoopBtn(true);
      const r = await startLoop();
      if (r !== 'playing') {
        setLoopBtn(false);
        if (r === 'missing' || r === 'error') toast('Firandeljudet saknas: lägg filen public/audio/level-complete-loop.wav (se README).');
        else if (r === 'blocked') toast('Webbläsaren blockerade ljudet. Försök igen.');
      } else setTimeout(() => { if (loopOn) { stopLoop(); setLoopBtn(false); } }, 8000);
    }),
    on(el, 'change', 'input[name="theme"]', (e, i) => { setTheme(i.value); app.renderThemeToggle(); }),
    on(el, 'click', '[data-login]', () => ctx.login()),
    on(el, 'click', '[data-logout]', () => app.logout()),
    on(el, 'click', '[data-reset]', () => confirmReset(ctx)),
  ];
  return { el, destroy() { stopLoop(); offs.forEach((f) => f()); } };
}

function confirmReset(ctx) {
  const dlg = openDialog({
    title: 'Nollställa alla framsteg?',
    body: `<p>Det här går inte att ångra. Alla avklarade lektioner, XP och sparad kod försvinner${ctx.user.guest ? '' : ' från kontot på alla enheter'}.</p>
      <form class="stack" data-reset-form>
        <label for="reset-word">Skriv <strong>${CONFIRM_WORD}</strong> för att bekräfta</label>
        <input id="reset-word" autocomplete="off" autocapitalize="characters" spellcheck="false">
        <p class="form-msg" role="status" aria-live="polite"></p>
        <div class="row gap end"><button class="btn ghost" type="button" data-close>Avbryt</button><button class="btn danger" type="submit" disabled>Nollställ</button></div>
      </form>`,
  });
  const form = dlg.body.querySelector('form');
  const input = form.querySelector('input');
  const submit = form.querySelector('[type="submit"]');
  const msg = form.querySelector('.form-msg');
  input.focus();
  input.addEventListener('input', () => { submit.disabled = input.value.trim().toUpperCase() !== CONFIRM_WORD; });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (input.value.trim().toUpperCase() !== CONFIRM_WORD) return;
    submit.disabled = true;
    msg.textContent = 'Nollställer…';
    try {
      await ctx.store.reset();
      dlg.close();
      toast('Framstegen är nollställda. Välkommen till en ny start!');
      ctx.navigate('/lar');
    } catch (err) {
      submit.disabled = false;
      msg.textContent = `Det gick inte att nollställa just nu (${err && err.message ? err.message : 'okänt fel'}). Kontrollera anslutningen och försök igen.`;
    }
  });
}
