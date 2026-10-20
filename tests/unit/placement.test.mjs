import test from 'node:test';
import assert from 'node:assert/strict';
import { TRACKS, LESSON_BY_ID } from '../../src/content/index.js';
import { emptyProfile, merge, skipChapters, hasProgress } from '../../src/state/model.js';
import { isUnlocked, availableLessons, xpOf } from '../../src/state/progression.js';
import { quizPool, pickQuestions, placementChapters, chaptersThrough, TEST_OUT } from '../../src/state/placement.js';

const py = TRACKS.find((t) => t.id === 'python');

test('uttestade kapitel låser upp nästa kapitel men ger ingen XP', () => {
  const p = emptyProfile();
  const firstOf3 = py.chapters[2].lessons[0];
  assert.ok(!isUnlocked(p, firstOf3));
  skipChapters(p, chaptersThrough(py, 1));
  assert.ok(isUnlocked(p, firstOf3), 'kapitel 3 öppnas');
  assert.ok(isUnlocked(p, py.chapters[1].lessons[2]), 'lektioner i uttestade kapitel går att öppna');
  assert.equal(availableLessons(p, 'python')[0].id, firstOf3.id, 'nästa steg hoppar över uttestade kapitel');
  assert.equal(xpOf(p).total, 0);
  assert.ok(hasProgress(p));
});

test('uttestade kapitel slås ihop mellan enheter', () => {
  const a = skipChapters(emptyProfile(), [py.chapters[0].id], '2026-10-20T10:00:00Z');
  const b = skipChapters(emptyProfile(), [py.chapters[0].id, py.chapters[1].id], '2026-10-19T10:00:00Z');
  const m = merge(a, b);
  assert.deepEqual(Object.keys(m.skipped).sort(), [py.chapters[0].id, py.chapters[1].id].sort());
  assert.equal(m.skipped[py.chapters[0].id].at, '2026-10-19T10:00:00Z');
  assert.deepEqual(merge(a, b), merge(b, a));
});

test('testfrågor: bara snabba frågor, från olika lektioner, inga miniprojekt', () => {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (const track of TRACKS) {
    for (const ch of track.chapters) {
      const pool = quizPool(ch);
      if (ch.lessons.every((l) => l.tier === 5)) { assert.equal(pool.length, 0); continue; }
      assert.ok(pool.every((q) => ['choice', 'fill', 'order'].includes(q.ex.type) && q.lesson.tier !== 5));
      // Kapitel med mest miniprojekt har för få snabba frågor; där visas ingen "Testa ut".
      if (pool.length < TEST_OUT.questions) { assert.ok(ch.lessons.some((l) => l.tier === 5), `${ch.id}: för få testfrågor`); continue; }
      const qs = pickQuestions(ch, TEST_OUT.questions, rand);
      assert.equal(qs.length, TEST_OUT.questions);
      const lessons = new Set(qs.map((q) => q.lesson.id));
      assert.equal(lessons.size, Math.min(TEST_OUT.questions, new Set(pool.map((q) => q.lesson.id)).size), `${ch.id}: frågorna sprids över lektionerna`);
      for (const q of qs) assert.equal(LESSON_BY_ID.get(q.lesson.id).exercises[q.i], q.ex);
    }
    assert.equal(placementChapters(track).length, 6, `${track.id}: nivåtestet täcker grundkapitlen`);
  }
});
