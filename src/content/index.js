// Samlar läroplanen och räknar fram det som resten av appen behöver.
import csharp from './csharp.js';
import python from './python.js';
import web from './web.js';

export const TRACKS = [csharp, python, web];
export const TRACK_IDS = TRACKS.map((t) => t.id);

export const TIER_NAMES = {
  1: 'Grund',
  2: 'Fördjupning',
  3: 'Funktioner och struktur',
  4: 'Tillämpning',
  5: 'Miniprojekt',
};

export const LESSONS = [];
export const LESSON_BY_ID = new Map();
for (const track of TRACKS) {
  let prev = null;
  track.chapters.forEach((ch, ci) => {
    ch.trackId = track.id;
    ch.index = ci;
    ch.lessons.forEach((l, li) => {
      l.trackId = track.id;
      l.chapterId = ch.id;
      l.lang = track.lang;
      l.order = LESSONS.length;
      l.numberInChapter = li + 1;
      // Förkunskapskrav: föregående lektion i spåret, plus eventuella extra krav.
      l.requires = [...new Set([...(prev ? [prev.id] : []), ...(l.requires || [])])];
      LESSONS.push(l);
      LESSON_BY_ID.set(l.id, l);
      prev = l;
    });
  });
}

export const trackById = (id) => TRACKS.find((t) => t.id === id) || TRACKS[0];
export const lessonsOfTrack = (id) => LESSONS.filter((l) => l.trackId === id);

export const STATS = {
  lessons: LESSONS.length,
  exercises: LESSONS.reduce((n, l) => n + l.exercises.length, 0),
  projects: LESSONS.filter((l) => l.tier === 5).length,
};
