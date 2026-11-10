// Delar som både hela läroplanen (full.js) och appens lata laddning (index.js) använder.

export const TIER_NAMES = {
  1: 'Grund',
  2: 'Fördjupning',
  3: 'Funktioner och struktur',
  4: 'Tillämpning',
  5: 'Miniprojekt',
};

// Visningsordning i en lektion: först förutsäga, sedan pussla, fylla i och sist
// skriva egen kod. Sparade svar använder fortfarande övningens index i listan.
const STAIR = { choice: 0, order: 1, fill: 2 };
export function stairOrder(exercises) {
  return exercises.map((ex, i) => i).sort((a, b) => (STAIR[exercises[a].type] ?? 3) - (STAIR[exercises[b].type] ?? 3) || a - b);
}

// Korta övningar passar i ett repetitionspass. Stora projektdelar gör det inte.
export function fitsReview(ex, lesson) {
  if (ex.type === 'choice' || ex.type === 'fill') return true;
  if (lesson.tier === 5) return false;
  return (ex.starter || '').split('\n').length <= 12;
}

// Det som bara behövs när man öppnar en lektion. Resten står i innehållsförteckningen.
export const BODY_KEYS = ['text', 'example', 'exampleInput', 'exercises'];

// Lektionens övningar: grundövningarna, sedan extraövningar och sist förutsägelser
// och ordningspussel. Index för gamla övningar ändras alltså aldrig.
export function lessonBody(l, extra = {}, order = {}) {
  const exercises = [...l.exercises, ...(extra[l.id] || []), ...(order[l.id] || [])];
  const body = { exercises, sequence: stairOrder(exercises) };
  for (const k of BODY_KEYS) if (k !== 'exercises' && l[k] !== undefined) body[k] = l[k];
  return body;
}

/** Innehållet för alla lektioner i ett spår: { lektions-id: { text, example, exercises, ... } }. */
export function trackBodies(track, extra, order) {
  const out = {};
  for (const ch of track.chapters) for (const l of ch.lessons) out[l.id] = lessonBody(l, extra, order);
  return out;
}

/** Fyller i fälten som resten av appen räknar med: spår, kapitel, ordning och krav. */
export function decorate(tracks, { keepRequires = false } = {}) {
  const LESSONS = [];
  const LESSON_BY_ID = new Map();
  for (const track of tracks) {
    let prev = null;
    track.chapters.forEach((ch, ci) => {
      ch.trackId = track.id;
      ch.index = ci;
      // Ett fristående kapitel (Pixelvärlden) kräver inte kapitlen före det.
      if (ch.standalone) prev = null;
      ch.lessons.forEach((l, li) => {
        l.trackId = track.id;
        l.chapterId = ch.id;
        l.lang = track.lang;
        l.order = LESSONS.length;
        l.numberInChapter = li + 1;
        l.chapterIndex = ci;
        // Förkunskapskrav: föregående lektion i spåret, plus eventuella extra krav.
        if (!keepRequires) l.requires = [...new Set([...(prev ? [prev.id] : []), ...(l.requires || [])])];
        LESSONS.push(l);
        LESSON_BY_ID.set(l.id, l);
        prev = l;
      });
    });
  }
  return { LESSONS, LESSON_BY_ID };
}
