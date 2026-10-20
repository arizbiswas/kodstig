// Inloggningsdialogen. Visar bara alternativ som faktiskt fungerar.
import { authConfigured, config, signInWithEmail, signInWithGoogle } from '../state/auth.js';
import { openDialog } from './dom.js';

export function loginDialog(app) {
  const body = authConfigured
    ? `<p class="lead-sm">Dina framsteg sparas på ditt konto och följer med när du loggar in på en annan enhet.</p>
      ${config.google ? '<button class="btn primary wide google" data-google autofocus><span class="g-mark" aria-hidden="true">G</span> Fortsätt med Google</button>' : ''}
      ${config.email ? `<div class="or" aria-hidden="true"><span>eller</span></div>
      <form class="stack" data-email>
        <label for="login-email">E-post</label>
        <input id="login-email" type="email" autocomplete="email" required placeholder="namn@exempel.se">
        <button class="btn secondary wide" type="submit">Skicka inloggningslänk</button>
      </form>` : ''}
      <p class="form-msg" role="status" aria-live="polite"></p>`
    : `<p><strong>Inloggning är inte konfigurerad i den här installationen ännu.</strong></p>
      <p class="muted">Den som driftar Kodstig behöver koppla in Supabase (se README). Tills dess kan du öva utan konto. Framstegen sparas då bara i den här webbläsaren, och du kan flytta dem till ett konto senare.</p>`;
  const dlg = openDialog({
    title: 'Skapa konto eller logga in',
    className: 'login',
    body: `${body}
      <div class="divider"></div>
      <button class="btn ghost wide" data-guest ${authConfigured ? '' : 'autofocus'}>Fortsätt utan konto</button>
      <p class="tiny muted">Utan konto sparas framstegen bara i den här webbläsaren.</p>`,
  });
  const msg = dlg.body.querySelector('.form-msg');
  dlg.body.querySelector('[data-guest]').addEventListener('click', () => { dlg.close(); app.continueAsGuest(); });
  const g = dlg.body.querySelector('[data-google]');
  if (g) g.addEventListener('click', async () => {
    g.disabled = true;
    try { await signInWithGoogle(); }
    catch (e) { g.disabled = false; msg.textContent = `Google-inloggningen kunde inte starta: ${e.message || e}. Kontrollera att Google är aktiverat i Supabase.`; }
  });
  const f = dlg.body.querySelector('[data-email]');
  if (f) f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = f.querySelector('input').value.trim();
    const btn = f.querySelector('button');
    btn.disabled = true;
    msg.textContent = 'Skickar…';
    try { await signInWithEmail(email); msg.textContent = `Klart! Öppna länken som skickats till ${email} för att logga in.`; }
    catch (err) { msg.textContent = `Det gick inte att skicka länken: ${err.message || err}`; }
    finally { btn.disabled = false; }
  });
  return dlg;
}
