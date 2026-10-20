// Lär dig: spårval, nästa steg, dagens utmaning och en slingrande lärstig
// med sex kapitel per spår. Ett kapitel i taget kan vara öppet.
import { h, esc, on, announce, toast } from '../dom.js';
import { ICONS } from '../icons.js';
import { TRACKS, LESSONS, TIER_NAMES, trackById } from '../../content/index.js';
import { quizPool, TEST_OUT } from '../../state/placement.js';
import { pref, setPref, claimBonus } from '../../state/model.js';
import { dueLessons, nextDue, reviewKey, SESSION_MAX } from '../../state/review.js';
import { TIER_XP, DAILY_XP, REVIEW_XP, today, isUnlocked, availableLessons, nextStepAdvice, canClaimDaily, trackProgress, levelInfo } from '../../state/progression.js';
import { currentTheme } from '../theme.js';
import { renderWorld } from '../world.js';
import { renderExercise } from '../exercise.js';

function hashStr(s) {
  let x = 2166136261;
  for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619); }
  return x >>> 0;
}

// Dagens utmaning: en kort fråga från något du redan har gjort i spåret.
export function dailyExercise(profile, track, day = today()) {
  const lessons = track.chapters.flatMap((c) => c.lessons);
  const done = lessons.filter((l) => profile.completed?.[l.id]);
  const pool = (done.length ? done : lessons.slice(0, 1)).flatMap((l) => l.exercises
    .map((ex, i) => ({ ex, lesson: l, i }))
    .filter((x) => x.ex.type === 'choice' || x.ex.type === 'fill'));
  if (!pool.length) return null;
  return pool[hashStr(`${day}:${track.id}`) % pool.length];
}

export function chapterState(profile, ch) {
  const done = ch.lessons.filter((l) => profile.completed?.[l.id]).length;
  if (done === ch.lessons.length) return { status: 'done', done };
  if (profile.skipped?.[ch.id]) return { status: 'skipped', done };
  if (done > 0 || isUnlocked(profile, ch.lessons[0])) return { status: 'open', done };
  return { status: 'locked', done };
}

export function render(ctx, params = {}) {
  const { store } = ctx;
  let track = trackById(pref(store.state, 'track'));
  let openChapter = params.kapitel && track.chapters.some((c) => c.id === params.kapitel) ? params.kapitel : null;
  if (params.kapitel && !openChapter) {
    // Kapitel från ett annat spår: byt spår så att länken fungerar.
    const t = TRACKS.find((x) => x.chapters.some((c) => c.id === params.kapitel));
    if (t) { track = t; openChapter = params.kapitel; store.update((p) => setPref(p, 'track', t.id)); }
  }

  const el = h(`<section class="page learn" aria-labelledby="learn-h">
    <header class="page-head">
      <h1 id="learn-h">Lär dig</h1>
      <p class="muted greeting"></p>
    </header>
    <div class="world-slot"></div>
    <div class="track-switch" role="group" aria-label="Välj spår">
      ${TRACKS.map((t) => `<button class="track-btn" type="button" data-track="${t.id}">${esc(t.name)}<small></small></button>`).join('')}
    </div>
    <div class="learn-grid">
      <div class="next-slot"></div>
      <div class="side-cards"><div class="review-slot"></div><div class="daily-slot"></div></div>
    </div>
    <section class="path-wrap" aria-labelledby="path-h">
      <h2 id="path-h" class="sr-only">Lärstig</h2>
      <div class="path">
        <svg class="path-line" aria-hidden="true" focusable="false"><path class="path-bg"/><path class="path-done"/></svg>
        <ol class="stations"></ol>
      </div>
      <div class="chapter-slot"></div>
    </section>
  </section>`);

  const worldSlot = el.querySelector('.world-slot');
  let world = null;
  let daily = null;
  const mountWorld = () => {
    if (world) { world.destroy(); world = null; }
    worldSlot.replaceChildren();
    if (currentTheme() === 'minecraft') { world = renderWorld(); worldSlot.append(world.el); }
  };

  const renderGreeting = () => {
    const name = pref(store.state, 'name');
    const info = levelInfo(store.state);
    el.querySelector('.greeting').textContent = `${name ? `Hej ${name}! ` : ''}Nivå ${info.level}, ${info.title} · ${info.xp} XP`;
  };

  const renderTracks = () => {
    el.querySelectorAll('[data-track]').forEach((b) => {
      const t = trackById(b.dataset.track);
      const tp = trackProgress(store.state, t.id);
      b.setAttribute('aria-pressed', String(t.id === track.id));
      b.querySelector('small').textContent = `${tp.done}/${tp.total} lektioner`;
    });
  };

  const renderNext = () => {
    const slot = el.querySelector('.next-slot');
    const next = availableLessons(store.state, track.id)[0];
    const advice = nextStepAdvice(store.state, track.id);
    let adviceHtml = '';
    if (advice && advice.enoughXp) {
      const target = advice.lesson || advice.path;
      adviceHtml = `<div class="advice"><p><strong>Du har XP nog för nästa nivå.</strong> Det som saknas är ${esc(advice.reqs.map((r) => r.text).join(' och '))}.</p>
        ${target ? `<p>Nästa konkreta steg: <a href="#/lektion/${target.id}">${esc(target.title)}</a> (${esc(trackById(target.trackId).name)}, ${esc(TIER_NAMES[target.tier].toLowerCase())}).</p>` : ''}</div>`;
    }
    if (!next) {
      slot.innerHTML = `<article class="card next-card done"><p class="eyebrow">${esc(track.name)}</p><h2>Hela spåret är klart!</h2>
        <p>Fortsätt med den dagliga repetitionen, prova ett annat spår eller bygg något eget i Kodlabbet.</p>${adviceHtml}
        <a class="btn secondary" href="#/labb">Öppna Kodlabbet</a></article>`;
      return;
    }
    const ch = track.chapters.find((c) => c.id === next.chapterId);
    // Nivåtestet erbjuds bara innan man har börjat på spåret.
    const fresh = !LESSONS.some((l) => l.trackId === track.id && (store.state.completed[l.id] || store.state.lessons[l.id])) && !track.chapters.some((c) => store.state.skipped?.[c.id]);
    const started = store.state.lessons[next.id] && (store.state.lessons[next.id].step > 0 || Object.keys(store.state.lessons[next.id].solved || {}).length);
    slot.innerHTML = `<article class="card next-card">
      <p class="eyebrow">${started ? 'Fortsätt där du var' : 'Nästa steg'} · ${esc(ch.title)}</p>
      <h2>${esc(next.title)}</h2>
      <p class="muted">${esc(TIER_NAMES[next.tier])} · ${next.exercises.length} övningar · ${TIER_XP[next.tier]} XP</p>
      ${adviceHtml}
      <a class="btn primary" href="#/lektion/${next.id}">${ICONS.play}<span>${started ? 'Fortsätt' : 'Starta lektionen'}</span></a>
      ${fresh ? `<p class="tiny placement-link">Kan du redan lite ${esc(track.name)}? <a href="#/nivatest/${track.id}">Gör nivåtestet</a> och börja på rätt ställe.</p>` : ''}
    </article>`;
  };

  // Dagens repetition gäller alla spår, eftersom kön innehåller begrepp från alla.
  const renderReview = () => {
    const slot = el.querySelector('.review-slot');
    const due = dueLessons(store.state);
    const claimed = !!store.state.bonuses[reviewKey()];
    if (claimed && !due.length) {
      const next = nextDue(store.state);
      slot.innerHTML = `<article class="card review-card claimed"><p class="eyebrow">Dagens repetition</p><h2>Klar för i dag ${ICONS.check}</h2>
        <p class="muted">${next ? 'Nya frågor väntar när det är dags igen.' : 'Klara fler lektioner så fylls repetitionen på.'}</p></article>`;
      return;
    }
    if (!due.length) { slot.replaceChildren(); return; }
    const n = Math.min(due.length, SESSION_MAX);
    slot.innerHTML = `<article class="card review-card"><p class="eyebrow">Dagens repetition${claimed ? '' : ` · +${REVIEW_XP} XP`}</p>
      <h2>${n} ${n === 1 ? 'fråga' : 'frågor'} att repetera</h2>
      <p class="muted">Några minuter med saker du redan har lärt dig, så att de fastnar på riktigt.</p>
      <a class="btn secondary" href="#/repetition">Starta repetitionen</a></article>`;
  };

  const renderDaily = () => {
    const slot = el.querySelector('.daily-slot');
    if (daily) { daily.destroy(); daily = null; }
    const claim = canClaimDaily(store.state);
    const pick = dailyExercise(store.state, track);
    if (!claim.ok) {
      slot.innerHTML = `<article class="card daily-card claimed"><p class="eyebrow">Dagens utmaning</p><h2>Klar för i dag ${ICONS.check}</h2>
        <p class="muted">En ny utmaning väntar i morgon. Ingen stress om du missar en dag.</p></article>`;
      return;
    }
    if (!pick) { slot.replaceChildren(); return; }
    slot.innerHTML = `<article class="card daily-card"><p class="eyebrow">Dagens utmaning · +${DAILY_XP} XP</p>
      <details class="daily"><summary><span>En snabb fråga från ${esc(pick.lesson.title)}</span></summary><div class="daily-host"></div></details></article>`;
    daily = renderExercise(pick.ex, {
      lang: pick.lesson.lang,
      idPrefix: `daily-${track.id}`,
      example: pick.lesson.example,
      soundOn: () => pref(store.state, 'sound'),
      onSolved: () => {
        const c = canClaimDaily(store.state);
        if (c.ok) {
          store.update((p) => { claimBonus(p, c.key, { track: track.id }); });
          toast(`Dagens utmaning klar! +${DAILY_XP} XP`, 'success');
          renderGreeting();
        }
        const b = h('<button class="btn secondary small" type="button" data-daily-done>Klart</button>');
        slot.querySelector('.daily-host').append(b);
      },
    });
    slot.querySelector('.daily-host').append(daily.el);
  };

  const stations = el.querySelector('.stations');
  const renderStations = () => {
    stations.innerHTML = track.chapters.map((ch, i) => {
      const st = chapterState(store.state, ch);
      const label = { done: 'klart', skipped: 'uttestat', open: st.done ? `${st.done} av ${ch.lessons.length} lektioner klara` : 'öppet', locked: 'låst' }[st.status];
      return `<li class="station s-${st.status} ${i % 2 ? 'right' : 'left'}" data-ch="${ch.id}">
        <button class="station-btn" type="button" aria-expanded="${openChapter === ch.id}" aria-controls="chapter-panel" data-chapter="${ch.id}">
          <span class="station-node" aria-hidden="true">${st.status === 'done' || st.status === 'skipped' ? ICONS.check : st.status === 'locked' ? ICONS.lock : `<b>${i + 1}</b>`}</span>
          <span class="station-text"><span class="station-num">Kapitel ${i + 1}</span><span class="station-title">${esc(ch.title)}</span>
          <span class="station-meta">${st.done}/${ch.lessons.length}<span class="sr-only">, ${label}</span></span></span>
        </button>
      </li>`;
    }).join('');
    requestAnimationFrame(drawPath);
  };

  // Linjen räknas om från stationernas faktiska positioner, så den träffar
  // dem även när layouten ändras (fönsterstorlek, tema, öppet kapitel).
  const svg = el.querySelector('.path-line');
  const drawPath = () => {
    const box = el.querySelector('.path').getBoundingClientRect();
    if (!box.width) return;
    const nodes = [...stations.querySelectorAll('.station-node')].map((n) => {
      const r = n.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
    });
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    svg.setAttribute('width', box.width);
    svg.setAttribute('height', box.height);
    const seg = (pts) => pts.map((p, i) => {
      if (i === 0) return `M${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      const a = pts[i - 1];
      const my = (a.y + p.y) / 2;
      return `C${a.x.toFixed(1)} ${my.toFixed(1)} ${p.x.toFixed(1)} ${my.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    }).join(' ');
    svg.querySelector('.path-bg').setAttribute('d', seg(nodes));
    let lastDone = -1;
    track.chapters.forEach((ch, i) => { if (['done', 'skipped'].includes(chapterState(store.state, ch).status) && lastDone === i - 1) lastDone = i; });
    const donePts = nodes.slice(0, Math.min(nodes.length, lastDone + 2));
    svg.querySelector('.path-done').setAttribute('d', lastDone >= 0 && donePts.length > 1 ? seg(donePts) : '');
  };
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => drawPath()) : null;
  if (ro) ro.observe(el.querySelector('.path'));

  const chapterSlot = el.querySelector('.chapter-slot');
  const renderChapter = ({ focus = false } = {}) => {
    stations.querySelectorAll('[data-chapter]').forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.chapter === openChapter)));
    stations.querySelectorAll('.station').forEach((s) => s.classList.toggle('active', s.dataset.ch === openChapter));
    if (!openChapter) { chapterSlot.replaceChildren(); return; }
    const idx = track.chapters.findIndex((c) => c.id === openChapter);
    const ch = track.chapters[idx];
    const st = chapterState(store.state, ch);
    const items = ch.lessons.map((l) => {
      const done = !!store.state.completed[l.id];
      const open = done || isUnlocked(store.state, l);
      const req = l.requires.map((r) => track.chapters.flatMap((c) => c.lessons).find((x) => x.id === r)).filter(Boolean)[0];
      return `<li class="lesson-item ${done ? 'done' : open ? 'open' : 'locked'}">
        <span class="li-icon" aria-hidden="true">${done ? ICONS.check : open ? ICONS.play : ICONS.lock}</span>
        <span class="li-text">${open ? `<a href="#/lektion/${l.id}">${esc(l.title)}</a>` : `<span>${esc(l.title)}</span>`}
          <small>${esc(TIER_NAMES[l.tier])} · ${TIER_XP[l.tier]} XP${done ? ' · Klar' : ''}${!open && req ? ` · Låses upp efter ”${esc(req.title)}”` : ''}</small></span>
      </li>`;
    }).join('');
    chapterSlot.innerHTML = `<section id="chapter-panel" class="card chapter-panel s-${st.status}" aria-labelledby="chapter-h" tabindex="-1">
      <header class="row between"><div><p class="eyebrow">Kapitel ${idx + 1} · ${st.done}/${ch.lessons.length} klara</p><h2 id="chapter-h">${esc(ch.title)}</h2></div>
        <button class="icon-btn" type="button" data-close-chapter aria-label="Stäng kapitlet">${ICONS.close}</button></header>
      ${st.status === 'locked' ? `<div class="notice"><p>Det här kapitlet låses upp när du har klarat kapitlet före. Du kan titta på vad som väntar.</p>
        ${quizPool(ch).length >= TEST_OUT.questions ? `<p>Kan du det här redan? <a class="btn secondary small" href="#/testa/${ch.id}">Testa ut kapitlet</a></p>` : ''}</div>` : ''}
      ${st.status === 'skipped' ? '<p class="notice">Du testade ut det här kapitlet. Lektionerna finns kvar om du vill gå igenom dem och få XP.</p>' : ''}
      <ol class="lesson-list">${items}</ol>
    </section>`;
    if (focus) {
      const panel = chapterSlot.querySelector('#chapter-panel');
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    requestAnimationFrame(drawPath);
  };

  const setUrl = () => history.replaceState(null, '', `#/lar${openChapter ? `?kapitel=${openChapter}` : ''}`);

  const renderAll = () => {
    renderGreeting(); renderTracks(); renderNext(); renderReview(); renderDaily(); renderStations(); renderChapter();
  };

  const cleanups = [
    on(el, 'click', '[data-track]', (e, b) => {
      if (b.dataset.track === track.id) return;
      track = trackById(b.dataset.track);
      openChapter = null; // byte av spår stänger öppet kapitel
      setUrl();
      store.update((p) => setPref(p, 'track', track.id));
      renderAll();
      announce(`Spår: ${track.name}`);
    }),
    on(el, 'click', '[data-chapter]', (e, b) => {
      const id = b.dataset.chapter;
      openChapter = openChapter === id ? null : id;
      setUrl();
      renderChapter({ focus: !!openChapter });
    }),
    on(el, 'click', '[data-close-chapter]', () => {
      const id = openChapter;
      openChapter = null;
      setUrl();
      renderChapter();
      const b = stations.querySelector(`[data-chapter="${id}"]`);
      if (b) b.focus();
    }),
    on(el, 'click', '[data-daily-done]', () => renderDaily()),
    on(el, 'keydown', '.chapter-panel', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); el.querySelector('[data-close-chapter]').click(); }
    }),
  ];

  const onWin = () => drawPath();
  window.addEventListener('resize', onWin);
  mountWorld();
  renderAll();
  if (openChapter) requestAnimationFrame(() => {
    const p = chapterSlot.querySelector('#chapter-panel');
    if (p) p.scrollIntoView({ block: 'nearest' });
  });

  return {
    el,
    noFocus: !!openChapter,
    onTheme() { mountWorld(); requestAnimationFrame(drawPath); },
    onReplaced() { openChapter = null; setUrl(); renderAll(); },
    destroy() {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', onWin);
      if (world) world.destroy();
      if (daily) daily.destroy();
      cleanups.forEach((f) => f());
    },
  };
}
