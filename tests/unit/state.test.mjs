import test from 'node:test';
import assert from 'node:assert/strict';
import { Store } from '../../src/state/store.js';
import { localBackend } from '../../src/state/backends.js';
import { completeLesson, claimBonus, saveLessonState, setPref, addActivity, activityByDay, merge, emptyProfile, pref } from '../../src/state/model.js';
import { levelInfo, xpOf, canClaimDaily, nextStepAdvice, LEVELS, TIER_XP } from '../../src/state/progression.js';
import { LESSONS } from '../../src/content/index.js';
import { memoryStorage, manualTimers } from './helpers.mjs';

async function device(backend, cache) {
  const timers = manualTimers();
  const s = new Store({ backend, cache, uid: 'u', timers, saveDelay: 0 });
  await s.init();
  await timers.runAll();
  return { s, timers };
}

test('läroplanen ger 9 375 XP och högsta nivån är nåbar', () => {
  const p = emptyProfile();
  LESSONS.forEach((l) => completeLesson(p, l.id));
  assert.equal(xpOf(p).total, 9375);
  assert.equal(levelInfo(p).level, 12);
  assert.equal(levelInfo(p).title, 'Kodstig-examen');
});

test('samma lektion ger bara XP en gång', () => {
  const p = emptyProfile();
  assert.equal(completeLesson(p, 'py-print'), true);
  assert.equal(completeLesson(p, 'py-print'), false);
  assert.equal(xpOf(p).total, TIER_XP[1]);
});

test('nivå kräver både XP och kunskapsunderlag', () => {
  const p = emptyProfile();
  // 4 miniprojekt = 560 XP men bara 4 lektioner: nivå 2 kräver 3 lektioner (ok), nivå 3 kräver 8 lektioner.
  ['cs-budget', 'cs-scores', 'py-budget', 'py-scores'].forEach((id) => completeLesson(p, id));
  const info = levelInfo(p);
  assert.equal(info.xp, 560);
  assert.equal(info.level, 2, 'XP räcker till nivå 3 men kunskapskravet (8 lektioner) gör det inte');
  assert.equal(info.next.xpMissing, 0);
  assert.deepEqual(info.next.reqs.map((r) => r.text), ['4 avklarade lektioner']);
  const advice = nextStepAdvice(p, 'python');
  assert.ok(advice.enoughXp);
  assert.ok(advice.lesson, 'appen föreslår en konkret lektion');
});

test('tidigare nivåkrav måste också vara uppfyllda', () => {
  const p = emptyProfile();
  // Nivå 5-krav (5 fördjupningar + 1 funktion) men för få lektioner totalt för nivå 4.
  ['cs-foreach', 'cs-strmethods', 'cs-andor', 'cs-bounds', 'py-listloop', 'cs-methods'].forEach((id) => completeLesson(p, id));
  for (let i = 0; i < 120; i++) claimBonus(p, `daily:2020-01-${String(i).padStart(3, '0')}`);
  const info = levelInfo(p);
  assert.ok(info.xp >= 1380);
  assert.equal(info.level, 2, 'nivå 3 kräver 8 lektioner, så nivå 5 kan inte nås förbi den');
});

test('nivåtabellen matchar specifikationen', () => {
  assert.deepEqual(LEVELS.map((l) => [l.level, l.title, l.xp]), [
    [1, 'Kodnyfiken', 0], [2, 'Nybörjare', 120], [3, 'Kodlärling', 360], [4, 'Kodstudent', 780],
    [5, 'Kodutforskare', 1380], [6, 'Övande problemlösare', 2160], [7, 'Projektlärling', 3060], [8, 'Målmedveten kodare', 4020],
    [9, 'Självgående kodare', 5000], [10, 'Strukturerad problemlösare', 6000], [11, 'Projektbyggare', 7200], [12, 'Kodstig-examen', 8400],
  ]);
});

test('dagsutmaning en gång per dag', () => {
  const p = emptyProfile();
  const d = new Date('2026-10-19T09:00:00');
  const c = canClaimDaily(p, d);
  assert.ok(claimBonus(p, c.key));
  assert.equal(canClaimDaily(p, d).ok, false);
  assert.equal(claimBonus(p, c.key), false);
  assert.equal(xpOf(p).bonusXp, 10);
});

test('sammanslagning ger inte dubbla belöningar och är ordningsoberoende', () => {
  const a = emptyProfile(), b = emptyProfile();
  completeLesson(a, 'py-print', '2026-10-18T10:00:00.000Z');
  completeLesson(b, 'py-print', '2026-10-18T09:00:00.000Z');
  completeLesson(b, 'py-var');
  claimBonus(a, 'daily:2026-10-19'); claimBonus(b, 'daily:2026-10-19');
  setPref(a, 'name', 'Ada', 1); setPref(b, 'name', 'Linus', 2);
  addActivity(a, 'dev1', '2026-10-19', 300); addActivity(b, 'dev2', '2026-10-19', 200); addActivity(b, 'dev1', '2026-10-19', 100);
  const m1 = merge(a, b), m2 = merge(b, a);
  assert.deepEqual(m1, m2);
  assert.equal(xpOf(m1).total, 30 + 30 + 10);
  assert.equal(m1.completed['py-print'].at, '2026-10-18T09:00:00.000Z');
  assert.equal(pref(m1, 'name'), 'Linus');
  assert.equal(activityByDay(m1)['2026-10-19'], 500, 'samma enhet tar max, olika enheter summeras');
  assert.deepEqual(merge(m1, m1), m1, 'idempotent');
});

test('två flikar/enheter: ändringar slås ihop utan förlust', async () => {
  const backend = localBackend(memoryStorage());
  const A = await device(backend);
  const B = await device(backend);
  A.s.update((p) => { completeLesson(p, 'py-print'); });
  B.s.update((p) => { completeLesson(p, 'py-var'); saveLessonState(p, 'py-math', { step: 2, answers: { 1: 'x' } }); });
  await A.timers.runAll();
  await B.timers.runAll(); // konflikt -> merge -> sparar igen
  await A.s.pull();
  assert.deepEqual(Object.keys(A.s.state.completed).sort(), ['py-print', 'py-var']);
  assert.deepEqual(Object.keys(B.s.state.completed).sort(), ['py-print', 'py-var']);
  assert.equal(A.s.state.lessons['py-math'].step, 2);
  const stored = await backend.load();
  assert.equal(xpOf(stored.doc).total, 60);
});

test('dubbelklick: att klara samma lektion två gånger ger inte dubbel XP', async () => {
  const backend = localBackend(memoryStorage());
  const A = await device(backend);
  A.s.update((p) => { completeLesson(p, 'py-print'); });
  A.s.update((p) => { completeLesson(p, 'py-print'); });
  await A.timers.runAll();
  assert.equal(xpOf((await backend.load()).doc).total, 30);
});

test('en äldre flik kan inte återställa data efter nollställning', async () => {
  const backend = localBackend(memoryStorage());
  const A = await device(backend);
  const B = await device(backend);
  A.s.update((p) => { completeLesson(p, 'py-print'); completeLesson(p, 'py-var'); setPref(p, 'name', 'Ada'); });
  await A.timers.runAll();
  await B.s.pull();
  assert.equal(Object.keys(B.s.state.completed).length, 2);
  await A.s.reset();
  // B har fortfarande gamla framsteg i minnet och försöker spara en ändring.
  B.s.update((p) => { completeLesson(p, 'py-math'); });
  await B.timers.runAll();
  const stored = await backend.load();
  assert.deepEqual(stored.doc.completed, {}, 'gamla framsteg kom inte tillbaka');
  assert.deepEqual(B.s.state.completed, {}, 'den gamla fliken bytte till den nollställda profilen');
  assert.equal(pref(stored.doc, 'name'), 'Ada', 'inställningar finns kvar efter nollställning');
});

test('nätverksavbrott: ändringen ligger kvar lokalt och sparas när nätet är tillbaka', async () => {
  const inner = localBackend(memoryStorage());
  let online = true;
  const flaky = {
    load: () => (online ? inner.load() : Promise.reject(Object.assign(new Error('offline'), { offline: true }))),
    save: (...a) => (online ? inner.save(...a) : Promise.reject(Object.assign(new Error('offline'), { offline: true }))),
    reset: (...a) => inner.reset(...a),
  };
  const cacheStore = memoryStorage();
  const cache = { get: () => JSON.parse(cacheStore.getItem('c') || 'null'), set: (v) => cacheStore.setItem('c', JSON.stringify(v)), clear: () => cacheStore.removeItem('c') };
  const A = await device(flaky, cache);
  online = false;
  A.s.update((p) => { completeLesson(p, 'py-print'); });
  await A.timers.runAll();
  assert.equal(A.s.status, 'offline');
  assert.equal(cache.get().pending, true);
  // Omladdning medan nätet är nere: en ny Store läser cachen.
  const R = await device(flaky, cache);
  assert.ok(R.s.state.completed['py-print'], 'framsteg finns kvar efter omladdning');
  online = true;
  await R.s.flush();
  assert.ok((await inner.load()).doc.completed['py-print']);
  assert.equal(R.s.status, 'saved');
});

test('omladdning: pågående och avklarad lektion finns kvar', async () => {
  const storage = memoryStorage();
  const backend = localBackend(storage);
  const A = await device(backend);
  A.s.update((p) => { completeLesson(p, 'py-print'); saveLessonState(p, 'py-var', { step: 3, answers: { 3: 'ålder = 12' } }); });
  await A.timers.runAll();
  await A.s.dispose();
  const B = await device(localBackend(storage));
  assert.ok(B.s.state.completed['py-print']);
  assert.equal(B.s.state.lessons['py-var'].step, 3);
  assert.equal(B.s.state.lessons['py-var'].answers[3], 'ålder = 12');
});

test('nivå 9 och uppåt kräver fortsättningskapitlen, inte bara XP', () => {
  const p = emptyProfile();
  // Alla grundlektioner i alla spår: mycket XP men inga fortsättningslektioner.
  LESSONS.filter((l) => l.chapterIndex < 6).forEach((l) => completeLesson(p, l.id));
  const info = levelInfo(p);
  assert.ok(info.xp >= 4020, `XP ${info.xp}`);
  assert.equal(info.level, 8);
  assert.ok(info.next.reqs.some((r) => r.key === 'pro'));
  const advice = nextStepAdvice(p);
  assert.ok(advice.lesson && advice.lesson.chapterIndex >= 6, 'rådet pekar på en fortsättningslektion');
});
