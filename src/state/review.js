// Daglig repetition. Varje avklarad lektion är ett begrepp i en kö. Ett begrepp
// kommer tillbaka efter 1, 3, 7, 14 och 30 dagar. Rätt på första försöket flyttar
// det ett steg längre bort, fel börjar om från en dag. Övningar som gick fel
// i lektionen eller i repetitionen kommer först nästa gång.
import { LESSON_BY_ID } from '../content/index.js';
import { today } from './progression.js';

export const INTERVALS = [1, 3, 7, 14, 30];
export const SESSION_MAX = 5;

export function addDays(day, n) {
  const [y, m, d] = day.split('-').map(Number);
  return today(new Date(y, m - 1, d + n));
}

function hashStr(s) {
  let x = 2166136261;
  for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619); }
  return x >>> 0;
}

// Lektioner som klarades innan kön fanns får ett startläge: dags dagen efter.
export function itemOf(profile, lessonId) {
  const it = profile.review?.[lessonId];
  if (it) return it;
  const c = profile.completed?.[lessonId];
  if (!c) return null;
  return { box: 0, due: addDays(today(new Date(c.at)), 1), miss: [], ts: 0 };
}

/** Lägger in en nyss klarad lektion i kön, med de övningar som gick fel. */
export function scheduleLesson(p, lessonId, missed = [], day = today(), ts = Date.now()) {
  p.review ||= {};
  if (p.review[lessonId]) return p;
  p.review[lessonId] = { box: 0, due: addDays(day, 1), miss: [...new Set(missed)].sort((a, b) => a - b), ts };
  return p;
}

// Korta övningar passar i ett repetitionspass. Stora projektdelar gör det inte.
function fits(ex, lesson) {
  if (ex.type === 'choice' || ex.type === 'fill') return true;
  if (lesson.tier === 5) return false;
  return (ex.starter || '').split('\n').length <= 12;
}

const reviewable = (id) => {
  const l = LESSON_BY_ID.get(id);
  return !!l && l.exercises.some((ex) => fits(ex, l));
};

/** Begrepp som är dags att repetera, äldst först. */
export function dueLessons(profile, day = today()) {
  return Object.keys(profile.completed || {})
    .filter(reviewable)
    .map((id) => ({ id, item: itemOf(profile, id) }))
    .filter((x) => x.item.due <= day)
    .sort((a, b) => (a.item.due < b.item.due ? -1 : a.item.due > b.item.due ? 1 : LESSON_BY_ID.get(a.id).order - LESSON_BY_ID.get(b.id).order))
    .map((x) => x.id);
}

/** Nästa dag då något blir dags, eller null om kön är tom. */
export function nextDue(profile, day = today()) {
  let best = null;
  for (const id of Object.keys(profile.completed || {})) {
    if (!reviewable(id)) continue;
    const d = itemOf(profile, id).due;
    if (d > day && (!best || d < best)) best = d;
  }
  return best;
}

/** Dagens pass: högst SESSION_MAX frågor, en per begrepp. */
export function sessionFor(profile, day = today()) {
  return dueLessons(profile, day).slice(0, SESSION_MAX).map((id) => {
    const lesson = LESSON_BY_ID.get(id);
    const item = itemOf(profile, id);
    const missed = (item.miss || []).filter((i) => lesson.exercises[i] && fits(lesson.exercises[i], lesson));
    const pool = lesson.exercises.map((ex, i) => i).filter((i) => fits(lesson.exercises[i], lesson));
    const i = missed.length ? missed[0] : pool[hashStr(`${day}:${id}:${item.box}`) % pool.length];
    return { lesson, i, ex: lesson.exercises[i], missed: missed.includes(i) };
  });
}

/** Sparar ett svar i repetitionen. ok = rätt på första försöket. */
export function recordReview(p, lessonId, i, ok, day = today(), ts = Date.now()) {
  const it = itemOf(p, lessonId);
  if (!it) return p;
  const box = ok ? Math.min(it.box + 1, INTERVALS.length - 1) : 0;
  const miss = new Set(it.miss || []);
  if (ok) miss.delete(i); else miss.add(i);
  p.review ||= {};
  p.review[lessonId] = { box, due: addDays(day, ok ? INTERVALS[box] : 1), miss: [...miss].sort((a, b) => a - b), ts };
  return p;
}

export const reviewKey = (day = today()) => `review:${day}`;
