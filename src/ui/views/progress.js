// Min utveckling: nivå och nästa steg, dagsmål, en snäll streak, nivåtabell,
// spårens framsteg och milstolpar. Detaljerna ligger i utfällbara sektioner.
import { h, esc, on } from '../dom.js';
import { TRACKS, LESSONS, TIER_NAMES } from '../../content/index.js';
import { pref, setPref, activityByDay } from '../../state/model.js';
import { LEVELS, levelInfo, nextStepAdvice, today, trackProgress, missingReqs, REVIEW_XP, DAILY_XP } from '../../state/progression.js';

const GOALS = [5, 10, 15];
const DAY_NAMES = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'];

function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }

// En dag räknas när dagsmålet nåddes eller en lektion blev klar.
export function streakInfo(profile, now = new Date()) {
  const goal = pref(profile, 'goal') * 60;
  const act = activityByDay(profile);
  const doneDays = new Set(Object.values(profile.completed || {}).map((c) => today(new Date(c.at))));
  const counts = (d) => (act[d] || 0) >= goal || doneDays.has(d);
  const t = today(now);
  let n = 0;
  let cursor = counts(t) ? now : addDays(now, -1);
  while (counts(today(cursor)) && n < 3650) { n++; cursor = addDays(cursor, -1); }
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(now, i - 6);
    const key = today(d);
    return { key, name: DAY_NAMES[d.getDay()], ok: counts(key), secs: act[key] || 0, isToday: key === t };
  });
  const everActive = Object.keys(act).length > 0 || doneDays.size > 0;
  return { streak: n, todayDone: counts(t), todaySecs: act[t] || 0, goalSecs: goal, week, everActive };
}

export function milestones(profile) {
  const done = Object.keys(profile.completed || {}).map((id) => LESSONS.find((l) => l.id === id)).filter(Boolean);
  const info = levelInfo(profile);
  const tracksDone = TRACKS.filter((t) => { const p = trackProgress(profile, t.id); return p.done === p.total; });
  return [
    { label: 'Första lektionen klar', ok: done.length >= 1 },
    { label: 'Tio lektioner klara', ok: done.length >= 10 },
    { label: 'Första miniprojektet', ok: done.some((l) => l.tier === 5) },
    { label: 'Provat alla tre spåren', ok: new Set(done.map((l) => l.trackId)).size === 3 },
    { label: 'Nådde nivå 5', ok: info.level >= 5 },
    { label: 'Ett helt spår klart', ok: tracksDone.length >= 1 },
  ];
}

const mins = (s) => Math.floor(s / 60);

export function render(ctx) {
  const { store } = ctx;
  const el = h(`<section class="page progress" aria-labelledby="pr-h">
    <header class="page-head"><h1 id="pr-h">Min utveckling</h1></header>
    <div class="progress-body"></div>
  </section>`);
  const body = el.querySelector('.progress-body');
  const openDetails = new Set();

  const draw = () => {
    body.querySelectorAll('details[data-k]').forEach((d) => { if (d.open) openDetails.add(d.dataset.k); else openDetails.delete(d.dataset.k); });
    const p = store.state;
    const info = levelInfo(p);
    const track = pref(p, 'track');
    const adv = nextStepAdvice(p, track);
    const st = streakInfo(p);
    const goal = pref(p, 'goal');
    const pct = Math.min(100, Math.round((st.todaySecs / st.goalSecs) * 100));
    const next = info.next;
    const open = (k) => (openDetails.has(k) ? 'open' : '');

    let nextHtml = '<p>Du har nått högsta nivån. Imponerande!</p>';
    if (next) {
      const reqs = next.reqs;
      nextHtml = `<div class="bar" role="progressbar" aria-label="XP mot nivå ${next.level}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(next.progress * 100)}"><span style="width:${Math.round(next.progress * 100)}%"></span></div>
        <p>${next.xpMissing > 0 ? `${next.xpMissing} XP kvar till nivå ${next.level}, ${esc(next.title)}.` : `XP räcker för nivå ${next.level}, ${esc(next.title)}.`}</p>
        ${reqs.length ? `<p>Kunskapskrav som saknas: ${esc(reqs.map((r) => r.text).join(', '))}.</p>` : ''}
        ${adv && adv.enoughXp ? `<p class="advice">Nästa konkreta steg: ${adv.lesson ? `gör <a href="#/lektion/${adv.lesson.id}">${esc(adv.lesson.title)}</a> (${esc(TIER_NAMES[adv.lesson.tier].toLowerCase())}).` : adv.path ? `fortsätt med <a href="#/lektion/${adv.path.id}">${esc(adv.path.title)}</a> så låser du upp lektioner av rätt sort.` : 'fortsätt på lärstigen.'}</p>` : ''}`;
    }

    body.innerHTML = `
      <article class="card level-card">
        <div class="level-badge" aria-hidden="true">${info.level}</div>
        <div><p class="eyebrow">Nivå ${info.level}</p><h2>${esc(info.title)}</h2><p class="xp-total"><strong>${info.xp}</strong> XP</p></div>
        <div class="level-next">${nextHtml}</div>
      </article>

      <div class="two-col">
        <article class="card goal-card" aria-labelledby="goal-h">
          <h2 id="goal-h">Dagsmål</h2>
          <p class="big-num">${mins(st.todaySecs)} <span>av ${goal} min</span></p>
          <div class="bar ${pct >= 100 ? 'full' : ''}" role="progressbar" aria-label="Aktiv tid i dag" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>
          <p class="tiny muted">${pct >= 100 ? 'Dagsmålet är nått. Bra jobbat!' : 'Tiden räknas bara när du faktiskt övar, inte när fliken står öppen.'}</p>
          <fieldset class="goal-pick"><legend>Mitt dagsmål</legend>
            ${GOALS.map((g) => `<label class="chip-radio"><input type="radio" name="goal" value="${g}" ${g === goal ? 'checked' : ''}><span>${g} min</span></label>`).join('')}
          </fieldset>
        </article>

        <article class="card streak-card" aria-labelledby="streak-h">
          <h2 id="streak-h">Din rytm</h2>
          <p class="big-num">${st.streak} <span>${st.streak === 1 ? 'dag i rad' : 'dagar i rad'}</span></p>
          <ol class="week" aria-label="Senaste sju dagarna">
            ${st.week.map((d) => `<li class="${d.ok ? 'ok' : ''} ${d.isToday ? 'today' : ''}"><span class="dot" aria-hidden="true"></span><span>${d.name}</span><span class="sr-only">${d.ok ? 'övat' : 'inte övat'}${d.isToday ? ' (i dag)' : ''}</span></li>`).join('')}
          </ol>
          <p class="tiny muted">${st.streak === 0 && st.everActive ? 'Välkommen tillbaka! En kort stund i dag räcker för att komma igång igen.' : !st.todayDone && st.streak > 0 ? 'Gör en lektion eller nå dagsmålet i dag så fortsätter rytmen.' : 'Pauser är okej. Det viktiga är att du kommer tillbaka.'}</p>
        </article>
      </div>

      <details class="card fold" data-k="levels" ${open('levels')}><summary><h2>Alla nivåer</h2></summary>
        <div class="table-wrap"><table class="levels"><thead><tr><th scope="col">Nivå</th><th scope="col">XP</th><th scope="col">Kunskapskrav</th><th scope="col">Status</th></tr></thead><tbody>
        ${LEVELS.map((L) => {
          const miss = missingReqs(L, info.knowledge);
          const status = L.level <= info.level ? 'Uppnådd' : L.level === info.level + 1 ? 'Nästa' : '';
          return `<tr class="${L.level <= info.level ? 'reached' : ''}"><th scope="row">${L.level}. ${esc(L.title)}</th><td>${L.xp}</td><td>${esc(L.reqText)}${L.level > info.level && miss.length ? `<br><small class="muted">Saknas: ${esc(miss.map((m) => m.text).join(', '))}</small>` : ''}</td><td>${status}</td></tr>`;
        }).join('')}
        </tbody></table></div>
        <p class="tiny muted">Nivå 9 till 12 kräver lektioner från fortsättningskapitlen, där du skriver kod som en utvecklare gör: felhantering, klasser, algoritmer och större projekt. Den högsta nivån betyder att du har gått igenom de grunder en juniorutvecklare behöver. För ett jobb behövs sedan egna större projekt, verktyg som Git och vana att samarbeta med andra.</p>
      </details>

      <details class="card fold" data-k="tracks" ${open('tracks')}><summary><h2>Spåren</h2></summary>
        ${TRACKS.map((t) => {
          const tp = trackProgress(p, t.id);
          return `<div class="track-prog"><h3>${esc(t.name)} <span class="muted">${tp.done}/${tp.total}</span></h3>
            <div class="bar" role="progressbar" aria-label="${esc(t.name)}" aria-valuemin="0" aria-valuemax="${tp.total}" aria-valuenow="${tp.done}"><span style="width:${(tp.done / tp.total) * 100}%"></span></div>
            <ul class="ch-list">${t.chapters.map((c) => { const d = c.lessons.filter((l) => p.completed[l.id]).length; return `<li class="${d === c.lessons.length ? 'done' : ''}"><a href="#/lar?kapitel=${c.id}">${esc(c.title)}</a> <span class="muted">${d}/${c.lessons.length}</span></li>`; }).join('')}</ul></div>`;
        }).join('')}
      </details>

      <details class="card fold" data-k="xp" ${open('xp')}><summary><h2>Så har du fått dina XP</h2></summary>
        <ul class="xp-parts">
          <li>Avklarade lektioner: <strong>${info.xpParts.lessonXp} XP</strong></li>
          <li>Repetitionsbonus (${REVIEW_XP} XP, högst en per dag, tidigast dagen efter): <strong>${Object.keys(p.bonuses).filter((k) => k.startsWith('review:')).length * REVIEW_XP} XP</strong></li>
          <li>Dagens utmaning (${DAILY_XP} XP per dag): <strong>${Object.keys(p.bonuses).filter((k) => k.startsWith('daily:')).length * DAILY_XP} XP</strong></li>
        </ul>
        <p class="tiny muted">Varje lektion ger XP en gång. Att göra om en lektion kostar ingenting och kan ge repetitionsbonus.</p>
      </details>

      <details class="card fold" data-k="ms" ${open('ms')}><summary><h2>Milstolpar</h2></summary>
        <ul class="milestones">${milestones(p).map((m) => `<li class="${m.ok ? 'ok' : ''}"><span aria-hidden="true">${m.ok ? '★' : '☆'}</span> ${esc(m.label)}<span class="sr-only">${m.ok ? ', uppnådd' : ', inte än'}</span></li>`).join('')}</ul>
      </details>`;
  };

  const offs = [
    on(el, 'change', 'input[name="goal"]', (e, inp) => {
      store.update((p) => setPref(p, 'goal', Number(inp.value)));
      draw();
      el.querySelector(`input[name="goal"][value="${inp.value}"]`)?.focus();
    }),
  ];
  // Uppdatera när aktiv tid sparas eller en annan flik ändrar profilen,
  // men inte medan användaren står i ett formulärfält.
  const unsub = store.on((type) => {
    if (type !== 'change' && type !== 'replaced') return;
    if (el.contains(document.activeElement) && document.activeElement.matches('input')) return;
    draw();
  });
  draw();
  return { el, destroy() { unsub(); offs.forEach((f) => f()); } };
}
