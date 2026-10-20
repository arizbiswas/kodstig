import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyProfile, completeLesson, claimBonus, merge, addActivity } from '../../src/state/model.js';
import { scheduleLesson, dueLessons, sessionFor, recordReview, nextDue, itemOf, addDays, SESSION_MAX } from '../../src/state/review.js';
import { streakInfo } from '../../src/state/streak.js';
import { LESSONS } from '../../src/content/index.js';

const at = (day) => `${day}T10:00:00`;

test('repetition: en klarad lektion kommer tillbaka efter 1, 3, 7, 14 och 30 dagar', () => {
  const p = emptyProfile();
  completeLesson(p, 'py-print', at('2026-10-20'));
  scheduleLesson(p, 'py-print', [], '2026-10-20');
  assert.deepEqual(dueLessons(p, '2026-10-20'), [], 'inte samma dag');
  assert.deepEqual(dueLessons(p, '2026-10-21'), ['py-print']);
  let day = '2026-10-21';
  for (const gap of [3, 7, 14, 30, 30]) {
    recordReview(p, 'py-print', 0, true, day);
    assert.equal(itemOf(p, 'py-print').due, addDays(day, gap));
    day = addDays(day, gap);
  }
});

test('repetition: fel svar börjar om på en dag och övningen kommer först nästa gång', () => {
  const p = emptyProfile();
  completeLesson(p, 'py-print', at('2026-10-20'));
  scheduleLesson(p, 'py-print', [], '2026-10-20');
  recordReview(p, 'py-print', 0, true, '2026-10-21');
  recordReview(p, 'py-print', 4, false, '2026-10-24');
  const it = itemOf(p, 'py-print');
  assert.equal(it.box, 0);
  assert.equal(it.due, '2026-10-25');
  const s = sessionFor(p, '2026-10-25');
  assert.equal(s[0].i, 4);
  assert.equal(s[0].missed, true);
  recordReview(p, 'py-print', 4, true, '2026-10-25');
  assert.deepEqual(itemOf(p, 'py-print').miss, []);
});

test('repetition: övningar som gick fel i lektionen kommer först', () => {
  const p = emptyProfile();
  completeLesson(p, 'py-var', at('2026-10-20'));
  scheduleLesson(p, 'py-var', [2, 1, 2], '2026-10-20');
  assert.deepEqual(itemOf(p, 'py-var').miss, [1, 2]);
  assert.equal(sessionFor(p, '2026-10-21')[0].i, 1);
});

test('repetition: gamla lektioner utan kö blir dags, passet har högst fem frågor och bara korta övningar', () => {
  const p = emptyProfile();
  const ids = LESSONS.filter((l) => l.trackId === 'python').slice(0, 7).map((l) => l.id);
  ids.forEach((id) => completeLesson(p, id, at('2026-10-01')));
  completeLesson(p, 'cs-budget', at('2026-09-01'));
  const s = sessionFor(p, '2026-10-20');
  assert.equal(s.length, SESSION_MAX);
  assert.ok(!dueLessons(p, '2026-10-20').includes('cs-budget'), 'ett rent projekt utan korta övningar repeteras inte');
  for (const x of s) {
    assert.ok(x.ex, x.lesson.id);
    if (x.lesson.tier === 5) assert.ok(['choice', 'fill'].includes(x.ex.type), 'projektdelar ingår inte');
  }
  assert.equal(nextDue(p, '2026-10-20'), null, 'allt är redan dags');
});

test('repetition: två enheter slås ihop, senaste svaret vinner', () => {
  const a = emptyProfile();
  completeLesson(a, 'py-print', at('2026-10-20'));
  scheduleLesson(a, 'py-print', [], '2026-10-20', 1);
  const b = JSON.parse(JSON.stringify(a));
  recordReview(a, 'py-print', 0, true, '2026-10-21', 5);
  recordReview(b, 'py-print', 0, false, '2026-10-21', 9);
  assert.deepEqual(merge(a, b).review, merge(b, a).review);
  assert.equal(merge(a, b).review['py-print'].box, 0);
});

test('svit: repetition räknas, och två missade dagar per vecka fryses', () => {
  const p = emptyProfile();
  // Måndag 12 till onsdag 14 oktober: lektioner. Torsdag och fredag missas. Lördag repetition.
  completeLesson(p, 'py-print', at('2026-10-12'));
  completeLesson(p, 'py-var', at('2026-10-13'));
  completeLesson(p, 'py-math', at('2026-10-14'));
  claimBonus(p, 'review:2026-10-17', {}, at('2026-10-17'));
  const s = streakInfo(p, new Date('2026-10-17T20:00:00'));
  assert.equal(s.streak, 4, 'fyra dagar med övning, två frysta dagar emellan');
  assert.equal(s.freezesLeft, 0);
  assert.deepEqual(s.week.filter((d) => d.frozen).map((d) => d.key), ['2026-10-15', '2026-10-16']);
  // En tredje missad dag samma vecka bryter sviten.
  const q = emptyProfile();
  completeLesson(q, 'py-print', at('2026-10-12'));
  addActivity(q, 'dev', '2026-10-16', 3600);
  assert.equal(streakInfo(q, new Date('2026-10-16T20:00:00')).streak, 1);
  // Inget gjort i dag ännu bryter inte sviten.
  assert.equal(streakInfo(p, new Date('2026-10-18T09:00:00')).streak, 4);
});
