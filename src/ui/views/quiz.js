// Nivåtest för ett spår och "Testa ut" för ett kapitel. Bara första svaret på
// varje fråga räknas, och inga ledtrådar visas. Godkänt låser upp kapitlen men
// ger ingen XP.
import { h, esc, on, announce } from '../dom.js';
import { TRACKS } from '../../content/index.js';
import { pref, skipChapters } from '../../state/model.js';
import { TEST_OUT, PLACEMENT_PER_CHAPTER, testOutQuiz, pickQuestions, placementChapters, chaptersThrough } from '../../state/placement.js';
import { renderExercise } from '../exercise.js';

const notFound = () => ({ el: h('<section class="page narrow"><h1>Testet finns inte</h1><p><a href="#/lar">Tillbaka till lärstigen</a></p></section>') });

/** "Testa ut": fem frågor från ett kapitel, fyra rätt låser upp det och allt före. */
export function testOut(ctx, chapterId) {
  const track = TRACKS.find((t) => t.chapters.some((c) => c.id === chapterId));
  if (!track) return notFound();
  const idx = track.chapters.findIndex((c) => c.id === chapterId);
  const chapter = track.chapters[idx];
  const qs = testOutQuiz(chapter);
  if (qs.length < TEST_OUT.questions) return notFound();
  return runQuiz(ctx, {
    title: `Testa ut: ${chapter.title}`,
    intro: `Kan du redan det som kapitel ${idx + 1} handlar om? Svara på ${TEST_OUT.questions} frågor. Har du minst ${TEST_OUT.need} rätt på första försöket låses kapitlet upp, och alla kapitel före det. Du får ingen XP för testet, men lektionerna finns kvar om du vill gå igenom dem senare.`,
    back: `#/lar?kapitel=${chapter.id}`,
    next: (answers) => (answers.length < qs.length ? { ...qs[answers.length], label: `Fråga ${answers.length + 1} av ${qs.length}` } : null),
    result: (answers) => {
      const right = answers.filter(Boolean).length;
      if (right >= TEST_OUT.need) {
        ctx.store.update((p) => skipChapters(p, chaptersThrough(track, idx)));
        const after = track.chapters[idx + 1];
        return {
          title: 'Godkänt!',
          text: `Du hade rätt på ${right} av ${qs.length}. Kapitel ${idx === 0 ? '1' : `1 till ${idx + 1}`} är nu upplåsta. Lektionerna finns kvar om du vill repetera.`,
          primary: after ? { href: `#/lar?kapitel=${after.id}`, label: `Fortsätt med ${after.title}` } : { href: '#/lar', label: 'Till lärstigen' },
        };
      }
      return {
        title: 'Inte riktigt än',
        text: `Du hade rätt på ${right} av ${qs.length}, och det behövs ${TEST_OUT.need}. Lektionerna i kapitlet tar dig dit, och du kan testa igen när du vill.`,
        primary: { href: `#/lar?kapitel=${chapter.id}`, label: 'Till kapitlet' },
      };
    },
  });
}

/** Nivåtest: två frågor per grundkapitel tills något blir fel. */
export function placement(ctx, trackId) {
  const track = TRACKS.find((t) => t.id === trackId);
  if (!track) return notFound();
  const chapters = placementChapters(track);
  const sets = chapters.map((ch) => pickQuestions(ch, PLACEMENT_PER_CHAPTER));
  // Hur många kapitel i rad som klarades helt.
  const passed = (answers) => {
    let k = 0;
    while (k < chapters.length && answers.length >= (k + 1) * PLACEMENT_PER_CHAPTER && answers.slice(k * PLACEMENT_PER_CHAPTER, (k + 1) * PLACEMENT_PER_CHAPTER).every(Boolean)) k++;
    return k;
  };
  return runQuiz(ctx, {
    title: `Nivåtest i ${track.name}`,
    intro: `Kan du redan lite ${track.name}? Svara på några frågor, så hittar vi var du ska börja. Frågorna blir svårare kapitel för kapitel och testet slutar när något blir fel. Det tar oftast bara några minuter, och du får ingen XP för det.`,
    back: '#/lar',
    next: (answers) => {
      const n = answers.length;
      const ch = Math.floor(n / PLACEMENT_PER_CHAPTER);
      if (n % PLACEMENT_PER_CHAPTER === 0 && passed(answers) < ch) return null; // något blev fel i förra kapitlet
      if (ch >= chapters.length) return null;
      return { ...sets[ch][n % PLACEMENT_PER_CHAPTER], label: `Kapitel ${ch + 1}: ${chapters[ch].title} · fråga ${n % PLACEMENT_PER_CHAPTER + 1} av ${PLACEMENT_PER_CHAPTER}` };
    },
    stopEarly: (answers) => answers.length % PLACEMENT_PER_CHAPTER !== 0 && !answers[answers.length - 1],
    result: (answers) => {
      const k = passed(answers);
      if (!k) {
        return {
          title: 'Börja från början',
          text: `Kapitel 1 är rätt ställe att börja på. Det går fort om du redan kan en del, och varje lektion ger XP.`,
          primary: { href: `#/lar?kapitel=${track.chapters[0].id}`, label: 'Till kapitel 1' },
        };
      }
      const start = track.chapters[k];
      return {
        title: k === chapters.length ? 'Du kan grunderna!' : `Börja i kapitel ${k + 1}`,
        text: `Du klarade frågorna i kapitel 1${k > 1 ? ` till ${k}` : ''}. Vill du hoppa över ${k > 1 ? 'dem' : 'det'}? De låses upp utan XP, och lektionerna finns kvar om du vill gå igenom dem senare.`,
        primary: { action: () => { ctx.store.update((p) => skipChapters(p, chaptersThrough(track, k - 1))); ctx.navigate(`/lar?kapitel=${start ? start.id : track.chapters[0].id}`); }, label: start ? `Hoppa till ${start.title}` : 'Hoppa över grunderna' },
        secondary: { href: `#/lar?kapitel=${track.chapters[0].id}`, label: 'Nej tack, jag börjar från början' },
      };
    },
  });
}

function runQuiz(ctx, { title, intro, back, next, result, stopEarly = () => false }) {
  const { store } = ctx;
  const el = h(`<section class="page narrow quiz" aria-labelledby="qz-h">
    <header class="page-head"><a class="back" href="${back}">← Tillbaka</a><h1 id="qz-h">${esc(title)}</h1></header>
    <div class="quiz-stage"></div>
  </section>`);
  const stage = el.querySelector('.quiz-stage');
  const answers = [];
  let current = null;
  let resultActions = null;

  const focusLabel = () => {
    const lbl = stage.querySelector('.step-label');
    if (lbl) { lbl.setAttribute('tabindex', '-1'); lbl.focus({ preventScroll: false }); }
  };

  const showIntro = () => {
    stage.innerHTML = `<article class="card quiz-intro"><p>${esc(intro)}</p>
      <p class="tiny muted">Bara ditt första svar räknas, och inga ledtrådar visas under testet.</p>
      <div class="row end"><button class="btn primary" type="button" data-quiz-start>Starta testet</button></div></article>`;
  };

  const showResult = () => {
    if (current) { current.destroy(); current = null; }
    const r = result(answers);
    resultActions = r;
    const btn = (b, cls) => (b.href ? `<a class="btn ${cls}" href="${b.href}">${esc(b.label)}</a>` : `<button class="btn ${cls}" type="button" data-quiz-${cls}>${esc(b.label)}</button>`);
    stage.innerHTML = `<article class="card quiz-result"><h2 class="step-label">${esc(r.title)}</h2><p>${esc(r.text)}</p>
      <div class="row gap wrap">${btn(r.primary, 'primary')}${r.secondary ? btn(r.secondary, 'ghost') : ''}</div></article>`;
    announce(r.title);
    focusLabel();
  };

  const showQuestion = () => {
    if (current) { current.destroy(); current = null; }
    const q = answers.length && stopEarly(answers) ? null : next(answers);
    if (!q) return showResult();
    let answered = false;
    const wrap = h(`<article class="card exercise-card" data-lesson="${q.lesson.id}" data-i="${q.i}">
      <p class="eyebrow">${esc(q.label)}</p>
      <h2 class="step-label">${esc(q.lesson.title)}</h2>
      <div class="ex-host"></div>
      <div class="row end nav-row"><button class="btn primary" type="button" data-quiz-next hidden>Nästa</button></div>
    </article>`);
    current = renderExercise(q.ex, {
      lang: q.lesson.lang,
      idPrefix: `quiz-${q.lesson.id}-${q.i}`,
      soundOn: () => pref(store.state, 'sound'),
      onAttempt: (ok) => {
        if (answered) return;
        answered = true;
        answers.push(ok);
        wrap.querySelector('[data-check]').hidden = true;
        wrap.classList.add('answered');
        const nb = wrap.querySelector('[data-quiz-next]');
        nb.hidden = false;
        setTimeout(() => nb.focus({ preventScroll: true }), 0);
      },
    });
    wrap.querySelector('.ex-host').append(current.el);
    stage.replaceChildren(wrap);
    focusLabel();
  };

  const cleanups = [
    on(el, 'click', '[data-quiz-start]', () => showQuestion()),
    on(el, 'click', '[data-quiz-next]', () => showQuestion()),
    on(el, 'click', '[data-quiz-primary]', () => resultActions?.primary.action?.()),
    on(el, 'click', '[data-quiz-ghost]', () => resultActions?.secondary?.action?.()),
  ];
  showIntro();

  return {
    el,
    destroy() { if (current) current.destroy(); cleanups.forEach((f) => f()); },
  };
}
