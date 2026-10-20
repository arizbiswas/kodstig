// En lektion: Läs → övningar → klart. Steg och utkast sparas på kontot så att
// man kan lämna och fortsätta senare.
import { h, esc, rich, on, codeEditor, announce } from '../dom.js';
import { LESSON_BY_ID, LESSONS, TIER_NAMES, trackById } from '../../content/index.js';
import { saveLessonState, completeLesson, pref } from '../../state/model.js';
import { TIER_XP, isUnlocked } from '../../state/progression.js';
import { scheduleLesson } from '../../state/review.js';
import { renderExercise } from '../exercise.js';
import { runCode, previewSrcdoc } from '../../engine/runner.js';
import { openCelebration } from '../celebrate.js';

export function render(ctx, lessonId) {
  const lesson = LESSON_BY_ID.get(lessonId);
  const store = ctx.store;
  if (!lesson) {
    return { el: h('<section class="page"><h1>Lektionen finns inte</h1><p><a href="#/lar">Tillbaka till lärstigen</a></p></section>') };
  }
  const track = trackById(lesson.trackId);
  const chapter = track.chapters.find((c) => c.id === lesson.chapterId);
  if (!isUnlocked(store.state, lesson) && !store.state.completed[lesson.id]) {
    const need = LESSON_BY_ID.get(lesson.requires[0]);
    return { el: h(`<section class="page narrow"><h1>${esc(lesson.title)}</h1>
      <p class="notice">Den här lektionen låses upp när du har klarat <a href="#/lektion/${need.id}">${esc(need.title)}</a>.</p>
      <p><a class="btn secondary" href="#/lar?kapitel=${chapter.id}">Tillbaka till kapitlet</a></p></section>`) };
  }

  const total = lesson.exercises.length;
  // Steg k i lektionen visar övning seq[k - 1]. Svar sparas per övningsindex.
  const seq = lesson.sequence || lesson.exercises.map((_, i) => i);
  const saved = store.state.lessons[lesson.id] || {};
  const wasCompleted = !!store.state.completed[lesson.id];
  const state = {
    step: Math.min(saved.step || 0, total),
    answers: { ...(saved.answers || {}) },
    solved: { ...(saved.solved || {}) },
    // Övningar som gick fel minst en gång. De kommer först i repetitionen.
    missed: [...(saved.missed || [])],
  };
  if (state.step > 0 && !state.solved[state.step - 1] && state.step - 1 >= 0) { /* fortsätt där man var */ }

  const el = h(`<section class="page lesson" aria-labelledby="lesson-h">
    <div class="lesson-top">
      <a class="back" href="#/lar?kapitel=${chapter.id}">← ${esc(chapter.title)}</a>
      <button class="btn ghost small" type="button" data-milo-lesson>Fråga Milo</button>
    </div>
    <h1 id="lesson-h">${esc(lesson.title)}</h1>
    <p class="lesson-meta">${esc(track.name)} · ${esc(TIER_NAMES[lesson.tier])} · ${TIER_XP[lesson.tier]} XP${wasCompleted ? ' · Avklarad tidigare' : ''}</p>
    <div class="lesson-progress" role="progressbar" aria-label="Framsteg i lektionen" aria-valuemin="0" aria-valuemax="${total + 1}"><span></span></div>
    <div class="lesson-stage"></div>
  </section>`);
  const stage = el.querySelector('.lesson-stage');
  const bar = el.querySelector('.lesson-progress');
  let current = null;
  let saveTimer = null;

  const persist = (now = false) => {
    clearTimeout(saveTimer);
    const doSave = () => store.update((p) => saveLessonState(p, lesson.id, state));
    if (now) doSave(); else saveTimer = setTimeout(doSave, 700);
  };

  const updateBar = () => {
    bar.setAttribute('aria-valuenow', String(state.step));
    bar.setAttribute('aria-valuetext', state.step === 0 ? 'Läs' : `Övning ${Math.min(state.step, total)} av ${total}`);
    bar.querySelector('span').style.width = `${(state.step / (total + 1)) * 100}%`;
  };

  ctx.app.codeSource = () => (current && current.code && current.code() ? { code: current.code(), lang: lesson.lang, from: 'lektion' } : null);

  const showRead = () => {
    if (current && current.destroy) current.destroy();
    current = null;
    const isWeb = lesson.lang === 'web';
    stage.innerHTML = `<article class="card read">
      <h2 class="step-label">Läs</h2>
      <div class="prose">${rich(lesson.text)}</div>
      <h3 class="ex-h">Exempel</h3>
      <pre class="code-block"><code>${esc(lesson.example)}</code></pre>
      ${isWeb ? `<div class="preview"><span class="output-label">Så här ser det ut</span><iframe title="Exemplets resultat" sandbox="" referrerpolicy="no-referrer"></iframe></div>`
        : '<div class="row"><button class="btn secondary small" type="button" data-run-example>Kör exemplet</button></div><div class="output" hidden><span class="output-label">Utskrift</span><pre></pre></div>'}
      <div class="row end"><button class="btn primary" type="button" data-start>${Object.keys(state.solved).length ? 'Fortsätt öva' : 'Börja öva'}</button></div>
    </article>`;
    const ifr = stage.querySelector('iframe');
    if (ifr) ifr.srcdoc = previewSrcdoc(lesson.example);
  };

  const showExercise = (pos) => {
    if (current && current.destroy) current.destroy();
    const i = seq[pos];
    const ex = lesson.exercises[i];
    const wrap = h(`<article class="card exercise-card" data-i="${i}">
      <h2 class="step-label">Övning ${pos + 1} av ${total}</h2>
      <div class="ex-host"></div>
      <div class="row between nav-row">
        <button class="btn ghost" type="button" data-prev>${pos === 0 ? 'Läs igen' : 'Föregående'}</button>
        <button class="btn primary" type="button" data-next ${state.solved[i] ? '' : 'hidden'}>${pos === total - 1 ? 'Avsluta lektionen' : 'Fortsätt'}</button>
      </div>
    </article>`);
    current = renderExercise(ex, {
      lang: lesson.lang,
      saved: state.answers[i],
      solved: !!state.solved[i],
      idPrefix: `${lesson.id}-${i}`,
      example: lesson.example,
      soundOn: () => pref(store.state, 'sound'),
      onChange: (v) => { state.answers[i] = v; persist(); },
      onAttempt: (ok) => { if (!ok && !state.missed.includes(i)) { state.missed.push(i); persist(); } },
      onSolved: () => {
        state.solved[i] = true;
        persist(true);
        const nb = wrap.querySelector('[data-next]');
        nb.hidden = false;
        nb.focus({ preventScroll: true });
      },
    });
    wrap.querySelector('.ex-host').append(current.el);
    stage.replaceChildren(wrap);
  };

  const go = (step, { focus = true } = {}) => {
    state.step = step;
    persist(true);
    updateBar();
    if (step === 0) showRead(); else showExercise(step - 1);
    if (focus) {
      const lbl = stage.querySelector('.step-label');
      if (lbl) { lbl.setAttribute('tabindex', '-1'); lbl.focus({ preventScroll: true }); }
      el.scrollIntoView({ block: 'start' });
    }
  };

  const finish = () => {
    const firstTime = !store.state.completed[lesson.id];
    const lines = [];
    const missed = state.missed;
    if (firstTime) {
      store.update((p) => { completeLesson(p, lesson.id); scheduleLesson(p, lesson.id, missed); saveLessonState(p, lesson.id, { step: 0, answers: {}, solved: {} }); });
      lines.push(`+${TIER_XP[lesson.tier]} XP`);
      lines.push('Lektionen kommer tillbaka i din dagliga repetition i morgon.');
    } else {
      store.update((p) => saveLessonState(p, lesson.id, { step: 0, answers: {}, solved: {} }));
      lines.push('Bra att repetera! XP får du bara första gången, men träningen räknas alltid.');
    }
    const next = LESSONS.find((l) => l.order === lesson.order + 1 && l.trackId === lesson.trackId);
    announce('Lektionen är klar.');
    openCelebration({
      title: lesson.title,
      lines,
      soundOn: () => pref(store.state, 'sound'),
      primary: next ? { label: `Nästa: ${next.title}`, onClick: () => ctx.navigate(`/lektion/${next.id}`) } : { label: 'Till lärstigen', onClick: () => ctx.navigate('/lar') },
      secondary: next ? { label: 'Till lärstigen', onClick: () => ctx.navigate(`/lar?kapitel=${chapter.id}`) } : null,
    });
    state.step = 0; state.answers = {}; state.solved = {};
    updateBar();
    showRead();
  };

  const cleanups = [
    on(el, 'click', '[data-start]', () => {
      const firstUnsolved = seq.findIndex((i) => !state.solved[i]);
      go(firstUnsolved === -1 ? 1 : firstUnsolved + 1);
    }),
    on(el, 'click', '[data-prev]', () => go(state.step - 1)),
    on(el, 'click', '[data-next]', () => { if (state.step >= total) finish(); else go(state.step + 1); }),
    on(el, 'click', '[data-milo-lesson]', () => ctx.openMilo()),
    on(el, 'click', '[data-run-example]', async (e, b) => {
      b.disabled = true;
      const run = await runCode(lesson.lang, lesson.example, []);
      b.disabled = false;
      const out = stage.querySelector('.output');
      out.hidden = false;
      out.querySelector('pre').textContent = run.error ? `${run.error.kind}: ${run.error.message}` : run.output.replace(/\n$/, '');
    }),
  ];

  updateBar();
  go(state.step, { focus: false });

  return {
    el,
    onReplaced() { ctx.navigate('/lar'); },
    destroy() {
      clearTimeout(saveTimer);
      if (saveTimer) persist(true);
      if (current && current.destroy) current.destroy();
      cleanups.forEach((f) => f());
      ctx.app.codeSource = null;
    },
  };
}

export { codeEditor };
