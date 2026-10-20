// Samlar läroplanen och räknar fram det som resten av appen behöver.
import csharp from './csharp.js';
import python from './python.js';
import web from './web.js';
import git from './git.js';
import csharpExtra from './csharp-extra.js';
import pythonExtra from './python-extra.js';
import webExtra from './web-extra.js';
import csharpOrder from './csharp-order.js';
import pythonOrder from './python-order.js';
import webOrder from './web-order.js';

// Extraövningar läggs sist i sina lektioner, så index för gamla övningar ändras inte.
const EXTRA = { ...csharpExtra, ...pythonExtra, ...webExtra };
// Förutsägelsefrågor och ordningspussel (fas 3), också sist i lektionerna.
const ORDER = { ...csharpOrder, ...pythonOrder, ...webOrder };

export const TRACKS = [csharp, python, web, git];
export const TRACK_IDS = TRACKS.map((t) => t.id);

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
      l.chapterIndex = ci;
      if (EXTRA[l.id]) l.exercises = [...l.exercises, ...EXTRA[l.id]];
      if (ORDER[l.id]) l.exercises = [...l.exercises, ...ORDER[l.id]];
      l.sequence = stairOrder(l.exercises);
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
