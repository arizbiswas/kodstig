// Firandet när en lektion är klar: en liten GIF och en ljudslinga med de
// första fyra sekunderna av firandeljudet. Slingan stoppas när användaren går
// vidare, stänger, pausar, stänger av ljudet eller lämnar vyn.
import { openDialog, reducedMotion, esc } from './dom.js';
import { MILO_SVG } from './icons.js';
import { MEDIA, startLoop, stopLoop } from './media.js';

export function openCelebration({ title, lines = [], soundOn, primary, secondary }) {
  const still = reducedMotion();
  let playing = !still;
  const dlg = openDialog({
    title: 'Lektionen är klar!',
    className: 'celebrate',
    body: `<div class="celebrate-media" data-media></div>
      <p class="celebrate-title">${esc(title)}</p>
      <ul class="celebrate-lines">${lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
      <div class="row gap center wrap">
        <button class="btn ghost small" type="button" data-toggle>${still ? 'Spela animationen' : 'Pausa'}</button>
        <button class="btn ghost small" type="button" data-replay>Spela igen</button>
      </div>
      <div class="row gap end wrap">
        ${secondary ? `<button class="btn secondary" type="button" data-secondary>${esc(secondary.label)}</button>` : ''}
        <button class="btn primary" type="button" data-primary autofocus>${esc(primary.label)}</button>
      </div>`,
    onClose: () => cleanup(),
  });
  const media = dlg.body.querySelector('[data-media]');
  let gifOk = true;

  const renderMedia = () => {
    if (!gifOk) {
      media.innerHTML = `<div class="milo-cheer ${playing ? 'on' : ''}">${MILO_SVG}</div>`;
      return;
    }
    if (playing) media.innerHTML = `<img src="${MEDIA.gif}?t=${Date.now()}" alt="Firande animation" width="240" height="240">`;
    else media.innerHTML = `<img src="${MEDIA.poster}" alt="Stillbild från firandet" width="240" height="240">`;
    const img = media.querySelector('img');
    img.addEventListener('error', () => { gifOk = false; renderMedia(); }, { once: true });
  };

  const sound = () => { if (playing && soundOn()) startLoop(); else stopLoop(); };
  const setPlaying = (p) => {
    playing = p;
    dlg.body.querySelector('[data-toggle]').textContent = p ? 'Pausa' : 'Spela animationen';
    renderMedia();
    sound();
  };

  const onVis = () => { if (document.visibilityState === 'hidden') setPlaying(false); };
  const onSound = () => sound();
  document.addEventListener('visibilitychange', onVis);
  window.addEventListener('kodstig:sound', onSound);
  window.addEventListener('hashchange', () => dlg.close('navigate'), { once: true });

  dlg.body.addEventListener('click', (e) => {
    if (e.target.closest('[data-toggle]')) setPlaying(!playing);
    else if (e.target.closest('[data-replay]')) setPlaying(true);
    else if (e.target.closest('[data-primary]')) { dlg.close('primary'); primary.onClick && primary.onClick(); }
    else if (e.target.closest('[data-secondary]')) { dlg.close('secondary'); secondary.onClick && secondary.onClick(); }
  });

  function cleanup() {
    stopLoop();
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('kodstig:sound', onSound);
  }

  renderMedia();
  sound();
  return dlg;
}
