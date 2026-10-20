// Dagens repetition: några korta frågor från begrepp som är dags att öva igen.
// Rätt på första försöket skjuter begreppet längre fram, fel tar tillbaka det i morgon.
import { h, esc, on, announce } from '../dom.js';
import { trackById } from '../../content/index.js';
import { claimBonus, pref } from '../../state/model.js';
import { REVIEW_XP, today } from '../../state/progression.js';
import { sessionFor, recordReview, nextDue, reviewKey } from '../../state/review.js';
import { renderExercise } from '../exercise.js';

const fmtDay = (day) => new Date(`${day}T12:00:00`).toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });

export function render(ctx) {
  const { store } = ctx;
  const day = today();
  const items = sessionFor(store.state, day);
  const el = h(`<section class="page narrow review" aria-labelledby="rv-h">
    <header class="page-head"><h1 id="rv-h">Dagens repetition</h1>
      <p class="muted">Korta frågor från det du redan har lärt dig. Det du minns kommer tillbaka allt mer sällan, det du glömt kommer tillbaka snart.</p></header>
    <div class="review-stage"></div>
  </section>`);
  const stage = el.querySelector('.review-stage');
  let current = null;
  let idx = 0;
  let right = 0;

  const done = () => {
    if (current) { current.destroy(); current = null; }
    let xpLine = '';
    if (items.length) {
      const had = !!store.state.bonuses[reviewKey(day)];
      store.update((p) => { claimBonus(p, reviewKey(day), { n: items.length }); });
      xpLine = had ? '' : `+${REVIEW_XP} XP för dagens repetition.`;
    }
    const next = nextDue(store.state, day);
    stage.innerHTML = `<article class="card review-done">
      <h2>${items.length ? 'Klart för i dag!' : 'Inget att repetera just nu'}</h2>
      ${items.length ? `<p>Du hade rätt direkt på ${right} av ${items.length}. ${right < items.length ? 'Det som gick fel kommer tillbaka i morgon.' : 'Snyggt!'}</p>` : '<p>Klara en lektion så dyker den upp här dagen efter.</p>'}
      ${xpLine ? `<p class="xp-line">${esc(xpLine)}</p>` : ''}
      ${next ? `<p class="muted">Nästa repetition: ${esc(fmtDay(next))}.</p>` : ''}
      <a class="btn primary" href="#/lar">Till lärstigen</a>
    </article>`;
    announce(items.length ? 'Dagens repetition är klar.' : 'Inget att repetera just nu.');
  };

  const show = () => {
    if (current) { current.destroy(); current = null; }
    if (idx >= items.length) return done();
    const { lesson, i, ex, missed } = items[idx];
    let first = null;
    const wrap = h(`<article class="card exercise-card" data-lesson="${lesson.id}" data-i="${i}">
      <p class="eyebrow">Fråga ${idx + 1} av ${items.length} · ${esc(trackById(lesson.trackId).name)}</p>
      <h2 class="step-label">${esc(lesson.title)}</h2>
      ${missed ? '<p class="tiny muted">Den här gick fel förra gången. Ta det lugnt och läs koden noga.</p>' : ''}
      <div class="ex-host"></div>
      <div class="row end nav-row"><button class="btn primary" type="button" data-next hidden>${idx === items.length - 1 ? 'Avsluta' : 'Nästa fråga'}</button></div>
    </article>`);
    current = renderExercise(ex, {
      lang: lesson.lang,
      idPrefix: `review-${lesson.id}-${i}`,
      example: lesson.example,
      soundOn: () => pref(store.state, 'sound'),
      onAttempt: (ok) => {
        if (first !== null) return;
        first = ok;
        if (ok) right++;
        store.update((p) => recordReview(p, lesson.id, i, ok, day));
      },
      onSolved: () => {
        const nb = wrap.querySelector('[data-next]');
        nb.hidden = false;
        nb.focus({ preventScroll: true });
      },
    });
    wrap.querySelector('.ex-host').append(current.el);
    stage.replaceChildren(wrap);
    const lbl = wrap.querySelector('.step-label');
    lbl.setAttribute('tabindex', '-1');
    if (idx > 0) lbl.focus({ preventScroll: false });
  };

  const cleanups = [on(el, 'click', '[data-next]', () => { idx++; show(); })];
  show();

  return {
    el,
    destroy() { if (current) current.destroy(); cleanups.forEach((f) => f()); },
  };
}
