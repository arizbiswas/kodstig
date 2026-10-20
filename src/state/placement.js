// Nivåtest och "Testa ut". Den som redan kan grunderna ska inte behöva gå igenom
// dem. Bara första svaret räknas och inga ledtrådar visas. Ett godkänt test låser
// upp kapitlet och allt före det, men ger ingen XP: XP kommer från lektionerna.
import { BASE_CHAPTERS } from './progression.js';

export const TEST_OUT = { questions: 5, need: 4 };
export const PLACEMENT_PER_CHAPTER = 2;

// Snabba frågor passar i ett test. Att skriva egen kod tar för lång tid här.
const quick = (ex) => ex.type === 'choice' || ex.type === 'fill' || ex.type === 'order';

/** Alla snabba frågor i ett kapitel, som { lesson, i, ex }. Miniprojekt räknas inte. */
export function quizPool(chapter) {
  return chapter.lessons.filter((l) => l.tier !== 5).flatMap((lesson) => lesson.exercises.map((ex, i) => ({ lesson, i, ex })).filter((x) => quick(x.ex)));
}

/** n frågor från så många olika lektioner som möjligt, i lektionsordning. */
export function pickQuestions(chapter, n, rand = Math.random) {
  const byLesson = new Map();
  for (const q of quizPool(chapter)) {
    if (!byLesson.has(q.lesson.id)) byLesson.set(q.lesson.id, []);
    byLesson.get(q.lesson.id).push(q);
  }
  const groups = [...byLesson.values()];
  // Blanda lektionerna, ta en fråga från varje tills n är nådd.
  for (let i = groups.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [groups[i], groups[j]] = [groups[j], groups[i]]; }
  const out = [];
  for (let round = 0; out.length < n && groups.some((g) => g.length); round++) {
    for (const g of groups) {
      if (out.length >= n || !g.length) continue;
      out.push(g.splice(Math.floor(rand() * g.length), 1)[0]);
    }
  }
  return out.sort((a, b) => a.lesson.order - b.lesson.order || a.i - b.i);
}

export const testOutQuiz = (chapter, rand) => pickQuestions(chapter, TEST_OUT.questions, rand);

/** Nivåtestets kapitel: grundkapitlen i spåret, två frågor var. */
export function placementChapters(track) {
  return track.chapters.slice(0, BASE_CHAPTERS).filter((ch) => quizPool(ch).length >= PLACEMENT_PER_CHAPTER);
}

/** Kapitlen som blir utestade när man klarar kapitel nummer idx: det och alla före. */
export const chaptersThrough = (track, idx) => track.chapters.slice(0, idx + 1).map((c) => c.id);
